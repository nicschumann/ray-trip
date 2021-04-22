require('./main.css');
let FontFaceObserver = require('fontfaceobserver');
const stories = require( './stories.js');
const paths = require('./paths.js');
import {fit2d_binsearch} from './fit2d.js';
const INITIAL_STORY_ID = require('./initial.js');
import {control_functions, animations} from './narrative-functions.js';

const SPECIMEN_BASE_STORY_ID = 'specimen-i';
// Sim Instantiation

import * as R from './sim-states.js';
// import {run_simulation} from './sim.js';

let sim_parameters = {
	// dt: this is the length of the timestep for the simulation.
	// This is NOT the framerate of the simulation (which tries to stick to 60)
	// a range from 4 - 0.01 creates an
	// interesting range of effects here.
	dt: 1,

	// dt: 0.01 - 0.025, v.r: 0.001, v.m: 1, v.theta: PI / 2 is a good combination for pressure images
	// dt: 0.25, v.r: 0.001, v.m: 0.075 - 0.001, v.theta: PI is a good combination for ink images

	velocity: {
		// dissipation: 0.18,
		dissipation: 0.25,
		radius: 0.01,
		magnitude: 0.01,
		theta: Math.PI / 1
	},

	pressure: {
		dissipation: 0.25,
		// --- v these might not be used v ---
		radius: 0.001,
		magnitude: 0.06
		// --- ^ these might not be used ^  ---
	},

	force: {
		radius: 0.001,
		magnitude: 0.1
	},

	ink: {
		radius: 0.1,
		color: [1.0, 1.0, 1.0, 1.0]
	}
};


let sim_state = {
	simulating: true,
	interactable: false,
	render: R.RENDER_COLOR,
	capture: false,

	added_colors: [],
	reset_colors: [],
	added_forces: [],
	reset_forces: [],
};

// run_simulation(sim_parameters, sim_state);

// end sim instantiation

let timers = []


const default_animation = {
  state: 0,
  upper_limit: 10,
  lower_limit: -10000,

  in: {
    offset: i => (i % 3 == 0) ? 0 : 100
  },
  up: {
    r: {
      top: t => t * Math.sin(t) / 18,
      left: t => t * Math.cos(-t) / 18
    },
    b: {
      top: t => t * Math.cos(-t) / 18,
      left: t => t * Math.sin(t) / 18
    }
  },
  down: {
    blur: t => Math.exp(t / 55),
    opacity: t => -1 / (55 / 4) * t + 1
  }
  // ambient: () => {},
};


/**
 * transitions
 */

const standard_transition_function = (data, story, state, i) => {

  let offset = story.animations.in.offset(i);

  let timer = window.setTimeout(() => {
		// start the transition animation.
		data.element.classList.remove('pending');
		// fire any attached inline functions.
		data.functions.forEach(f => {

			let completion_function = () => {
				f(data, story, state, i);
				data.element.removeEventListener('transitionend', completion_function);
			};

			data.element.addEventListener('transitionend', completion_function);
		});

  }, (i == 0) ? 0 : state.timing.acc + state.timing.base + offset + data.offset);

  state.timing.acc += state.timing.base + offset + data.offset;

  return timer;
}

/**
 * Up/Down Transitions
 */

function do_transition_for_mousewheel(story, state)
{
  return event => {
    if (!state.transitioning)
    {
      if (
        (
          story.transitions.next.length > 0 &&
          event.deltaY > 0
        ) ||
        (
          story.transitions.prev.length > 0 &&
          event.deltaY < 0
        ) ||
        (
          story.transitions.prev.length == 0 &&
          story.transitions.next.length == 0
        )
      ) {
        story.animations.state += event.deltaY / 6;
      }

      if (Math.abs(story.animations.state) < 5)
      {
        reset_state(event, story, state);
      }
      else if (story.animations.state > 0)
      {
        blur_to_next_state(event, story, state);
      }
      else if (story.animations.state < 0)
      {
        blur_to_prev_state(event, story, state);
      }

      if (
        story.animations.state > story.animations.upper_limit &&
        story.transitions.next.length > 0
      ) {
        window.clearInterval(state.ambient_interval);
        document.onwheel = null;
        let candidates = make_story_transition(
					state.history.sequence.map(x => x.id),
					state.story.current,
					story.transitions.next
				);

				if (candidates.length == 0)
				{
					render_end(state);
				}
				else
				{
					let next_story = random_story_id(candidates);
					console.log('scroll down:', next_story);
	        state.story.current = next_story;
	        render_frame(state, 'down');
				}
      }

      if (
        story.animations.state < story.animations.lower_limit &&
        story.transitions.prev.length > 0
      ) {
        window.clearInterval(state.ambient_interval);
        document.onwheel = null;
        let candidates = make_story_transition(
					state.history.sequence.map(x => x.id),
					state.story.current,
					story.transitions.prev
				);

				if (candidates.length == 0)
				{
					render_end(state);
				}
				else
				{
					let prev_story = random_story_id(candidates);
					console.log('scroll up', prev_story);
	        state.story.current = prev_story;
	        render_frame(state, 'up');
				}
      }
    }
  };
}


function make_story_transition(history, id, candidates)
{
	let always = candidates.filter(s => {
		return typeof s.seen == 'undefined' && typeof s.missed == 'undefined';
	});

	let conditional = candidates.filter(s => {
		if (typeof s.seen == 'undefined' && typeof s.missed == 'undefined')
		{
			return false;
		}

		let passes = true;

		if (typeof s.seen !== 'undefined' )
		{
			passes = s.seen.reduce((acc, id) => {
					return acc && history.indexOf(id) !== -1;
			}, true);
		}

		if (typeof s.missed !== 'undefined')
		{

			passes = passes && s.missed.reduce((acc, id) => {
				return acc && history.indexOf(id) === -1
			}, true);

		}

		return passes;
	})

	if (conditional.length > 0)
	{
		return conditional
	}
	else
	{
		return always
	}
}


/**
 * Downs
 */

const reset_state = (event, story, state) =>
{
  let t = story.animations.state;
  let parent = state.story.stage.container;
  let words = document.getElementsByClassName('word');


  // parent.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
  parent.style.transition = `all 2ms`;
  parent.style.opacity = '1';
  parent.style.filter = `none`;

  Array.from(words).forEach(el => {
    el.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
    el.style.transition = `all 2ms`;
    el.style.opacity = '1';
    el.style.filter = `none`;
  });
}



const blur_to_prev_state = (event, story, state) => {
  let t = story.animations.state;
	let padding = 0;

	let pending = document.querySelectorAll('.word.pending');
	let words = document.querySelectorAll('.word:not(.pending)');

	Array.from(pending).forEach(el => { el.remove() });

	let bl = story.animations.down.blur(Math.abs(t));
	let op = story.animations.down.opacity(t);
	// TODO: consider making this depend on the window size or text length...
	let stride = 4;

	if (words.length > 0)
	{
		let els = Array.from(words).slice(words.length - stride);

		els.forEach(el => {
			el.style.transition = `all 150ms var(--curve)`;
	    el.style.opacity = op;
	    el.style.filter = `blur(${bl * 5}px)`;
			el.style.transform = `translateZ(${t/2}px)`;

			window.setTimeout(() => {
				el.classList.add('pending');
			}, state.timing.base);
		});

	}
	else if (story.animations.state > story.animations.lower_limit + padding)
	{
		story.animations.state = story.animations.lower_limit + padding;
	}
};


const blur_to_next_state = (event, story, state) => {
  let t = story.animations.state;

  let words = document.getElementsByClassName('word');
	const tranlate_divisor = 3;

  // normal version
  let bl = story.animations.down.blur(t);
  let op = story.animations.down.opacity(t);

  // bonkers version
  // let bl = t => Math.exp(Math.random() * t / 20);
  // let op = t => -1 / (55 / 4) * bl(t) + 1;

  // console.log(`blur: ${bl(t)}px, op: ${op(t)}`);

  Array.from(words).forEach(el => {
    // el.setAttribute('style', `transition:all 2ms; opacity:${op(t)};filter:blur(${bl(t)}px);`
    el.style.transition = `all 2ms`;
    el.style.opacity = op;
    el.style.filter = `blur(${bl}px)`;
		el.style.transform = `translateZ(${t/tranlate_divisor}px)`;
  });
};

// const blur_to_next_state = (event, story, state) => {
//   let parent = document.getElementById('story-container');
//   console.log('next');
//
//   const max_blur = 40;
//   let blur = state.story.stage.blur;
//   blur += (event.deltaY > 0) ? 1.0 / (blur + 0.5) : -1.0 / (blur + 0.5);
//   blur = Math.max(Math.min(blur, max_blur), 0);
//   state.story.stage.blur = blur;
//
//   state.story.stage.opacity = -1 / (max_blur / 4) * blur + 1;
//
//   parent.setAttribute('style', `opacity:${state.story.stage.opacity}; filter:blur(${state.story.stage.blur}px);`)
// };


/**
 * Texts
 */

function stories_to_lookup_table(stories)
{
  let lookup = {};
  stories.forEach((story, i) => {

    let animations = Object.assign({}, default_animation);
    story.animations = Object.assign(animations, story.animations);

    if (typeof lookup[story.id] === 'undefined')
    {
      lookup[story.id] = i;
    }
    else
    {
      console.error(`StoryIDError: found multiple stories with the same story id: "${story.id}".`);
    }
  });

  return lookup;
}

function random_story_id(story_ids)
{
  let next_obj = story_ids[Math.floor(Math.random() * story_ids.length)];
  return next_obj.id;
}

function story_from_id(id, story_lookup, stories)
{
  let story_index = story_lookup[id];
  return stories[story_index];
}

function get_path_index(sequence)
{
  // console.log(sequence);
  for (let i = 0; i < paths.length; i++)
  {
    // console.log(paths[i]);
    if (paths[i].length !== sequence.length) continue;

    for (let j = 0; j < paths[i].length; j++)
    {
      // console.log(paths[i][j], sequence[j].id);
      if (typeof sequence[j] === 'undefined') break;
      if (sequence[j].id !== paths[i][j]) break;

      if (j == paths[i].length - 1) { return i; }
    }
  }

  return -1;
}

// valid color opacities:
// 1, 1, 1 (white)
// 0.92, 0, 0.54 (magenta-ish)
// 0.149, 0.66, 0.878 (blue-ish)
// 0.254, 1, 0.956 (cyan-ish)
// 1, 0.945, 0 (yellow)
function random_color()
{
  let choices = [
    // {r: 1, g: 1, b: 1},
    {r: 0.92, g: 0, b: 0.54},
    {r: 0.149, g: 0.66, b: 0.878},
    {r: 0.254, g: 1, b: 0.956},
    {r: 1, g: 0.945, b: 0}
  ]
  return choices[Math.floor(Math.random() * choices.length)];
}



let story_lookup = stories_to_lookup_table(stories);

let specimen_toggle = document.getElementById('specimen-toggle');

let state = {
  story: {
    stage: {
      container: document.getElementById('story-container')
    },
    current: INITIAL_STORY_ID,
		all: stories,
		paths: paths
  },
  marginalia: {
    stage: { container: document.getElementById('margin-container') }
  },
  sidelines: {
    stage: { container: document.getElementById('sidelines-container') }
  },
  end: {
    stage: { container: document.getElementById('end-container') }
  },
	history: {
	  frames: {},
	  sequence: []
	},
  timeouts: [],
	timing: {
		acc: 0,
		base: 65, // should be 65
		default: 65,
		padding: 1000
	}
};


/*
 * Forward Transitions:
 *  1. Choose next text
 *  2. Preprocess text so that words can be individuallu manipulated
 *  3. Determine text box size based on window width, height, and text length,
 *  4. Transition text in with a custom transition function.
 */

function make_channel_data(word, offset, data, color={})
{
	let space = (data.zerowidth) ? '&#x200B;' : '&nbsp;';

  let element = document.createElement('span');
  element.classList.add('word');
  element.classList.add('channeled-word');
  element.classList.add('pending');

  element.setAttribute('content', word + space);

  element.innerHTML = word + space;

  // this adds channeled data for RGB layering effects.
  // we discovered that this doesn't work on lower resolution
  // monitors, so we turned it off.

  // let static_channel = document.createElement('span');
  // static_channel.classList.add('static-channel');
  // static_channel.innerHTML = word + '&nbsp;';
  // element.append(static_channel);

  // let r_channel = document.createElement('span');
  // r_channel.classList.add('channel');
  // r_channel.classList.add('r-channel');
  // r_channel.innerHTML = word + '&nbsp;';
  // if (typeof color.r !== 'undefined') { r_channel.setAttribute('style', `opacity:${color.r};`); }
  // element.append(r_channel);
  //
  // let g_channel = document.createElement('span');
  // g_channel.classList.add('channel');
  // g_channel.classList.add('g-channel');
  // g_channel.innerHTML = word + '&nbsp;';
  // if (typeof color.g !== 'undefined') { g_channel.setAttribute('style', `opacity:${color.g};`); }
  // element.append(g_channel);
  //
  // let b_channel = document.createElement('span');
  // b_channel.classList.add('channel');
  // b_channel.classList.add('b-channel');
  // b_channel.innerHTML = word + '&nbsp;';
  // if (typeof color.b !== 'undefined') { b_channel.setAttribute('style', `opacity:${color.b};`); }
  // element.append(b_channel);

  return {element, offset, functions: []};
}

function extract_control_words(text, data)
{
  let word = '';
  let controls = {}; // $
  let lookups = []; // #

  let split_words = text.split('$');

  for (let i = 0; i < split_words.length; i++)
  {
    let split_subword = split_words[i].split('#');

    for (let j = 0; j < split_subword.length; j++)
    {
      if (i == 0 && j == 0) {
        let c = split_subword[0]
        if (c.length == 0 && split_subword.length > 1) {
          word = '#' + split_subword[1];
        }
        else
        {
          word = split_subword[0];
        }
      } else if (j > 0) {
        // we split out a '#', do a lookup.
        let id = split_subword[j]
        if (
          typeof data.definitions !== 'undefined' &&
          typeof data.definitions[id] !== 'undefined'
        ) {
          lookups.push(data.definitions[id]);
        } else if (
					typeof base_lookups[id] !== 'undefined'
				){
					lookups.push(base_lookups[id]);
				}
      }
      else
      {
        // we split out a '$', set a command.
        controls[split_subword[j]] = true;
      }
    }
  }

  return {
    word,
    lookups,
    controls
	}
}

const base_lookups = {
	ultra: {
		color: 'yellow'
	},
	black: {
		color: 'rgb(58, 52, 255)'
	},
	bold: {
		color: 'rgb(0, 255, 0)'
	},
	reg: {
		color: 'cyan'
	},
	light: {
		color: 'magenta'
	},
	extralight: {
		color: 'red'
	},
	h: {
		fontSize: `clamp(7.0px, 1.5vw, 10px)`,
		fontFamily: 'Magmatic',
		fontVariationSettings: "'wght' 400, 'wdth' 125",
		letterSpacing: '1px',
		textTransform: 'uppercase',
	}
};


function preprocess_text_as_words(data)
{
	let space = ((data.zerowidth) ? '&#x200B;' : '&nbsp;');

  let words = data.text.split(' ').filter(word => word.length > 0);

	let text = [];
  let marginalia = [];
  let sidelines = [];
  let offset = 0;
	let speed_ratio = state.timing.base / state.timing.default;

	if (data.notiming)
	{
		let content = words.join(space);
		let element_data = make_channel_data(content, offset, data);
		text.push(element_data);
	}
	else
	{
		words.forEach((word, i) => {
			let prefix = '';
			if (word.indexOf('#') == 0)
			{
				word = word.slice(1);
				prefix = '#';
			}
			else if (word.indexOf('$') == 0)
			{
				word = word.slice(1);
				prefix = '$';
			}


	    let parse = extract_control_words(word, data);
	    word = parse.word;

	    // deal with timing marks
	    if (word == '*') {
	      offset = 600 * speed_ratio;
	    }
	    else if (
	      word.indexOf('*') == 0 &&
	      Number.isInteger(+word.slice(1))
	    ) {
	      offset = +word.slice(1) * speed_ratio;
	    }

	    // deal with content
	    else
	    {
	      let element_data = make_channel_data(prefix + word, offset, data);

	      // handle custom style lookups
	      if (parse.lookups.length > 0)
	      {
	        for (const data of parse.lookups)
	        {
	          for (const key in data)
	          {
	            if (data.hasOwnProperty(key))
	            {
	              element_data.element.style[key] = data[key];
	            }
	          }
	        }
	      }

	      // handle custom commands

				if (parse.controls.paths)
				{
					element_data.element.innerHTML = paths.length + space;
					delete parse.controls.paths;
				}

				if (parse.controls.path)
				{
					element_data.element.innerHTML = (get_path_index(state.history.sequence, paths) + 1) + space;
					delete parse.controls.path;
				}

				if (parse.controls.parts)
				{
					element_data.element.innerHTML = stories.length + space;
					delete parse.controls.parts;
				}

				if (parse.controls.count)
				{
					element_data.element.innerHTML = state.history.sequence.length + space;
					delete parse.controls.count;
				}

				if (parse.controls.remaining)
				{
					element_data.element.innerHTML = (stories.length - state.history.sequence.length) + space;
					delete parse.controls.remaining;
				}


	      if (parse.controls.trim)
	      {
	        let idx = element_data.element.innerHTML.indexOf(space);
	        element_data.element.innerHTML = element_data.element.innerHTML.slice(0, idx);
					delete parse.controls.trim;
					element_data.trim = true;
	      }

	      if (parse.controls.break)
	      {
	        element_data.breakAfter = true;
					delete parse.controls.break;
	      }

				if (parse.controls.endframe)
				{
					element_data.functions.push((data, story, state) => {
						state.timeouts.push(setTimeout(() => {
							state.transitioning = false;
							document.onwheel = do_transition_for_mousewheel(story, state);
							specimen_toggle.classList.remove('transitioning');
						}, state.timing.padding));
					});
					delete parse.controls.endframe;
				}

				for (const key in parse.controls)
				{
					if (
						parse.controls.hasOwnProperty(key) &&
						typeof control_functions[key] === 'function'
					) {
						element_data.functions.push(control_functions[key]);
					}
				}

	      offset = 0;
	      text.push(element_data);
	    }
	  });
	}

	data.marginalia.forEach((text, i) => {
		let color = random_color();
		let data = make_channel_data(text, offset, color);
		marginalia.push(data);
	});

	data.sidelines.forEach((text, i) => {
		let color = random_color();
		let data = make_channel_data(text, offset, color);
		sidelines.push(data);
	});


	return {text, marginalia, sidelines};
}



function render_frame(state, direction, ignore, ondone)
{
	state.timeouts.forEach(clearTimeout);
  let data = story_from_id(state.story.current, story_lookup, stories);

	if (
		(typeof data.ignore === 'undefined' || !data.ignore) &&
		(typeof ignore === 'undefined' || !ignore)
	) {
		state.history.sequence.push({id: state.story.current, direction})
	  state.history.frames[data.id] = {index: state.history.sequence.length - 1};
	}

  state.transitioning = true;
	specimen_toggle.classList.add('transitioning');
  data.animations.state = 0;

  let story_parent = state.story.stage.container;
  let margin_parent = state.marginalia.stage.container;
  let sidelines_parent = state.sidelines.stage.container;
  let indicator = document.getElementById('state-indicator');

  if (data.transitions.next.length > 0 && data.transitions.prev.length > 0)
  {
    indicator.innerText = '↕';
  }
  else if (data.transitions.next.length > 0)
  {
    indicator.innerText = '↓';
  }
  else if (data.transitions.prev.length > 0)
  {
    indicator.innerText = '↑';
  }


  let parent_test_span = document.createElement('span');
  indicator.classList.remove('active');
  indicator.classList.remove('done');
  story_parent.setAttribute('style', '');
  story_parent.parentNode.setAttribute('style', '');

	// NOTE: Remove this if you ever want
	// to use it for anything other than Mantar.
	// This is specific to the naming scheme for mantar.
	if (data.id.indexOf('specimen-words') !== -1)
	{
		story_parent.classList.add('specimen-word');
		story_parent.classList.remove('specimen');
	}
	else if (data.id.indexOf('specimen') !== -1)
	{
		story_parent.classList.add('specimen');
		story_parent.classList.remove('specimen-word');
	}
	else
	{
		story_parent.classList.remove('specimen');
		story_parent.classList.remove('specimen-word');
	}

  if (typeof data.font !== 'undefined')
  {
    for (const key in data.font)
    {
      if (data.font.hasOwnProperty(key))
      {
        story_parent.style[key] = data.font[key];
      }
    }
  }

  story_parent.innerHTML = '';
  margin_parent.innerHTML = '';

  sidelines_parent.parentNode.setAttribute('style', '');
  sidelines_parent.innerHTML = '';

  if (data.sidelines.length == 0)
  {
    sidelines_parent.parentNode.setAttribute('style', 'display:none;');
    story_parent.parentNode.setAttribute('style', 'left:0;width:calc(100vw - 2rem);');
  }

  // (optionally) add a process to precompile rests and stops into the data.
  let {text, marginalia, sidelines} = preprocess_text_as_words(data);

	for (let i = 0; i < text.length; i++)
	{

		let d = text[i];

		if (typeof d.trim !== 'undefined' && d.trim)
		{
			let wrapper = document.createElement('span');
			wrapper.classList.add('no-break');

			while (
				(typeof d.trim !== 'undefined' && d.trim) ||
				(typeof text[i-1] !== 'undefined' && typeof text[i-1].trim !== 'undefined' && text[i-1].trim)
			) {

				d = text[i];
				wrapper.appendChild(d.element);

				if (typeof d.breakAfter !== 'undefined' && d.breakAfter)
				{
					let br = document.createElement('br');
					br.classList.add('word');
					wrapper.appendChild(br)
				}

				i++;
			}

			i--;

			story_parent.appendChild(wrapper);
		}
		else
		{
			story_parent.appendChild(d.element);
			if (typeof d.breakAfter !== 'undefined' && d.breakAfter)
			{
				let br = document.createElement('br');
				br.classList.add('word');
				story_parent.appendChild(br)
			}
		}
	}

	// fit text to content with fit2d_binsearch

  marginalia.forEach((d, i, a) => {
    margin_parent.appendChild(d.element);
  });

  sidelines.forEach((d, i, a) => {
    sidelines_parent.appendChild(d.element);
  });

  text.forEach((d, i, a) => {
    let timer = standard_transition_function(d, data, state, i, a);
    // timers.push({timer, fn: () => {data.animations.in(d, data, 0, a)}});
  });

  marginalia.forEach((d, i, a) => {
    let timer = standard_transition_function(d, data, state, i + text.length, a);
    // timers.push({timer, fn: () => {data.animations.in(d, data, 0, a)}});
  })

  sidelines.reverse().forEach((d, i, a) => {
    let timer = standard_transition_function(d, data, state, i + text.length, a);
    // timers.push({timer, fn: () => {data.animations.in(d, data, 0, a)}});
  });


  let timer = window.setTimeout(() => {
    state.transitioning = false;

		show_indicator();

    if (
			typeof data.animations.ambient !== 'undefined' &&
			typeof animations[data.animations.ambient] == 'function'
		) {
      state.ambient_interval = window.setInterval(() => {
        if (data.animations.state == 0)
        {
          let span = animations[data.animations.ambient](data, state);
        }
      }, 250);
    }

    document.onwheel = do_transition_for_mousewheel(data, state);
		specimen_toggle.classList.remove('transitioning');

		if (typeof ondone === 'function')
		{
			ondone(data, state);
		}

  }, state.timing.acc + state.timing.padding);

	state.timeouts.push(timer);


  state.timing.acc = 0;
}

function show_indicator()
{
	let indicator = document.getElementById('state-indicator');
	indicator.classList.add('active');

	window.setTimeout(() => {
		indicator.classList.add('done');
	}, 250)
}

function render_end(state) {
  let story_parent = state.story.stage.container;
  let margin_parent = state.marginalia.stage.container;
  let sidelines_parent = state.sidelines.stage.container;
  let end_parent = state.end.stage.container;
  let path_index = get_path_index(state.history.sequence) + 1;

  story_parent.classList.add('ended');
  story_parent.parentNode.classList.add('ended');
  margin_parent.classList.add('ended');
  margin_parent.parentNode.classList.add('ended');
  sidelines_parent.classList.add('ended');
  sidelines_parent.parentNode.classList.add('ended');

  end_parent.classList.add('active');
  window.setTimeout(() => {
    end_parent.classList.remove('pending');
  }, 100); // 2 * period space = 3000

  let resolution = document.getElementById('story-resolution');
  resolution.innerHTML = `“Mantar” is a story in ${stories.length} interlocking parts. You just read ${state.history.sequence.length} of them.`;

  let edition_number = document.getElementById('story-title-box');
  edition_number.innerHTML = `${path_index} / ${paths.length}`;

  let story_header = document.getElementById('story-header');
  let typeface_header = document.getElementById('typeface-header');
  let sc = random_color();
  let tc = random_color();

  story_header.style.color = `rgb(${sc.r * 255}, ${sc.g * 255}, ${sc.b * 255})`;
  typeface_header.style.color = `rgb(${tc.r * 255}, ${tc.g * 255}, ${tc.b * 255})`;

  document.onwheel = null;
}

let fonts = [
	new FontFaceObserver("Mantar", { weight: 280, style: 'normal' }).load(),
	new FontFaceObserver("Mantar", { weight: 300, style: 'normal' }).load(),
	new FontFaceObserver("Mantar", { weight: 400, style: 'normal' }).load(),
	new FontFaceObserver("Mantar", { weight: 700, style: 'normal' }).load(),
	new FontFaceObserver("Mantar", { weight: 800, style: 'normal' }).load(),
	new FontFaceObserver("Mantar", { weight: 900, style: 'normal' }).load(),
	new FontFaceObserver("Mantar", { weight: 280, style: 'italic' }).load(),
	new FontFaceObserver("Mantar", { weight: 300, style: 'italic' }).load(),
	new FontFaceObserver("Mantar", { weight: 400, style: 'italic' }).load(),
	new FontFaceObserver("Mantar", { weight: 700, style: 'italic' }).load(),
	new FontFaceObserver("Mantar", { weight: 800, style: 'italic' }).load(),
	new FontFaceObserver("Mantar", { weight: 900, style: 'italic' }).load()
];

Promise.all(fonts).then(() => {
	render_frame(state, 'start');
})

function if_esc(f)
{
	return event => {
		if (event.key == 'Escape') { f(event); }
	}
}

function render_resume_story(previous_id)
{
	let previous_speed = state.timing.base;
	return event => {
		if (!state.transitioning)
		{
			specimen_toggle.classList.add('moving');
			specimen_toggle.ontransitionend = specimen_toggle_classes;

			state.story.current = previous_id;
			state.timing.base = 1;

			render_frame(state, 'esc', true, function() {
				state.timing.base = previous_speed;
				// specimen_toggle.classList.remove('active');
				// specimen_toggle.classList.remove('moving');
				specimen_toggle.onclick = render_specimen;
				window.onkeyup = if_esc(render_specimen);
			});
		}
	}
}

function render_specimen()
{
	if (!state.transitioning) {
		let previous_id = state.story.current;
		specimen_toggle.classList.add('moving');
		specimen_toggle.ontransitionend = specimen_toggle_classes;


		state.story.current = SPECIMEN_BASE_STORY_ID;
		render_frame(state, 'esc', true);

		specimen_toggle.onclick = render_resume_story(previous_id);
	}
}

function specimen_toggle_classes () {
	if (specimen_toggle.classList.contains('active'))
	{
		console.log('toggling to &');
		specimen_toggle.innerText = '&';
	}
	else
	{
		console.log('toggling to ⁂');
		specimen_toggle.innerText = '⁂';
	}

	specimen_toggle.classList.toggle('active');
	specimen_toggle.classList.remove('moving');
	specimen_toggle.ontransitionend = null;
}

specimen_toggle.onclick = render_specimen;



// mobile event handlers
let touch_queue = [];

window.ontouchstart = event => {
	console.log('touch start');
	let coordinates = Array.from(event.touches).map(t => [t.pageX, t.pageY]);
	touch_queue = touch_queue.concat(coordinates);
};

window.ontouchmove = event => {
	// console.log('touch move');
	let coordinates = Array.from(event.touches).map(t => [t.pageX, t.pageY]);
	touch_queue = touch_queue.concat(coordinates);

	let prev = touch_queue[touch_queue.length - 2];
	let curr = touch_queue[touch_queue.length - 1];

	if (
		typeof prev !== 'undefined' &&
		typeof curr !== 'undefined' &&
		!state.transitioning
	) {
		let dY = - (curr[1] - prev[1]);
		document.onwheel({deltaY: dY});
	}
};

window.ontouchend = event => {
	console.log('touch end');
	touch_queue = [];
};

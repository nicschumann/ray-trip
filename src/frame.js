require('./main.css');
const stories = require( './stories.js');
const paths = require('./paths.js');
import {fit2d_binsearch} from './fit2d.js';
const INITIAL_STORY_ID = require('./initial.js');

console.log(paths);

let acc = 0;
let base = 65;
let padding = 2750;
let timers = []


const default_animation = {
  state: 0,
  upper_limit: 10,
  lower_limit: -30,

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

const standard_transition_function = (data, story,  i) => {

  let offset = story.animations.in.offset(i);

  let timer = window.setTimeout(() => {
    data.element.classList.remove('pending');
  }, (i == 0) ? 0 : acc + base + offset + data.offset);

  acc += base + offset + data.offset;

  return timer;
}




// const trippy_transition_function = (data, story, i) => {
//
//   let offset = (i % 3 == 0) ? 0 : 20;
//   let random_timing = Math.random();
//
//   let timer = window.setTimeout(() => {
//     // random angle:
//     // let angle = Math.floor(Math.random() * 360);
//     // data.element.setAttribute('style', `transform:rotate(${angle}deg);`);
//
//     data.element.classList.remove('pending');
//   }, (i == 0) ? 0 : 25 * random_timing + acc + offset);
//
//   acc += base * random_timing * offset + random_timing + data.offset;
//
//   return timer;
// }


/**
 * Up/Down Transitions
 */

function do_transition_for_mousewheel(story, state)
{
  return event => {
    console.log(event.deltaY)
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
        blur_to_prev_state_2(event, story, state);
      }

      if (
        story.animations.state > story.animations.upper_limit &&
        story.transitions.next.length > 0
      ) {
        window.clearInterval(state.ambient_interval);
        document.onwheel = null;
        let next_story = random_story_id(story.transitions.next);
        state.story.current = next_story;
        render_frame(state, 'down');
      }

      if (
        story.animations.state < story.animations.lower_limit &&
        story.transitions.prev.length > 0
      ) {
        window.clearInterval(state.ambient_interval);
        document.onwheel = null;
        let prev_story = random_story_id(story.transitions.prev);
        state.story.current = prev_story;
        render_frame(state, 'up');
      }

      if (
        (story.animations.state < story.animations.lower_limit ||
         story.animations.state > story.animations.upper_limit) &&
         story.transitions.prev.length == 0 &&
         story.transitions.next.length == 0
      ) {
        render_end(state, history);
      }
    }
  };
}

/**
 * Ups
 */

const get_function = (animations, channel, axis) =>
{
  return (typeof animations[channel] !== 'undefined' && typeof animations[channel][axis] !== 'undefined') ?
          animations[channel][axis] :
          () => 0;
}

const blur_to_prev_state = (event, story, state) => {
  let t = story.animations.state;


  let bs = document.getElementsByClassName('b-channel');

  if (typeof story.animations.up.r !== 'undefined')
  {
    let color = {
      top: get_function(story.animations.up, 'r', 'top'),
      left: get_function(story.animations.up, 'r', 'left')
    }

    let rs = document.getElementsByClassName('r-channel');

    Array.from(rs).forEach(el => el.setAttribute('style', `transition:all 2ms;top:${color.top(t)}px;left:${color.left(t)}px;`));
  }

  if (typeof story.animations.up.g !== 'undefined')
  {
    let color = {
      top: get_function(story.animations.up, 'g', 'top'),
      left: get_function(story.animations.up, 'g', 'left')
    }

    let gs = document.getElementsByClassName('g-channel');

    Array.from(gs).forEach(el => el.setAttribute('style', `transition:all 2ms;top:${color.top(t)}px;left:${color.left(t)}px;`));
  }

  if (typeof story.animations.up.b !== 'undefined')
  {
    let color = {
      top: get_function(story.animations.up, 'b', 'top'),
      left: get_function(story.animations.up, 'b', 'left')
    }

    let bs = document.getElementsByClassName('b-channel');

    Array.from(bs).forEach(el => el.setAttribute('style', `transition:all 2ms;top:${color.top(t)}px;left:${color.left(t)}px;`));
  }




  // quasi-sane version
  let r = t => t * Math.sin(t) / 18;
  let b = t => t * Math.cos(-t) / 18;

  // bonkers version
  // let r = t => t * Math.sin(Math.random() * t) / 20;
  // let b = t => t * Math.cos(Math.random() * -t) / 20;


  Array.from(bs).forEach(el => el.setAttribute('style', `transition:all 2ms;top:${r(t)}px;left:${b(t)}px;`));
};


 /**
  * Downs
  */

const blur_to_prev_state_2 = (event, story, state) => {
  let t = story.animations.state;
  let parent = state.story.stage.container;
  let words = document.getElementsByClassName('word');

  let bl = story.animations.down.blur(Math.abs(t));
  let op = story.animations.down.opacity(Math.abs(t));

  Array.from(words).forEach(el => {
    el.style.transform = `matrix(1, ${t/100 + Math.random() / 10}, ${-t/100 + Math.random() / 10}, 1, 0, 0)`;
    el.style.transition = `all 2ms`;
    el.style.opacity = op * 2;
    // el.style.filter = `blur(${bl / 2}px)`;
  });

  // parent.style.transform = `matrix(1, ${t/100}, ${t/100}, 1, 0, 0)`;
  // parent.style.transition = `all 2ms`;
  // parent.style.opacity = op * 5;
  // parent.style.filter = `blur(${bl / 2}px)`;
};

const reset_state =  (event, story, state) =>
{
  let t = story.animations.state;
  let parent = state.story.stage.container;
  let words = document.getElementsByClassName('word');


  parent.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
  parent.style.transition = `all 2ms`;
  parent.style.opacity = '1';
  parent.style.filter = `none`;

  Array.from(words).forEach(el => {
    el.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
    // el.setAttribute('style', `transition:all 2ms; opacity:${op(t)};filter:blur(${bl(t)}px);`
    el.style.transition = `all 2ms`;
    el.style.opacity = '1';
    el.style.filter = `none`;
  });
}

const blur_to_next_state = (event, story, state) => {
  let t = story.animations.state;

  let words = document.getElementsByClassName('word');

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


const glyph_snow = () => {
  let glyphs = ['$', '&', '*', '@', '#', '%'];

  let span = document.createElement('span');
  span.classList.add('word');
  span.classList.add('ambient');

  span.style.position = 'absolute';
  span.style.left = `${Math.random() * window.innerWidth}px`;
  span.style.top = `${Math.random() * window.innerHeight}px`;

  span.style.fontSize = `18px`;
  let c = random_color();
  span.style.color = `rgb(${c.r * 255}, ${c.g * 255}, ${c.b * 255})`

  span.style.transform = `rotate(${Math.random()*360}deg)`;
  span.innerHTML = glyphs[Math.floor(Math.random() * glyphs.length)];

  return span;
};


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

function story_from_id(id)
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

let history = {
  frames: {},
  sequence: []
};

let state = {
  story: {
    stage: {
      container: document.getElementById('story-container')
    },
    current: INITIAL_STORY_ID
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
  timers: []
};


/*
 * Forward Transitions:
 *  1. Choose next text
 *  2. Preprocess text so that words can be individuallu manipulated
 *  3. Determine text box size based on window width, height, and text length,
 *  4. Transition text in with a custom transition function.
 */

function make_channel_data(word, offset, color={})
{

  let element = document.createElement('span');
  element.classList.add('word');
  element.classList.add('channeled-word');
  element.classList.add('pending');

  element.setAttribute('content', word + '&nbsp;');

  element.innerHTML = word + '&nbsp;';

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

  return {element, offset};
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
      if (i == 0 && j == 0) { word = split_subword[0]; }
      else if (j > 0) {
        // we split out a '#', do a lookup.
        let id = split_subword[j]
        if (
          typeof data.definitions !== 'undefined' &&
          typeof data.definitions[id] !== 'undefined'
        ) {
          lookups.push(data.definitions[id]);
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

function preprocess_text_as_RGB_words(data)
{
  let words = data.text.split(' ').filter(word => word.length > 0);
  let text = [];
  let marginalia = [];
  let sidelines = [];
  let offset = 0;

  words.forEach((word, i) => {


    let parse = extract_control_words(word, data);
    word = parse.word;

    // deal with timing marks
    if (word == '*') {
      offset = 600;
    }
    else if (
      word.indexOf('*') == 0 &&
      Number.isInteger(+word.slice(1))
    ) {
      offset = +word.slice(1);
    }

    // deal with content
    else
    {
      let element_data = make_channel_data(word, offset);

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
      if (parse.controls.trim)
      {
        console.log('do trim');
        console.log(element_data.element.innerHTML);
        let idx = element_data.element.innerHTML.indexOf('&nbsp;');
        element_data.element.innerHTML = element_data.element.innerHTML.slice(0, idx);
      }

      offset = 0;
      text.push(element_data);
    }
  });

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


function render_frame(state, direction)
{
  let data = story_from_id(state.story.current);

  history.sequence.push({id: state.story.current, direction})
  history.frames[data.id] = {index: history.sequence.length - 1};

  console.log(history);

  state.transitioning = true;
  data.animations.state = 0;

  let story_parent = state.story.stage.container;
  let margin_parent = state.marginalia.stage.container;
  let sidelines_parent = state.sidelines.stage.container;
  let indicator = document.getElementById('state-indicator');

  if (data.transitions.next.length > 0 && data.transitions.prev.length > 0)
  {
    indicator.innerText = '↑↓';
  }
  else if (data.transitions.next.length > 0)
  {
    indicator.innerText = '↓';
  }
  else if (data.transitions.prev.length > 0)
  {
    indicator.innerText = '↑';
  }


  // comment this for a palimpsest effect...
  let parent_test_span = document.createElement('span');
  indicator.classList.remove('active');
  indicator.classList.remove('done');
  story_parent.setAttribute('style', '');
  story_parent.parentNode.setAttribute('style', '');

  if (typeof data.font !== 'undefined')
  {
    if (typeof data.font.family !== 'undefined')
    {
      story_parent.style.fontFamily = `${data.font.family}`;
    }

    story_parent.style.fontWeight = `${data.font.weight}`;
    story_parent.style.lineHeight = `${data.font.leading}em`;
  }

  if (
    typeof data.font !== 'undefined' &&
    typeof data.font.size !== 'undefined' &&
    data.font.centered
  ) {
    story_parent.style.position = 'absolute';
    story_parent.style.top = '50%';
    story_parent.style.transform = 'translateY(-50%)';
    story_parent.style.textAlign = 'center';
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
  let {text, marginalia, sidelines} = preprocess_text_as_RGB_words(data);

  text.forEach((d, i, a) => {
    story_parent.appendChild(d.element);
  });

  // fit text to content.
  if (
    typeof data.font !== 'undefined' &&
    typeof data.font.size !== 'undefined'
  ) {
    story_parent.style.fontSize = `${data.font.size}px`;
  }
  else
  {
    fit2d_binsearch(story_parent, 1);
  }


  marginalia.forEach((d, i, a) => {
    margin_parent.appendChild(d.element);
  });

  sidelines.forEach((d, i, a) => {
    sidelines_parent.appendChild(d.element);
  });

  text.forEach((d, i, a) => {
    let timer = standard_transition_function(d, data, i, a);
    // timers.push({timer, fn: () => {data.animations.in(d, data, 0, a)}});
  });

  marginalia.forEach((d, i, a) => {
    let timer = standard_transition_function(d, data, i + text.length, a);
    // timers.push({timer, fn: () => {data.animations.in(d, data, 0, a)}});
  })

  sidelines.reverse().forEach((d, i, a) => {
    let timer = standard_transition_function(d, data, i + text.length, a);
    // timers.push({timer, fn: () => {data.animations.in(d, data, 0, a)}});
  });


  let timer = window.setTimeout(() => {
    state.transitioning = false;

    indicator.classList.add('active');

    window.setTimeout(() => {
      indicator.classList.add('done');
    }, 250)


    if (typeof data.animations.ambient !== 'undefined')
    {
      state.ambient_interval = window.setInterval(() => {
        if (data.animations.state == 0)
        {
          let span = data.animations.ambient();
          story_parent.appendChild(span);
        }
      }, 250);
    }

    document.onwheel = do_transition_for_mousewheel(data, state);
    timers = [];
  }, acc + padding);


  acc = 0;
}

function render_end(state) {
  let story_parent = state.story.stage.container;
  let margin_parent = state.marginalia.stage.container;
  let sidelines_parent = state.sidelines.stage.container;
  let end_parent = state.end.stage.container;
  let path_index = get_path_index(history.sequence) + 1;

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
  resolution.innerHTML = `“Mantar” is a story in ${stories.length} interlocking parts. You just read ${history.sequence.length} of them.`;

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


render_frame(state, INITIAL_STORY_ID);
// render_end(state);

let timer_id = null;
const ro = new ResizeObserver(entries => {
  window.clearTimeout(timer_id);
  timer_id = window.setTimeout(() => {
    var story = story_from_id(state.story.current);
    if (
      typeof story.font == 'undefined' ||
      typeof story.font.size === 'undefined'
    ) {
      fit2d_binsearch(state.story.stage.container, 1);
    }
  }, 100);
});

ro.observe(document.querySelector('#story-container').parentNode);

// uncomment this for a janky transition function
// we might need to do some book-keeping to clear the timers.
// document.addEventListener('click', () => {
//   let words = document.getElementsByClassName('word');
//
//   Array.from(words).forEach((el, i) => {
//     window.setTimeout(() => {
//       el.classList.remove('pending');
//     }, i * 3);
//   });
//
//   state.transitioning = false;
//   let indicator = document.getElementById('state-indicator');
//   indicator.classList.add('active');
//   window.setTimeout(() => {
//     indicator.classList.add('done');
//   }, 250);
//   let data = story_from_id(state.story.current);
//   document.onwheel = do_transition_for_mousewheel(data, state);
//   timers = [];
// });


function toggle_specimen_frame()
{
  let specimen = document.getElementById('specimen-frame');
  let specimen_toggle = document.getElementById('specimen-toggle');
  let story_frame = document.getElementById('story-stage');

  if (specimen.classList.contains('active'))
  {
    let data = story_from_id(state.story.current);
    document.onwheel = do_transition_for_mousewheel(data, state)
  }
  else
  {
    document.onwheel = null;
  }

  specimen.classList.toggle('active');
  specimen_toggle.classList.toggle('active');
  story_frame.classList.toggle('deactivated');
}

let specimen_toggle = document.getElementById('specimen-toggle');
specimen_toggle.addEventListener('click', toggle_specimen_frame);

window.addEventListener('keyup', event => {
  if (event.key == 'Escape')
  {
    toggle_specimen_frame();
  }
})

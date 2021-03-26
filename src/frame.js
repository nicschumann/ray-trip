require('./main.css');
import stories from './stories.js';
import {fit2d_binsearch} from './fit2d.js';
import INITIAL_STORY_ID from './initial.js';

let acc = 0;
let base = 35;
let padding = 1000;
let timers = []


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
    if (!state.transitioning)
    {
      story.animations.state += event.deltaY / 6;

      if (story.animations.state > 0)
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
        document.onmousewheel = null;

        let next_story = random_story_id(story.transitions.next);
        state.story.current = next_story;
        render_text(state);
      }

      if (
        story.animations.state < story.animations.lower_limit &&
        story.transitions.prev.length > 0
      ) {
        window.clearInterval(state.ambient_interval);
        document.onmousewheel = null;

        let prev_story = random_story_id(story.transitions.prev);
        state.story.current = prev_story;
        render_text(state);
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
  return story_ids[Math.floor(Math.random() * story_ids.length)];
}

function story_from_id(id)
{
  let story_index = story_lookup[id];
  console.log(id, story_index);
  return stories[story_index];
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
    {r: 1, g: 1, b: 1},
    {r: 0.92, g: 0, b: 0.54},
    {r: 0.149, g: 0.66, b: 0.878},
    {r: 0.254, g: 1, b: 0.956},
    {r: 1, g: 0.945, b: 0}
  ]
  return choices[Math.floor(Math.random() * choices.length)];
}

let story_lookup = stories_to_lookup_table(stories);

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

  let static_channel = document.createElement('span');
  static_channel.classList.add('static-channel');
  static_channel.innerHTML = word + '&nbsp;';
  element.append(static_channel);

  let r_channel = document.createElement('span');
  r_channel.classList.add('channel');
  r_channel.classList.add('r-channel');
  r_channel.innerHTML = word + '&nbsp;';
  if (typeof color.r !== 'undefined') { r_channel.setAttribute('style', `opacity:${color.r};`); }
  element.append(r_channel);

  let g_channel = document.createElement('span');
  g_channel.classList.add('channel');
  g_channel.classList.add('g-channel');
  g_channel.innerHTML = word + '&nbsp;';
  if (typeof color.g !== 'undefined') { g_channel.setAttribute('style', `opacity:${color.g};`); }
  element.append(g_channel);

  let b_channel = document.createElement('span');
  b_channel.classList.add('channel');
  b_channel.classList.add('b-channel');
  b_channel.innerHTML = word + '&nbsp;';
  if (typeof color.b !== 'undefined') { b_channel.setAttribute('style', `opacity:${color.b};`); }
  element.append(b_channel);

  return {element, offset};
}



function preprocess_text_as_RGB_words(data)
{
  let words = data.text.split(' ').filter(word => word.length > 0);
  let text = [];
  let marginalia = [];
  let sidelines = [];
  let offset = 0;

  words.forEach((word, i) => {
    if (word == '*') {
      offset = 600;
    }
    else if ( word.indexOf('*') == 0 && Number.isInteger(+word.slice(1)))
    {
      offset = +word.slice(1);
    }
    else
    {
      let data = make_channel_data(word, offset);
      offset = 0;
      text.push(data);
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


function render_text(state)
{
  let data = story_from_id(state.story.current);
  state.transitioning = true;
  data.animations.state = 0;

  let story_parent = state.story.stage.container;
  let margin_parent = state.marginalia.stage.container;
  let sidelines_parent = state.sidelines.stage.container;

  // comment this for a palimpsest effect...
  let parent_test_span = document.createElement('span');
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
    console.log('triggerd size')
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

    document.onmousewheel = do_transition_for_mousewheel(data, state);
    timers = [];
  }, acc + padding);


  acc = 0;
}


render_text(state);

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

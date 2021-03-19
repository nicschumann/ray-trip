require('./main.css');

let acc = 0;
let base = 35;
let padding = 1000;


/**
 * transitions
 */

const standard_transition_function = (data, story,  i) => {

  let offset = (i % 3 == 0) ? 0 : 100;

  window.setTimeout(() => {
    data.element.classList.remove('pending');
  }, acc + base + offset + data.offset);

  acc += base + offset + data.offset;
}

const trippy_transition_function = (data, story, i) => {

  let offset = (i % 3 == 0) ? 0 : 20;
  let random_timing = Math.random();

  window.setTimeout(() => {
    // random angle:
    // let angle = Math.floor(Math.random() * 360);
    // data.element.setAttribute('style', `transform:rotate(${angle}deg);`);

    data.element.classList.remove('pending');
  }, 25 * random_timing + acc + offset);

  acc += base * random_timing * offset + random_timing + data.offset;
}


/**
 * Up/Down Transitions
 */

function do_transition_for_mousewheel(story, state)
{
  return event => {
    if (!state.transitioning)
    {
      story.animations.state += event.deltaY;

      if (story.animations.state > 0)
      {
        story.animations.down(event, story, state);
      }
      else if (story.animations.state < 0)
      {
        story.animations.up(event, story, state);
      }

      if (
        story.animations.state > story.animations.upper_limit &&
        story.transitions.next.length > 0
      ) {
        document.onmousewheel = null;
        let next_story = random_story(story.transitions.next);
        render_text(next_story, state);
      }

      if (
        story.animations.state < story.animations.lower_limit &&
        story.transitions.prev.length > 0
      ) {
        document.onmousewheel = null;
        let prev_story = random_story(story.transitions.prev);
        render_text(prev_story, state);
      }
    }
  };
}

/**
 * Ups
 */

const blur_to_prev_state = (event, story, state) => {
  let t = story.animations.state;

  let rs = document.getElementsByClassName('r-channel');
  let bs = document.getElementsByClassName('b-channel');

  // quasi-sane version
  let r = t => t * Math.sin(t) / 18;
  let b = t => t * Math.cos(-t) / 18;

  // bonkers version
  // let r = t => t * Math.sin(Math.random() * t) / 20;
  // let b = t => t * Math.cos(Math.random() * -t) / 20;

  Array.from(rs).forEach(el => el.setAttribute('style', `transition:all 2ms;top:${b(t)}px;left:${r(t)}px;`));
  Array.from(bs).forEach(el => el.setAttribute('style', `transition:all 2ms;top:${r(t)}px;left:${b(t)}px;`));
};


 /**
  * Downs
  */

const blur_to_next_state = (event, story, state) => {
  let t = story.animations.state;

  let words = document.getElementsByClassName('word');

  // normal version
  let bl = t => Math.exp(t / 20);
  let op = t => -1 / (55 / 4) * t + 1;

  // bonkers version
  // let bl = t => Math.exp(Math.random() * t / 20);
  // let op = t => -1 / (55 / 4) * bl(t) + 1;

  console.log(`blur: ${bl(t)}px, op: ${op(t)}`);

  Array.from(words).forEach(el => el.setAttribute('style', `transition:all 2ms; opacity:${op(t)};filter:blur(${bl(t)}px);`));
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

function random_story(story_ids)
{
  let index = Math.floor(Math.random() * story_ids.length);
  let story_id = story_ids[index];
  let story_index = story_lookup[story_id];
  return stories[story_index];
}

const stories = [
  {
    id: 'desk',
    text: `When my desk is empty, my mind is empty. * When my desk is full, my mind is – * * not full, but chaotic.`,
    marginalia: [],

    animations: {
      state: 0,
      upper_limit: 80,
      lower_limit: -100,

      in: standard_transition_function,
      up: blur_to_prev_state,
      down: blur_to_next_state,
      ambient: () => {},
    },

    transitions: {
      next: ['joshua-clover'],
      prev: []
    }
  },
  {
    id: 'joshua-clover',
    text: `In 2015, *400 Joshua Clover wrote "Once fire is the form of the spectacle the problem *750 / becomes how to set fire to fire."`,
    marginalia: [],

    animations: {
      state: 0,
      upper_limit: 80,
      lower_limit: -100,

      in: standard_transition_function,
      up: blur_to_prev_state,
      down: blur_to_next_state,
      ambient: () => {},
    },

    transitions: {
      next: [],
      prev: ['desk']
    }
  },
]

let story_lookup = stories_to_lookup_table(stories);

let state = {
  story: {
    stage: {
      container: document.getElementById('story-container'),
      blur: 0.3,
      opacity: 1
    }
  }
};


/*
 * Forward Transitions:
 *  1. Choose next text
 *  2. Preprocess text so that words can be individuallu manipulated
 *  3. Determine text box size based on window width, height, and text length,
 *  4. Transition text in with a custom transition function.
 */



function preprocess_text_as_words(data)
{
  let words = data.text.split(' ').filter(word => word.length > 0);
  let spans = [];
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
      let element = document.createElement('span');

      element.classList.add('word');
      element.classList.add('pending')
      element.innerHTML = word + '&nbsp;';

      let data = {element, offset};

      offset = 0;
      spans.push(data);
    }
  });

  return spans;
}

function preprocess_text_as_words_with_color_channels(data)
{
  let words = data.text.split(' ').filter(word => word.length > 0);
  let spans = [];
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
      element.append(r_channel);

      let g_channel = document.createElement('span');
      g_channel.classList.add('channel');
      g_channel.classList.add('g-channel');
      g_channel.innerHTML = word + '&nbsp;';
      element.append(g_channel);

      let b_channel = document.createElement('span');
      b_channel.classList.add('channel');
      b_channel.classList.add('b-channel');
      b_channel.innerHTML = word + '&nbsp;';
      element.append(b_channel);

      let data = {element, offset};

      offset = 0;
      spans.push(data);
    }
  });

  return spans;
}





function render_text( data, state )
{
  state.transitioning = true;
  state.story.stage.blur = 0.3;
  state.story.stage.opacity = 1;
  data.animations.state = 0;

  let parent = state.story.stage.container;
  parent.innerHTML = '';
  parent.setAttribute('style', `opacity:${state.story.stage.opacity}; filter:blur(${state.story.stage.blur}px);`)

  // (optionally) add a process to precompile rests and stops into the data.
  let elements = preprocess_text_as_words_with_color_channels(data);

  elements.forEach((d, i, a) => {
    parent.appendChild(d.element);
    data.animations.in(d, data, i, a);
  });

  window.setTimeout(() => {
    state.transitioning = false;
    console.log('done transitioning')
    document.onmousewheel = do_transition_for_mousewheel(data, state);
  }, acc + padding)

  acc = 0;
}


render_text(stories[0], state);

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
      console.log(story.animations.state);

      if (story.animations.state > 0)
      {
        story.animations.down(event, story, state);
      }
      else if (story.state < 0)
      {
        story.animations.up(event, story, state);
      }

      if (story.animations.state > story.animations.upper_limit) {
        document.onmousewheel = null;
        render_text(stories[1], state);
      }

      if (story.animations.state < story.animations.lower_limit) {
        document.onmousewheel = null;
        render_text(stories[1], state);
      }
    }
  };
}

/**
 * Ups
 */


 /**
  * Downs
  */

const blur_to_next_state = (event, story, state) => {
  let parent = document.getElementById('story-container');

  const max_blur = 40;
  let blur = state.story.stage.blur;
  blur += (event.deltaY > 0) ? 1.0 / (blur + 0.5) : -1.0 / (blur + 0.5);
  blur = Math.max(Math.min(blur, max_blur), 0);
  state.story.stage.blur = blur;

  state.story.stage.opacity = -1 / (max_blur / 4) * blur + 1;

  parent.setAttribute('style', `opacity:${state.story.stage.opacity}; filter:blur(${state.story.stage.blur}px);`)
};


/**
 * Texts
 */

const stories = [
  {
    text: `When my desk is empty, my mind is empty. * When my desk is full, my mind is – * * not full, but chaotic. * Lately, I've been thinking a lot about the value of maintenance. * * There's an often-cited fact, which says that every 7 years, you regrow all of your skin? * * The turnover rate of your human shell is 7 years. * The average lifespan of a building a metropolitan area in the global north is 30 years. * * What is the turnover rate of the whole city?`,
    marginalia: [],

    animations: {
      state: 0,
      upper_limit: 100,
      lower_limit: -100,

      in: standard_transition_function,
      up: () => {},
      down: blur_to_next_state,
      ambient: () => {},
    },

    transitions: {

    }
  },
  {
    text: `In 2015, *400 Joshua Clover wrote "Once fire is the form of the spectacle the problem *750 / becomes how to set fire to fire." * * This has stuck with me, since when I first read it by the lake, in the garden in LA. * * * When Trump was elected, my friend wrote me "get on signal", and then "should I learn to shoot a gun?" * * It's 2021, and you can now purchase California Water Futures. * * The problem with how to set fire to fire is we are running out of water for both.`,
    marginalia: [],

    animations: {
      state: 0,
      upper_limit: 100,
      lower_limit: -100,

      in: standard_transition_function,
      up: () => {},
      down: blur_to_next_state,
      ambient: () => {},
    },

    transitions: {

    }
  },
]

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

require('./main.css');

let acc = 0;
let base = 25;
let padding = 1000;

const standard_transition_function = (element, i) => {

  let offset = (i % 3 == 0) ? 0 : 100;

  window.setTimeout(() => {
    element.classList.remove('pending');
  }, acc + base + offset);

  acc += base + offset;
}


const trippy_transition_function = (element, i) => {

  let offset = (i % 3 == 0) ? 0 : 20;
  let random_timing = Math.random();

  window.setTimeout(() => {
    // random angle:
    // let angle = Math.floor(Math.random() * 360);
    // element.setAttribute('style', `transform:rotate(${angle}deg);`);

    element.classList.remove('pending');
  }, 25 * random_timing + acc + offset);

  acc += base * random_timing * offset + random_timing;
}



const texts = [
  {
    text: `When my desk is empty, my mind is empty. When my desk is full, my mind is – not full, but chaotic. Lately, I've been thinking a lot about the value of maintenance. There's an often-cited fact, which says that every 7 years, you regrow all of your skin? The turnover rate of your human shell is 7 years. The average lifespan of a building a metropolitan area in the global north is 30 years. What is the turnover rate of the whole city?`,
    transition: standard_transition_function,
  },
  {
    text: `In 2015, Joshua Clover wrote "Once fire is the form of the spectacle the problem / becomes how to set fire to fire." This has stuck with me, since when I first read it by the lake, in the garden in LA. When Trump was elected, my friend wrote me "get on signal", and then "should I learn to shoot a gun?" It's 2021, and you can now purchase California Water Futures. The problem with how to set fire to fire is we are running out of water for both.`,
    transition: standard_transition_function,
  },
]

let state = {
  story: {
    stage: {
      blur: 0.3,
      opacity: 1
    }
  }
}


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
  let spans = words.map(word => {
    let span = document.createElement('span')

    span.classList.add('word');
    span.classList.add('pending')
    span.innerHTML = word + '&nbsp;';

    return span;
  });

  return spans;
}


function render_text( data, state )
{
  state.transitioning = true;
  state.story.stage.blur = 0.3;
  state.story.stage.opacity = 1;
  let parent = document.getElementById('story-container');
  parent.innerHTML = '';
  parent.setAttribute('style', `opacity:${state.story.stage.opacity}; filter:blur(${state.story.stage.blur}px);`)

  let elements = preprocess_text_as_words(data);

  elements.forEach((e, i, a) => {
    parent.appendChild(e);
    data.transition(e, i, a);
  });

  console.log(acc);
  window.setTimeout(() => {
    state.transitioning = false;
    console.log('done transitioning')
    document.onmousewheel = scroll_to_next_state;
  }, acc + padding)

  acc = 0;
}


render_text(texts[0], state);




//
// document.addEventListener("mousewheel", event => {
//   let words = document.getElementsByClassName('word');
//
//   // if (event.deltaY > 0)
//   // {
//   //   blur += 1.0 / (blur + 0.5);
//   // }
//   // else
//   // {
//   //   blur -= 1.0 / (blur + 0.5);
//   // }
//
//   // blur = Math.max(Math.min(blur, 100), 0);
//
//   scale += 10;
//
//   console.log(words);
//
//   Array.from(words).forEach((el, i) => {
//     el.setAttribute('style', `transform:translateZ(${scale}px);`);
//   });
//
//
//   //
//   // filter:blur(${blur}px);
//   // console.log(event);
// })

const scroll_to_next_state = event => {
  if (!state.transitioning)
  {
    let parent = document.getElementById('story-container');
    const max_blur = 40;

    let blur = state.story.stage.blur;
    blur += (event.deltaY > 0) ? 1.0 / (blur + 0.5) : -1.0 / (blur + 0.5);
    blur = Math.max(Math.min(blur, max_blur), 0);
    state.story.stage.blur = blur;

    state.story.stage.opacity = -1 / (max_blur / 4) * blur + 1;

    parent.setAttribute('style', `opacity:${state.story.stage.opacity}; filter:blur(${state.story.stage.blur}px);`)


    // console.log(opacity);
    if (state.story.stage.opacity < 0) {
      document.onmousewheel = null;
      render_text(texts[1], state);
    }
  }
};

document.onmousewheel = scroll_to_next_state

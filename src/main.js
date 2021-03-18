require('./main.css');

let acc = 0;


const standard_transition_function = (element, i) => {

  let offset = (i % 3 == 0) ? 0 : 100;

  window.setTimeout(() => {
    element.classList.remove('pending');
  }, i * 25 + acc + offset);

  acc += offset;
}


const trippy_transition_function = (element, i) => {

  let offset = (i % 3 == 0) ? 0 : 100;
  let random_timing = Math.random() * 50;

  window.setTimeout(() => {
    // random angle:
    // let angle = Math.floor(Math.random() * 360);
    // element.setAttribute('style', `transform:rotate(${angle}deg);`);

    element.classList.remove('pending');
  }, i * random_timing + acc + offset);

  acc += offset + random_timing;
}


let texts = [
  {
    text: `Paul Erdős talked about the Book that God keeps. In the Book, God records the most beautiful proofs of all mathematical theorems. Mathematicians often talk about beauty in proof. Einstein talked about feeling physics in his body, and I imagine that there are humans who feel mathematics in theirs. Me, I wonder what typeface God chose for the Book.`,
    transition: standard_transition_function
  }
]


/*
 * Forward Transitions:
 *  1. Choose next text
 *  2. Preprocess text so that words can be individuallu manipulated
 *  3. Determine text box size based on window width, height, and text length,
 *  4. Transition text in with a custom transition function.
 */



function preprocess_text_as_words(text)
{
  let words = text.split(" ").filter(word => word.length > 0);
  let spans = words.map(word => {
    let span = document.createElement('span')

    span.classList.add('word');
    span.classList.add('pending')
    span.innerHTML = word + '&nbsp;';

    return span;
  });

  return spans;
}


function render_text( data )
{
  let parent = document.getElementById('story-container');
  let elements = preprocess_text_as_words(data.text);

  elements.forEach((e, i, a) => {
    parent.appendChild(e);
    data.transition(e, i, a);
  });
}


render_text(texts[0]);


let blur = 0.3;
document.addEventListener("mousewheel", event => {
  let words = document.getElementById('story-container');
  if (event.deltaY > 0)
  {
    blur += 1.0 / (blur + 0.5);
  }
  else
  {
    blur -= 1.0 / (blur + 0.5);
  }

  blur = Math.max(Math.min(blur, 100), 0);


  words.setAttribute('style', `filter:blur(${blur}px);`);

  // console.log(event);
})

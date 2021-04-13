export const control_functions = {
	trim: data => {
		let idx = data.element.innerHTML.indexOf('&nbsp;');
		data.element.innerHTML = data.element.innerHTML.slice(0, idx);
	},

	log: data => {
		console.log(data.element.innerHTML);
	},

	flake: data => {
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

	  document.body.appendChild(span);
	},

	endframe: (data, story, state) => {
		state.transitioning = false;
		document.onwheel = do_transition_for_mousewheel(story, state);
		show_indicator();
	},

	drip: (data, story, state) => {
		state.sim.state.added_colors.push({data:{pos: {x: 0.65, y: 0.65}, dir: {x: 10, y: 20}}});
	}
}


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

export const animations = {
	glyph_snow: (data, state) => {
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

	  state.story.stage.container.appendChild(span);
	}
};

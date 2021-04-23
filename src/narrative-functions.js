function get_path_index(sequence, paths)
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

function make_link(el, href)
{
	let t = el.innerHTML;
	let space = false;
	if (t.slice(t.length - 6) == '&nbsp;') {
		t = t.slice(0, t.length - 6);
		space = true;
	}

	el.innerHTML = `<a target="_blank" href="${href}">${t}</a>${(space) ? '&nbsp' : ''}`;
}

export const control_functions = {
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

	drip: (data, story, state) => {
		state.sim.state.added_colors.push({data:{pos: {x: 0.65, y: 0.65}, dir: {x: 10, y: 20}}});
	},

	// inline links:
	lcontact: (data, story, state) => {
		make_link(data.element, 'https://occupantfonts.com/about#contact');
	},

	lpurchase: (data, story, state) => {
		make_link(data.element, 'https://store.typenetwork.com/foundry/occupant/fonts/mantar');
	},

	lmantar: (data, story, state) => {
		make_link(data.element, 'https://occupantfonts.com/fonts/mantar');
	},

	locc: (data, story, state) => {
		make_link(data.element, 'https://occupantfonts.com/');
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
	glyph_snow: (data, state, time) => {
		let seconds = 120;
		let steps = seconds * 1;
		if (time.step > steps) {
			let glyphs = "π?¿*⁂#฿₵¢₡¤$₫€ƒ₣₲₴₤₺₼₦₧₱₽₹£₸₮₩¥∞∫Ω∆∏∑∂µ%‰@&¶§©®℗™℅†‡№".split('');

			// let weights = [280, 300, 400, 700, 800, 900];
			// let weight = weights[Math.floor(Math.random() * weights.length)];
			let p = state.story.stage.container;
			let rect = p.getBoundingClientRect();
			console.log(rect);

		  let span = document.createElement('span');
		  span.classList.add('word');
		  span.classList.add('ambient');

		  span.style.position = 'absolute';
			// span.style.fontWeight = weight;
		  span.style.left = `${(Math.random() * window.innerWidth) - rect.x}px`;
		  span.style.top = `${(Math.random() * window.innerHeight) - rect.y}px`;

		  span.style.fontSize = `18px`;
		  let c = random_color();
		  span.style.color = `rgb(${c.r * 255}, ${c.g * 255}, ${c.b * 255})`

		  span.style.transform = `rotate(${Math.random()*360}deg)`;
		  span.innerHTML = glyphs[Math.floor(Math.random() * glyphs.length)];

		  state.story.stage.container.appendChild(span);
		}
	}
};

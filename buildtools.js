const fs = require('fs');
const path = require('path');
const util = require('util');
const esbuild = require('esbuild');
const solve_paths = require('./paths.js').paths;
const topsort = require('./paths.js').topsort;

const buildjs = async path => {
  console.log('changed', path);
  let s = Date.now();
  esbuild.build({
    entryPoints: ['src/main.js'],
    bundle: true,

    minify: false,
    sourcemap: true,

    // Load shaders as text for WebGL.
    loader: {
      '.vs': 'text',
      '.fs': 'text',
			'.svg': 'file',
			'.png': 'file',
      '.eot': 'file',
      '.woff': 'file',
			'.woff2': 'file',
      '.ttf': 'file'
    },

    platform: 'node',
    target: ['node10.4'],
    outfile: 'pub/bundle.js'

  })
  .then(() => {
    let e = Date.now();
    console.log(`No Errors. Build completed (${(e - s) / 1000}s).\n`);
  })
  .catch(() => {
    let e = Date.now();
    console.log(`Errors. Build failed (${(e - s) / 1000}s).\n`);
  });
};

const buildstories = async () => {
  const compile_path = './src/stories';
  const target_stories_path = './src/stories.js';
  const target_pathways_path = './src/paths.js';

  let src_lines = ['module.exports = ['];

  fs.readdir(compile_path, (err, files) => {
    files.forEach((file, i) => {
      if (file.indexOf('.js') == -1) { return; }
      let name = file.slice(0, file.indexOf('.js'));
      // add consistency checks.
      let require_path = '.' + path.sep + path.join(compile_path, file);
      let data = fs
        .readFileSync(require_path, 'utf8')
        .replace(/\r\n/g, '\n').split('\n')
        .filter(line => line !== '')
        .map(line => '  ' + line);

      if (i < files.length - 1)
      {
        data[data.length - 1] += ',';
      }

      src_lines = src_lines.concat(data);
    });

    src_lines.push('];');

    let stories = src_lines.join('\n');

    console.log('writing src/stories.js file.');
    fs.writeFileSync(target_stories_path, stories);

    // now, solve for paths on the stories
    // delete require cache entries, so we can actually rebuild.
    delete require.cache[require.resolve(target_stories_path)];
    delete require.cache[require.resolve('./src/initial.js')];
    delete require.cache[require.resolve('./src/final.js')];

    const story_data = require(target_stories_path);
    const initial = require('./src/initial.js');
    const final = require('./src/final.js')

    let paths = solve_paths(story_data, initial, final);

    console.log('writing src/paths.js file.');
    fs.writeFileSync(target_pathways_path, `module.exports = ${util.inspect(paths, {depth: null, maxArrayLength: null})};`);
    fs.writeFileSync(target_pathways_path, `module.exports = ${util.inspect(paths, {depth: null, maxArrayLength: null})};`);
  });
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
					typeof {}[id] !== 'undefined'
				){
					lookups.push({}[id]);
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

function clean(story) {
	let text = story.text.split(' ');

	let words = text.map(word => {
		if (word.indexOf('*') == 0) { return ''; }
		data = extract_control_words(word, story);
		let w = data.word;

		if (typeof data.controls.break !== 'undefined') { w = w + '<br/>'; }
		else if (typeof data.controls.trim == 'undefined') { w = w + ' '; }

		return w;
	});

	return words.join('');
}

const buildproof = () => {
  const target_stories_path = './src/stories.js';
  const target_proof_path = './pub/proof.html';

  delete require.cache[require.resolve(target_stories_path)];
  delete require.cache[require.resolve('./src/initial.js')];
  delete require.cache[require.resolve('./src/final.js')];

  const story_data = require(target_stories_path);
  const story_initial = require('./src/initial.js');
  const story_final = require('./src/final.js');
  const specimen_initial = 'specimen-i';

  let story_sort = topsort(story_data, story_initial, story_final);

  let story_text = story_sort.map(s => {
    return [
      `<h4>id: ${s.id}</h4>`,
      `<p>${clean(s)}</p>`,
    ].join("\n")
  });

	story_text = '<h1>Story</h1>' + story_text.join('\n\n');

	let specimen_sort = topsort(story_data, specimen_initial);

  let specimen_text = specimen_sort.map(s => {
    return [
			`<h4>id: ${s.id}</h4>`,
      `<p>${clean(s)}</p>`,
    ].join("\n")
  });

	specimen_text = '<h1>Specimen</h1>' + specimen_text.join('\n\n');

	fs.writeFileSync(target_proof_path, `${story_text}\n\n\n\n${specimen_text}`);
};

module.exports = {
  buildjs,
  buildstories,
  buildproof
}

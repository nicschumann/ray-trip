const fs = require('fs');
const path = require('path');
const util = require('util');
const esbuild = require('esbuild');
const solve_paths = require('./paths.js');

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
      '.eot': 'file',
      '.woff': 'file',
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
  });
}

module.exports = {
  buildjs,
  buildstories
}

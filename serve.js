const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');
const chokidar = require('chokidar');
const liveserver = require('live-server');

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
      '.woff': 'file'
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
  const target_path = './src/stories.js';

  let src_lines = ['export default ['];

  fs.readdir(compile_path, (err, files) => {
    files.forEach((file, i) => {
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

    fs.writeFileSync(target_path, stories);
  });
}





let src_watcher = chokidar.watch('src/**/*.*', {
  ignored: ["src/**/bundle*", "src/stories/**/*"],
  persistent: true
});

src_watcher.on('ready', async () => {
  buildjs('all');

  src_watcher.on('add', buildjs);
  src_watcher.on('change', buildjs);
});



let stories_watcher = chokidar.watch('src/stories/**/*', {
  persistent: true
});

stories_watcher.on('ready', async () => {
  buildstories();

  stories_watcher.on('add', buildstories);
  stories_watcher.on('change', buildstories);
  stories_watcher.on('unlink', buildstories);
})



liveserver.start({
  open: true,
  port: +process.env.PORT || 8080,
  root: "pub"
});

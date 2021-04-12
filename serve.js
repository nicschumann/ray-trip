const chokidar = require('chokidar');
const liveserver = require('live-server');
const {buildjs, buildstories} = require('./buildtools.js')






let src_watcher = chokidar.watch('src/**/*.*', {
  // ignore 'src/stories.js' because we're writing 'src/paths.js'
  // right afterward, and we don't need to double trigger
  ignored: ["src/**/bundle*", "src/stories/**/*", "src/stories.js"],
  persistent: true
});

src_watcher.on('ready', async () => {
  buildjs('all');

  src_watcher.on('add', buildjs);
  src_watcher.on('change', buildjs);
});



let stories_watcher = chokidar.watch(['src/stories/**/*', 'src/initial.js'], {
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
  host: '0.0.0.0',
  port: +process.env.PORT || 8080,
  root: "pub",
  logLevel: 0
});

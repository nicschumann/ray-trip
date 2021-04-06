const {buildjs, buildstories} = require('./buildtools.js');

const build = async () => {
  await buildjs("all");
  await buildstories();
};

build();

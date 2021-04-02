{
  id: 'zeitgeist',
  text: `The works capture the zeitgeist of 2018. Black backgrounds and type from the latest indie foundries. Sometimes stretched and distorted. Almost always dressed in metallic or reflective skins. The high definition media allows for thin and long serifs nailing the word into your memories. All of it is a fair reflection of the dystopian narratives shoved down our throats through news.`,
  marginalia: [
  ],
  sidelines: [
  ],

  font: {
    size: 36,
    leading: 1.1
  },

  animations: {
    state: 0,
    upper_limit: 10,
    lower_limit: -100,

    in: {
      offset: i => (i % 3 == 0) ? 0 : 100
    },
    up: {
      r: {
        top: t => t * Math.sin(t) / 18,
        left: t => t * Math.cos(-t) / 18
      },
      b: {
        top: t => t * Math.cos(-t) / 18,
        left: t => t * Math.sin(t) / 18
      }
    },
    down: {
      blur: t => Math.exp(t / 55),
      opacity: t => -1 / (55 / 4) * t + 1
    }
    // ambient: () => {},
  },

  transitions: {
    next: [],
    prev: []
  }
}

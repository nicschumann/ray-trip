{
  id: 'podcast-intro',
  text: `Is this thing recording? *750 ~ *750 ~ *750 ~ *1500 Alright, *350 so this is the first episode of my podcast, *500 and, *350 to be honest, *350 maybe the last. *1000 I've never recorded anything before, *350 so just bear with me *150 while I figure it out.`,
  marginalia: [
  ],
  sidelines: [
  ],

  font: {
    size: 36
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
    next: [{id: 'start'}],
    prev: []
  }
}

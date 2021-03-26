{
  id: 'high-part-one',
  text: `Blah blah blah`,
  marginalia: [
  ],
  sidelines: [
  ],

  font: {
    size: 36
  },

  animations: {
    state: 0,
    upper_limit: 40,
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

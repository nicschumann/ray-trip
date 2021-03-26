{
  id: 'twilight',
  text: `The light was between civil and nautical twilight. *1000 I knelt *150 to pick it up – *500 the translucent mushroom. *1000 The instinct to touch it overwhelmed me, *350 but my brainstem interrupted my muscles. *1500 Will it burn my skin? *1500 My eyes recognized the mushroom’s dim glow before I was able to process what was happening. *1000 I leaned in *350 and broke it off at the stem.`,
  marginalia: [
  ],
  sidelines: [
  ],

  font: {
    family: "Ray",
    size: 36,
    leading: 1.1
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
    next: ['velvety-cap'],
    prev: []
  }
}

{
  id: 'velvety-cap',
  text: `I took the mushroom out of my pocket. *750 I noticed how light it was; *450 the cap had a velvety feel to it. *1000 I placed it gently on top of my desk. *750 The glow was still there, *350 only it seemed a lot brighter — *500 or my room was darker. *1000 For reasons I can’t explain, *1000 I took a bite.`,
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
    next: ['high-part-one'],
    prev: ['see-the-world']
  }
}

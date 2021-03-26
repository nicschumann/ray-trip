{
  id: 'restart',
  text:`No, that's not quite right, actually. *1000 I was walking with Ray the other day, *350 and they said: *500 “You've been pouring so much into this. *1000 Why? *1000 It’s just a typeface; *450 You could turn down the quality.” *1000 I realized *500 – at that moment, *300 really – *500 that I do have a story to tell. *1000 It's mine, *350 and I want to tell it my way.`,
  marginalia: [
  ],
  sidelines: [
  ],

  // font: {
  //   size: 36
  // },

  animations: {
    state: 0,
    upper_limit: 80,
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
    next: ['spring'],
    prev: []
  }
}

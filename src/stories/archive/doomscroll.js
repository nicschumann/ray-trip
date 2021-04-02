{
  id: 'doomscroll',
  text: `Instagram, New York Times, Instagram, New York Times… Scroll, and scroll more. So and so had a baby… Trump’s latest tweet… The senate… Check out my dog… New work! Police Cars Revolving Light Emoji… She said yes… Gun control… Slight pain in my right thumb pulls me out. Shocking news are not shocking anymore. I just to want to take a walk.`,
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
    next: [],
    prev: []
  }
}

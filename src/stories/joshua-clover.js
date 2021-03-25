{
  id: 'joshua-clover',
  text: `In 2015, *400 Joshua Clover wrote "Once fire is the form of the spectacle the problem *750 / becomes how to set fire to fire."`,
  marginalia: [
    "U.S. to send millions of vaccines doses to Mexico and Canada.",
    "U.S. to send millions of vaccines doses to Mexico and Canada.",
    "U.S. to send millions of vaccines doses to Mexico and Canada.",
    "U.S. to send millions of vaccines doses to Mexico and Canada.",
    "U.S. to send millions of vaccines doses to Mexico and Canada.",
    "U.S. to send millions of vaccines doses to Mexico and Canada.",
  ],
  sidelines: [],

  font: {
    size: 36
  },

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
    },
    // ambient: () => {},
  },

  transitions: {
    next: [],
    prev: ['desk']
  }
}

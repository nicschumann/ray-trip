{
  id: 'desk',
  text: `As Gregor Samsa awoke one morning from uneasy dreams *450 he found himself transformed in his bed into a gigantic insect. * *  Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.`,
  marginalia: [
    "U.S. to send millions of vaccines doses to Mexico and Canada. U.S. to send millions of vaccines doses to Mexico and Canada. U.S. to send millions of vaccines doses to Mexico and Canada.",
    "U.S. to send millions of vaccines doses to Mexico and Canada.",
    "U.S. to send millions of vaccines doses to Mexico and Canada.",
    "U.S. to send millions of vaccines doses to Mexico and Canada.",
    "U.S. to send millions of vaccines doses to Mexico and Canada.",
    "U.S. to send millions of vaccines doses to Mexico and Canada.",
  ],
  sidelines: [
    "U.S. to send millions of vaccines doses to Mexico and Canada.",
    "U.S. to send millions of vaccines doses to Mexico and Canada.",
    "U.S. to send millions of vaccines doses to Mexico and Canada."
  ],

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
    next: ['joshua-clover'],
    prev: ['door']
  }
}

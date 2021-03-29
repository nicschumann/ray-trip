{
  id: 'too-many-fonts',
  text: `You would be surprised how many people ask me *350 if I think there are already too many fonts in the world. *1000 How do we know when every possible expression of a letter is recorded? *1500 How many fonts are too many? *2000 In Western music, *350 there are only 12 notes inside every octave. *1000 However, *350 there are still so many unwritten melodies, *350 chord progressions, *350 concertos. *1000 Similarly so many faces of type to be uncovered. *1000 Scientists say that there have been around 108 billion Homo Sapiens ever born. *1000 108 billion—and counting—unique voices, accents, *350 attitudes. *1000 Wouldn’t it be premature to declare that type designers have captured, systematized, *350 and exhausted the entire range of human and non-human expression?`,
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

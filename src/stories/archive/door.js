{
  id: 'door',
  text: `The door is stuck again. I look directly into camera and gaze into it, unblinking, while the LEDs increase their intensity, trying their best to wash out my complexion. My face appears in the display, but it doesn't resolve with the version of my face in the door's database. I twist the handle, gently, not wanting to set off the forced-entry sensors, but the door doesn't give. The other entry option included in my plan is a blood sample. I roll up my sleeve. I had hoped to draw tonight, but my energy is spent.`,
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
    weight: 800
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
    },
    // ambient: glyph_snow,
  },

  transitions: {
    next: ['joshua-clover'],
    prev: []
  }
}

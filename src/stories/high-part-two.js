{
  id: 'high-part-two',
  text: `I reached forward *350 and touched a thought. *1000 It flinched, *350 shuddering briefly, *350 recoiling from my body, *150 the body, *350 its origin. *1000 In that moment, *350 I felt its connection to me, *350 the thin wire *150 of emotional *150 filament *350 that anchored it *150 in my mind. *1500 The projection, *350 I realized, *350 had not undone me; *500 so much as it had *350 unfolded *350 me. *1000 I saw the multiplicity of my thoughts; *500 their connections.`,
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
    next: [{id: 'high-part-three'}],
    prev: []
  }
}

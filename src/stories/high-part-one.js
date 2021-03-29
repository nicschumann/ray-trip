{
  id: 'high-part-one',
  text: `The morel had a rich, *350 smooth *150 taste, *450 like walnuts pan-roasted in butter. *1500 There was no trace *500 of sliminess or slickness; *500 the mouthfeel I associate with mushrooms *150 was absent. *1000 Instead, there was a kind of sick *350 ~ *350 lateral *150 ~ *450 feeling *350 in my diaphragm. *2000 For a moment, *500 my mind went through *150 an inversion, *500 a *150 stereographic *500 projection. *2500 I could see its contours *250 etched *150 in relief *250 against the wall. *1750 At that moment, *500 the infinite point was located just behind my brain. *1500 In the dim light, *350 my thoughts were printed in complex rivulets *350 against the close *150 and immediate *150 curtain of night.`,
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
    next: [{id: 'high-part-two'}],
    prev: []
  }
}

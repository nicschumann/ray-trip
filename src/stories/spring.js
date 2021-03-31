{
  id: 'spring',
  text: `I want to start with the weather. *1000 The first thing I notice is that I can smell again. *1000 A week ago, *350 on my walk, *350 all I could smell was the cold. *1000 The ocean was gray under gray clouds; *750 the horizon was gray, *350 although it brightened, *350 briefly, *350 towards sundown. *1000 The air carried no scent but bit in my nostrils, *350 acrid. *1500 Today, I smell everything. *1500 Suddenly, *350 the air is dense *150 and living – *500 full of information, *350 unfurled flowers, *350 pheromones, *350 and warm skin. *1000 Spring is here.`,
  marginalia: [
  ],
  sidelines: [
  ],

  font: {
    size: 42
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
    }
    // ambient: () => {},
  },

  transitions: {
    next: [{id: 'morels'}],
    prev: []
  }
}

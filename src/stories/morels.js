{
  id: 'morels',
  text: `Morels are a kind of mushroom that can't easily be cultivated. *1250 It's not well understood where they like to grow. *1500 They pop up in the shade of apple trees, *500 or under elm *150 and yew trees. *1000 Their scarcity has created a kind of mushroom futures market; *750 clever growers *150 pay off orchard farmers *150 for the opportunity *150 to plant spore colonies *150 in shallow pits dug *150 at the core of the trees. *2000 Next year, *350 they say, *350 or maybe the year after, *350 I might have something to show. *1000 Yeah, *350 2 years. *1000 That's usually how long it takes *150 a colony to bear fruit. *1000 Their yield is rarely better than chance. *1500 And ruminating like this during my walk, *500 preoccupied with other structures, *500 I almost missed it.`,
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
    next: ['twilight'],
    prev: []
  }
}

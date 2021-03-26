{
  id: 'see-the-world',
  text: `Actually, that’s not quite true. The roots are deep, *350 but I can take you there… *2000 I have a long crit day ahead with my students. *1000 As I enter the classroom, *350 I am greeted with over-caffeinated eyes *350 still resisting the urge to crash after 12-plus hours of graphic design homework. *1500 The curriculum here is brutal, *350 and the culture is *750 unhealthy. *1250 Still, *350 I love being here, *350 simply because it makes me feel like I can see the world from the classroom. *1500 I get to travel to their inner worlds through weekly assignments. *1000 Every deliverable is a portal *500 opening up on a slice of culture. *1000 Standing in the middle of the classroom, *350 I get to watch the world unfold in front of my eyes through the posters and books that were freshly printed and trimmed an hour ago.`,
  marginalia: [
  ],
  sidelines: [
  ],

  font: {
    size: 36,
    leading: 1.1
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
    next: ['zeitgeist'],
    prev: []
  }
}

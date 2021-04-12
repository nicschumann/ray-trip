{
  id: 'mid',

  text: `Give up?`,

  marginalia: [
  ],
  sidelines: [
  ],

  transitions: {
    next: [
      {
        id: 'end-i',
        seen: ['start-i']
      },
      {
        id: 'end-ii',
        seen: ['start-ii']
      },
      {id: 'end-iii'}
    ],
    prev: []
  }
}

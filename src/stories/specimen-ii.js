{
  id: 'specimen-ii',

  text: `Mantar#h#extralight Extra#h#extralight Light#extralight#h$break Mantar is a psychedelic Scotch Roman designed by Cem Eskinazi. *750 After stumbling upon a phototypesetting specimen, *350 Cem was inspired by the warmth of the letters. *750 Mantar is a soft display face with curvy and elongated endings. *750 It comes in 12 styles including a funky Ultra weight.`,
// TODO: bio here
  marginalia: [
  ],
  sidelines: [
  ],

  font: {
    position: 'absolute',
    top: '40vh',
    left: '50vw',

    transform: 'translate(-50%,-50%)',
    textAlign: 'center',
    fontWeight: 280
  },

  definitions: {
    r: {
      color: 'red'
    },
    i: {
      fontStyle: 'italic'
    }
  },

  ignore: true,
  // TODO: link up the remaining specimens
  transitions: {
    next: [{id: 'specimen-words-i'}],
    prev: []
  }
}

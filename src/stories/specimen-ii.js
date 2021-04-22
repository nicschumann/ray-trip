{
  id: 'specimen-ii',

  text: `Mantar#h#extralight Extra#h#extralight Light#extralight#h$break Mantar is a psychedelic scotch roman designed by Cem Eskinazi. After stumbling upon a phototypesetting specimen, Cem was inspired by the soft and warm look of the edges. Mantar consists of 12 individual styles across Roman and Italic. This is Extra Light.`,
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

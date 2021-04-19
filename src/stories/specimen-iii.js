{
  id: 'specimen-iii',

  text: `Mantar#ultra#h Ultra#ultra#h$break And when there is chaos; there is order, control, authority, and power.`,

  marginalia: [
  ],
  sidelines: [
  ],

  font: {
    position: 'absolute',
    top: '40vh',
    left: '50vw',

    width: '80%',
    // maxWidth: '900px',

    transform: 'translate(-50%,-50%)',
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 'calc(min(5.5vw, 72px))'
  },

  definitions: {
    r: {
      color: 'red'
    },
    i: {
      fontStyle: 'italic'
    },
    h: {
      fontSize: `12px`,
      fontFamily: 'Magmatic',
      fontVariationSettings: "'wght' 400, 'wdth' 125",
      letterSpacing: '1px',
      textTransform: 'uppercase',
    }
  },

  ignore: true,

  transitions: {
    next: [{id: 'specimen-words-ii'}],
    prev: []
  }
}

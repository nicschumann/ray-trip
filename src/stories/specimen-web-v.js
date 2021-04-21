{
  id: 'specimen-web-v',

  text: `Mantar#h Regular#h$break When we first implemented the “blur-in” text-rendering you’ve been seeing, we were surprised by how temporal it made the text feel. It seemed suddenly like the text was being read to us in a very specific voice: we were listening, rather than reading.`,

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
    fontWeight: 400
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
      color:'magenta'
    }
  },

  ignore: true,

  transitions: {
    next: [{id: 'specimen-web-vi'}],
    prev: []
  }
}

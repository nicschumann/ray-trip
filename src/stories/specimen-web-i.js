{
  id: 'specimen-web-i',

  text: `Mantar#h Regular#h$break Mantar is a typeface 3 years in the making. It’s also Cem’s first commercial release. To celebrate all the effort and learning that went into the project, we knew we wanted to do something that felt special.`,

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
    next: [{id: 'specimen-web-ii'}],
    prev: []
  }
}

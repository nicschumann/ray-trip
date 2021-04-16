{
  id: 'specimen-web-iv',

  text: `Mantar#h Regular#h$break We also knew that we wanted to tell a story, a fictionalized account of how the typeface was inspired and made. We wanted a narrative experience that was “shallow,” centering a single browser interaction (vertical scroll). Our hope is that this makes the site feel like a journey, rather than a document.`,

  marginalia: [
  ],
  sidelines: [
  ],

  font: {
    position: 'absolute',
    top: '40vh',
    left: '50vw',

    width: '75%',
    maxWidth:'75%',

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
    next: [{id: 'specimen-web-v'}],
    prev: []
  }
}

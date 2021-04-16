{
  id: 'specimen-web-vi',

  text: `Mantar#h Regular#h$break The timbre of the text changed significatly as we changed the text speed$trim —$trim the rests between words, after punctuation, and between phrases. For us, the renderer Nic built paced the feeling of the text in time, the same way Cem’s font shaped the feeling of the words in space.`,

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
    next: [{id: 'specimen-web-vii'}],
    prev: []
  }
}

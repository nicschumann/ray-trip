{
  id: 'specimen-words-i',

  text: `Mantar#extralight#h Extra#extralight#h Light#extralight#h$break Translucid#w1#m$break Mantar#reg#h Regular#reg#h Italic#reg#h$break Röntgen#w2#m$break Mantar#black#h Black#black#h$break Darkbright#w3#m$break Mantar#ultra#h Ultra#ultra#h Italic#ultra#h$break Hyperscotch#w4`,

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
    fontWeight: 400,
    fontSize: 'calc(min(10vw, 100px))',
    lineHeight: 'calc(max(min(6vw, 50px), 35px))'
  },

  definitions: {
    w1: {
      fontWeight: 280,
    },
    w2: {
      fontWeight: 400,
      fontStyle: 'italic'
    },
    w3: {
      fontWeight: 800,
    },
    w4: {
      fontWeight: 900,
      fontStyle: 'italic'
    },
    m: {
      marginBottom:'2vh'
    },
    h: {
      fontSize: `12px`,
      fontFamily: 'Magmatic',
      fontVariationSettings: "'wght' 400, 'wdth' 125",
      letterSpacing: '1px',
      textTransform: 'uppercase',
      fontStyle:'normal',
    }
  },

  ignore: true,

  transitions: {
    next: [],
    prev: []
  }
}

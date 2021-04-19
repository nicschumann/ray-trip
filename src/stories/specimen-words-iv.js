{
  id: 'specimen-words-iv',

  text: `Mantar#extralight#h Extra#extralight#h Light#extralight#h Italic#extralight#h$break 60#w1 frames/second#w1#m$break Mantar#reg#h Regular#reg#h$break ¼ Cup of Milk#w2#m$break Mantar#bold#h Bold#bold#h Italic#bold#h$break Champiñón²#w3#m$break Mantar#ultra#h Ultra#ultra#h$break C₁₆H₁₆N₂O₂#w4`,

  marginalia: [
  ],
  sidelines: [
  ],

  font: {
    position: 'absolute',
    top: '40vh',
    left: '50vw',

    width: '90%',
    // maxWidth: '900px',

    transform: 'translate(-50%,-50%)',
    textAlign: 'center',
    fontWeight: 400,
    // TODO: doesn't work on very large screen sizes.
    fontSize: 'calc(min(12vw, 150px))',
    lineHeight: 'calc(max(min(6.5vw, 80px), 40px))'
  },

  definitions: {
    w1: {
      fontWeight: 280,
      fontStyle: 'italic'

    },
    w2: {
      fontWeight: 400,
    },
    w3: {
      fontWeight: 700,
      fontStyle: 'italic'
    },
    w4: {
      fontWeight: 900,
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
    next: [{id: 'specimen-lang-iv'}],
    prev: []
  }
}

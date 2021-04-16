{
  id: 'specimen-words-iii',

  text: `Mantar#extralight#h Extra#extralight#h Light#extralight#h Italic#extralight#h$break Irridixxenza#w1#m$break Mantar#reg#h Regular#reg#h$break Yanardöner#w2#m$break Mantar#bold#h Bold#bold#h Italic#bold#h$break Mikrobølgeovn#w3#m$break Mantar#ultra#h Ultra#ultra#h$break Distopična#w4`,

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
    next: [],
    prev: []
  }
}

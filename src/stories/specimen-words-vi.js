{
  id: 'specimen-words-vi',

  text: `Mantar#extralight#h Extra#extralight#h Light#extralight#h Italic#extralight#h$break Fikir—Xəyal#w1#m$break Mantar#reg#h Regular#reg#h$break odražavajući#w2#m$break Mantar#black#h Black#black#h Italic#black#h$break der#w3 Spiegel#w3#m$break Mantar#ultra#h Ultra#ultra#h Italic#ultra#h$break zamišljen#w4`,

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
    fontWeight: 400,
    fontSize: 'calc(clamp(53px, 12.5vw, 100px))',
    lineHeight: 'calc(max(min(6vw, 50px), 35px))'
  },

  definitions: {
    w1: {
      fontWeight: 280,
      fontStyle: 'italic',
      paddingLeft:'10px',
      paddingRight:'10px'

    },
    w2: {
      fontWeight: 400,
    },
    w3: {
      fontWeight: 800,
      fontStyle: 'italic'
    },
    w4: {
      fontWeight: 900,
      fontStyle: 'italic'
    },
    m: {
      marginBottom:'2vh'
    }
  },

  ignore: true,

  transitions: {
    next: [{id: 'specimen-lang-vi'}],
    prev: []
  }
}

{
  id: 'specimen-words-vii',

  text: `Mantar#extralight#h Extra#extralight#h Light#extralight#h Italic#extralight#h$break Réfléchissante#w1#m$break Mantar#light#h Light#light#h$break Zwierciadlany#w2#m$break Mantar#bold#h Bold#bold#h Italic#bold#h$break Rhode#w3 Island#w3#m$break Mantar#ultra#h Ultra#ultra#h Italic#ultra#h$break odzrkadľujúci#w4`,

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
      fontStyle: 'italic'

    },
    w2: {
      fontWeight: 300,
    },
    w3: {
      fontWeight: 700,
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
    next: [{id: 'specimen-lang-vii'}],
    prev: []
  }
}

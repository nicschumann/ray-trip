{
  id: 'specimen-web-help',

  text: `Mantar#h#extralight Extra#h#extralight Light#h#extralight$break This website has two modes of navigation: scroll down ($trim ↓#r$trim ) and scroll up ($trim ↑#b$trim ). Scrolling ↓#r continues your path through the narrative. If you ↓#r on this page, you will read more about the website. On some pages, you can ↑#b$trim . This will move the narrative onto a new thread. If you ↑#b on this page, you will return to the specimen.`,

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
    fontWeight: 280
  },

  definitions: {
    r: {
      color: 'cyan'
    },
    b: {
      color: 'yellow'
    },
    i: {
      fontStyle: 'italic'
    }
  },

  ignore: true,

  transitions: {
    next: [{id: 'specimen-web-i'}],
    prev: [{id: 'specimen-ii'}]
  }
}

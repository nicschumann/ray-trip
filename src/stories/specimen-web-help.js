{
  id: 'specimen-web-help',

  text: `Mantar#h Extra#h Light#h$break This website has two modes of navigation. Scroll down ($trim ↓#r$trim ) and scroll up ($trim ↑#b$trim ). On some pages, you can ↓#r$trim . This will continue your current path through the narrative. If you ↓#r on this page, you will read more about the website. On some pages, you can ↑#b$trim . This will move the narrative onto a new thread. If you ↑#b on this page, you will return to the specimen.`,

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
    next: [{id: 'specimen-web-i'}],
    prev: [{id: 'specimen-ii'}]
  }
}

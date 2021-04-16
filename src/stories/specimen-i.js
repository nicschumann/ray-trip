{
  id: 'specimen-i',

  text: `Mantar#reg#h Regular#reg#h$break Hello again. Hope you are enjoying the story so far. I see that you already went through 22#i$count of#i 40#i$parts parts. If you want more help or want to read about the website, you can scroll up. If you want to read more about Mantar continue below.`,
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
    next: [{id: 'specimen-ii'}],
    prev: [{id: 'specimen-web-help'}]
  }
}

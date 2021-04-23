{
  id: 'specimen-i',

  text: `Mantar#reg#h Regular#reg#h$break Hello again. Hope you are enjoying the story so far. I see that you already went through 22#i$count of 40#i$parts parts. If you want more help or want to read about the website, you can scroll up. If you want to read more about Mantar continue below. You can click the ⁂ to return to the story at any time.`,
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
    fontWeight: 400
  },

  definitions: {
    r: {
      color: 'red'
    },
    i: {
      fontWeight: 900
    }
  },

  ignore: true,

  transitions: {
    next: [{id: 'specimen-ii'}],
    prev: [{id: 'specimen-web-help'}]
  }
}

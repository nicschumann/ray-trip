{
  id: 'specimen-i',

  text: `Mantar#reg#h Regular#reg#h$break Hello. *1000 I hope you are enjoying the story so far. *750 I see that you've been through 22#i$count of#i 40#i$parts parts. *750 If you want more help or want to read about the website, *350 you can scroll up. *750 If you want to read more about Mantar continue below. *750 You can click the ⁂ to return to the story at any time.`,
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
      fontStyle: 'italic'
    }
  },

  ignore: true,

  transitions: {
    next: [{id: 'specimen-ii'}],
    prev: [{id: 'specimen-web-help'}]
  }
}

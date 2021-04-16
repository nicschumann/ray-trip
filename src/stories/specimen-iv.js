{
  id: 'specimen-iv',

  text: `Mantar#extralight#h Extra#extralight#h Light#extralight#h Italic#extralight#h$break Drawing this typeface was a non$trim -#ultra$trim linear process$trim ,#bold as it was mainly driven by my curiosities and questions$trim .#light It sure sent me down many rabbit holes$trim ,#reg but I chose to take the longer path on every opportunity$trim .#black`,

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
    fontWeight: 280,
    fontSize: 'calc(min(5.5vw, 72px))',
    fontStyle:'italic',
  },

  definitions: {
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

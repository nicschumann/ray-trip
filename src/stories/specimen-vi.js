{
  id: 'specimen-vi',

  text: `Mantar#ultra#h ULTRA#ultra#h$break IF YOU STUMBLE UPON A WILD MUSHROOM, DO NOT TAKE IT—UNLESS YOU ARE AN EXPERT.`,

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
    fontWeight: 900,
    fontSize: 'calc(min(5.5vw, 72px))',
    //fontStyle:'italic',
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
    next: [{id: 'specimen-i'}],
    prev: []
  }
}

{
  id: 'specimen-v',

  text: `Mantar#black#h Black#black#h$break THE DIAMOND SHAPED ROUNDS WERE KERNED AWAY TO ACHIEVE APPROPRIATE SPACING.`,

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
    fontWeight: 800,
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
    next: [{id: 'specimen-words-iv'}],
    prev: []
  }
}

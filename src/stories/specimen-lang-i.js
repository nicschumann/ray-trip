{
  id: 'specimen-lang-i',

  text: `Mantar#reg#h Regular#reg#h$break La escarcha, diamantina o purpurina es una variedad muy pequeña (cerca de 1 mm²) de pedazos de plásticos copolimerizados, hojas de aluminio, dióxido de titanio, óxidos de hierro, oxicloreto de bismuto u otros materiales pintados con colores metálicos, de neón y colores iridiscentes para reflejar la luz en un espectro de espumantes.`,

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
    fontWeight: 400,
    fontSize: 'calc(min(max(4.5vw, 28px), 55px))',
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
    next: [{id: 'specimen-iii'}],
    prev: []
  }
}

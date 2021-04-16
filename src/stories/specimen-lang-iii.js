{
  id: 'specimen-lang-iii',

  text: `Mantar#light#h Light#light#h Italic#light#h$break Der Begriff Fotosatz oder Lichtsatz wurde für ein Verfahren zur Satzherstellung verwendet$trim ,#ultra bei welchem durch Belichtung der Schriftzeichen mittels eines optischen ($trim#bold und später optoelektronischen$trim )#bold Verfahrens mit sichtbarem Licht das zu setzende Zeichen auf einen Trägerfilm übertragen wurde$trim .#extralight Die dazu verwendeten Anlagen werden als Lichtsatzmaschinen oder Fotosatzmaschinen bezeichnet$trim .#reg`,

  marginalia: [
  ],
  sidelines: [
  ],

  font: {
    position: 'absolute',
    top: '40vh',
    left: '50vw',

    width: '80%',
    maxWidth: '1100px',

    transform: 'translate(-50%,-50%)',
    textAlign: 'center',
    fontWeight: 300,
    fontSize: 'calc(min(4.5vw, 55px))',
    fontStyle: 'italic'
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

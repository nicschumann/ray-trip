{
  id: 'specimen-web-iii',

  text: `Mantar#h Regular#h$break From the beginning, we knew that we didn’t want to follow the standard formula for a specimen site. Type testers, character grids, and feature overviews are essential, but we already have a great framework for all of that on occupantfonts.com$lcontact$trim .`,
  // link: occupantfonts.com/fonts/mantar

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
    next: [{id: 'specimen-web-iv'}],
    prev: []
  }
}

{
  id: 'specimen-lang-ii',

  text: `Mantar#bold#h Bold#bold#h$break Fotosazba byl způsob vytváření tiskové předlohy pro ofsetový tisk (tisk z plochy) pomocí fotografického filmu a papíru. Fotosázecí stroj promítal obrázky písmen na citlivý materiál, který po vyvolání sloužil k výrobě ofsetového listu. Fotosazba v 60. letech téměř vytlačila „horkou sazbu“ a pomohla nahradit knihtisk ofsetem.`,

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
    fontWeight: 700,
    fontSize: 'calc(min(4.5vw, 55px))',
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
    next: [{id: 'specimen-iv'}],
    prev: []
  }
}

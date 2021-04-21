{
  id: 'specimen-lang-iv',

  text: `Mantar#black#h Black#black#h$break Işığın boşluktaki hızı yaklaşık 300,000 km/s’dir. Tüm elektromanyetik dalgaların boşluktaki hızı da budur. Işık saydam maddelerin içinde boşluktaki hızından daha yavaş yayılır.`,

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
    //fontStyle: 'italic'
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
    next: [{id: 'specimen-vi'}],
    prev: []
  }
}

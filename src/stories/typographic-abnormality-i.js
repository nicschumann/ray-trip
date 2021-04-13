{
  id: 'typographic-abnormality-i',
  text: `At my computer, *350 a sour aftertaste settles in my mouth. *1500 Anxiety is already marinating in my gut. *1500 I click deeper into the web, *750 the tiled lists of local fungi on my screen *250 don’t include my specimen. *2500 My now-lifeless specimen, *750 half its cap bitten off, *2000 the other half in me. *2000 As I zip from link to link, *450 I’m stopped by *750 a#a slight#a *250 typographic#a *150 abnormality#a$trim .`,
  marginalia: [
  ],
  sidelines: [
  ],

  font: {
    fontFamily: "Georgia",
    fontSize: `35px`,
    lineHeight: '42px',
  },

  definitions: {
    a: {
      fontFamily: "Mantar",
      fontSize: '40.5px',
      fontWeight: 300,
      fontStyle: 'italic'
    }
  },
// Make the last two words weight: 200, style: itals
  transitions: {
    next: [{id: 'typographic-abnormality-ii'}],
    prev: []
  }
}

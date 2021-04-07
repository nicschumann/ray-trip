{
  id: 'typographic-abnormality',
  text: `A sour aftertaste settles in my mouth. *1500 Anxiety marinating in my gut, *350 I click deeper into the web. *1500 The tiled lists of local fungi on my screen *250 don’t include my specimen. *1500 Lifeless, *750 half its cap bitten off, *2000 the other half in me. *2000 As I zip from link to link, *450 I’m stopped by *750 a#a slight#a *250 typographic#a *150 abnormality#a$trim .`,
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
      fontFamily: "Ray",
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

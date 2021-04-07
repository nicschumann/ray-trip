# Ray Trip

## Values, Rules, and Constraints

On 3/12/2021, Cem Eskinazi and I met up to talk about a web project to compliment and accompany his forthcoming typeface, "Ray" (name to change). I'd spent the previous month or so messing around with an [interactive fluid simulator](https://github.com/nicschumann/fairly-fast-fluids) based on the energy and disposition of the typeface design – But we'd both independently arrived at a the conclusion that we wanted something more narrative.

This website is a platform for bringing the reader on a journey through our experiences making and communicating "Ray".

## Installation

To get this up and running, first clone the repository into your local computer. Go to the project directory in your terminal, and do:

```sh
npm install
```

This will install all of the dependencies you need for this project. Once this is done, you need to place the Ray sources, which are not version controlled, in to the `src/fonts` folder. You will need the following files:

| Font Name | Formats
| --------- | ----- |
| `Ray-Ultra` | `.eot`, `.woff` |
| `Ray-Black` | `.eot`, `.woff`|
| `Ray-Bold` | `.eot`, `.woff` |
| `Ray-Regular` | `.eot`, `.woff` |
| `Ray-Light` | `.eot`, `.woff`|
| `Ray-ExtraLight` | `.eot`, `.woff` |
| `Ray-UltraItalic` | `.eot`, `.woff` |
| `Ray-BlackItalic` | `.eot`, `.woff`|
| `Ray-BoldItalic` | `.eot`, `.woff` |
| `Ray-Italic` | `.eot`, `.woff` |
| `Ray-LightItalic` | `.eot`, `.woff`|
| `Ray-ExtraLightItalic` | `.eot`, `.woff` |

Finally, run

```sh
npm run serve
```

to start a development server, and then visit `localhost:8080` in a browser.

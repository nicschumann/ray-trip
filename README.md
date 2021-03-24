# Ray Trip

## Values, Rules, and Constraints

On 3/12/2021, Cem Eskinazi and I met up to talk about a web project to compliment and accompany his forthcoming typeface, "Ray" (name to change). I'd spent the previous month or so messing around with an [interactive fluid simulator](https://github.com/nicschumann/fairly-fast-fluids) based on the energy and disposition of the typeface design – But we'd both independently arrived at a the conclusion that we wanted something more narrative.

This website is a platform for bringing the reader on a journey through our experiences making and communicating "Ray".

## Todo List

- ~Build a framework for text-to-div fitting, so that the story text can be set at the right size. Probably try using [fitty](https://github.com/rikschennink/fitty). Update: Fitty didn't work at all. Had to make my own `fit2d` routine that resizes font-size to maximize coverage of a containing div using a simple line-search (typically converges in about 12 iterations).~
- ~Add a sidebar at the left on big screens for rendering images or other rich assets? it could also just be an additional place for marginalia....~
- Add a click interaction to skip the frame rendering process, for impatient people. (played with this a bit... I think it could work, but is going to require some kindof annoying trial-and-error to get it to work nicely. I'd focus on getting the basic interactions right first, and then figure out how to short-circuit them.)
- Add a method for specifying the font style and weight of the frame in questions.

## Questions for Cem

- It seems like the typographic relationship between the big text and the marginalia is really important, but this resizing logic means that that relationship is de-coupled. What do we think about?


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

Finally, run

```sh
npm run serve
```

to start a development server, and then visit `localhost:8080` in a browser.

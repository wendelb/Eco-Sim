# EconomicSimulation

There was an article on Hacker News that got my attention: [Counterintuitive problem: Everyone in a room keeps giving dollars to random others. You’ll never guess what happens next](http://www.decisionsciencenews.com/2017/06/19/counterintuitive-problem-everyone-room-keeps-giving-dollars-random-others-youll-never-guess-happens-next/). This article was submitted a few times to Hacker News [1](https://news.ycombinator.com/item?id=14729400), [2](https://news.ycombinator.com/item?id=14649717), [3](https://news.ycombinator.com/item?id=14634926), [4](https://news.ycombinator.com/item?id=14619857).

Seeing the simulation, I wouldn't believe it at first, since I didn't expected the shown result. In this repository, I am going to reproduce the experiment, not in R but with JavaScript and the fancy [d3](http://d3js.org/) library.

After running the experiment multiple times, it verifies the results in the article. 

## Installation and Running

1. Run `bower install` in the `EconomicSimulation` directory.
2. Run a static webserver from the `EconomicSimulation` directory (e.g. `cd EconomicSimulation && python3 -m http.server 8080`)

## TODO List

* [ ] Remove all VS stuff
* [ ] Remove Bower and add yarn
* [ ] Add Webpack


## License

This repository is licensed under the [MIT License](LICENSE)
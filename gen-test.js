const { Grid, Noise } = require("./dist");

const g = new Grid(100, 100);

const n = new Noise();
n.fillPerlinGrid(g, 0.1, 0.1);

console.log(g);

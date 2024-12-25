//------------------------------------------------------//
//Vector Based Generative Art							              //
//Inspired by Tyler Hobbs                               //
//Created with a GNU free to use license                //

const H = 720; // Canvas height
const W = 720; // Canvas width
const NI = 150; // Vector field resolution
const NJ = 150;
const nstep = 715; // Number of steps for flowing lines
const res = 1500; // Resolution for finer movements

const neon = [
  [255, 64, 64], // Bright Red
  [255, 165, 0], // Orange
  [0, 128, 255], // Light Blue
  [128, 0, 255], // Violet
  [0, 255, 128], // Spring Green
];
const neonwt = [0.2, 0.2, 0.2, 0.2, 0.2];
const sw = [3, 4, 5]; // Slightly thicker stroke weights
const swwt = [0.4, 0.4, 0.2];
const nl = [1200, 2000, 3000]; // Number of lines
const nlwt = [0.3, 0.5, 0.2];
let iters = [0, 0, 0];

function setup() {
  createCanvas(H, W);
  let rnum = fxrand();

  // Assign random thread color
  let w1 = 0;
  for (let i = 0; i < neonwt.length; i++) {
    let w2 = w1 + neonwt[i];
    if (rnum >= w1 && rnum < w2) {
      iters[0] = i;
    }
    w1 = w2;
  }
  stroke(neon[iters[0]]);

  // Assign random thread thickness
  rnum = fxrand();
  w1 = 0;
  for (let i = 0; i < sw.length; i++) {
    let w2 = w1 + swwt[i];
    if (rnum >= w1 && rnum < w2) {
      iters[1] = i;
    }
    w1 = w2;
  }
  strokeWeight(sw[iters[1]]);

  // Assign random thread count
  rnum = fxrand();
  w1 = 0;
  for (let i = 0; i < nl.length; i++) {
    let w2 = w1 + nlwt[i];
    if (rnum >= w1 && rnum < w2) {
      iters[2] = i;
    }
    w1 = w2;
  }
  nlines = nl[iters[2]];

  // Enhanced dark background with slight gradient
  for (let y = 0; y < height; y++) {
    let gradient = map(y, 0, height, 10, 40);
    stroke(gradient, gradient, 60);
    line(0, y, width, y);
  }

  noLoop();
}

function draw() {
  const vectorField = new VectorField(NI, NJ, res);

  for (let iline = 0; iline < nlines; iline++) {
    const flowLine = new FlowLine(vectorField, nstep, H, W, res, neon, iters);
    flowLine.drawLine();
  }
}
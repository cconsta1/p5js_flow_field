const H = 480; // Canvas height
const W = 480; // Canvas width
const NI = 100; // Vector field resolution
const NJ = 100;
const nstep = 50; // Number of steps per line
const res = 1000; // Resolution

// Enhanced neon colors
const neon = [
  [255, 64, 64], // Bright Red
  [255, 165, 0], // Orange
  [0, 128, 255], // Light Blue
  [128, 0, 255], // Violet
  [0, 255, 128], // Spring Green
];
const neonwt = [0.2, 0.2, 0.2, 0.2, 0.2];
const sw = [2, 4, 6]; // Thicker stroke weights
const swwt = [0.3, 0.4, 0.3];
const nl = [800, 1600, 2400];
const nlwt = [0.2, 0.6, 0.2];
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

  background(10, 10, 20); // Darker background for better contrast
  noLoop();
}

function draw() {
  const vecs = Array.from({ length: NI }, () => Array(NJ).fill(0));
  for (let ii = 0; ii < NI; ii++) {
    for (let jj = 0; jj < NJ; jj++) {
      let angle = noise(ii / 10, jj / 10) * TWO_PI * 2;
      vecs[ii][jj] = [cos(angle), sin(angle)];
    }
  }

  for (let iline = 0; iline < nlines; iline++) {
    let flowLine = [];
    let pt = [Math.floor(fxrand() * NI), Math.floor(fxrand() * NJ)];
    let xx = [(pt[0] / NI) * H, (pt[1] / NJ) * W];

    for (let istep = 0; istep < nstep; istep++) {
      let xstep = (vecs[pt[0]][pt[1]][0] * H) / res;
      let ystep = (vecs[pt[0]][pt[1]][1] * W) / res;
      xx = [xx[0] + xstep, xx[1] + ystep];
      pt = [Math.floor((xx[0] / H) * NI), Math.floor((xx[1] / W) * NJ)];
      if (pt[0] < 0 || pt[0] >= NI || pt[1] < 0 || pt[1] >= NJ) break;

      flowLine.push({ x: xx[0], y: xx[1] });

      // Dynamic stroke
      stroke(
        lerpColor(
          color(neon[iters[0]]),
          color(neon[(iters[0] + 1) % neon.length]),
          istep / nstep
        )
      );
    }

    beginShape();
    noFill();
    for (let j = 0; j < flowLine.length; j++) {
      curveVertex(flowLine[j].x, flowLine[j].y);
    }
    endShape();
  }
}

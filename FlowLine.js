class FlowLine {
    constructor(vectorField, nstep, H, W, res, neon, iters) {
      this.vectorField = vectorField;
      this.nstep = nstep;
      this.H = H;
      this.W = W;
      this.res = res;
      this.neon = neon;
      this.iters = iters;
      this.points = [];
      this.generateLine();
    }
  
    generateLine() {
      let pt = [Math.floor(fxrand() * this.vectorField.NI), Math.floor(fxrand() * this.vectorField.NJ)];
      let xx = [(pt[0] / this.vectorField.NI) * this.H, (pt[1] / this.vectorField.NJ) * this.W];
  
      for (let istep = 0; istep < this.nstep; istep++) {
        let vec = this.vectorField.getVector(pt[0], pt[1]);
        let xstep = (vec[0] * this.H) / this.res;
        let ystep = (vec[1] * this.W) / this.res;
        xx = [xx[0] + xstep, xx[1] + ystep];
        pt = [Math.floor((xx[0] / this.H) * this.vectorField.NI), Math.floor((xx[1] / this.W) * this.vectorField.NJ)];
        if (pt[0] < 0 || pt[0] >= this.vectorField.NI || pt[1] < 0 || pt[1] >= this.vectorField.NJ) break;
  
        this.points.push({ x: xx[0], y: xx[1] });
  
        // Dynamic stroke with gradient effect
        stroke(
          lerpColor(
            color(this.neon[this.iters[0]]),
            color(this.neon[(this.iters[0] + 1) % this.neon.length]),
            istep / this.nstep
          )
        );
      }
    }
  
    drawLine() {
      beginShape();
      noFill();
      for (let j = 0; j < this.points.length; j++) {
        curveVertex(this.points[j].x, this.points[j].y);
      }
      endShape();
    }
  }
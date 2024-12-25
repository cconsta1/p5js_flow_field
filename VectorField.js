class VectorField {
    constructor(NI, NJ, res) {
      this.NI = NI;
      this.NJ = NJ;
      this.res = res;
      this.vecs = Array.from({ length: NI }, () => Array(NJ).fill(0));
      this.generateField();
    }
  
    generateField() {
      for (let ii = 0; ii < this.NI; ii++) {
        for (let jj = 0; jj < this.NJ; jj++) {
          let angle = noise(ii / 20, jj / 20) * TWO_PI * 2;
          this.vecs[ii][jj] = [cos(angle), sin(angle)];
        }
      }
    }
  
    getVector(x, y) {
      return this.vecs[x][y];
    }
  }
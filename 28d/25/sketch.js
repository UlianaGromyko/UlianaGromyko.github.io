let a = [];
let s = [];
let l = 100;
let t = 0;

function setup() {
  createCanvas(1790 , 960);
  for (let i = 0; i < l; i++) {
    a[i] = createVector(0, 0);
    s[i] = map(sin(i/l*PI/2), 0, 1, 100, width*2);
  }
  noStroke();
  noCursor();
}

function draw() {
  background(0);

  strokeWeight(1);
  circle(mouseX, mouseY, 20);

  for (let i = a.length - 1; i > 0; i--) {
    a[i] = a[i - 1];
    fill(map(s[i], 100, width*2, 255, 0));
    circle(a[i].x, a[i].y, s[i]);
  }
  a[0] = createVector(mouseX, mouseY);


}

let p = [];
let space = 50;
let interval = 20;
let t = 0;
let size = 25;

function setup() {
  createCanvas(1790, 960);
  fill(200, 20, 20);
  strokeWeight(3);
  stroke(0);
  p[0] = new Thing(width / 2, height / 2);

  background(200, 20, 30);
}

function draw() {
  t++;
  for (let i = 0; i < p.length; i++) {
    p[i].display();
  }

  if (t == interval) {
    background(200, 20, 20, 30);
    let a = floor(random(p.length));
    p.push(new Thing(p[a].pos.x, p[a].pos.y));
    for (let i = 0; i < p.length; i++) {
      p[i].run();
      if (p[i].outside()) {
        p.splice(i, 1);
      }
    }
    t = 0;
  }
}

function mouseClicked() {
  interval += 5;
  size = (size / 5) * 4;
  background(200, 20, 20);
}

class Thing {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.before = createVector(x, y);
  }
  display() {
    let x = map(t, 0, interval, this.before.x, this.pos.x);
    let y = map(t, 0, interval, this.before.y, this.pos.y);
    //line(this.pos.x, this.pos.y, this.before.x, this.before.y);
    circle(x, y, size);
  }
  run() {
    let angle = floor(random(6));

    let n = createVector(cos(angle*PI/3)*space, sin(angle*PI/3)*space);
    console.log(n.x);
    n.add(this.pos);
    this.before = this.pos.copy();
    this.pos = n.copy();
  }
  outside() {
    if (
      (this.pos.x < 0 ||
        this.pos.x > width ||
        this.pos.y < 0 ||
        this.pos.y > height) &&
      (this.before.x < 0 ||
        this.before.x > width ||
        this.before.y < 0 ||
        this.before.y > height)
    ) {
      return true;
    } else {
      return false;
    }
  }
}

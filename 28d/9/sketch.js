let p = [];
let room = 20;
let capture;

function setup() {
  createCanvas(1790, 1160);
  for(let i=0; i<width; i+=room){
    for(let j=0; j<height; j+=room){
      p.push(new Particle(i, j, room));
    }
  }
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();

  
}

function draw() {
  background(0);
  
  capture.loadPixels();

  for (let i = 0; i < p.length; i++) {
    let index = (p[i].orgin.y*capture.width + p[i].orgin.x)*4;
    fill((capture.pixels[index+0]+ 
            capture.pixels[index+1]+ 
            capture.pixels[index+2])/3);
    
    p[i].update();
    p[i].display();
    
    
  }
}

class Particle {
  constructor(x, y, size) {
    this.orgin = createVector(x, y);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.size = size;
  }

  update() {

    if(dist(this.pos.x, this.pos.y, mouseX, mouseY)<90){
      let influence = createVector(movedX, movedY);
      influence.mult(10);  //the higher, the more powerful the influence 
      this.acc.add(influence);
    }
      this.acc.div(dist(pmouseX, pmouseY, this.pos.x, this.pos.y));
      

      this.vel.add(this.acc);
      this.vel.mult(0.9);   // the lower, the stiffer, the quicker stabilisation
    this.pos.add(this.vel);
    
    let diff = createVector((this.orgin.x - this.pos.x),(this.orgin.y - this.pos.y));
      diff.mult(0.1);
    this.pos.add(diff);
    
  }

  display() {
    rect(this.pos.x, this.pos.y, this.size, this.size);
    //circle(this.pos.x, this.pos.y, 10);
  }
}


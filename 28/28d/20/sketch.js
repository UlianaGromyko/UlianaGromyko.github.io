let arr=[];

function setup() {
  createCanvas(screen.availWidth - 2,   
               screen.availHeight - 170);
  fill(50);
  noStroke();
  noCursor();
}

function mouseClicked(){
  arr.push(new Flame(mouseX, mouseY));
}

function draw() {
  background(200);
  fill(0);
  for(let i=0; i<arr.length; i++){
    arr[i].run();
    arr[i].multiply(10);
  }
  fill(200,20,20);
  circle(mouseX, mouseY, 10);
}

class Flame{
  constructor(x,y){
    this.pos = [];
    this.pos[0] = createVector(x, y);
    this.vel = [];
    this.vel[0] = createVector(0,0);
    this.orgin = createVector(x, y);
  }
  multiply(cap){
    if (this.pos.length<cap) {
      let i = floor(random(this.pos.length));
      let a = 10;
      this.pos.push(createVector(
        this.pos[i].x+random(-a,a),
        this.pos[i].y+random(-a,a)));
      
      this.vel.push(createVector(
        random(-a,a),random(-a,a)));
    }
  }
  run(){
    let a=1;
    for(let i=0; i<this.pos.length; i++){
      circle(this.pos[i].x, this.pos[i].y, 10);
      
      if(this.pos[i].x < 0) this.pos[i].x = width;
      if(this.pos[i].y < 0) this.pos[i].y = height;
      if(this.pos[i].x > width) this.pos[i].x = 0;
      if(this.pos[i].y > height) this.pos[i].y = 0;
      
      
      this.pos[i].add(this.vel[i]);
      this.vel[i].mult(random(0.8, 0.99));
      if(abs(movedX) > 10 || abs(movedY) > 10){
        this.vel[i].add(movedX, movedY);
      }
      
      
    }
  }
}
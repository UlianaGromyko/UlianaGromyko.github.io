let a=[];
let stopped = false;

function setup() {
  createCanvas(1790, 960);
  fill(20);
  noStroke();
  noCursor();
  for(let i=0; i<80; i++){
    a[i] = new Blob(400,400);
  }
}

function draw() {
  background(220,70);
  for(let i=0; i< a.length; i++){
    a[i].display(); 
    if(random(100)<60 && abs(movedX)+abs(movedY)>0){
      a[i].changeCourse(mouseX, mouseY);
    }
  }
  
  
}


class Blob{
  constructor(x, y){
    this.size = floor(random(20, 90));
    this.off = floor(random(-1,2))*(100-this.size);
    this.pos = createVector(random(-this.off, this.off)+x, 
                            random(-this.off, this.off)+y);
    this.goal = createVector(this.pos.x, this.pos.y);
  }
  display(){
    circle(this.pos.x, this.pos.y, this.size);
    let diff = createVector(this.goal.x - this.pos.x,
                            this.goal.y - this.pos.y);
    diff.mult(this.size/(width+height));
    this.pos.add(diff);
  }
  changeCourse(x, y){
    this.goal = createVector(random(-this.off, this.off)+x, 
                             random(-this.off, this.off)+y);
  }
  
}
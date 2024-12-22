let space = 31; //height cant be devidable by space
let p=[];
let collumn;
let untouched = true;

function setup() {
  createCanvas(1790, 960);
  let index=0;
  noStroke();
  for(let i=-space; i<width+space; i+=space){
    for(let j=0; j<height; j+=space){
      p[index] = new House(i, j, space);
      index++;
    }
  }
  collumn = floor(height/space)+1;
  noCursor();
}

function draw() {
  background(30);
  
  for(let i=0; i<p.length; i++){
    p[i].display();
    if(i>collumn && i<p.length-collumn)
      
    if(p[i].check()!=true){
      p[i].updateColor(p[i-1].col, p[i+1].col, p[i-collumn].col, p[i+collumn].col);
    }
    if(p[i].check() && (abs(movedX)>0 || abs(movedY)>0)){
      if(untouched){
        p[i].col = color(random(255),random(255),random(255));
      } else {
        p[i].col = color(255);
      }
    }
  }
}

function mouseClicked(){
  let r = random(255);
  let g = random(255);
  let b = random(255);
  for(let i=collumn+1; i<p.length-collumn; i++){
    let off = random(-50,50);
    p[i].col = color(r+off, g+off, b+off);
  }
  untouched = false;
}



class House{
  constructor(x, y, space){
    this.pos = createVector(x, y);
    this.size = space;
    this.col = color(200);
  }
  display(){
    fill(this.col);
    rect(this.pos.x, this.pos.y, this.size,this.size);
  }
  updateColor(a,b,c,d){
    let one = lerpColor(a, b, 0.5);
    let two = lerpColor(c, d, 0.5);
    this.col= lerpColor(one, two, 0.5);
  }
  check(){
    if(mouseX > this.pos.x &&
      mouseX < this.pos.x+this.size &&
      mouseY > this.pos.y &&
      mouseY < this.pos.y+this.size){
      return true;
    } else {
      return false;
    }
  }
}
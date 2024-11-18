let p=[];
let detail=50;
let index=0;
let chaos=20;
let maxCount;
let r = 300;

function setup() {
  createCanvas(1760,960);
  fill(255);
  stroke(100);
  noCursor();
  
  for(let i=0; i<width; i+=detail){
    for(let j=0; j<height; j+=detail){
      p[index] = new Bleh(random(i, i+detail/chaos), random(j, j+detail/chaos), i/detail, j/detail, r/2);
      index++;
    }
  }
  maxCount = createVector(width/detail, height/detail);
  console.log(maxCount);
  console.log(p[p.length-1].count);
}

function draw() {
  background(0);
  
  circle(mouseX, mouseY, r);
  for(let i=0; i<p.length; i++){
    p[i].display();
    
    if(p[i].count.y < maxCount.y-1){
      line(p[i].pos.x, p[i].pos.y, 
           p[i+1].pos.x,  p[i+1].pos.y);
    }
    if(p[i].count.x < maxCount.x-1){
      line(p[i].pos.x, p[i].pos.y, 
           p[i+floor(maxCount.y)+1].pos.x, 
           p[i+floor(maxCount.y)+1].pos.y);
    }
  }
}

class Bleh{
  constructor(x,y,a,b,radius){
    this.pos = createVector(x,y);
    this.orgin = createVector(x,y);
    this.count = createVector(a,b);
    this.r = radius
  }
  display(){
    if(dist(mouseX, mouseY, this.pos.x, this.pos.y)<this.r){
      this.pos = createVector(this.orgin.x, this.orgin.y);
    }else if(random(100)<5){
      let w=8;
      this.pos.add(random(-w,w), random(-w,w));
      
      circle(this.pos.x, this.pos.y, 5);
    }
  }
}
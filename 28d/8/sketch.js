let p=[];
let detail=30;
let index=0;
let chaos=2; // straight for 2
let maxCount;
let r = 10;
let radius=0;
let hypocenter;
let c;

function setup() {
  let w = screen.availHeight - 170 - ((screen.availHeight - 170)%detail);

  createCanvas(screen.availWidth - 2,   
               w);
  c = color(10,210,10);
  fill(c);
  stroke(c);
  frameRate(24);
  noCursor();
  
  for(let i=0; i<width; i+=detail){
    for(let j=0; j<height; j+=detail){
      p[index] = new Bleh(random(i+detail/2, i+detail/chaos), random(j+detail/2, j+detail/chaos), i/detail, j/detail, r/2);
      index++;
    }
  }
  maxCount = createVector(width/detail, height/detail);
  
}

function draw() {
  background(0);
  
  
  for(let i=0; i<p.length; i++){
    p[i].display();
    
    if(p[i].count.y < maxCount.y-1){
      line(p[i].pos.x, p[i].pos.y, 
           p[i+1].pos.x,  p[i+1].pos.y);
    }


    if(p[i].count.x < maxCount.x-1){
      line(p[i].pos.x, p[i].pos.y, 
           p[i+floor(maxCount.y)].pos.x, 
           p[i+floor(maxCount.y)].pos.y);
    }
    
    if(radius > 0){
      radius+=0.01;
      p[i].bomb(radius, hypocenter);
      fill(0);
    }
  }
  
  if(radius > width){
    radius=0;
    fill(c);
  }
  
  
  
}

function mouseClicked(){
  radius +=0.1;
  hypocenter = createVector(mouseX, mouseY);
}

class Bleh{
  constructor(x,y,a,b,radius){
    this.pos = createVector(x,y);
    this.orgin = createVector(x,y);
    this.count = createVector(a,b);
    this.r = radius
  }
  display(){
    if(dist(mouseX, mouseY, this.pos.x, this.pos.y)<detail*1.5){
      circle(this.pos.x, this.pos.y, 20);
    }
  }
  bomb(radius, hypocenter){
    let diff;
    
    if(dist(hypocenter.x, hypocenter.y, this.pos.x, this.pos.y) < radius-30){
      diff = createVector(this.orgin.x-this.pos.x, 
                              this.orgin.y-this.pos.y);
      diff.mult(0.2);
      this.pos.add(diff);
    } else if (dist(hypocenter.x, hypocenter.y, this.pos.x, this.pos.y) < radius){
      
      diff = createVector(hypocenter.x-this.pos.x, 
                              hypocenter.y-this.pos.y);
      diff.mult(0.2);
      this.pos.add(diff);
    }
  }
}
let space = 180;
let p=[];
let e;

function setup() {
  createCanvas(screen.availWidth - 2,   
               screen.availHeight - 170);
  //noStroke();
  stroke(210);
  noCursor();
  let index=0;
  a=0;
  for(let i=0; i<height+1; i+=space/5){
    for(let j=0+space/2*(a%2); j<width+space/2; j+=space){
      p[index] = new House(j, i, space, index);
      index++;
    }
    a++;
  }
  e = new House(width/2, height/2, space, 1);
}

function draw() {
  background(220);
  for(let i=0; i<p.length; i++){
    p[i].display();
  }
}

function mouseClicked(){
  for(let i=0; i<p.length; i++){
    p[i].h = random(100);
  }
}

class House{
  constructor(x, y, space, index){
    this.pos = createVector(x, y);
    this.orgin = createVector(x, y);
    this.size = space/2;
    this.index = index;
    this.h = random(100);
  }
  display(){
      this.h = this.h *random(0.85, 1.07);
    
    if(dist(mouseX, mouseY, this.pos.x, this.pos.y)<this.size/2){
      this.h = 100;
    } 
    
    // fill(100);
    // quad(this.pos.x+this.size, this.pos.y,
    //     this.pos.x, this.pos.y+this.size/2.5,
    //     this.pos.x-this.size, this.pos.y,
    //     this.pos.x, this.pos.y-this.size/2.5)
    
    
    fill(200);
    quad(this.pos.x+this.size, this.pos.y,
        this.pos.x, this.pos.y+this.size/2.5,
        this.pos.x, this.pos.y+this.size/2.5-this.h,
        this.pos.x+this.size, this.pos.y-this.h); //right
    
    
    fill(140);
    quad(this.pos.x, this.pos.y+this.size/2.5,
        this.pos.x-this.size, this.pos.y,
        this.pos.x-this.size, this.pos.y-this.h,
        this.pos.x, this.pos.y+this.size/2.5-this.h);//left
    
    
    fill(210+this.h/10);
    quad(this.pos.x+this.size, this.pos.y-this.h,
        this.pos.x, this.pos.y+this.size/2.5-this.h,
        this.pos.x-this.size, this.pos.y-this.h,
        this.pos.x, this.pos.y-this.size/2.5-this.h); //top
    
    // fill(255);
    // text(this.index, this.pos.x, this.pos.y);
    // text(a, this.pos.x, this.pos.y+12);
  }
}
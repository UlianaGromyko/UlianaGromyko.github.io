let bg = 0;
let ov = 255;
let p =[];

function setup() {
  createCanvas(1790 , 960);
}

function draw() {
  background(bg);
  if(abs(movedX)>20 || abs(movedX)>20){
      p[p.length] = new Split(mouseX, mouseY, pmouseX, pmouseY);
    
    
  }
  
  for(let i=0; i<p.length; i++){
    p[i].display();
  }
 
}

class Split{
  constructor(x,y,px,py){
    this.a = createVector(x,y);
    this.b = createVector(px, py);
    this.c = this.a;
    this.d = this.b;
    this.speed = 0;
  }
  display(){
    stroke(ov);
    
    quad(this.a.x, this.a.y, this.b.x, this.a.y, this.b.x, this.b.y, this.a.x, this.b.y);
    
    this.a.y += this.speed;
    this.b.y += this.speed;
    // this.c.y -= this.speed;
    // this.d.y -= this.speed;
    this.speed += 1;
  }
}
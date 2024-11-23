let space = 30;
let p=[];


function setup() {
  createCanvas(1790 , 960);
  let index=0;
  for(let i=space/2; i<width; i+=space){
    for(let j=space/2; j<height; j+=space){
      p[index] = new House(i, j, space);
      index++;
    }
  }
  noCursor();
  noStroke();
}

function draw() {
  background(0);
  for(let i=0; i<p.length; i++){
    p[i].display();
  }
  
}

class House{
  constructor(x, y, space){
    this.pos = createVector(x, y);
    this.size = space/2;
    this.sym = String.fromCharCode(random((0x0021, 0x0FD9)));
    this.col = color(random(170,255), random(170,255), random(170,255));
  }
  display(){
    textAlign(CENTER, CENTER);
    textSize(this.size*2);
    fill(this.col);
    text(this.sym, this.pos.x, this.pos.y)
    if(dist(mouseX, mouseY, this.pos.x, this.pos.y)<space/2){
      this.sym=String.fromCharCode(random((0x0021, 0x0FD9)));
    }
  }
}
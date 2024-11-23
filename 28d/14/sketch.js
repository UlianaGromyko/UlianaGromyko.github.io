let space = 100;
let p=[];

function preload(){
  img = loadImage('https://static.wikia.nocookie.net/mugen/images/e/ef/Windows_Cursor.png');
}

function setup() {
  createCanvas(1790 , 960);
  let index=0;
  for(let i=-width; i<width*2; i+=space){
    for(let j=-height; j<height*2; j+=space){
      p[index] = new House(i, j, 11);
      index++;
    }
  }
}

function draw() {
  background(0);
  for(let i=0; i<p.length; i++){
    p[i].display();
  }
}

class House{
  constructor(x, y, space){
    this.pos = createVector(random(-width,width*2), random(-height,height*2));
    this.size = space;
  }
  display(){
    //circle(this.pos.x, this.pos.y, this.size);
    
    this.pos.add(movedX, movedY);
    image(img, this.pos.x, this.pos.y, this.size, this.size*1.6);
    
    if(mouseIsPressed){
      this.pos = createVector(random(-width,width*2), random(-height,height*2));
    }
  }
}
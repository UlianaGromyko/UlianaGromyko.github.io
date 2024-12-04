let v=[];
let space=100;

function setup() {
  createCanvas(1790 , 960);
  noFill();
  noCursor();
  stroke(0);
  strokeWeight(5);
  
  let index=0;
  for(let i=0; i<width; i+=space){
    v[index] = new Thread(i, 0);
    index++;
  }
  for(let i=0; i<height; i+=space){
    v[index] = new Thread(width, i);
    index++;
  }
  for(let i=0; i<width; i+=space){
    v[index] = new Thread(width-i, height);
    index++;
  }
  for(let i=0; i<height; i+=space){
    v[index] = new Thread(0, height-i);
    index++;
  }
  
}

function draw() {
  background(220,20,20,96);
  for(let i=0; i<v.length; i++){
    v[i].update(mouseX, mouseY);
    v[i].display();
  }
}

class Thread{
  constructor(x,y){
    this.a = createVector(x,y);
    this.b = createVector(x+(width-x)/2, y+(height-y)/2);
    this.c = createVector(0,0);
  }
  update(mx, my){
    this.c = createVector(this.a.x+(mx-this.a.x)/1.2, 
                          this.a.y+(my-this.a.y)/1.2);
    
    let diff = createVector(this.c.x-this.b.x, 
                            this.c.y-this.b.y);
    diff.mult(0.05);
    this.b.add(diff);
  }
  display(){
    bezier(this.a.x, this.a.y,
          this.b.x, this.b.y,
          this.b.x, this.b.y,
          mouseX, mouseY);
  }
}
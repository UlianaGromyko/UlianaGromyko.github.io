let e=[], g=[];


function setup() {
  createCanvas(screen.availWidth - 2,   
               screen.availHeight - 170);
  noFill();
  stroke(20,40);
  noCursor();
  
  let spaced = 20;
  let index=0;
  
  for(let i=0; i<height+spaced; i+=spaced){
    e[index] = new StrandY(i, 20, map(i, 0, height, 
                                     0.90,0.99));
    index++;
  }
  index=0;
  
  for(let i=0; i<width+spaced; i+=spaced){
    g[index] = new StrandX(i, 20, map(i, 0, width, 
                                     0.90,0.99));
    index++;
  }
}

function draw() {
  background(200);
  for(let i=0; i<e.length; i++){
    e[i].display();
    e[i].pluck();
    e[i].update();
  }
  for(let i=0; i<g.length; i++){
    g[i].display();
    g[i].pluck();
    g[i].update();
  }
  
  
}

class StrandY{
  constructor(y, thickness, reducement){
    this.y = y;
    this.attach = y;
    this.thickness = thickness;
    this.reducement = reducement;
    this.moving=false;
    this.x = width/2;
  }
  display(){
    strokeWeight(this.thickness);
    
    bezier(0, this.attach, 
           this.x, this.y,
           this.x, this.y, 
           width, this.attach);
  }
  pluck(){
    if((mouseY < this.attach && pmouseY >= this.attach) ||
      (mouseY > this.attach && pmouseY <= this.attach)){
      
      this.drum = -movedY*2;
      this.y = mouseY;
      this.x = mouseX;
      this.t = -PI/2;
      this.moving = true;
      
      console.log(sin(this.t))
    }
  }
  update(){
    if(this.moving){
      this.t+=0.2;
      this.y = sin(this.t)*this.drum+this.attach
      
      this.drum = this.drum*this.reducement;
      if(abs(this.drum) < 0.01) this.moving=false;
    }
  }
}

class StrandX{
  constructor(x, thickness, reducement){
    this.x = x;
    this.attach = x;
    this.thickness = thickness;
    this.reducement = reducement;
    this.moving=false;
    this.y = height/2;
  }
  display(){
    strokeWeight(this.thickness);
    
    bezier(this.attach, 0, 
           this.x, this.y,
           this.x, this.y, 
           this.attach, height);
  }
  pluck(){
    if((mouseX < this.attach && pmouseX >= this.attach) ||
      (mouseX > this.attach && pmouseX <= this.attach)){
      
      this.drum = -movedX*2;
      this.x = mouseX;
      this.y = mouseY;
      this.t = -PI/2;
      this.moving = true;
      
      
    }
  }
  update(){
    if(this.moving){
      this.t+=0.2;
      this.x = sin(this.t)*this.drum+this.attach
      
      this.drum = this.drum*this.reducement;
      if(abs(this.drum) < 0.01) this.moving=false;
    }
  }
}
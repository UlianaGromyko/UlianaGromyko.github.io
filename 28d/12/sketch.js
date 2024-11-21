let space = 90;
let p=[];

function setup() {
  createCanvas(1790 , 960);
  //noStroke();
  stroke(0, 10);
  let index=0;
  for(let i=0; i<width; i+=space){
    for(let j=0; j<height; j+=space){
      p[index] = new House(i, j, space);
      index++;
    }
  }
}

function draw() {
  background(255);
  for(let i=0; i<p.length; i++){
    p[i].display();
  }
}

function mouseClicked(){
  for(let i=0; i<p.length; i++){
    if(p[i].pos.x < mouseX && p[i].pos.x+p[i].size > mouseX &&
       p[i].pos.y < mouseY && p[i].pos.y+p[i].size > mouseY){
      p[i].col = 0;
      if(p[i].shape !=6){ //max amount of shapes here! <<
        p[i].shape++;
      } else {
        p[i].shape = 0;
      }
    }
  }
}

class House{
  constructor(x, y, space){
    this.pos = createVector(x, y);
    this.size = space;
    this.shape = 0;
    this.col = 255;
  }
  display(){
    fill(this.col);
    if(this.shape==0){
      fill(255);
      rect(this.pos.x, this.pos.y, this.size);
    } else if(this.shape==1){
      rect(this.pos.x, this.pos.y, this.size);
    } else if(this.shape==2){
      arc(this.pos.x, this.pos.y, 
          this.size*2, this.size*2, 0, HALF_PI);
    } else if(this.shape==3){
      arc(this.pos.x+this.size, this.pos.y, 
          this.size*2, this.size*2, HALF_PI, PI);
    } else if(this.shape==4){
      arc(this.pos.x+this.size, this.pos.y+this.size, 
          this.size*2, this.size*2, PI, HALF_PI+PI);
    } else if(this.shape==5){
      arc(this.pos.x, this.pos.y+this.size, 
          this.size*2, this.size*2, HALF_PI+PI, 0);
    } else if(this.shape==6){
      circle(this.pos.x+this.size/2, 
             this.pos.y+this.size/2, this.size);
    }
  }
}
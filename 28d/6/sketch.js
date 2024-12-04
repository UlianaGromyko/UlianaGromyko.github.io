let g = [];

function setup() {
  createCanvas(1790 , 960);
  noStroke();
  g[0] = new Bubble(width/2, height/2);
}

function draw() {
  background(250);
  
  for(let i=0; i<g.length; i++){
    if(g[i].grown == true){
      g[i].display();
      g[i].fall();
      if(g[i].y-g[i].size > height){
        g.splice(i, 1);
      }
    } else {
      g[i].grow();
    }
    
  }
}

function mouseClicked(){
  g[g.length] = new Bubble(mouseX, mouseY);
}

class Bubble{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = random(10, 200);
    this.growSize =0;
    this.grown = false;
  }
  display(){
    for(let i=0; i<this.size/3; i+=2){
      fill(220, 20,20, 2*i);
      circle(this.x+map(mouseX, 0, width, -i, i),
             this.y+map(mouseY, 0, height, -i, i), 
             2*this.size-4*i);
    }
  }
  fall(){
    this.y = this.y+ this.size/100;
  }
  grow(){
    for(let i=0; i<this.growSize/3; i+=2){
      fill(220, 20,20, 2*i);
      circle(this.x+map(mouseX, 0, width, -i, i),
             this.y+map(mouseY, 0, height, -i, i), 
             2*this.growSize-4*i);
    }
    if(this.size > this.growSize){
      this.growSize += 2;
    } else {
      this.grown = true;
    }
  }
}
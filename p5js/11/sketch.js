let p=[];
let size = 100;
let bounceX = 9;
let bounceY = 9;

// let font;
let shown = true;

let corners = 20;
let lineheight =25;
let tp = 5;
let l=1;

function setup() {
  createCanvas(1800, 900);
  noCursor();
  let count =0;
  for(let i=0; i<width; i+=size){
    for(let j=0; j<height; j+=size){
      p[count] = new Cube(i,j);
      count++;
    }
  }
}

function draw() {
  for(let i=0; i<p.length; i++){
    p[i].display();
  }
  explain();
}

class Cube{
  constructor(x,y){
    this.home = createVector(x,y);
    this.vel = createVector(0,0);
  }
  display(){
    if(this.home.x<0){
          this.vel.x = bounceX;
        }else if(this.home.x>width-size){
          this.vel.x = -bounceX;
        }
        
        if(this.home.y<0){
          this.vel.y = bounceY;
        }else if(this.home.y>height-size){
          this.vel.y = -bounceY;
        }
    
    this.home.add(this.vel);
    this.vel.mult(0.99);
    fill(255);
    strokeWeight(1);
    stroke(0);
    rect(this.home.x, this.home.y, size,size,4);
    
    
    if (this.home.x < mouseX && mouseX < this.home.x+size){
      if (this.home.y < mouseY && mouseY < this.home.y+size){
      
        if(movedY>0){
          this.vel.y++;
        } else if(movedY<0){
          this.vel.y--;
        }

        if(movedX>0){
          this.vel.x++;
        } else if(movedX<0){
          this.vel.x--;
        }
        
        
      }
    }
  }
}

function explain(){

   // textFont(font);
    textAlign(LEFT, CENTER);
  if (mouseIsPressed === true){
    shown=false;
    cursor(ARROW);
  }
  if(shown === true){
    
    strokeWeight(2);
    stroke(0);
    
    fill(0);
    rect(mouseX+tp, mouseY+tp, 230, lineheight*l+40, 0, corners, corners, corners);
    fill(204,255,10);
    rect(mouseX, mouseY, 230, lineheight*l+40, 0, corners, corners, corners);
    
    textSize(20);
    noStroke();
    
    fill(0);
    text('feel free to:', mouseX+15, mouseY-10+tp, 300, 60);
    l = 1;
    text('move mouse', mouseX+15, mouseY+lineheight*l+tp, 300, 60);
    l++;
  }
}
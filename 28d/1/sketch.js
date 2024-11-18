let a, b;
let speed =0;
let bg = 0; 
let fl = 255;
let c = 0;

function setup() {
  createCanvas(1790 , 960);
  a = createVector(0,400);
  b = createVector(width,400);
  noStroke();
  noCursor();
}

function draw() {
  
  
  
  
  background(bg);
  fill(fl);
  
  noStroke();
  quad(a.x, a.y, b.x, a.y, b.x, b.y, a.x, b.y);
  
  stroke(bg);
  strokeWeight(2);
  line(0, mouseY, width, mouseY);
  
  fill(fl);
  circle(mouseX, mouseY,7);
  
  a.y -= speed;
  b.y += speed;
  speed++;
}

function mouseClicked() {
  if(a.y<0 && b.y>height){
    
    a = createVector(0,mouseY);
    b = createVector(width,mouseY);
    speed = 0;
    c++;
    
    bg = fl;
    
    if(c == 1){
      fl = color('red');
    } else if (c == 2){
      fl = color('black');
    } else {
      fl = color('white');
      c = 0;
    }

    
  }
}

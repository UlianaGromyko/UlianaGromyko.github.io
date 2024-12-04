let x=[];
let y=[];
let num = 20;
let size=[];
let count=0;

function setup() {
  createCanvas(1790 , 300);
  // noStroke();
  strokeWeight(10);
  noCursor();
  fill(255);
  stroke(0);
  
  for(let i=0; i<num; i++){
    x[i] = 0;
    y[i] = 0;
    size[i] = 0;
  }
}

function draw() {
  background(0);
  circle(mouseX, height, 100);
  
  
  for(let i=0; i<num; i++){
    if(random(0,100)>99 && y[i]<-50){
      x[i] = mouseX+ random(-50, 50);
      y[i] = height;
      size[i] = random(10,80);
    }
    circle(x[i], y[i], size[i]);
    y[i] -= 10;
  }
  
  fill(0);
  stroke(250);
  strokeWeight(2);
  circle(mouseX, mouseY, 50);
  fill(255);
  stroke(0);
  strokeWeight(10);

  filter(BLUR,6);
  filter(THRESHOLD, 0.1);
}


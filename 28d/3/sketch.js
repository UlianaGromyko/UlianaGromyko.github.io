let x=[];
let y=[];
let num = 20;
let size=[];
let count=0;

function setup() {
  createCanvas(900 , 960);
  // noStroke();
  strokeWeight(10);

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
  count += 0.03;
  circle(mouseX, mouseY, map(sin(count), -1, 1, 80, 120));
  
  
  for(let i=0; i<num; i++){
    if(random(0,100)>99 && y[i]<-50){
      x[i] = mouseX+ random(-50, 50);
      y[i] = mouseY;
      size[i] = random(10,80);
    }
    circle(x[i], y[i], size[i]);
    y[i] -= 10;
  }
  
  
  //filter(BLUR,10);
  drawingContext.filter = 'blur(10px)';
  filter(THRESHOLD);
}


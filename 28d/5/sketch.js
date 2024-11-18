let p=[];

function setup() {
  createCanvas(1790 , 960);
  for(let i=0; i<100; i++){
    p[i] = createVector(random(width), random(height));
  }
}

function draw() {
  background(0);
  stroke(255);
  
  for(let i=0; i<p.length; i++){
    circle(p[i].x, p[i].y, i/5+5);
    line(mouseX,mouseY,p[i].x, p[i].y);
    
    p[i].add((mouseX-p[i].x)/60, (mouseY-p[i].y)/60);
    
    if(dist(mouseX,mouseY,p[i].x, p[i].y)<100){
      p[i] = createVector(random(width), random(height));
    }
  }
}

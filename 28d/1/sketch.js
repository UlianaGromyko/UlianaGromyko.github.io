let font, size=300, words = "a", points, a=[], bbox, lineSize=0.2, x,y, newShape=[];

function preload() {
  font = loadFont('AzeretMono-Medium.ttf');
}

function setup() {
  createCanvas(screen.availWidth - 2,   
               screen.availHeight - 170);
  
  textFont(font);
  textSize(size);
  stroke(200);
  strokeWeight(3)
  fill(20)
  angleMode(DEGREES)
  textAlign(CENTER, CENTER);
  x = width/2;
  y = height/2-150;
  
  createPoints("key");
  
  
  textSize(10);
  strokeCap(SQUARE);
}

function jiggle(){
  a = [];
  let v = createVector(mouseX, mouseY);
  let range=4;
  
  for (let p of points) {
    if (random(20)<1) {
      a.push(createVector(p.x - (v.x-p.x)*lineSize + 
                          random(0-range, 0+range), 
                          p.y - (v.y-p.y)*lineSize + 
                          random(0-range, 0+range)));
    } else {
      a.push(createVector(p.x - (v.x-p.x)*lineSize , 
                          p.y - (v.y-p.y)*lineSize ));
    }
  }
}

function draw() {
  jiggle();
  background(20);
  
  
  noFill();
  stroke(200)
  strokeWeight(2);
  beginShape();
  
  
  for (let i=0; i<a.length; i++) {
    
    line(points[i].x, points[i].y, a[i].x, a[i].y);
    if(newShape.includes(i)){
      endShape();
      beginShape();
    }
    vertex(points[i].x, points[i].y);
  }
  endShape();
  
  fill(20);
  
  let i=0;
  beginShape();
  for (let p of a) {
    
    if(newShape.includes(i)){
      endShape();
      beginShape();
    }
    
    vertex(p.x, p.y);
    i++;
  }
  endShape();
}

function keyPressed(){
  createPoints(key);
}

function createPoints(k){
  textSize(size);
  points = font.textToPoints(k, x,y, size, 
                                 { sampleFactor:  0.1 });
  
  newShape=[];
  
  for(let i=1; i<points.length; i++){
    
    if(dist(points[i].x, points[i].y, 
            points[i-1].x, points[i-1].y) > 15){
      newShape.push(i);
    }
  }
  console.log(newShape)
}

function mouseWheel(event) {
  if (event.delta > 0) {
    lineSize+=0.01;
  } else {
    lineSize-=0.01;
  }
  if(lineSize<0) lineSize=0;
}
let font, points=[], x,y, size = 100, g=[], sf=0.5, word="";

function preload(){
  font = loadFont("AzeretMono-ExtraBold.ttf");
}

function setup() {
  createCanvas(screen.availWidth - 2,   
               screen.availHeight - 170);
  textAlign(CENTER, CENTER);
  textSize(size);
  x = width/2;
  y = height/2-size;
  points = font.textToPoints("a", x,y, size, 
                      { sampleFactor:  sf });
  
  noStroke();
  
  for(let i=0; i<1000; i++){
    g[i] = new Kiki();
  }
  fill(20)
}

function draw() {
  
  textSize(20)
  
  background(200);
  // for (let p of points){
  //   point(p.x, p.y);
  // }
  text(word, width/2 , 200)
  for(let c of g){
    c.display();
  }
  
}

function getTarget(){
  let a = floor(random(points.length));
  return createVector(points[a].x-width/2, points[a].y-300);
}

function keyPressed(){
  
  if(keyCode == ENTER){
    if (word != "") {
      
      let b = size*25/word.length
      textSize(b)
      textAlign(CENTER, CENTER);
      points = font.textToPoints(word, x,y, b, 
                          { sampleFactor:  sf });
      
    } 
      
      
      for(let c of g){
        c.target = getTarget();
      }
      word="";
      
  } else if(keyCode == SHIFT){
  } else if(keyCode == BACKSPACE) {
    word = word.slice(0, word.length-1);
  } else {
    word += key;
  }
}

// function mouseClicked(){
//   if(fullscreen() != true) fullscreen(true);
// }

class Kiki{
  constructor(){
    this.pos = createVector(random(width), random(height));
    this.target = getTarget();
    this.speed = random(0.01, 0.2);
    this.size = floor(random(1, 10));
  }
  display(){
    
    //strokeWeight(this.size);
    
    
    circle(this.pos.x, this.pos.y, this.size)
    
    //line(this.pos.x, this.pos.y, 
    //this.target.x, this.target.y)
    
    this.run();
    
  }
  run(){
    this.pos = p5.Vector.lerp(this.pos, 
                              this.target, 
                              this.speed)
  }
  
}
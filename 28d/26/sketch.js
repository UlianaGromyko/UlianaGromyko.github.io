let g=[];
let horizon=600;
let n, a, s, b, f;
let t=0;

function setup() {
  createCanvas(1790 , 960);
  noCursor();
  stroke(0);
  fill(0);
  n = color(150, 200, 220); //noon
  a = color('rgb(255,223,238)'); //afternoon
  s = color(250,180,100); //sunset
  d = color('rgb(9,9,94)'); //dark
  
  b = new Backdrop(70,100,40);
  f = new Backdrop(5,10,250);
  
  let index=0;
  for(let i=0; i<width; i+=random(20,40)){
    if(random(10)<5){
      g[index] = new Tree(i,horizon);
      index++;
    } else if(random(10)<2){
      g[index] = new House(i,horizon);
      index++;
    }
  }
}

function draw() {
  
  drawSky();
  b.display();
  f.display();
  
  t++;
  if(t%3==1){
    f.run();
  }
  if(t==9){
    b.run();
    t=0;
  }
  
  
  fill(0);
  stroke(0);
  strokeWeight(2);
  
  for(let i=0; i<g.length; i++){
    g[i].display();
    g[i].pos.x--;
    if(g[i].pos.x < -50){
      g.splice(i, 1);
    }
  }
  if(random(60)<1){
      g[g.length] = new Tree(width+50,horizon);
    } else if(random(250)<1){
      g[g.length] = new House(width+50,horizon);
    }
  //rect(0, horizon, width, height-horizon);
}

class Backdrop{
  constructor(far, contrast, opacity){ // 20, 30
    this.h =[];
    this.count=0;
    this.contrast = contrast;
    this.opacity = opacity;
    this.far = far;
    for(let i=0; i<width/3+9; i++){
      this.h[i] = this.contrast * noise(0.02 * i)+horizon-this.far;
      this.count++;
    }
  }
  display(){
    stroke(0, this.opacity);
    strokeWeight(4);
    for(let i=0; i<this.h.length; i++){
      line(i*3-t/3, height, i*3-t/3, this.h[i]);
    }
  }
  run(){
    for(let i=0; i<this.h.length; i++){
      if(i != this.h.length-1){
        this.h[i] = this.h[i+1];
      } else {
        this.h[i] = this.contrast * noise(0.02 * this.count)+horizon-this.far;
        this.count++;
      }
    }
  }
}

function drawSky(){
  let hy = horizon-mouseY;
  let sky;
  if(hy > 200){
    sky = color(map(hy, horizon, 200, red(n), red(a)),  
                map(hy, horizon, 200, green(n), green(a)),  
                map(hy, horizon, 200, blue(n), blue(a)));
  } else if(hy>0){
    sky = color(map(hy, 0, 200, red(s),red(a)), 
                map(hy, 0, 200, green(s),green(a)), 
                map(hy, 0, 200, blue(s), blue(a)));
  } else {
    sky = color(map(mouseY, horizon, height, red(s),red(d)), 
                map(mouseY, horizon, height, green(s),green(d)), 
                map(mouseY, horizon, height, blue(s), blue(d)));
  }
  
  
  let sun = color(255, hy*0.2+130,hy*0.25);
  noStroke();

  background(sky);
  fill(sun);
  circle(mouseX, mouseY, 40); 
}

class House{
  constructor(x,y){
    this.pos = createVector(x, y);
    this.size = createVector(random(30,50), random(10,30));
    this.roof = random(5, 20);
    this.other = floor(random(3));
  }
  display(){
    rect(this.pos.x, this.pos.y-this.size.y, this.size.x, this.size.y);
    triangle(this.pos.x, this.pos.y-this.size.y, 
             this.pos.x+this.size.x, this.pos.y-this.size.y, 
             this.pos.x+this.size.x/2, this.pos.y-this.size.y-this.roof);
    if(this.other == 0 || this.other == 2){
      rect(this.pos.x-this.size.x/3, this.pos.y-this.size.y*0.6, 
         this.size.x/3, this.size.y*0.6);
    }
    if(this.other == 1 || this.other == 2){
      rect(this.pos.x+this.size.x, this.pos.y-this.size.y*0.6, 
         this.size.x/3, this.size.y*0.6);
    }
  }
}

class Tree{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.h = random(40, 60);
    this.b = random(5, 15);
    this.leaves = [];
    for(let i=0; i<this.h-this.b; i++){
      this.leaves[i] = random(i/2);
    }
  }
  display(){
    triangle(this.pos.x-this.h/20, this.pos.y, 
             this.pos.x+this.h/20, this.pos.y, 
             this.pos.x, this.pos.y-this.h);
    for(let i=0; i<this.leaves.length; i++){
      line(this.pos.x-this.leaves[i], this.pos.y-this.h+i, 
           this.pos.x+this.leaves[i], this.pos.y-this.h+i)
    }
  }
}
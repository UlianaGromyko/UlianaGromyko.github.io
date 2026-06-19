// sound from https://freesound.org/people/ironcross32/packs/32802/

let stage="¶@§$%#&84AG0‡©CV7✓khgj±i?!†l1\|/<>oc*=+~-;:•®™°,.";
let font;
let g=0;
let arr=[];
let mySound2;

function preload(){
  font = loadFont("IBMPlexMono-Light.ttf");
  mySound2 = loadSound('purr.wav');
}

function setup() {
  createCanvas(screen.availWidth - 2,   
               screen.availHeight - 170);
  textFont(font);
  textSize(30);
  frameRate(30);
  
  fill(50);
  noStroke();
  noCursor();
}

function draw() {
  background(200);
  
  fill(50);
  for(let i=0; i<arr.length; i++){
    arr[i].run();
    arr[i].multiply(10);
    
    if(arr[i].pos.length<1){
      arr.splice(i,1);
    }
  }
  fill(200,20,20);
  text("*", mouseX, mouseY);
}

function mouseClicked(){
  arr.push(new Flame(mouseX, mouseY));
  mySound2.play();
  
}

class Flame{
  constructor(x,y){
    this.pos = [];
    this.pos[0] = createVector(x, y);
    this.vel = [];
    this.vel[0] = createVector(0,0);
    this.orgin = createVector(x, y);
    this.letter = [];
    this.letter[0] = round(random(stage.length));
    this.boom = round(random(10,30));
  }
  multiply(cap){
    if (this.boom>0) {
      let i = floor(random(this.pos.length));
      let a = 10;
      this.pos.push(createVector(
        this.pos[0].x+random(-a,a),
        this.pos[0].y+random(-a,a)));
      
      this.vel.push(createVector(
        random(-a,a),random(-a,a)));
      
      this.letter.push(round(random(stage.length)));
      
      this.boom--;
    }
  }
  run(){
    for(let i=0; i<this.pos.length; i++){
      
      if(this.letter[i]<stage.length){
      
        text(stage.charAt(this.letter[i]), 
             this.pos[i].x, this.pos[i].y);
        
        this.pos[i] = otherSideReturn(this.pos[i]);

        this.pos[i].add(this.vel[i]);
        this.vel[i].mult(random(0.8, 0.99));
        
        if(random(10)<3) this.letter[i] = round(random(this.letter[i], stage.length));
      } else if(i!=0 || this.boom<1){
        this.pos.splice(i,1);
        this.vel.splice(i,1);
        this.letter.splice(i,1);
      }
    }
  }
}

function otherSideReturn(v){
  if     (v.x < 0) v.x = width;
  else if(v.y < 0) v.y = height;
  if     (v.x > width)  v.x = 0;
  else if(v.y > height) v.y = 0;
  
  return v;
}
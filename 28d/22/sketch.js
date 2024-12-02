let font;
let lines=60;
let t;
let pos;
let keys=[];

function preload(){
  font = loadFont('bogam.ttf');
}
function setup() {
  createCanvas(1790, 960);
  stroke(255, 100);
  t = new Type('type!');
  t.pos = createVector(50,700);
}

function draw() {
  background(30,100,200);
  if(keys.length<1){
    t.display();
  } else {
    for(let i=0; i<keys.length; i++){
      keys[i].display();
    }
  }
  if(lines>40){
    lines= lines*0.99;
  }
}

function mouseClicked(){
  lines = 300;
}

function keyTyped(){
  if(keys.length>5){
    keys.splice(0,1);
  } 
  keys.push(new Type(key));
  
}

class Type{
  constructor(t){
    this.t = t;
    this.pos = createVector(random(50,1300),random(800,400));
  }
  display(){
    let points = font.textToPoints(
    this.t, this.pos.x, this.pos.y, 600, { sampleFactor:  0.04 });

    for (let p of points) {
      let a = p5.Vector.fromAngle(p.alpha*PI/180, lines);
      let b = p5.Vector.fromAngle((p.alpha-180)*PI/180, lines);
      a.add(p.x, p.y);
      b.add(p.x, p.y);
      if(random(100)<50){
        a.add(random(-2,2),random(-2,2));
        b.add(random(-2,2),random(-2,2));
      }
      line(a.x, a.y, b.x, b.y);
    }
  }
}
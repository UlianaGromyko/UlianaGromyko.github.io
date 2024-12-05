let p=[];
let space =50;
let interval = 20;
let t=0;
let size=25;

function setup() {
  createCanvas(1790 , 960);
  fill(200,20,20);
  strokeWeight(3);
  stroke(0)
  p[0] = new Thing(width/2, height/2);
  
  background(200,20,20);
}

function draw() {
  t++
  for(let i=0; i< p.length; i++){
    p[i].display();
  }
  
  
  if(t==interval){
    
    background(200,20,20,10);
    let a = floor(random(p.length));
    p.push(new Thing(p[a].pos.x, p[a].pos.y));
    for(let i=0; i< p.length; i++){
      p[i].run();
      if(p[i].outside()){
        p.splice(i, 1);
      }
    }
    t=0;
  }
  
}

function mouseClicked(){
  interval +=5;
  size= size/5*4;
}

class Thing{
  constructor(x, y){
    this.pos = createVector(x,y);
    this.before = createVector(x,y);
  }
  display(){
    let x = map(t, 0, interval, this.before.x, this.pos.x);
    let y = map(t, 0, interval, this.before.y, this.pos.y);
    //line(this.pos.x, this.pos.y, this.before.x, this.before.y);
    circle(x, y, size);
  }
  run(){
    let angle = floor(random(6));
    
    // if(movedX > 0){
    //   if(abs(movedY)<2)    {angle = 0}
    //   else if(movedY>0)    {angle = 5}
    //   else if(movedY<0)    {angle = 1}
    // } else if (movedX < 0){
    //   if(abs(movedY)<2)    {angle = 3}
    //   else if(movedY>0)    {angle = 4}
    //   else if(movedY<0)    {angle = 2}
    // }
    
    let n = p5.Vector.fromAngle(angle*PI/3, space);
    n.add(this.pos);
    this.before = this.pos.copy();
    this.pos = n.copy();
  }
  outside(){
    if((this.pos.x < 0 ||
       this.pos.x > width ||
       this.pos.y < 0 ||
       this.pos.y > height) && (
       this.before.x < 0 ||
       this.before.x > width ||
       this.before.y < 0 ||
       this.before.y > height)){
      return true;
    } else {
      return false;
    }
  }
}
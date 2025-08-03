let g=[], t=0, direction=1, change=0.1, length=40, ashFrom=length, ashTo, out=false;

function setup(){
  createCanvas(screen.availWidth - 2,   
               screen.availHeight - 170);
  for(let i=0; i<5; i++){
    g[i] = new Smoke();
  }
  noFill();
  noCursor();
}

function mouseClicked(){
  ashFrom=length;
}

function draw(){
  t+=0.03;
  if (length > 0) length = (300 - floor(millis()/1000))/7.5;
  else out = true;
  
  background(200);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
  
  for(let i=0; i<g.length; i++){
    g[i].display(i);
    g[i].run(t, i*100);
  }
  
  cigarette(direction);
  
  direction = constrain(direction+change, -1, 1);
  
  
  if(movedX < 0) change = 0.2;
  else if(movedX > 0) change = -0.2;
}

function cigarette(l){
  //strokeCap(SQUARE);
  strokeWeight(8);
  
  stroke("orange");
  line(mouseX+(length+20)*l, height-100, 
       mouseX+length*l, height-100);
  
  stroke(250);
  line(mouseX,      height-100, 
       mouseX+length*l, height-100)
  
  if (out) {
    stroke(20,150);
  } else {
  let gb = random(20,100)
  stroke(200,gb,gb);
  }
  line(mouseX, height-100, 
       mouseX, height-100);
  
  ashTo = length-ashFrom;
  stroke(130, 70);
  line(mouseX, height-100, 
       mouseX+l*ashTo, height-100);
  
  
  strokeWeight(1);
  stroke(120,60);
  strokeCap(ROUND);
}

class Smoke{
  constructor(){
    this.p=[];
    this.age=[];
    this.vel=[];
    this.m=[];
    
    this.p[0] = createVector(mouseX, mouseY);
    this.age[0] = 0;
    this.vel[0] = 0;
    this.m[0] = 0;
  }
  display(thick){
    strokeWeight(thick);
    beginShape();
    for(let i=0; i<this.p.length; i++){
      vertex(this.p[i].x, this.p[i].y);
      this.age[i]++;
    }
    endShape();
  }
  run(time, randomness){
    let deleteHere = -1;
    for(let i=0; i<this.p.length; i++){
      
      this.p[i].add(
        this.vel[i]*(this.age[i]/60) + 
        (400-this.age[i])/10*this.m[i],
        -86/this.age[i]-0.5);
      
      if(this.p[i].y < 0) deleteHere = i;
    }
    
    if(deleteHere != -1) {
      this.p.splice(deleteHere, 1);
      this.age.splice(deleteHere, 1);
      this.vel.splice(deleteHere, 1);
      this.m.splice(deleteHere, 1);
    }
    
    if(!out){
    this.p.push(createVector(mouseX + random(1.3,1.7), 
                             height-100));
    this.age.push(0);
    this.vel.push(cos(time+randomness)/2 + 
                  (noise(time+randomness)-0.5));
      
    this.m.push((-constrain(movedX, -20, 20)/300));
    }
  }
}
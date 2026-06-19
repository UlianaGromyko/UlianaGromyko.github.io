let button1, button2;
let angle1, angle2;


function setup() {
  createCanvas(screen.availWidth - 2,   
               screen.availHeight - 170);
  button1 = new Button(width/2+100, height/2+100);
  button2 = new Button(width/2+400, height/2+100);
}

function draw() {
  background(220);
  
  button1.display();
  button2.display();
  
  if(button1.animated){
    if(angle1<PI){
      angle1 += 0.01;
    } else {
      angle1 = -PI;
    }
  } else {
    angle1 = map(mouseX, 0, width, -PI, PI);
  }
  
  
  if(button2.animated){
    if(angle2>-PI){
      angle2 -= 0.03;
    } else {
      angle2 = PI;
    }
  } else {
    angle2 = map(mouseY, 0, height, -PI, PI);
  }
  
  explain();
  
  let n=[];
  n[0] = new Section(200, height/2, 0, 0);
  for(let i=0; i<16 ;i++){
    n.push(n[i].splits(angle1, i));
    if(i>0){
      n.push(n[i].splits(angle2, i));
    }
  }
  for(let i=0; i<n.length ;i++){
    
    if(i%2 == 0){
      stroke(200, 20, 20);
    } else {
      stroke(100, 100,100);
    }
    n[i].display(n[n[i].parent].p);
    
    textSize(10);
    noStroke();
    fill(0);
    text(i, n[i].p.x, n[i].p.y);
    fill(200,0,0);
    text(n[i].gen, n[i].p.x, n[i].p.y+20);
  }
  
  
}

function mousePressed() {
  if (mouseX > button1.a.x && 
      mouseX < button1.a.x+button1.s.x &&
      mouseY > button1.a.y && 
      mouseY < button1.a.y+button1.s.y) {
    if(button1.animated){
      button1.animated = false;
    } else {
      button1.animated = true;
    }
  }
  
  if (mouseX > button2.a.x && 
      mouseX < button2.a.x+button2.s.x &&
      mouseY > button2.a.y && 
      mouseY < button2.a.y+button2.s.y) {
    if(button2.animated){
      button2.animated = false;
    } else {
      button2.animated = true;
    }
  }
}

function explain(){
  
  noStroke();
  textAlign(LEFT, TOP);
  fill(200,20,20);
  textSize(80);
  text('this is a fractal tree', 
       width/2+100, height/2-200);
  
  textSize(20);
  text('each branch splits itself in two', 
       width/2+100, height/2-100);
  text('you are controlling the angles between the branches', width/2+100, height/2-70);
  
  text('red angle:', 
       width/2+100, height/2+30);
  text('grey angle:', 
       width/2+400, height/2+30);
  text(`${floor(map(angle1, -PI, PI, -180,180))}˚`, 
       width/2+100, height/2+60);
  text(`${floor(map(angle2, -PI, PI, -180,180))}˚`, 
       width/2+400, height/2+60);
}

class Section{
  constructor(x, y, generation, i){
    this.p = createVector(x,y);
    this.gen = generation;
    this.parent = i;
  }
  splits(angle, parent){
    let v = p5.Vector.fromAngle(angle*this.gen, 200-this.gen*30);
    v.add(this.p.x, this.p.y);
    let a = new Section(v.x, v.y, this.gen+1, parent);
    return a;
  }
  display(from){ //the this.p of the previous Section
    strokeWeight(6-this.gen);
    line(from.x, from.y, this.p.x, this.p.y);
    
  }
}

class Button{
  constructor(x,y){
    this.a = createVector(x,y);
    this.s = createVector(120, 50);
    this.animated = false;
  }
  display(){
    let bg,  fl, txt;
    if(this.animated == true){
      bg = color(220);
      fl = color(200,20,20);
      stroke(fl);
      txt = 'stop';
    } else {
      bg = color(200,20,20);
      fl = color(220);
      noStroke();
      txt = 'animate';
    }
    
    fill(bg);
    rect(this.a.x, this.a.y, this.s.x, this.s.y, 10);
    fill(fl);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(txt, this.a.x+this.s.x/2, this.a.y+this.s.y/2);
  }
}
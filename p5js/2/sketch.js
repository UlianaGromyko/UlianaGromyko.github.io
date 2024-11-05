let p = [];
let room = 30;
let x=room;
let y=room;
let cursorSize= 50;

// let font;
let shown = true;

let corners = 20;
let lineheight =25;
let tp = 5;
let l=1;


function setup() {
  createCanvas(1790, 960);
  fill(0);
  noStroke();
  noCursor();

  
  
  for(i=0; i< (width*height/ sq(room-1)) ; i++){
    
    p.push(new Particle(x,y));
    
    if(x< width-room){
      x += room;
    } else {
      y += room;
      x = room;
    }
    
    
  } 
  
  
  
}

function draw() {
  background(0, 40);
  fill(0);
  circle(pmouseX, pmouseY, cursorSize+2);
  
  for(i=0; i< (width*height/ sq(room-1)); i++){
    p[i].update();
    p[i].display();
  }


  fill(204,255,30);
  if(shown != true){
  circle(mouseX, mouseY, cursorSize);
}
  explain();
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    //this.color = color(random(200,250),random(150,240),random(150,230));
  }

  update() {

    
      let influence = createVector(movedX, movedY);
      influence.mult(0.5);  //the higher, the more powerful the influence 
      this.acc.add(influence);
      this.acc.div(dist(pmouseX, pmouseY, this.pos.x, this.pos.y));

      this.vel.add(this.acc);
      this.vel.mult(0.99);   // the lower, the stiffer, the quicker stabilisation
    this.pos.add(this.vel);
  }

  display() {
    fill(255);
    circle(this.pos.x, this.pos.y, 3);
  }
}


function explain(){

   // textFont(font);
    textAlign(LEFT, CENTER);
  if (mouseIsPressed === true){
    shown=false;
    
  }
  if(shown === true){
    strokeWeight(2);
    stroke(0);
    fill(0);
    rect(pmouseX+tp, pmouseY+tp, 230, lineheight*l+40, 0, corners, corners, corners);
    rect(pmouseX, pmouseY, 230, lineheight*l+40, 0, corners, corners, corners);
    
    strokeWeight(2);
    stroke(0);
    
    fill(0);
    rect(mouseX+tp, mouseY+tp, 230, lineheight*l+40, 0, corners, corners, corners);
    fill(204,255,10);
    rect(mouseX, mouseY, 230, lineheight*l+40, 0, corners, corners, corners);
    
    textSize(20);
    noStroke();
    
    fill(0);
    text('feel free to:', mouseX+15, mouseY-10+tp, 300, 60);
    l = 1;
    text('move your mouse', mouseX+15, mouseY+lineheight*l+tp, 300, 60);
    l++;
    text('and create chaos!', mouseX+15, mouseY+lineheight*l+tp, 300, 60);
    l++;
  }
}
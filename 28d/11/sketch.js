let pos;
let target;
let velocity;
let spring = 0.05; // Spring stiffness, controls how strong the pull is back to the target
let damping = 0.9; // Damping factor, controls how quickly the motion slows down

// let font;
let shown = true;

let corners = 20;
let lineheight =25;
let tp = 5;
let l=1;

function setup() {
  createCanvas(screen.availWidth - 2,   
               screen.availHeight - 170);
  noCursor();
  pos = createVector(0,0); // Start at point A
  target = createVector(mouseX, mouseY); // Target point B
  velocity = createVector(0, 0); // Initial velocity
}

function draw() {
  background(207,255,10);
  target = createVector(mouseX, mouseY+100);

  // Calculate the spring force
  let force = p5.Vector.sub(target, pos);
  force.mult(spring);

  // Apply the force to the velocity
  velocity.add(force);

  // Apply damping to slow down over time
  velocity.mult(damping);

  // Update the position with the velocity
  pos.add(velocity);

  // Draw start, target, and the moving point
  fill(0);
  stroke(0);
  bezier(0,0,pos.x,pos.y,pos.x,pos.y,width,0);
  bezier(0,0,pos.x,pos.y,pos.x,pos.y,0,height);
  bezier(width,0,pos.x,pos.y,pos.x,pos.y,width,height);
  bezier(0,height,pos.x,pos.y,pos.x,pos.y,width,height);
  
  fill(207,255,10);
  blendMode(DIFFERENCE);
  if(shown != true){

  circle(mouseX, mouseY, 50);
  }
  
  blendMode(BLEND);
  explain();
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
    rect(mouseX+tp, mouseY+tp, 230, lineheight*l+40, 0, corners, corners, corners);
    fill(204,255,10);
    rect(mouseX, mouseY, 230, lineheight*l+40, 0, corners, corners, corners);
    
    textSize(20);
    noStroke();
    
    fill(0);
    text('feel free to:', mouseX+15, mouseY-10+tp, 300, 60);
    l = 1;
    text('move mouse', mouseX+15, mouseY+lineheight*l+tp, 300, 60);
    l++;
    text('act out a dramatic', mouseX+15, mouseY+lineheight*l+tp, 300, 60);
    l++;
    text('monologue', mouseX+15, mouseY+lineheight*l+tp, 300, 60);
    l++;
  }
}
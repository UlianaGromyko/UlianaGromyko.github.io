let gridSize = 50; // Size of each grid cell
let cols, rows; // Number of columns and rows in the grid
let circles = []; // Array to store circle objects
let moveProbability = 0.005; // Probability of a circle moving to a neighbor
let moveSpeed = 0.1; // Speed of the movement

// let font;
let shown = true;

let corners = 20;
let lineheight =25;
let tp = 5;
let l=1;

function setup() {
  noCursor();
  createCanvas(1790 , 960);
  cols = width / gridSize;
  rows = height / gridSize;

  // Initialize each circle with its home position
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * gridSize + gridSize / 2;
      let y = j * gridSize + gridSize / 2;
      circles.push(new Circle(x, y));
    }
  }
}

function draw() {
  background(255,10);

  // Update and display each circle
  for (let circle of circles) {
    circle.update();
    circle.show();
  }
  explain();
}

class Circle {
  constructor(x, y) {
    this.home = createVector(x, y); // Home position
    this.current = this.home.copy(); // Current position starts at home
    this.target = this.home.copy(); // Target position (where it's moving to)
  }

  update() {
    // Randomly move to a neighboring cell with a certain probability
    if (random(1) < moveProbability && movedX ===0 && movedY===0) {
      // Randomly choose a neighboring direction
      
      let offsetX = floor(random(-1, 1)) * gridSize;
      let offsetY = floor(random(-1, 1)) * gridSize;
      
      if(this.current.x <0){
        offsetX = floor(random(0, 2)) * gridSize;
      } else if(this.current.x >width){
        offsetX = floor(random(-1, 1)) * gridSize;
      }
      
      if(this.current.y <0){
        offsetY = floor(random(0, 2)) * gridSize;
      } else if(this.current.x >height){
        offsetY = floor(random(-1, 1)) * gridSize;
      }

      // Set the target to the new position
      this.target = createVector(this.home.x + offsetX, this.home.y + offsetY);
    }

    // Smoothly interpolate between current position and target position
    this.current.lerp(this.target, moveSpeed);
  }

  show() {
    fill(0);
    noStroke();
    ellipse(this.current.x, this.current.y, 20, 20); // Draw the circle
    
    stroke(0);
    strokeWeight(10);
    line(this.current.x, this.current.y, this.home.x, this.home.y);
  }
}

function explain(){

   // textFont(font);
    textAlign(LEFT, CENTER);
  if (mouseIsPressed === true){
    shown=false;
    cursor(ARROW);
  }
  if(shown === true){
    
    strokeWeight(2);
    stroke(255);
    fill(255);
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
    text('move mouse', mouseX+15, mouseY+lineheight*l+tp, 300, 60);
    l++;
    text('stay still', mouseX+15, mouseY+lineheight*l+tp, 300, 60);
    l++;
    text('notice the difference', mouseX+15, mouseY+lineheight*l+tp, 300, 60);
    l++;
  }
}
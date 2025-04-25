
let cols = 15;  // Number of columns
let rows = 15;  // Number of rows
let cellSize; // Size of each cell
let spread = 60;

// let font;
let shown = true;

let corners = 20;
let lineheight =25;
let tp = 5;
let l=1;

// function preload() {
//   font = loadFont('Outfit-SemiBold.ttf');
// }

function setup() {
  createCanvas(1790 , 960);
  cellSize = windowWidth / cols; // Assuming a square canvas

  noCursor();
}

function mouseClicked() {
  if (spread < 200) {
    spread = spread +50;
  } else {
    spread = 50;
  }
}

function draw() {

  background(255);

  fill(0);
  stroke(255);
  strokeWeight(1);

  
  for (let i = 0; i < cols+1; i++) {
    for (let j = 0; j < rows+1; j++) {
      let x = i * cellSize ;
      let y = j * cellSize ;
      
      let d = dist(x,y,mouseX,mouseY);
      
      rect(x-cellSize/2,y-cellSize/2,cellSize,cellSize, spread/(d/30));
      
      
    }
    
  }
  
  explain();
  translate(cellSize/2, cellSize/2);
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
    text('click & move mouse', mouseX+15, mouseY+lineheight*l+tp, 300, 60);
    l++;
  }
}
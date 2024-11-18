let bg =[];
let fg =[];
let space =30;
let fspace =100;

function setup() {
  createCanvas(1790 , 960);
  noStroke();
  noCursor();
  let index =0;
  for(let i=-space*4; i<height+space*4; i += space){
    for(let j=space*-4; j<width+space*4; j += space){
      bg[index] = createVector(j, i);
      index++;
    }  
  }
  let index1 =0;
  for(let i=0; i<height+fspace; i += fspace){
    for(let j=0; j<width+fspace; j += fspace){
      fg[index1] = createVector(j, i);
      index1++;
    }  
  }
}

function draw() {
  background(0);
  fill(255);
  for(let j=0; j<bg.length; j++){
      circle(bg[j].x + map(mouseX, 0, width, 20,-20), bg[j].y + map(mouseY, 0, height, 20,-20), 2); 
  } 
  
  fill('red');
  circle(width/2 + map(mouseX, 0, width, -10,10), height/2 + map(mouseY, 0, height, -10,10), 100); 
  
  fill(255);
  for(let j=0; j<fg.length; j++){
      circle(fg[j].x + map(mouseX, 0, width, -100,100), fg[j].y + map(mouseY, 0, height, -100,100), 10); 
  } 
  
  
}
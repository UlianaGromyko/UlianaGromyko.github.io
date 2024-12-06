let margin = 20;
let depth = 70;
let facingWall=[];
let backWall=[];
let blocks=[];
let a, b, bulb;
let bulbSize = 100;
let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: true };

function preload() {
  // Load the faceMesh model
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(1790, 960);
  initiateWalls();
  noStroke();
  textAlign(CENTER, CENTER);
  
  video = createCapture(VIDEO, {flipped: true});
  video.size(width, height);
  video.hide();
  faceMesh.detectStart(video, gotFaces);
  bulb = createVector(width/2, height/2);
}

function draw() {
  background(10);
  drawWalls();
  for(let i=0; i<blocks.length; i++){
    blocks[i].display();
  }
    
    for(let i=0; i<faces.length; i++){
    bulb = createVector((faces[0].keypoints[159].x+
                         faces[0].keypoints[386].x)/2,
                        (faces[0].keypoints[386].y+
                         faces[0].keypoints[159].y)/2);
    bulbSize = floor(dist(faces[0].keypoints[159].x,
                      faces[0].keypoints[159].y,
                      faces[0].keypoints[386].x, 
                      faces[0].keypoints[386].y)) /7;
    }
  
    
    noStroke();
    fill(230);
    circle(bulb.x, bulb.y, bulbSize);
  for(let i=0; i<10; i++){
    fill(200, 10);
    circle(bulb.x, bulb.y, bulbSize*i);
  }
    
  
}

function initiateWalls(){
  facingWall[0] = createVector(margin, margin);
  facingWall[1] = createVector(width-margin, margin);
  facingWall[2] = createVector(width-margin, height-margin);
  facingWall[3] = createVector(margin, height-margin);
  
  backWall[0] = createVector(facingWall[0].x+depth*2, facingWall[0].y+depth);
  backWall[1] = createVector(facingWall[1].x-depth*2, facingWall[1].y+depth);
  backWall[2] = createVector(facingWall[2].x-depth*2, facingWall[2].y-depth*2);
  backWall[3] = createVector(facingWall[3].x+depth*2, facingWall[3].y-depth*2);
}

function drawWalls(){
  let min = 0+bulbSize*0.09;
  let max = 20+bulbSize*0.1;
  let sensor = 200;
  
  
  fill(map(dist(bulb.x, bulb.y, width/2, height/2), 0, sensor, max, min));
  quad(backWall[0].x, backWall[0].y, 
       backWall[1].x, backWall[1].y, 
       backWall[2].x, backWall[2].y, 
       backWall[3].x, backWall[3].y); //back wall
  
  fill(map(bulb.y, height/2, height/2+sensor, max, min));
  quad(facingWall[0].x, facingWall[0].y, 
       facingWall[1].x, facingWall[1].y, 
       backWall[1].x, backWall[1].y, 
       backWall[0].x, backWall[0].y); //ceiling
  
  fill(map(bulb.y, height/2, height/2+sensor, min, max));
  quad(facingWall[3].x, facingWall[3].y, 
       facingWall[2].x, facingWall[2].y, 
       backWall[2].x, backWall[2].y, 
       backWall[3].x, backWall[3].y);  // floor
  
  fill(map(bulb.x, width/2, width/2+sensor, min, max));
  quad(backWall[2].x, backWall[2].y, 
       backWall[1].x, backWall[1].y, 
       facingWall[1].x, facingWall[1].y, 
       facingWall[2].x, facingWall[2].y) //right wall
  
  fill(map(bulb.x, width/2, width/2+sensor, max, min));
  quad(backWall[0].x, backWall[0].y, 
       backWall[3].x, backWall[3].y, 
       facingWall[3].x, facingWall[3].y, 
       facingWall[0].x, facingWall[0].y) //left wall
}

function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}
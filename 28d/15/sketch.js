let a = [];
let b = [];
let l = 30;
let t=0;

function setup() {
  createCanvas(1790 , 960);
  for(let i=0; i<l; i++){
    a[i] = createVector(0,0);
    b[i] = createVector(0,0);
  }
  noFill();
  stroke(0, 20);
  strokeWeight(20);
  noCursor();
}

function draw() {
  background(0);
  if(t%3 ==0){
    arrayCopy(a, 0, b, 0, l);
  }
  
  strokeWeight(2);
  circle(mouseX, mouseY, 20);
  
  if(t%1 == 0){
  for(let i=a.length-1; i>0; i--){
    a[i] = a[i-1];
  }
    a[0] = createVector(mouseX, mouseY);
  }
  
      

      stroke(160, 0,0);
      strokeWeight(20);
  
  let v = b.length-1;
  bezier(b[v].x, b[v].y,
        b[v-1].x, b[v-1].y, 
        b[v-2].x, b[v-2].y, 
        b[v-3].x, b[v-3].y);
  
  t++;
}

function mouseClicked(){
  for(let i=0; i<l; i++){
    
    b[i] = createVector(random(width), random(height));
  }
}


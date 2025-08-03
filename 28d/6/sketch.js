

function setup() {
  createCanvas(screen.availWidth - 2,   
               screen.availHeight - 170);
  noCursor();
  stroke(20);
}

function draw() {
  background(200);
  for(let x=0; x<width; x+=20){
    for(let y=0; y<height; y+=20){
      let d=dist(x,y,mouseX, mouseY);
      d = map(d, 0, width, 1, 100)
      line(x,y,x+movedX/d*2, y+movedY/d*2);
    }
  }
  
}


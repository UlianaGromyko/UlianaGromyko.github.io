let start;
let p =[];
let maxLength = 600;

// let font;
let shown = true;

let corners = 20;
let lineheight =25;
let tp = 5;
let l=1;

function setup(){
	createCanvas(1790 , 960);
	p[0] = new Branch(width/2, height/2);
  
	background(200);
  noCursor();

}

function draw(){
    background(200,30);
	noFill();
	stroke(0);
    
    

	for(let i = 0; i < p.length ; i++) {
		p[i].update();
      
      if(random(0,100)>98 && p.length <maxLength){
		p.push(new Branch(p[i].start.x, p[i].start.y));
    
      if(mouseIsPressed === true){
      p[i].start = createVector(mouseX, mouseY);
      }
    } else if(p.length >= maxLength){
      p = shorten(p);
      
    }
      
      
	}
	explain();
	
}


class Branch {
	constructor(x, y){
		this.start = createVector(x,y);
		this.direct = createVector(random(-1,1),random(-1,1));
		

	}

	update(){
      
      let rx = random(-1,1);
      let ry = random(-1,1);
      
      if(this.start.x < width/2 && random(0,100)>90) {
        rx = random(-1,2);
      }else if(this.start.x > width/2 && random(0,100)>90) {
        rx = random(-2,1);
      }else{
        rx = random(-1,1);
      }
      
      if(this.start.y < height/2 && random(0,100)>90) {
        ry = random(-1,2);
      }else if(this.start.y > height/2 && random(0,100)>90) {
        ry = random(-2,1);
      }else{
        ry = random(-1,1);
      }
      
    
    this.direct.mult(1*rx,1*ry);
    this.direct.add(5*rx,5*ry);
      
      if (random(0,100)>10) {
        
    this.direct = createVector(rx,ry);
      }

	let x = this.start.x +this.direct.x;
	let y = this.start.y +this.direct.y;

	strokeWeight(2);
	line(this.start.x, this.start.y, x, y);

	this.start.x = x;
	this.start.y = y;
  
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
    stroke(200);
    fill(200);
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
    text('click & move mouse', mouseX+15, mouseY+lineheight*l+tp, 300, 60);
    l++;
    text('wait to let them spread', mouseX+15, mouseY+lineheight*l+tp, 300, 60);
    l++;
  }
}
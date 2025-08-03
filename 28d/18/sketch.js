let start;
let weight;
let p =[];
let maxP = 1000;


function setup(){
  createCanvas(screen.availWidth - 2,   
               screen.availHeight - 170);
	weight = random(30,40);
	p[0] = new Branch(width/2, height/2, weight);
  
	background(204,255,30);

}

function draw(){
    background(0,10);
	noFill();
	stroke(204,255,30);
    
    

	for(let i = 0; i < p.length ; i++) {
		p[i].update();
      
      if(random(0,100)>98 && p.length <maxP){
		p.push(new Branch(p[i].start.x, p[i].start.y, weight));
        
    } 
    
      if(p.length >= maxP){
      
        let outside = 0;
        let inside = 0;
      
        for(let i = 0; i < p.length ; i++) {
          if(( p[i].start.x<0 ||  p[i].start.x>width) && (p[i].start.y<0 || p[i].start.y>height)){
            outside++;
          } else {
            inside++;
          }
        }
      
      if(outside > inside*10){ //most points are outside the canvas
        console.log(outside, inside);
        p = [];
        p[0] = new Branch(width/2, height/2, weight);
        p.direct = createVector(random(-1,1),random(-1,1));
      }
    }
      
      
	}
}


class Branch {
	constructor(x, y, weight){
		this.start = createVector(x,y);
		this.weight = weight;
		this.direct = createVector(random(-1,1),random(-1,1));
		

	}

	update(){
      
      let rx, ry;
      
        rx = random(-1,1);
     
        ry = random(-1,1);
      
      
    
        this.direct.add(rx,ry);
      
      

	let x = this.start.x +this.direct.x;
	let y = this.start.y +this.direct.y;

	line(this.start.x, this.start.y, x, y);

	this.start.x = x;
	this.start.y = y;
    
	weight = weight*0.96;
	}
}
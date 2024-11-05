let start;
let weight;
let p =[];
let limit = 90;



function setup(){
  createCanvas(1790 , 960);
  weight = random(30,40);
  p[0] = new Branch(width/2, height/2, weight);
  
  background(204,255,30);

}

function draw(){
    background(0,limit/10);
  noFill();
  stroke(204,255,30);
    
    

  for(let i = 0; i < p.length ; i++) {
    p[i].update();
      
      if(random(0,100)<20 ){
        let j = floor(random(0,p.length));
        p[i] = new Branch(p[j].start.x, p[j].start.y);
        }
      
      
      if(random(0,100)>98 && p.length <limit){
    p.push(new Branch(p[i].start.x, p[i].start.y, weight));
        
      }
    }
  
    
  
  console.log(p.length);

  
}


class Branch {
  constructor(x, y, weight){
    this.start = createVector(x,y);
    this.weight = weight;
    this.direct = createVector(random(-1,1),random(-1,1));
    

  }

  update(){
      
      let rx, ry;
      
      if(this.start.x < 30) {
        rx = random(0,1);
      }else if(this.start.x > width-30) {
        rx = random(-1,0);
      }else{
        rx = random(-1,1);
      }
      
      if(this.start.y < 30) {
        ry = random(0,1);
      }else if(this.start.y > height-30) {
        ry = random(-1,0);
      }else{
        ry = random(-1,1);
      }
      
      rx = rx*5;
      ry = ry*5;
      
    
    this.direct.add(rx,ry);
      if (random(0,100)>80){
        this.direct = createVector(rx,ry);
      }

  let x = this.start.x +this.direct.x;
  let y = this.start.y +this.direct.y;

  line(this.start.x, this.start.y, x, y);

  this.start.x = x;
  this.start.y = y;
    
  weight = weight*0.96;
  }
}
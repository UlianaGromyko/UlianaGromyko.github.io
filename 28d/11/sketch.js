let video;
let p=[];

function setup() {
  createCanvas(1790, 1160);
  
  textSize(20);
  video = createCapture(VIDEO,{ flipped:true });
  video.hide();
  video.size(width,height);
  textFont();
  let index=0;
  for(let i=0; i<width; i+=textSize()){
    for(let j=0; j<height; j+=textSize()){
      p[index] = new Char('&', i, j);
      index++;
    }
  }
  textSize(17);
}

function draw() {
  background(0);
  fill(255);
  stroke(255);
  //noStroke();
  video.loadPixels();
  console.log(video.pixels[300]);
  
  for(let i=0; i<p.length; i++){
    text(p[i].c , p[i].x, p[i].y);
    p[i].update(video);
  }
  
}

class Char{
  constructor(c, x, y){
    this.c = c;
    this.x = x;
    this.y = y; 
  }
  update(video){
    let index = (this.y * video.width + this.x) * 4;
    let r = video.pixels[index];
    let g = video.pixels[index+1];
    let b = video.pixels[index+2];
    let w = (r+g+b)/7.65;
    w=100-w;
    if(w<10){ 
      this.c = '@';
    } else if(w<30){ 
      this.c = '%';
    } else if(w<40){ 
      this.c = '#';
    } else if(w<45){ 
      this.c = '*';
    } else if(w<50){ 
      this.c = '+';
    } else if(w<55){ 
      this.c = '=';
    } else if(w<60){ 
      this.c = '-';
    } else if(w<65){ 
      this.c = ':';
    } else if(w<80){ 
      this.c = '.';
    } else { 
      this.c = '';
    } 
    
  }
}


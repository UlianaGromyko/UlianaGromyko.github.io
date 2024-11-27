let bg;
let button=[];
let from;
let space = 50;
let p=[];

function setup() {
  createCanvas(1790, 960);
  bg = color(240);
  
  let m = space; //margin
  for(let i=0; i<4; i++){
    button[i] = new Button1(m/2, m+i*70);
  } // toggle buttons
  for(let i=0; i<5; i++){
    button[4+i] = new Button4(m/2, m+i*70+280);
  } // direction buttons
  button[0].mode = 'select';
  button[0].col = color(200);
  button[1].mode = 'delete';
  button[2].mode = 'square';
  button[3].mode = 'circle';
  button[4].mode = 'arc';
  button[5].mode = 'anti-arc';
  button[6].mode = 'cap';
  button[7].mode = 'anti-cap';
  button[8].mode = 'slant';
  
  stroke(0, 10);
  let index=0;
  for(let i=m*2; i<width; i+=space){
    for(let j=0; j<height; j+=space){
      p[index] = new House(i, j, space);
      index++;
    }
  } // canvas
}

function draw() {
  background(bg);
  
  for(let i=0; i<p.length; i++){
    p[i].display();
  }
  
  for(let i=0; i<button.length; i++){
    button[i].display();
  }
  
}
  
function mousePressed(){
  if(button[0].selected){
    for(let i=0; i<p.length; i++){
      if(p[i].pos.x < mouseX && 
         p[i].pos.x+p[i].size > mouseX &&
         p[i].pos.y < mouseY && 
         p[i].pos.y+p[i].size > mouseY){
        from = i;
      }
    }
  }
}

function mouseClicked(){
  for(let i=0; i<button.length; i++){
    let a = button[i].selected;
    button[i].toggle();
    if(a == false &&
       button[i].selected){
      for(let j=0; j<button.length; j++){
        if (i!=j){
          button[j].selected = false;
        }
      }
    }
  } // buttons
  
  for(let i=0; i<p.length; i++){
    if(p[i].pos.x < mouseX && 
       p[i].pos.x+p[i].size > mouseX &&
       p[i].pos.y < mouseY && 
       p[i].pos.y+p[i].size > mouseY){
      
      for(let j=0; j<button.length; j++){
        if (j==0){
          // selection whatever
        } else if (j==1){
          p[i].shape = 'empty';
        } else if (button[j].selected){
          p[i].shape = button[j].mode;
          p[i].direction = button[j].direction;
        }
      }
    }
  } // canvas
}

function shape(x, y, s, mode, col1, col2, d){
  
  
  noStroke();
  fill(col1);
  
  if(mode == 'empty'){
    stroke(col1,2);
    fill(col2);
    rect(x,y,s,s);
  } else if(mode == 'select'){
    //drawingContext.setLineDash([4]);
    stroke(col1);
    noFill();
    rect(x,y,s,s);
    noStroke();
    fill(col2);
    rect(x+5,y-5,10, s+10);
    rect(x-5,y+5,s+10, 10);
  } else if(mode == 'delete'){
    x += 15;
    y += 15;
    s -= 30;
    stroke(col1);
    noFill();
    line(x,y,x+s,y+s);
    line(x+s,y,x,y+s);
  } else if(mode == 'square'){
    rect(x,y,s,s);
  } else if(mode == 'circle'){
    circle(x+s/2,y+s/2,s);
    
  } else if(mode == 'arc'){
    if (d==1){
      arc(x, y, s*2, s*2, 0, HALF_PI);
    } else if (d==2){
      arc(x+s, y, s*2, s*2, HALF_PI, PI);
    } else if (d==3){
      arc(x+s, y+s, s*2, s*2, PI, HALF_PI+PI);
    } else if (d==4){
      arc(x, y+s, s*2, s*2, HALF_PI+PI, 0);
    }  
  } else if(mode == 'anti-arc'){
    if(d==1){
      noStroke();
      fill(col1);
      rect(x,y,s);
      fill(col2);
      arc(x, y, s*2, s*2, 0, HALF_PI);
    } else if (d==2){
      noStroke();
      fill(col1);
      rect(x,y,s);
      fill(col2);
      arc(x+s, y, s*2, s*2, HALF_PI, PI);
    } else if (d==3){
      noStroke();
      fill(col1);
      rect(x,y,s);
      fill(col2);
      arc(x+s, y+s, s*2, s*2, PI, HALF_PI+PI);
    } else if (d==4){
      noStroke();
      fill(col1);
      rect(x,y,s);
      fill(col2);
      arc(x, y+s, s*2, s*2, HALF_PI+PI, 0);
    }  
  } else if(mode == 'cap'){
    if(d == 1){
      arc(x+s/2, y, s, s, 0, PI);
    } else if(d == 2){
      arc(x+s, y+s/2, s, s, HALF_PI, HALF_PI+PI);
    } else if(d == 3){
      arc(x+s/2, y+s, s, s, PI, TWO_PI);
    } else if(d == 4){
      arc(x, y+s/2, s, s, HALF_PI+PI, HALF_PI);
    }
  } else if(mode == 'anti-cap'){
    if(d == 1){
      noStroke();
      fill(col1);
      rect(x,y,s);
      fill(col2);
      arc(x+s/2, y, s, s, 0, PI);
    } else if(d == 2){
      noStroke();
      fill(col1);
      rect(x,y,s);
      fill(col2);
      arc(x+s, y+s/2, s, s, HALF_PI, HALF_PI+PI);
    } else if(d == 3){
      noStroke();
      fill(col1);
      rect(x,y,s);
      fill(col2);
      arc(x+s/2, y+s, s, s, PI, TWO_PI);
    } else if(d == 4){
      noStroke();
      fill(col1);
      rect(x,y,s);
      fill(col2);
      arc(x, y+s/2, s, s, HALF_PI+PI, HALF_PI);
    }
  } else if(mode == 'slant'){
    if(d==1){
      triangle(x, y, x, y+s, x+s, y);
    } else if(d==2){
      triangle(x, y, x+s, y+s, x+s, y);
    } else if(d==3){
      triangle(x+s, y+s, x, y+s, x+s, y);
    } else if(d==4){
      triangle(x, y, x, y+s, x+s, y+s);
    }  
  } 
}

class Button1{
  constructor(x, y){
    this.a = createVector(x,y);
    this.s = space;
    this.col = color(200,20,20);
    this.selected = false;
    this.mode = 'delete';
  }
  display(){
    if(this.selected){
      fill(this.col);
      noStroke();
    } else {
      stroke(this.col);
      strokeWeight(2);
      fill(bg);
    }
    rect(this.a.x, this.a.y, this.s, this.s, 10);
    
    let smaller = 15;
    
    if(this.selected){
      shape(this.a.x+smaller, this.a.y+smaller, 
            this.s-2*smaller, this.mode, bg, this.col);
    } else {
      shape(this.a.x+smaller, this.a.y+smaller, 
            this.s-2*smaller, this.mode, this.col, bg);
    }
    
    // textAlign(CENTER, CENTER);
    // textSize(25);
    // text(this.mode, this.a.x+this.s/2, this.a.y+this.s/2);
    
  }
  toggle(){
    if(mouseX > this.a.x &&
       mouseX < this.a.x+this.s &&
       mouseY > this.a.y &&
       mouseY < this.a.y+this.s){

      if(this.selected){
        this.selected = false;
      } else {
        this.selected = true;
      }
    } 
  }
}

class Button4{
  constructor(x, y){
    this.a = createVector(x,y);
    this.s = space;
    this.col = color(200,20,20);
    this.selected = false;
    this.mode = 'delete';
    this.direction = 1;
  }
  display(){
    if(this.selected){
      fill(this.col);
      noStroke();
    } else {
      stroke(this.col);
      strokeWeight(2);
      fill(bg);
    }
    rect(this.a.x, this.a.y, this.s, this.s, 10);
    
    let smaller = 15;
    
    if(this.selected){
      shape(this.a.x+smaller, this.a.y+smaller, 
            this.s-2*smaller, this.mode, bg, this.col, this.direction);
    } else {
      shape(this.a.x+smaller, this.a.y+smaller, 
            this.s-2*smaller, this.mode, this.col, bg, this.direction);
    }
    
//     textAlign(CENTER, CENTER);
//     textSize(25);
//     text(this.direction, this.a.x+this.s/2, this.a.y+this.s/2);
  }
  toggle(){
    if(mouseX > this.a.x &&
       mouseX < this.a.x+this.s &&
       mouseY > this.a.y &&
       mouseY < this.a.y+this.s){

      if(this.selected){
        if(this.direction == 1){
          this.direction++;
        } else if(this.direction == 2){
          this.direction++;
        } else if(this.direction == 3){
          this.direction++;
        } else if(this.direction == 4){
          this.direction = 1;
        } 
      } else {
        this.selected = true;
      }
    } 
  }
  
}

class House{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.size = space;
    this.shape = 'empty';
    this.col = 0;
    this.direction = 1;
  }
  display(){
    fill(bg);
    stroke(20,6);
    rect(this.pos.x, this.pos.y, this.size);
    
    shape(this.pos.x, this.pos.y, this.size, this.shape, this.col, bg, this.direction);
    
  }
}
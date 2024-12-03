let gap = 10;
let buttons = [];
let min = 20;
let max = 500;
let minColor = -10;
let maxColor = 60;
let horizontal = true;
let t=0;
let time=0;
let animationLength = 1;
let bg=0;
let count;
let countOld;

function setup() {
  createCanvas(1790, 960);
  strokeWeight(gap/2);
  bg = color(200,200,200);
  let orgin = createVector(width / 2 - 50, height / 2 - 50);
  let orginSize = createVector(100,100);
  buttons[0] = new Button(orgin, orginSize ,orgin.x , orgin.y, 100, 100, 255/2, 0,0,0);
}

function draw() {
  background(bg);
  stroke(bg);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].hover();
    if(t<animationLength && buttons[i].active){
      buttons[i].animate();
    } else if (t<animationLength){
      buttons[i].retract();
    }
  }
  t+=0.1;
  if(buttons.length>40){
    buttons.splice(0,20);
  }
}

function flip(value){
  if(value){
    return false;
  } else {
    return true;
  }
}

class Button {
  constructor(fromP, fromS, x, y, xs, ys, r,g,b) {
    this.size = createVector(fromS.x, fromS.y);
    this.pos = createVector(fromP.x, fromP.y);
    this.selected = false;
    this.active = true;
    this.r = r;
    this.g = g;
    this.b = b;
    this.from = createVector(fromP.x, fromP.y);
    this.fromS = createVector(fromS.x, fromS.y);
    this.to = createVector(x, y);
    this.toS = createVector(xs, ys);
  }
  hover() {
    if (this.active) {
      if (
        mouseX > this.pos.x &&
        mouseX < this.size.x + this.pos.x &&
        mouseY > this.pos.y &&
        mouseY < this.size.y + this.pos.y
      ) {

        let k=-20;
        stroke(this.r+k, this.g+k, this.b+k);
        fill(this.r, this.g, this.b);
        this.selected = true;

      } else {
        fill(this.r, this.g, this.b);
        this.selected = false;
      }
    } else {
      fill(this.r, this.g, this.b);
    }
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y, 10);
    stroke(bg);
  }
  animate(){
    this.pos.x = map(t, 0, animationLength, this.from.x, this.to.x);
    this.pos.y = map(t, 0, animationLength, this.from.y, this.to.y);
    this.size.x = map(t, 0, animationLength, this.fromS.x, this.toS.x);
    this.size.y = map(t, 0, animationLength, this.fromS.y, this.toS.y);
  }
  retract(){
    this.pos.x = map(t, 0, animationLength, this.from.x, this.to.x);
    this.pos.y = map(t, 0, animationLength, this.from.y, this.to.y);
    this.size.x = map(t, 0, animationLength, this.fromS.x, this.toS.x);
    this.size.y = map(t, 0, animationLength, this.fromS.y, this.toS.y);
  }
}

function mouseClicked(){
  let activator, change=false;
  for (let i = 0; i < buttons.length; i++) {
    if(buttons[i].selected && buttons[i].active){
      change = true;
      activator = buttons[i];
      console.log(i);
    }
  }
  if(change){
    // countOld = count;
    // count = 0;
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].active = false;
      buttons[i].from = buttons[i].pos.copy();
      buttons[i].to = activator.pos.copy();
      buttons[i].fromS = buttons[i].size.copy();
      buttons[i].toS = activator.size.copy();
      //count++;
    }
//     console.log(countOld, count);
    
//     buttons.splice(0, countOld);
    createMore(activator);
    horizontal = flip(horizontal);
    startAnimation = true;
    t = 0;
    bg = color(map(activator.r, 0,255, 0,100),
               map(activator.g, 0,255, 0,100),
               map(activator.b, 0,255, 0,100));
  }
}

function createMore(activator){
  
  let x,y,w,h,r,g,b;
    x = activator.pos.x;
    y = activator.pos.y;
    w = activator.size.x;
    h = activator.size.y;
    r = activator.r;
    g = activator.g;
    b = activator.b;

    while(x > 0-max && y > 0-max){
      if(horizontal){
        w = random(min, max);
        x = x - w - gap;
      } else {
        h = random(min, max);
        y = y - h - gap;
      }
      if(r>0) r -= random(minColor, maxColor);
      if(g>0) g -= random(minColor, maxColor);
      if(b>0) b -= random(minColor, maxColor);
      buttons.push(new Button(activator.pos, activator.size, 
                              x, y, w, h, r, g, b));
    }

    x = activator.pos.x;
    y = activator.pos.y;
    w = activator.size.x;
    h = activator.size.y;
    r = activator.r;
    g = activator.g;
    b = activator.b;

    while(x < width+max && y < height+max){
      buttons.push(new Button(activator.pos, activator.size,
                              x, y, w, h, r, g, b));
      if(horizontal){
        x = x + w + gap;
        w = random(min, max);
      } else {
        y = y + h + gap;
        h = random(min, max);
      }
      if(r<255) r += random(minColor, maxColor);
      if(g<255) g += random(minColor, maxColor);
      if(b<255) b += random(minColor, maxColor);
    }
}

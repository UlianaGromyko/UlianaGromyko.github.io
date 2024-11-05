let p = [];
let room = 70;
let x = room;
let y = room;

let influence;
let stiffness;
let pullback;

let baseline = 40;

// let font;
let shown = true;

let corners = 20;
let lineheight =25;
let tp = 5;
let l=1;

function setup() {
  createCanvas(1790,960);
  fill(255);
  //noCursor();

  influence = createSlider(0.05, 2, 0.5, 0.05);
  pullback = createSlider(0, 0.3, 0.1, 0.01);
  stiffness = createSlider(0.9, 1, 0.99, 0.005);

  influence.addClass("mySliders");
  pullback.addClass("mySliders");
  stiffness.addClass("mySliders");



  influence.position(10, baseline);
  influence.size(250);
  pullback.position(10, baseline+30);
  pullback.size(250);
  stiffness.position(10, baseline+60);
  stiffness.size(250);



  for (i = 0; i < (width * height) / sq(room - 1); i++) {
    p.push(new Particle(x, y, i));

    if (x < width - room) {
      x += room;
      
    } else {
      y += room;
      x = room;

    }
  }
}

function draw() {
  background(0);
  noCursor();



  for (i = 0; i < (width * height) / sq(room - 1); i++) {
    p[i].update(influence.value(), pullback.value(), stiffness.value());
    if(mouseIsPressed){
      p[i].update(2, 0, stiffness.value());
    }

    p[i].display();
  }

  fill(0);
  strokeWeight(1.5);
  stroke(255);
  rect(20,25,430, 105, 10);

  fill(255);
  noStroke();
  textFont('Courier New', 20);


  text("influence", 320, baseline +15);
  text("pullback", 320, baseline +45);
  text("stiffness", 320, baseline +75);


  fill(0);
  strokeWeight(2);
  stroke(255);
  //circle(mouseX, mouseY, 20);
  //rect(mouseX-10, mouseY-10, 20, 20, 10);

  line(mouseX+10,mouseY+10,mouseX-10,mouseY-10);
  line(mouseX-10,mouseY+10,mouseX+10,mouseY-10);

explain();
}

class Slider {
  constructor(min, max, name, count) {

    this.min = min;
    this.max = max;
    this.name = name;
    this.count = count;

    this.start = 20;
    this.end = 100;
    this.margin = 20;

  }

  update() {

    if( mouseIsPressed == true()){

    }



  }

  display() {


    rect(this.start/2 ,this.margin*5*count, this.start*1.5+this.end ,this.margin*4);
    line(this.start, this.count, this.end, this.count);





  }

  value(){
    return value;
  }
}

class Particle {

  constructor(x, y, time) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.orgin = createVector(x,y);
    this.thickness = 10;

  }

  update(influenceValue, pullbackValue, stiffnessValue) {

    

      let influence = createVector(movedX, movedY);
      influence.mult(influenceValue);  //the higher, the more powerful the influence 0.5
    

      this.acc.add(influence);
       this.acc.div(dist(pmouseX, pmouseY, this.pos.x, this.pos.y));
      

      let pullback = createVector(this.orgin.x - this.pos.x, this.orgin.y - this.pos.y );
      pullback.mult(pullbackValue); // 0.1

      this.vel.add(this.acc);
      this.vel.mult(stiffnessValue);   // the lower, the stiffer, the quicker stabilisation 1 ti 0.9



    this.pos.add(this.vel);
    this.pos.add(pullback);
  }

  display() {
    stroke(200);
    strokeWeight(this.thickness);
    line(this.pos.x, this.pos.y, this.orgin.x, this.orgin.y);


    stroke(0);
    strokeWeight(this.thickness-4);
    line(this.pos.x, this.pos.y, this.orgin.x, this.orgin.y);
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
    text('click & move', mouseX+15, mouseY+lineheight*l+tp, 300, 60);
    l++;
    text('adjust sliders', mouseX+15, mouseY+lineheight*l+tp, 300, 60);
    l++;
  }
}
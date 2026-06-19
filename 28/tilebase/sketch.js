
let bg, previewColor, previewAntiColor, greyish;
let button = [];
let from, to;
let space = 50;
let toolkitWidth = 100;
let p = [];
let edit = false;
let selected = [];
let archive =[];
let buttonPlacementY = toolkitWidth/2;
let buttonPlacementX = space/2;
let indexFirstKeyButton;
let h;
let tutorial=[];
let openToScroll = 0;
let red;
let letterbuttons=[];
let capturingPhoto = false;
let bezierBS = 0.55228475;

function preload() {
  font = loadFont("Outfit-SemiBold.ttf");
}

function setup() {
  createCanvas(screen.availWidth,   screen.availHeight);
  bg = color(240);
  red = color(200, 20, 20);
  previewColor = color(200, 20, 20, 50);
  previewAntiColor = color(240, 50);
  greyish = color(190);
  noCursor();
  textFont(font);
  textSize(25);
  textAlign(CENTER, BASELINE);

  for (let i = 0; i < 13; i++) {
    button[i] = new Button4(buttonPlacementX, buttonPlacementY);// direction buttons
    if(i == 7) buttonPlacementY += space*2;
  }
  {
    let i=0;
    button[i].mode = "select";
    i++
    button[i].mode = "delete";
    i++
    button[i].mode = "square";
    i++
    button[i].mode = "circle";
    i++
    button[i].mode = "arc";
    i++
    button[i].mode = "cap";
    i++
    button[i].mode = "slant";
    i++
    button[i].mode = "point";
    i++
    button[i].mode = "preview";
    button[i].isToggleable = false;
    i++
    button[i].mode = "go back";
    button[i].isToggleable = false;
    i++
    button[i].mode = "go forward";
    button[i].isToggleable = false;
    i++
    button[i].mode = "wipe out";
    button[i].isToggleable = false;
    i++
    button[i].mode = "remember me";
    button[i].isToggleable = false;
  }
  buttonPlacementY = toolkitWidth;
  
  stroke(0, 10);
  let index = 0;
  
  for (let i = toolkitWidth; i < width-toolkitWidth; i += space) {
    for (let j = (height%space)/2; j < height-space; j += space) {
      p[index] = new House(i, j);
      index++;
    }
  } // canvas
  for(let i=32; i<131; i++){
    archive[i-32] = new Saved(i);
  }
  
  h = new History(p);
  
  {
    tutorial[0] = "Scroll to rotate";
    tutorial[1] = "Invert shape by clicking at it again";
    tutorial[2] = "Undo by pressing Backspace ⌫";
    tutorial[3] = "Make a selection to mass-edit";
    tutorial[4] = "Select your design and save it into a character";
    tutorial[5] = "Paste your saved design";
    tutorial[6] = "Delete saved design by chosing a delete button and typing the right key";
  }
}

function draw() {
  background(bg);
  openToScroll++;
  //seeHistory(0);
  
  for (let i = 0; i < p.length; i++) {
    p[i].display();
  }
  if (edit) editDisplay(selected);
  if(showTools()) toolBox();
  
  let active;
  for (let i=0; i< letterbuttons.length; i++){
    if(letterbuttons[i].selected){
      for (let j=0; j< archive.length; j++){
        if(letterbuttons[i].mode == archive[j].indentity) archive[j].preview();
      }
    }
  }
  
  if(mouseIsPressed && button[0].selected && mouseX > toolkitWidth && mouseX < width-toolkitWidth) 
  {
    rectMode(CORNERS);
    drawingContext.setLineDash([4, 20]);
    fill(0,0);
    stroke(red)
    let x = p[from].pos.x;
    let y = p[from].pos.y;
    if(p[from].pos.x > mouseX) x += space;
    if(p[from].pos.y > mouseY) y += space;
    
    rect(x, y, mouseX, mouseY);
    rectMode(CORNER);
    drawingContext.setLineDash([0.0]);
  } //selecting preview
}

function toolBox(){
    let active = -1;
  
    for (let i = 0; i < button.length; i++) {
      button[i].display();
      if(button[i].selected) active = i;
    }
    for (let i = 0; i < letterbuttons.length; i++) {
      letterbuttons[i].display();
    }
    
    if (active < 0 || mouseX < toolkitWidth) {
      shape(mouseX, mouseY, 
            space / 2, "cursor", red, 1);
      for(let i=0; i<button.length; i++){
        if ( mouseInside(button[i].a, button[i].s)){
          textAlign(LEFT, BASELINE);
          fill(bg);
          text(button[i].mode, mouseX+space/4, mouseY+space*0.7);
        }
      }
    } 
    else if((mouseIsPressed && button[0].selected)==false)
    {
      shape(mouseX - space/4, mouseY - space/4, space / 2, button[active].mode,
            red, button[active].direction);
      if (active != 0 && active != 2) {
        noFill();
        stroke(red);
        rect(mouseX - space/4, mouseY - space/4, space / 2);
      } 
    } 
}

function seeHistory(tile){
  
    let t=" ";
    for(let i=0; i<h.past.length; i++){
      t+=i;
      t+=" ";
      t+=h.past[i][tile].shape;
      t+="; ";
    }
  
}

function showTools(){
  if(keyIsDown(16)) return false;
  else if(mouseIsPressed && mouseInside(button[8].a, button[8].s) ) return false;
  else if(keyIsDown(13)) return false;
  else return true;
}

function mouseInside(vector, size){
  if(mouseX > vector.x && mouseX < vector.x + size &&
     mouseY > vector.y && mouseY < vector.y + size){
    return true;
  } else {
    return false;
  }
}

function mousePressed() {
  stepBack();
  if( mouseX > p[0].pos.x &&
      mouseX < p[p.length-1].pos.x + p[p.length-1].size &&
      mouseY > p[0].pos.y &&
      mouseY < p[p.length-1].pos.y + p[p.length-1].size)
  {
    if (button[0].selected) {
      for (let i = 0; i < p.length; i++) {
        if (mouseInside(p[i].pos, p[i].size)) {
          from = i;
        }
      }
    }
  } 
  else {
    let unclickSelector = true;
    for(let i=0; i<button.length; i++){
      if(mouseInside(button[i].a, button[i].s)) unclickSelector = false;
    }
    for(let i=0; i<letterbuttons.length; i++){
      if(mouseInside(letterbuttons[i].a, letterbuttons[i].s)) unclickSelector = false;
    }
    if(unclickSelector){
      edit = false;
      button[0].selected = false;
    }
    
  }
}

function mouseClicked() {
  if(fullscreen() != true) fullscreen(true);
  
  if(mouseInside(button[11].a, button[11].s)) {//wipe out
    for (let i = 0; i < p.length; i++){
      p[i].shape = "empty";
    }
  }
  
  if(mouseInside(button[12].a, button[12].s)){
    captureMinimizedCanvas(1.5);
  }
  
    for (let i = 0; i < button.length; i++) {
      let a = button[i].selected;
      button[i].toggle();

      if(button[i].selected){
        if (edit && i<8) {
          edit = false;
          for (let k = 0; k < selected.length; k++) {
            if(i==0){
              edit = true;
            } else if (button[i].mode == "delete") {
              p[selected[k]].shape = "empty";

            } else {
              p[selected[k]].shape = button[i].mode;
              p[selected[k]].direction = button[i].direction;
            }
          } // all selected[] turn to button mode
        }
        if(a == false){
          for (let j = 0; j < button.length; j++) {
            if (i != j) button[j].selected = false;
          }
          for (let j = 0; j < letterbuttons.length; j++) {
            letterbuttons[j].selected = false;
          }
        }
      }
    } // buttons
  
  
  
  for(let i=0; i<letterbuttons.length; i++){
    
    let a = letterbuttons[i].selected;
    letterbuttons[i].toggle();
    
    if(letterbuttons[i].selected){
      if(edit) {
        edit = false;
        letterbuttons[i].toggleOn();
      }
      if(a == false){
        for (let j = 0; j < letterbuttons.length; j++) {
          if (i != j) letterbuttons[j].selected = false;
        }
        for (let j = 0; j < button.length; j++) {
          button[j].selected = false;
        }
      }
    }
    
    
    
    
  }

  if (button[0].selected) {
    for (let i = 0; i < p.length; i++) {
      if (mouseInside(p[i].pos, p[i].size)) {
        to = i;
        fillSelection(selected);
      }
    }
  } // selection tool
  drawOnCanvas();
}

function mouseDragged() {
  drawOnCanvas();
}

function drawOnCanvas() {
  for (let i = 0; i < p.length; i++) {
    if (mouseInside(p[i].pos, p[i].size)) {
      for (let j = 1; j < button.length; j++) {
        if (button[j].selected) {
          if (j == 1 && button[j].mode == "delete") {
            p[i].shape = "empty";
          } else{
            p[i].shape = button[j].mode;
            p[i].direction = button[j].direction;
          }
          edit = false;
        }
      }
      for (let j=0; j<letterbuttons.length; j++){
        if (letterbuttons[j].selected) {
          for(let k=0; k<archive.length; k++){
            if(letterbuttons[j].mode == archive[k].indentity) archive[k].paste();
          }
        }
      }
    }
  } // canvas
  
  h.update(p);
}

function shape(x, y, s, mode, col1, d) {
  noStroke();
  fill(col1);
  let smoll = 3;

  if (mode == "none") {
  } 
  else if (mode == "cursor") {
    stroke(col1);
    fill(bg);
    triangle(x, y, x, y + s - 4, x + s / 2, y + (s / 3) * 2);
  } 
  else if (mode == "preview") {
    x+=smoll;
    y+=smoll;
    s-=2*smoll;
    stroke(col1);
    fill(0,0);
    let lidHeight = s/4;
    let openness = s+space/10;
    let ends = 0.35;
    arc(x+s/2, y+s-lidHeight, s+space/8, openness, PI+ends, -ends, OPEN); //above
    arc(x+s/2, y+lidHeight, s+space/8, openness, ends, PI-ends, OPEN); //under
    noStroke();
    fill(col1);
    circle(x+s/2, y+s/2, s*0.6);
  }
  else if (mode == "remember me") {
    noFill();
    stroke(col1);
    rect(x,y+s/6,s,s/1.5,3);
    //circle(x+s*0.6, y+s/2, s/2);
    circle(x+s*0.6, y+s/2, s/3);
    rect(x+s/8, y+s/6-s/20, s/6, s/20);
  }
  else if (mode == "empty") {
  } 
  else if (mode == "select") {
    drawingContext.setLineDash([4, 6]);
    stroke(col1);
    noFill();
    rect(x, y, s, s);
    drawingContext.setLineDash([0.0]);
  } 
  else if (mode == "delete") {
    x += 15;
    y += 15;
    s -= 30;
    stroke(col1);
    noFill();
    line(x, y, x + s, y + s);
    line(x + s, y, x, y + s);
  } 
  else if (mode == "square") {
    rect(x, y, s, s);
  } 
  else if (mode == "circle") {
    circle(x + s / 2, y + s / 2, s);
  } 
  else if (mode == "anti-circle") {
    noStroke();
    fill(col1);
    arcShape(x,y,s/2,        col1, 4);
    arcShape(x+s/2,y,s/2,    col1, 3);
    arcShape(x+s/2,y+s/2,s/2,col1, 2);
    arcShape(x,y+s/2,s/2,    col1, 1);
    
  }
  else if (mode == "arc") {
    if (d == 1) {
      arc(x, y, s * 2, s * 2, 0, HALF_PI);
    } else if (d == 2) {
      arc(x + s, y, s * 2, s * 2, HALF_PI, PI);
    } else if (d == 3) {
      arc(x + s, y + s, s * 2, s * 2, PI, HALF_PI + PI);
    } else if (d == 4) {
      arc(x, y + s, s * 2, s * 2, HALF_PI + PI, 0);
    }
  } 
  else if (mode == "anti-arc") {
    arcShape(x,y,s,col1,d);
  } 
  else if (mode == "cap") {
    if (d == 1) {
      arc(x + s / 2, y, s, s, 0, PI);
    } else if (d == 2) {
      arc(x + s, y + s / 2, s, s, HALF_PI, HALF_PI + PI);
    } else if (d == 3) {
      arc(x + s / 2, y + s, s, s, PI, TWO_PI);
    } else if (d == 4) {
      arc(x, y + s / 2, s, s, HALF_PI + PI, HALF_PI);
    }
  } 
  else if (mode == "anti-cap") {
    if(d==1){
      arcShape(x,y+s/2,s/2,col1,4);
      arcShape(x+s/2,y+s/2,s/2,col1,3);
      rect(x,y,s,s/2);

    } else if(d==2){
      arcShape(x+s/2,y,s/2,col1,4);
      arcShape(x+s/2,y+s/2,s/2,col1,1);
      rect(x,y,s/2,s);

    } else if(d==3){
      arcShape(x,y,s/2,col1,1);
      arcShape(x+s/2,y,s/2,col1,2);
      rect(x,y+s/2,s,s/2);

    } else if(d==4){
      arcShape(x,y,s/2,col1,3);
      arcShape(x,y+s/2,s/2,col1,2);
      rect(x+s/2,y,s/2,s);
    }
  } 
  else if (mode == "slant") {
    if (d == 1) {
      triangle(x, y, x, y + s, x + s, y);
    } else if (d == 2) {
      triangle(x, y, x + s, y + s, x + s, y);
    } else if (d == 3) {
      triangle(x + s, y + s, x, y + s, x + s, y);
    } else if (d == 4) {
      triangle(x, y, x, y + s, x + s, y + s);
    }
  }
  else if (mode == "point") {
    let v1, v2, v3;
    if(d==1) {
      v1 = createVector(x,y);
      v2 = createVector(x,y+s);
      v3 = createVector(x+s/2,y+s/2);
    } 
    else if(d==2){
      v1 = createVector(x+s,y+s);
      v2 = createVector(x+s/2,y+s/2);
      v3 = createVector(x,y+s);
    } 
    else if(d==3){
      v1 = createVector(x+s,y);
      v2 = createVector(x+s/2,y+s/2);
      v3 = createVector(x+s,y+s);
    } 
    else if(d==4){
      v1 = createVector(x,y);
      v2 = createVector(x+s/2,y+s/2);
      v3 = createVector(x+s,y);
    } 
    beginShape();
    vertex(v1.x, v1.y);
    vertex(v2.x, v2.y);
    vertex(v3.x, v3.y);
    endShape();
  } 
  else if (mode == "anti-point") {
    if(d==1) {
      beginShape();
      vertex(x,y);
      vertex(x+s,y);
      vertex(x+s,y+s);
      vertex(x,y+s);
      vertex(x+s/2,y+s/2);
      endShape();
    } 
    else if(d==2){
      beginShape();
      vertex(x,y);
      vertex(x+s,y);
      vertex(x+s,y+s);
      vertex(x+s/2,y+s/2);
      vertex(x,y+s);
      endShape();
    } 
    else if(d==3){
      beginShape();
      vertex(x,y);
      vertex(x+s,y);
      vertex(x+s/2,y+s/2);
      vertex(x+s,y+s);
      vertex(x,y+s);
      endShape();
    } 
    else if(d==4){
      beginShape();
      vertex(x,y);
      vertex(x+s/2,y+s/2);
      vertex(x+s,y);
      vertex(x+s,y+s);
      vertex(x,y+s);
      endShape();
    } 
  }
  else if (mode == "go back") {
    x+=smoll;
    y+=smoll;
    s-=2*smoll;
    
    stroke(col1);
    fill(0,0);
    let arrowSize = s/2;
    let a = createVector(x, y+s);
    let b = createVector(x+s,   y+s);
    let c = createVector(x+s,   y+arrowSize/2);
    let d = createVector(x+arrowSize, y+arrowSize/2);
    line(a.x, a.y, b.x, b.y);
    line(b.x, b.y, c.x, c.y);
    line(c.x, c.y, d.x, d.y);
    
    let t1 = createVector(d.x - arrowSize, d.y);
    let t2 = createVector(d.x, d.y + arrowSize/2);
    let t3 = createVector(d.x, d.y - arrowSize/2);
    line(t1.x, t1.y, t2.x, t2.y);
    line(t1.x, t1.y, t3.x, t3.y);
    line(t2.x, t2.y, t3.x, t3.y);
    noStroke();
    fill(col1);
    triangle(t1.x, t1.y, t2.x, t2.y, t3.x, t3.y);
  } 
  else if (mode == "go forward"){
    x+=smoll;
    y+=smoll;
    s-=2*smoll;
    
    stroke(col1);
    fill(0,0);
    let arrowSize = s/2;
    let a = createVector(x+s, y+s);
    let b = createVector(x,   y+s);
    let c = createVector(x,   y+arrowSize/2);
    let d = createVector(x+s-arrowSize, y+arrowSize/2);
    line(a.x, a.y, b.x, b.y);
    line(b.x, b.y, c.x, c.y);
    line(c.x, c.y, d.x, d.y);
    
    let t1 = createVector(d.x + arrowSize, d.y);
    let t2 = createVector(d.x, d.y + arrowSize/2);
    let t3 = createVector(d.x, d.y - arrowSize/2);
    line(t1.x, t1.y, t2.x, t2.y);
    line(t1.x, t1.y, t3.x, t3.y);
    line(t2.x, t2.y, t3.x, t3.y);
    noStroke();
    fill(col1);
    triangle(t1.x, t1.y, t2.x, t2.y, t3.x, t3.y);
  }
  else if (mode == "wipe out"){

    stroke(col1);
    fill(0,0);
    rect(x,y,s,s);
  }
  else { 
    textAlign(CENTER, BASELINE);
    text(mode, x+s/2, y+s);
  } // them letters
}

function arcShape(x, y, s, col, d){
  
  let a,b,ak,bk;
  if(d==1){
    a = createVector(x,y);
    b = createVector(x+s,y+s);
    ak = createVector(x,y+bezierBS*s);
    bk = createVector(x+s-bezierBS*s,y+s);
  } 
  else if(d==2){
    a = createVector(x+s,y);
    b = createVector(x,y+s);
    ak = createVector(x+s,y+bezierBS*s);
    bk = createVector(x+bezierBS*s,y+s);
  } 
  else if(d==3){
    a = createVector(x+s,y+s);
    b = createVector(x,y);
    ak = createVector(x+s,y+s-bezierBS*s);
    bk = createVector(x+bezierBS*s,y);
  } 
  else if(d==4){
    a = createVector(x,y+s);
    b = createVector(x+s,y);
    ak = createVector(x,y+s-bezierBS*s);
    bk = createVector(x+s-bezierBS*s,y);
  } 
  fill(col);
  noStroke();
  beginShape();
  vertex(a.x, a.y);
  bezierVertex(ak.x, ak.y, bk.x, bk.y, b.x, b.y);
  vertex(a.x, b.y);
  endShape();
}

function editDisplay(selected) {
  drawingContext.setLineDash([4, 20]);

  stroke(red);
  noFill();
  for (let i = 0; i < selected.length; i++) {
    rect(p[selected[i]].pos.x, p[selected[i]].pos.y, space);
  }

  drawingContext.setLineDash([0.0]);
}

function mouseWheel(event) {
  
  if (openToScroll>5) {
    for (let i = 0; i < button.length; i++) {
      if (button[i].selected) {
        if (event.delta > 0 && button[i].direction < 4) {
          button[i].direction++;
        } else if (event.delta > 0) {
          button[i].direction = 1;
        } else if (button[i].direction > 1) {
          button[i].direction--;
        } else {
          button[i].direction = 4;
        }

        if (edit) {
          for (let k = 0; k < selected.length; k++) {
            p[selected[k]].direction = button[i].direction;
          }
        }
      }
    }
  }
  
  openToScroll = 0;
}

function fillSelection(selected) {
  let minX = getSmallest(p[from].pos.x, p[to].pos.x);
  let maxX = getBiggest(p[from].pos.x, p[to].pos.x);
  let minY = getSmallest(p[from].pos.y, p[to].pos.y);
  let maxY = getBiggest(p[from].pos.y, p[to].pos.y);

  if (edit != true) {
    selected.splice(0, selected.length);
    edit = true;
  }

  for (let i = 0; i < p.length; i++) {
    if (
      p[i].pos.x >= minX &&
      p[i].pos.x <= maxX &&
      p[i].pos.y >= minY &&
      p[i].pos.y <= maxY
    ) {
      let add = true;
      for(let j=0; j<selected.length; j++){
        if(selected[j] == i) add = false;
      }
      if(add) selected.push(i);
    }
  }
}

function getSmallest(value1, value2) {
  if (value1 > value2) {
    return value2;
  } else {
    return value1;
  }
}
function getBiggest(value1, value2) {
  if (value1 > value2) {
    return value1;
  } else {
    return value2;
  }
}

class Button4 {
  constructor(x, y) {
    this.a = createVector(x, y);
    this.s = space;
    this.col = red;
    this.selected = false;
    this.mode = "delete";
    this.direction = 1;
    this.isToggleable = true;
    buttonPlacementY+=(space+20);
  }
  display() {
    if(this.isToggleable == false){
      if(mouseInside(this.a, this.s) && mouseIsPressed){
          this.selected = true;
        } else {
          this.selected = false;
        }
      }
    if((this.mode == "go forward" && h.current==0)) this.col = greyish;
    else this.col = red;
    
    if (this.selected) {
      fill(this.col);
      noStroke();
    } else {
      stroke(this.col);
      strokeWeight(2);
      fill(bg);
    }
    
    
    rect(this.a.x, this.a.y, this.s, this.s, 10);

    let smaller = 15;

    if (this.selected) {
      shape(this.a.x + smaller, this.a.y + smaller, this.s - 2 * smaller, 
            this.mode, bg, this.direction);
      explain(this.mode);
    } else {
      shape(this.a.x + smaller, this.a.y + smaller, this.s - 2 * smaller,
            this.mode, this.col, this.direction);
    }
  }
  toggle() {
    if (mouseInside(this.a, this.s)) {
      if (this.selected) {
        
        if(this.mode == "arc"){
          this.mode = "anti-arc";
        } 
        else if(this.mode == "anti-arc"){
          this.mode = "arc";
        } 
        else if(this.mode == "cap"){
          this.mode = "anti-cap";
        } 
        else if(this.mode == "anti-cap"){
          this.mode = "cap";
        } 
        else if(this.mode == "slant"){
          this.direction +=2;
          if (this.direction > 4) this.direction -= 4;
        } 
        else if(this.mode == "circle"){
          this.mode = "anti-circle";
        } 
        else if(this.mode == "anti-circle"){
          this.mode = "circle";
        } 
        else if(this.mode == "point"){
          this.mode = "anti-point";
        } 
        else if(this.mode == "anti-point"){
          this.mode = "point";
        } 
        else if(this.mode == "square"){
          //this.mode = "delete";
          this.selected = false;
        } 
        else if(this.mode == "delete"){
          //this.mode = "square";
          this.selected = false;
        } 
        else if(this.mode == "select"){
          this.selected = false;
          edit = false;
        }
        
      } 
      else if(this.isToggleable){
        this.selected = true;
      } 
    }
  }
  toggleOn() {
      for(let i=0; i<archive.length; i++){
        if (this.mode == archive[i].indentity) {
          archive[i].rewrite(selected);
        }
      }
    
  }
}

function explain(mode){
  
  textAlign(RIGHT, TOP);
  fill(red);
  let explanation="";
  
  
  
  if(mode == "select" && edit ) explanation = "choose a shape to fill area OR safe selected area into a letter";
  else if(mode == "select") explanation = "select an area";
  else if(mode == "arc" || mode == "anti-arc" || 
          mode == "cap" || mode == "anti-cap" || 
          mode == "circle" || mode == "anti-circle" ||
          mode == "point" || mode == "anti-point" ||
          mode == "slant" ) explanation = "For inverted shape click on the selected button again";
  else if(mode == "select") explanation = "select an area";
  
  if(mode == "arc" || mode == "anti-arc" || 
     mode == "cap" || mode == "anti-cap" || 
     mode == "point" || mode == "anti-point" ||
     mode == "slant") explanation += "\nYou can also scroll to rotate the shape";
  
  text(explanation, width-space*4, space/2);
  
}

class House {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = space;
    this.shape = "empty";
    this.col = 0;
    this.direction = 1;
  }
  display() {
    fill(bg);
    stroke(20, 6);
    if(showTools()==false) noStroke();
    rect(this.pos.x, this.pos.y, this.size);

    shape(this.pos.x, this.pos.y, this.size,
          this.shape, this.col, this.direction );
  }
  displayClean(){
    fill(255);
    noStroke();
    shape(this.pos.x, this.pos.y, this.size,
          this.shape, this.col, this.direction );
  }
}

function keyPressed(){
  stepBack();
  
  if(keyIsDown(13)) { //enter key pressed
    captureMinimizedCanvas(1.5);
  } else {
    for(let i=0; i<archive.length; i++){
      if(key == archive[i].indentity){
        if(edit) {
          archive[i].rewrite(selected);
        } else if (button[1].selected){
          archive[i].destroy();
        } else {
          for(let j=0; j<letterbuttons.length; j++){
            if(archive[i].indentity == letterbuttons[j].mode){
              letterbuttons[j].selected = true;
            } else {
              letterbuttons[j].selected = false;
            }
          }
          for(let j=0; j<button.length; j++){
            button[j].selected = false;
          }
          
        }
        i = archive.length;
      }
    }
  }
}

function stepBack(){
  if((mouseIsPressed && mouseInside(button[9].a, button[9].s)) || 
     keyIsDown(8)) h.rectract();
  else if((mouseIsPressed && mouseInside(button[10].a, button[10].s))) h.forward();
}

class Saved{
  constructor(i){
    this.indentity = char(i);
    this.active = false;
    this.selection=[];
    this.shapes=[];
    this.directions=[];
  }
  rewrite(selected){
    this.selection=[];
    this.shapes=[];
    this.directions=[];
    let middlePoint = selected[floor(selected.length/2)]-selected[0];
    
    
    
    for(let i=0; i<selected.length; i++){
      this.selection[i] = selected[i] - selected[0] - middlePoint;
      this.shapes[i] = p[selected[i]].shape;
      this.directions[i] = p[selected[i]].direction;
    }
    if(this.active != true){
      this.active = true;
      letterbuttons.push(new Button4(width - space*1.5, buttonPlacementY));
      letterbuttons[letterbuttons.length-1].mode = key;
      //letterbuttons[letterbuttons.length-1].isPreset = true;
    }
    
    edit = false;
    button[0].selected = false;
    for(let i=0; i< letterbuttons.length; i++){
      if(letterbuttons[i].mode == this.indentity) {
        letterbuttons[i].selected = true;
      } else {
        letterbuttons[i].selected = false;
      }
    }
    for(let i=0; i<button.length; i++){
      button[i].selected = false;
    }
  }
  paste(){
    for(let i=0; i<p.length; i++){
      if(mouseInside(p[i].pos, p[i].size)){
        for(let j=0; j<this.selection.length; j++){
          let indx = i+this.selection[j];
          if(indx > p.length-1) indx -=p.length-1;
          if(indx < 0) indx +=p.length-1;
          p[indx].shape = this.shapes[j];
          p[indx].direction = this.directions[j];
        }
      }
    }
  }
  preview(){
    if(mouseIsPressed == false){
      for(let i=0; i<p.length; i++){
        if(mouseInside(p[i].pos, p[i].size)){
          for(let j=0; j<this.selection.length; j++){
            
            let indx = i +this.selection[j];
            if(indx > p.length-1) indx -=p.length-1;
            if(indx < 0) indx +=p.length-1;
            noStroke();
            fill(previewAntiColor);
            square(p[indx].pos.x, p[indx].pos.y, space);
            shape(p[indx].pos.x, p[indx].pos.y,
                  space, this.shapes[j], previewColor, this.directions[j]);  
            
          }
        }
      }
    }
  }
  destroy(){
    this.active = false;
    
    let shift=false;
    let j;
    for(let i=0; i<letterbuttons.length; i++){
      if(letterbuttons[i].mode == this.indentity){
        j=i;
        shift = true;
        buttonPlacementY -= (space+20);
      }
      if(shift){
        letterbuttons[i].a.y -= (space+20);
      }
    }
    letterbuttons.splice(j, 1);
  }
}

class History{
  constructor(p){
    this.past = [];
    this.past[0] = copyCanvas(p);
    for(let i=1; i<20; i++){
      this.past[i] = copyCanvas(this.past[i-1]);
    }
    this.block = true;
    this.current = 0;
  }
  update(p){
    if(unequalCanvases(this.past[this.current], p)){
      
      while(this.current>0){
        for(let i=0; i<this.past.length-1; i++){
          this.past[i] = copyCanvas(this.past[i+1]);
        }
        this.current--;
      }
      
        
      for(let i=this.past.length-1; i>0; i--){
        this.past[i] = copyCanvas(this.past[i-1]);
      }
      
      this.past[0] = copyCanvas(p);
    } 
  }
  rectract(){
    if(this.current < this.past.length) p = copyCanvas(this.past[this.current]);
    this.current ++;
    // for(let i=0; i<this.past.length-2; i++){
    //   this.past[i] = copyCanvas(this.past[i+1]);
    // }
    this.block = true;
  }
  forward(){
    if(this.current>0) {
      this.current --;
      p = copyCanvas(this.past[this.current]);
    }
  }
}

function unequalCanvases(one, another){
  let verdict = false;
  for(let i=0; i<another.length; i++){
    if(one[i].shape     != another[i].shape ||
       one[i].col       != another[i].col ||
       one[i].direction != another[i].direction){
      verdict = true;
      i = another.length;
    }
  }
  if(h.block) {
    verdict = false;
    h.block = false;
  }
  return verdict;
}

function copyCanvas(original){
  let newCanvas=[];
  for(let i=0; i<original.length; i++){
    newCanvas[i] = new House(original[i].pos.x, original[i].pos.y);

    newCanvas[i].shape     = original[i].shape;
    newCanvas[i].col       = original[i].col;
    newCanvas[i].direction = original[i].direction;
  }
  return newCanvas;
}

function createJSON(){
  let arr = [];
  arr[0] = floor(height / space);
  
  for (let i=0; i<p.length; i++){
    let n;
         if(p[i].shape == "empty")       n= 0;
    else if(p[i].shape == "square")      n= 1;
    else if(p[i].shape == "circle")      n= 2;
    else if(p[i].shape == "anti-circle") n= 3; 
    else if(p[i].shape == "arc")         n= 3+p[i].direction;  //4-7
    else if(p[i].shape == "anti-arc")    n= 7+p[i].direction;  //8-11
    else if(p[i].shape == "cap")         n= 11+p[i].direction; //12-15
    else if(p[i].shape == "anti-cap")    n= 15+p[i].direction; //16-19
    else if(p[i].shape == "slant")       n= 19+p[i].direction; //20-23
    arr.push(n)
  }
  console.log(arr);
  saveJSON(arr, 'data.json');
}

function captureMinimizedCanvas(fraction){
  fill(255);
  noStroke();
  rect(0,0,width,height);                     
  let offset = createVector(width/6,height/6);
  let newP = copyCanvas(p);
  for(let i=0; i<newP.length; i++){
    
    
    newP[i].size = space/fraction;
    newP[i].pos.mult(1/fraction, 1/fraction);
    newP[i].pos.add(offset.x, offset.y);
    bg=color(255);
    newP[i].displayClean();
  }
  save();
  bg=color(240);
}
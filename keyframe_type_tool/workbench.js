let FPSrate=8;
let animationFrame=0, previewStartFrame=0;
let frameJump=0;
let automaticFlip=true;
let isOnGrid=false;
let referenceFrame=0, referencedFrame=0, referenceOpacity=50;

function previewAnimation(){
  
  background(200,100);
  if(animationFrame<a.length) a[animationFrame].display();
  //change with framerate
  
  frameJump+=FPSrate/60;
  if(frameJump >= 1){
    frameJump=0;
    
    if(animationFrame<a.length-1) animationFrame++;
    else animationFrame=previewStartFrame;
  }
  
}

function displayWorkbench(){
  frameRate(60);
  background(200);
  
  reference(referenceFrame);
  
  
  let fromOnion = editingFrame-onf;
  if(fromOnion<0) fromOnion=0;
  
  let toOnion = editingFrame+onf;
  if(toOnion>a.length) toOnion=a.length;
  
  textSize(fontSize);
    
  for(let i=fromOnion; i<toOnion; i++){
      //excluding irrelevant frames
      if(abs(editingFrame-i)<onf){
        
        if(editingFrame == i) fill(0); //
        else { //onion frames
          let g= abs(i-editingFrame)*(150/onf);
          //next frames (red)
          if(editingFrame < i) {
            fill(150,0,0,150-g);
            a[i].display();
          } else if(editingFrame > i) {
            fill(0, 150, 0, 150-g);
            a[i].display();
          }
        }
        
      }
    }
  
  fill(20);
  if(editingFrame<a.length) a[editingFrame].display();
  
  
  
  
  displayToolBox();
  
  showCursor();
}

class Elem{
  constructor(x,y,k){
    this.pos=[];
    this.k=[];
    this.pos[0] = createVector(x,y);
    this.k[0] = k;
  }
  display(){
    
  //textAlign(CENTER, CENTER);
  
    for(let i=0; i<this.k.length; i++){
      text(this.k[i], this.pos[i].x, this.pos[i].y);
    }
  //textAlign(LEFT, BASELINE);  
  }
  add(x,y,k){
    this.pos.push(createVector(x,y));
    this.k.push(k);
  }
  clearPiece(){
    this.pos.splice(this.pos.length-1, 1);
    this.k.splice(this.k.length-1, 1);
  }
}

function mouseClickedWB(){
  
  
  
   {
    // draw on canvas
    
    let v=createVector(mouseX, mouseY);
    if(isOnGrid) v=cursorOnGrid();
    if(editingFrame != a.length) {
      a[editingFrame].add(v.x, v.y, chosenKey);
    } else a.push(new Elem(v.x, v.y, chosenKey));
    if (automaticFlip) editingFrame++;
  }
  updateToolBox();
}

function reference(frame){
  if(referenceFrame!=0){
    fill(20,referenceOpacity);
    referenceFrame.display();
  }
}

function insertFrame(rate){
  splice(a, new Elem(mouseX,mouseY,""),editingFrame+rate);
  editingFrame+=rate;
  a[editingFrame].clearPiece();
  updateToolBox();
}

function ignoreKeys(){
  if(keyCode == DELETE || 
     keyCode == ENTER || 
     keyCode == RETURN || 
     keyCode == TAB ||  
     keyCode == SHIFT || 
     keyCode == CONTROL || 
     keyCode == OPTION || 
     keyCode == ALT || 
     keyCode == ESCAPE||
     keyCode == 20 || keyCode == 32 || keyCode == 91 || keyCode == 93) return true;
  else return false;
}

function ignoreArrows(){
  if(keyCode == LEFT_ARROW || 
     keyCode == RIGHT_ARROW || 
     keyCode == UP_ARROW || 
     keyCode == DOWN_ARROW ) return true;
  else return false;
}

function duplicateFrame(){
  splice(a, new Elem(mouseX,mouseY,""),editingFrame+1);
      
  editingFrame++;
  a[editingFrame].clearPiece();
      
  for(let i=0; i<a[editingFrame-1].k.length; i++){
    a[editingFrame].k[i] = a[editingFrame-1].k[i];
    a[editingFrame].pos[i] = a[editingFrame-1].pos[i];
  }
}

function keyPressed(){
  if (TBbutton[inp].inputting && keyCode != ENTER) TBbutton[inp].type();
  else{
    
    if(keyCode == LEFT_ARROW) editingFrame--; 
    
    else if(keyCode == RIGHT_ARROW) editingFrame++;
    
    else if(keyCode == ENTER) TBbutton[inp].clicked();
 
    else if(keyCode == ALT) duplicateFrame();
    
    else if(keyCode == UP_ARROW) insertFrame(1);

    else if(keyCode == DOWN_ARROW) insertFrame(0);
    
    else if(keyCode == BACKSPACE){
      if(editingFrame != a.length) {
        if(a[editingFrame].k.length >0) a[editingFrame].clearPiece();
        else deleteFrame(editingFrame);
      }
    } else if(ignoreKeys()){}
    
    else chosenKey = key;
    
    editingFrame = constrain(editingFrame, 0, a.length);
    updateToolBox();
  }
}


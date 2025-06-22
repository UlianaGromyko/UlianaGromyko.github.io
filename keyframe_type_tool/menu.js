function reset(){
  previewStartFrame=0;
  
  editingFrame=0;
  a.splice(0, a.length);
  a[0] = new Elem(0,0,"");
  //storeItem("a", a);
  //setupMenu();
}

function loadWorkfile(file) {
  a=[];
  
  
  
  for(let i=0; i<file.length; i++){
    
    if (file[i].k.length>0){
    a[i] = new Elem(file[i].pos[0].x, 
                    file[i].pos[0].y, 
                    file[i].k[0]);}
    
    if(file[i].k.length>0){
      
      for(let j=1; j<file[i].k.length; j++){
        a[i].add(file[i].pos[j].x, 
              file[i].pos[j].y, 
              file[i].k[j]);
      }
    }
    
  }
  if(a.length==0) a[0] = new Elem(0,0,"");
  editingFrame = a.length;
}

function setupMenu(){
  
  let savedData = getItem('a');
  if (savedData == null) {
    loadWorkfile([]);
  } else {
    loadWorkfile(savedData);
  }
  
}

function previewFont(m){
  
  let m2=(2*m);
  let pm= m;
  
  let wide=450 + m2;
  let pos=createVector(width-wide-margin,margin+m2*3);
  
  noFill();
  
  
  rect(pos.x, pos.y - m2*2, wide, -m2); //this should be a button for fonts
  
  
  rect(pos.x, pos.y - m2*1, wide, -m2); //this should be a button for size
  
  rect(pos.x, pos.y - m2*0, wide, -m2); //this should be a button for color
  fill(20);
  textSize(m);
  text("font: ",
       pos.x+m/2, pos.y - m2*2 -m/2);
  text("text size: "+ 
       round(map(mouseX, 0,width, 15, 60)),
       pos.x+m/2, pos.y - m2*1 -m/2);
  text("color: ",
       pos.x+m/2, pos.y - m2*0 -m/2);
  
  m=map(mouseX, 0,width, 15, 60);
  m2=(2*m);
  textSize(m);
  
  let x=pos.x +m, y=pos.y + m2;
  
  for(let i=33; i<127; i++){
    if(x > pos.x+wide-m){
      x=pos.x +m;
      y+= m2;
    }
    if (y < height-margin) text(char(i), x,y);
    else i=127;
    x+= m2;
  }
  noFill();
  let high= y-pos.y +m;
  high = constrain(high, 0, height-pos.y-margin)
  rect(pos.x, pos.y, wide, high);
  
}

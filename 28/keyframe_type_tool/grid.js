let gridCoords, gridw, gridh;

function updateGrid(){
  
  textFont(font[currentFont]);
  textSize(fontSize);
  
  gridw = textWidth("m")*0.83;
  gridh = fontSize;
  
}

function cursorOnGrid(){
  gridCoords = createVector(mouseX-mouseX%gridw,
                            mouseY-mouseY%gridh);
  
  return gridCoords;
}

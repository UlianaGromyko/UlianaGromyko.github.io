


let seedPoints = [];
let delaunay, voronoi;

function setup() {
  createCanvas(screen.availWidth - 2,   
               screen.availHeight - 170);
  for (let i = 0; i < 70; i++) {
    seedPoints[i] = createVector(random(width), random(height));
  }
  
  noCursor();
}

function draw() {
  background(20);
  seedPoints[0] = createVector(mouseX, mouseY);
  delaunay = calculateDelaunay(seedPoints);

  
  noFill();
  noStroke();
 // stroke(150, 0, 50, 50);
  strokeWeight(1);
  // jeweils 3 punkte hintereinander geben ein delaunay-triangle.
  // Ist aus d3.js-library
  
  console.log(delaunay.triangles);
  
  let { points, triangles } = delaunay;
  for (let i = 0; i < triangles.length; i += 3) {
    let a = 2 * delaunay.triangles[i];
    let b = 2 * delaunay.triangles[i + 1];
    let c = 2 * delaunay.triangles[i + 2];
    triangle(
      points[a],
      points[a + 1],
      points[b],
      points[b + 1],
      points[c],
      points[c + 1]
    );
  }
  
  let voronoi = delaunay.voronoi( [0, 0, width, height] );
  let polygons = voronoi.cellPolygons();
  for(let poly of polygons) {
    beginShape();
    stroke(200);
      for (let i = 0; i < poly.length; i++) {
      vertex(poly[i][0], poly[i][1]);
      }
    endShape();
  } 
}
function calculateDelaunay(points) {
  let pointsArray = [];
  for (let v of points) {
    pointsArray.push(v.x, v.y);
  }
  return new d3.Delaunay(pointsArray);
}
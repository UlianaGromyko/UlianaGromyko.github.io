let points = [];

function setup() {
  createCanvas(screen.availWidth - 2,   
               screen.availHeight - 170);
  noFill();
  for (let i = 0; i < 50; i++) {
    points.push({
      x: random(width),
      y: random(height),
      vx: random(-1, 1),
      vy: random(-1, 1)
    });
  }
  stroke(200);
}

function draw() {
  background(20);

  for (let i = 0; i < points.length; i++) {
    let p = points[i];

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
    
    //ellipse(p.x, p.y, 5);

    let distances = [];
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        let d = dist(p.x, p.y, points[j].x, points[j].y);
        distances.push({ index: j, distance: d });
      }
    }

    distances.sort((a, b) => a.distance - b.distance);
      
      let closest1 = points[distances[0].index];
      let closest2 = points[distances[1].index];
      let closest3 = points[distances[2].index];
      
      line(p.x, p.y, closest1.x, closest1.y);
      line(p.x, p.y, closest2.x, closest2.y);
      line(p.x, p.y, closest3.x, closest3.y);
      
    
  }
}

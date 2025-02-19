const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
    "#ffffff",
    "#fdfafa",
    "#faf5f5",
    "#f8efef",
    "#f6eaea",
    "#f3e5e5",
    "#f1e0e0",
    "#eedbdb",
    "#ecd5d5",
    "#ead0d0",
    "#e7cbcb",
    "#e5c6c6",
    "#e3c1c1",
    "#e0bbbb",
    "#deb6b6",
    "#dbb1b1",
    "#d9acac",
    "#d7a7a7",
    "#d4a1a1",
    "#d29c9c",
    "#d09797",
    "#cd9292",
    "#cb8d8d",
    "#c98787",
    "#c68282",
    "#c47d7d",
    "#c17878",
    "#bf7272",
    "#bd6d6d",
    "#ba6868",
    "#b86363",
    "#b65e5e",
    "#b35858",
    "#b15353",
    "#af4e4e",
    "#ac4949",
    "#aa4444",
    "#a73e3e",
    "#a53939",
    "#a33434",
    "#a02f2f",
    "#9e2a2a",
    "#9c2424",
    "#991f1f",
    "#971a1a",
    "#941515",
    "#921010",
    "#900a0a",
    "#8d0505",
    "#8b0000"
  ];
  
  

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 7.5 + "px";
    circle.style.top = y - 7.5 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.1;
    y += (nextCircle.y - y) * 0.1;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();

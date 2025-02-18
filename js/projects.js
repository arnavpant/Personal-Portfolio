// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Select the SVG path
let svg = document.querySelector("svg");
let path = svg.querySelector("path");

// Get the total path length
const pathLength = path.getTotalLength();

console.log("Path Length:", pathLength); // Debugging line to check length

// Set initial strokeDashArray and strokeDashOffset
gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

// Create the scroll-based animation
gsap.fromTo(
  path, 
  { strokeDashoffset: pathLength }, 
  {
    strokeDashoffset: 0,
    duration: 5,
    ease: "none",
    scrollTrigger: {
      trigger: ".svg-container", // Make sure this is the right selector
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    }
  }
);

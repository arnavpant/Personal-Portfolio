/* -------------------------------
   1) SHUFFLING TEXT CODE
   - Each line’s shuffling completes in exactly 4 seconds.
   - Per-letter delay is computed as: letterDelay = 4000ms / (number of characters in the line)
------------------------------- */
document.addEventListener("DOMContentLoaded", function() {
  /* 1) CREATE RANDOM LETTERS */
  const randomLettersContainer = document.getElementById("random-letters-container");
  const lettersSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  // Adjust these values as needed
  const NUM_LETTERS = 100;         // how many letters to generate
  const HERO_WIDTH = randomLettersContainer.offsetWidth;
  const HERO_HEIGHT = randomLettersContainer.offsetHeight;
  const SHUFFLE_DURATION = 3000;   // total shuffle time in ms

  // Create each letter span at a random position
  for (let i = 0; i < NUM_LETTERS; i++) {
    const span = document.createElement("span");
    span.className = "random-letter";
    // Start with a random character
    span.textContent = lettersSet[Math.floor(Math.random() * lettersSet.length)];
    
    // Random position
    const x = Math.random() * HERO_WIDTH;
    const y = Math.random() * HERO_HEIGHT;
    
    span.style.left = x + "px";
    span.style.top = y + "px";
    
    // Optional: random font size
    span.style.fontSize = (0.8 + Math.random() * 2) + "rem";
    
    randomLettersContainer.appendChild(span);

    // For each letter, shuffle it until the duration ends
    const startTime = Date.now();
    const shuffleInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= SHUFFLE_DURATION) {
        clearInterval(shuffleInterval);
        // Fade out or remove the letter
        span.style.opacity = 0;
        // Remove from DOM after fade-out
        setTimeout(() => {
          if (span.parentNode) {
            span.parentNode.removeChild(span);
          }
        }, 1000); // match the CSS transition time
      } else {
        // Shuffle character
        span.textContent = lettersSet[Math.floor(Math.random() * lettersSet.length)];
      }
    }, 50); // shuffle every 50ms
  }

// All possible characters for shuffling

// Define lines with text and style. (No letterDelay property needed now.)
const lines = [
  { text: "My name is", style: "normal" },
  { text: "Arnav Pant", style: "highlight" },
  { text: "I'm a Computer Science major at", style: "normal" },
  { text: "Virginia Tech", style: "VT" },
  { text: "And THIS is my personal portfolio", style: "normal" }
];

const totalDuration = 2500; // 3 seconds in milliseconds

const shuffleContainer = document.getElementById("shuffle-container");

// Process each line and create a container for its letters
lines.forEach((line) => {
  const lineDiv = document.createElement("div");
  lineDiv.classList.add("line", line.style);
  shuffleContainer.appendChild(lineDiv);

  const startTime = Date.now();
  // Compute the per-letter delay so the final letter locks in at 4000ms
  const letterDelay = totalDuration / line.text.length;

  // Create a <span> for each character in the line
  Array.from(line.text).forEach((char, index) => {
    const span = document.createElement("span");
    span.classList.add("letter");
    span.setAttribute("data-final", char);
    // Each letter locks in after (index+1)*letterDelay milliseconds
    span.setAttribute("data-locktime", (index + 1) * letterDelay);
    span.setAttribute("data-start", startTime);

    if (char === " ") {
      span.innerHTML = "&nbsp;";
    } else {
      const randIndex = Math.floor(Math.random() * lettersSet.length);
      span.textContent = lettersSet[randIndex];
    }
    lineDiv.appendChild(span);
  });

  // Set up a shuffling interval for this line
  const updateInterval = 80; // update every 80ms
  const lineInterval = setInterval(() => {
    lineDiv.querySelectorAll(".letter").forEach((span) => {
      const finalChar = span.getAttribute("data-final");
      if (finalChar === " ") {
        span.innerHTML = "&nbsp;";
        return;
      }
      const letterStart = Number(span.getAttribute("data-start"));
      const elapsed = Date.now() - letterStart;
      const lockTime = Number(span.getAttribute("data-locktime"));
      if (elapsed >= lockTime) {
        span.textContent = finalChar;
      } else {
        span.textContent = lettersSet[Math.floor(Math.random() * lettersSet.length)];
      }
    });
    // Check if all letters are locked in
    const allLocked = Array.from(lineDiv.querySelectorAll(".letter")).every((span) => {
      return span.textContent === span.getAttribute("data-final") || span.getAttribute("data-final") === " ";
    });
    if (allLocked) {
      clearInterval(lineInterval);
    }
  }, updateInterval);
});

/* -------------------------------
   2) SCROLL EFFECT CODE
      - As the user scrolls, the hero section zooms out.
      - The About section fades in.
------------------------------- */
document.addEventListener("scroll", function () {
  const hero = document.getElementById("hero");
  const about = document.getElementById("about");
  const scrollPos = window.scrollY;
  const maxScroll = 300; // threshold for effect

  // Calculate a scale factor for the hero section (scaling from 1 down to 0.8)
  const scale = 1 - Math.min((scrollPos / maxScroll) * 0.2, 0.2);
  hero.style.transform = `scale(${scale})`;

  // Fade in the About section after scrolling 150px
  if (scrollPos > 150) {
    const opacity = Math.min((scrollPos - 150) / (maxScroll - 150), 1);
    about.style.opacity = opacity;
  } else {
    about.style.opacity = 0;
  }
});

// Select all card elements
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', function() {
    const targetUrl = card.dataset.target;
    
    // Clone the card
    const cardClone = card.cloneNode(true);
    
    // Get the card's current position and size
    const rect = card.getBoundingClientRect();
    
    // Set initial styles for the clone to match the card exactly
    cardClone.style.position = 'fixed';
    cardClone.style.top = rect.top + 'px';
    cardClone.style.left = rect.left + 'px';
    cardClone.style.width = rect.width + 'px';
    cardClone.style.height = rect.height + 'px';
    cardClone.style.margin = 0;
    cardClone.style.borderRadius = getComputedStyle(card).borderRadius;
    cardClone.style.zIndex = 10000;
    
    // Apply transition with a custom easing (slow start, then accelerates)
    cardClone.style.transition = 'all 0.8s cubic-bezier(0.42, 0, 1, 1)';
    
    // Append the clone to the body
    document.body.appendChild(cardClone);
    
    // Force reflow so initial styles are applied before animating
    cardClone.getBoundingClientRect();
    
    // Animate the clone to fill the viewport
    cardClone.style.top = '0';
    cardClone.style.left = '0';
    cardClone.style.width = '100vw';
    cardClone.style.height = '100vh';
    cardClone.style.borderRadius = '0';
    
    // Update the heading inside the clone.
    // It will use the same font as your Virginia Tech text but remain white.
    const heading = cardClone.querySelector('h3');
    if (heading) {
      heading.style.position = 'absolute';
      heading.style.top = '50%';
      heading.style.left = '50%';
      heading.style.transform = 'translate(-50%, -50%)';
      heading.style.transition = 'font-size 0.8s cubic-bezier(0.42, 0, 1, 1)';
      // Use the same font as your VT text
      heading.style.fontFamily = '"acherus_grotesque_-_extrabold_italic", "Helvetica Neue", Arial, sans-serif';
      // Gradually increase font size to 10rem
      heading.style.fontSize = '10rem';
      // Force color to white
      heading.style.color = '#ffffff';
      // Keep text on one line
      heading.style.whiteSpace = 'nowrap';
    }
    
    // Listen for the end of the transition (using width as trigger) then redirect
    cardClone.addEventListener('transitionend', function(e) {
      if (e.propertyName === 'width') {
        window.location.href = targetUrl;
      }
    });
    
    // Fallback: Redirect after 900ms if transitionend isn't fired
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 900);
  });
});

});





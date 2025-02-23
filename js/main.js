/* main.js */

// Global variable to hold the redirect timeout
let redirectTimeout = null;

document.addEventListener("DOMContentLoaded", function() {
  // SHUFFLING TEXT CODE
  const lettersSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const lines = [
    { text: "My name is", style: "normal" },
    { text: "Arnav Pant", style: "highlight" },
    { text: "I'm a Computer Science major at", style: "normal" },
    { text: "Virginia Tech", style: "VT" },
    { text: "And THIS is my personal portfolio", style: "normal" }
  ];

  const totalDuration = 2500; // 2.5 seconds
  const shuffleContainer = document.getElementById("shuffle-container");

  lines.forEach((line) => {
    const lineDiv = document.createElement("div");
    lineDiv.classList.add("line", line.style);
    shuffleContainer.appendChild(lineDiv);

    const startTime = Date.now();
    const letterDelay = totalDuration / line.text.length;

    Array.from(line.text).forEach((char, index) => {
      const span = document.createElement("span");
      span.classList.add("letter");
      span.setAttribute("data-final", char);
      span.setAttribute("data-locktime", (index + 1) * letterDelay);
      span.setAttribute("data-start", startTime);

      if (char === " ") {
        span.innerHTML = "&nbsp;";
      } else {
        span.textContent = lettersSet[Math.floor(Math.random() * lettersSet.length)];
      }
      lineDiv.appendChild(span);
    });

    const updateInterval = 80;
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
});

/**
 * Animate the clicked card to fullscreen, then navigate.
 * Called inline in the anchor's onClick attribute in index.html.
 */
function animateCard(e, url) {
  e.preventDefault(); // Stop immediate navigation
  const card = e.currentTarget;
  
  // Clone the anchor (which looks like a card)
  const cardClone = card.cloneNode(true);
  // Mark the clone so we can later remove it if necessary
  cardClone.classList.add("card-clone");

  // Get the card's current position and size
  const rect = card.getBoundingClientRect();

  // Set initial styles for the clone
  cardClone.style.position = 'fixed';
  cardClone.style.top = rect.top + 'px';
  cardClone.style.left = rect.left + 'px';
  cardClone.style.width = rect.width + 'px';
  cardClone.style.height = rect.height + 'px';
  cardClone.style.margin = 0;
  cardClone.style.borderRadius = getComputedStyle(card).borderRadius;
  cardClone.style.zIndex = 10000;
  cardClone.style.transition = 'all 0.8s cubic-bezier(0.42, 0, 1, 1)';

  // Append the clone to the body and force reflow
  document.body.appendChild(cardClone);
  cardClone.getBoundingClientRect();

  // Animate the clone to fill the viewport
  cardClone.style.top = '0';
  cardClone.style.left = '0';
  cardClone.style.width = '100vw';
  cardClone.style.height = '100vh';
  cardClone.style.borderRadius = '0';

  // Animate the heading inside the clone
  const heading = cardClone.querySelector('h3');
  if (heading) {
    heading.style.position = 'absolute';
    heading.style.top = '50%';
    heading.style.left = '50%';
    heading.style.transform = 'translate(-50%, -50%)';
    heading.style.transition = 'font-size 0.8s cubic-bezier(0.42, 0, 1, 1)';
    heading.style.fontFamily = '"acherus_grotesque_-_extrabold_italic", "Helvetica Neue", Arial, sans-serif';
    heading.style.fontSize = '10rem';
    heading.style.color = '#ffffff';
    heading.style.whiteSpace = 'nowrap';
  }

  // When the transition ends, navigate to the target page.
  cardClone.addEventListener('transitionend', function(ev) {
    if (ev.propertyName === 'width') {
      window.location.href = url;
    }
  });

  // Fallback: navigate after 900ms if transitionend doesn't fire.
  redirectTimeout = setTimeout(() => {
    window.location.href = url;
  }, 900);

  return false; // Prevent default navigation
}

// Listen for the pageshow event. If the page is restored from the bfcache,
// cancel any pending redirect and remove any clone elements.
window.addEventListener("pageshow", function(event) {
  if (event.persisted) {
    if (redirectTimeout) {
      clearTimeout(redirectTimeout);
      redirectTimeout = null;
    }
    const clones = document.querySelectorAll('.card-clone');
    clones.forEach(clone => {
      if (clone.parentNode) {
        clone.parentNode.removeChild(clone);
      }
    });
  }
});

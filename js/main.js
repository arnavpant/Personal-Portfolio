/* -------------------------------
   1) SHUFFLING TEXT CODE
      - Each line has its own per-letter timing.
      - Each letter locks in after (index + 1) * letterDelay milliseconds.
------------------------------- */

// All possible characters for shuffling
const lettersSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// Define lines with text, style, and letterDelay (in ms per letter)
const lines = [
  { text: "My name is", style: "normal", letterDelay: 100 },
  { text: "Arnav Pant", style: "highlight", letterDelay: 150 },
  { text: "Computer Science major at Virginia Tech", style: "normal", letterDelay: 100 },
  { text: "And this is my personal portfolio", style: "normal", letterDelay: 100 }
];

const shuffleContainer = document.getElementById('shuffle-container');

// Populate the shuffle container
lines.forEach(line => {
  const lineDiv = document.createElement('div');
  lineDiv.classList.add('line', line.style);
  const startTime = Date.now();
  
  Array.from(line.text).forEach((char, index) => {
    const span = document.createElement('span');
    span.classList.add('letter');
    span.setAttribute('data-final', char);
    // Each letter will lock in after (index+1)*letterDelay ms
    span.setAttribute('data-locktime', (index + 1) * line.letterDelay);
    span.setAttribute('data-start', startTime);
    if (char === ' ') {
      span.innerHTML = '&nbsp;';
    } else {
      span.textContent = lettersSet[Math.floor(Math.random() * lettersSet.length)];
    }
    lineDiv.appendChild(span);
  });
  
  shuffleContainer.appendChild(lineDiv);
  
  // Setup shuffling for this line using a constant update interval
  const updateInterval = 80; // in ms
  const lineInterval = setInterval(() => {
    lineDiv.querySelectorAll('.letter').forEach(span => {
      const finalChar = span.getAttribute('data-final');
      if (finalChar === ' ') {
        span.innerHTML = '&nbsp;';
        return;
      }
      const letterStart = Number(span.getAttribute('data-start'));
      const elapsed = Date.now() - letterStart;
      const lockTime = Number(span.getAttribute('data-locktime'));
      if (elapsed >= lockTime) {
        span.textContent = finalChar;
      } else {
        span.textContent = lettersSet[Math.floor(Math.random() * lettersSet.length)];
      }
    });
    // If all letters are locked in, clear the interval for this line
    const allLocked = Array.from(lineDiv.querySelectorAll('.letter')).every(span => {
      return span.textContent === span.getAttribute('data-final') || span.getAttribute('data-final') === ' ';
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
document.addEventListener('scroll', function() {
  const hero = document.getElementById('hero');
  const about = document.getElementById('about');
  const scrollPos = window.scrollY;
  const maxScroll = 300; // threshold for effect

  // Calculate a scale factor for the hero section (scaling from 1 to 0.8)
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

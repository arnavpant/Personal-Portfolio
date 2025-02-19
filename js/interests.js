gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.interest-content').forEach((content, i) => {
  // Determine odd or even (0-indexed: even index => odd-numbered article)
  const isOdd = i % 2 === 0;

  // For odd interests:
  // - Image starts fully off to the left ("-100%")
  // - Text starts fully off to the right ("100%")
  // For even interests, swap the initial positions.
  const imageInitialX = isOdd ? "-100%" : "100%";
  const textInitialX  = isOdd ? "100%"  : "-100%";

  // Set initial state using GSAP:
  gsap.set(content.querySelector('.interest-image'), { x: imageInitialX, opacity: 0 });
  gsap.set(content.querySelector('.interest-description'), { x: textInitialX, opacity: 0 });

  // Create a timeline that scrubs with scroll for this interest content.
  gsap.timeline({
    scrollTrigger: {
      trigger: content,
      start: "top 90%",
      end: "top 60%",
      scrub: true,
    }
  })
  .to(content.querySelector('.interest-image'), { x: "0%", opacity: 1, ease: "power2.out", duration: 1 }, 0)
  .to(content.querySelector('.interest-description'), { x: "0%", opacity: 1, ease: "power2.out", duration: 1 }, 0);
});

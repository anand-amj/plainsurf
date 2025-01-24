// offcanavs

//gsap.pause();

const clickMenu = document.getElementById("menuToggle");
const offCanvasMenu = document.getElementById("offCanvasMenu");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

clickMenu.addEventListener("click", function (e) {
  function offCanvas() {
    gsap.to("#offCanvasMenu", {
      left: 0,
      duration: 0.5,
    });
    gsap.from("#offCanvasMenu ul li", {
      x: -150,
      duration: 1,
      stagger: 0.5,
    });
  }
  offCanvas();
});

closeBtn.addEventListener("click", function (e) {
  console.log(e);
  function offCanvas() {
    gsap.to("#offCanvasMenu", {
      left: "-320px",
      duration: 0.7,
    });
  }
  offCanvas();
});

const sections = document.querySelectorAll(".hideSection");
sections.forEach((section) => {
  section.style.display = "none";
});
const headerShow = document.querySelectorAll(".hide-header");
headerShow.forEach((headerShow) => {
  headerShow.style.display = "none";
});

const hamburgerMenu = document.querySelectorAll(".hamburger");
hamburgerMenu.forEach((hamburgerMenu) => {
  hamburgerMenu.style.display = "none";
});
const rightMenu = document.querySelectorAll(".right-link");
rightMenu.forEach((rightMenu) => {
  rightMenu.style.display = "none";
});

const leftBanText = document.querySelectorAll(".left-banner-text");
leftBanText.forEach((leftBanText) => {
  leftBanText.style.display = "none";
});

const rightBanText = document.querySelectorAll(".right-banner-text");
rightBanText.forEach((rightBanText) => {
  rightBanText.style.display = "none";
});

function updatePath() {
  const width = window.innerWidth; // Get the window's width
  const path = document.getElementById("linePath");
  const initialX = width / 2;
  path.setAttribute("d", `M ${initialX} 0 H ${initialX}`);
}
// Update the path when the page loads
updatePath();

// animate  header line
function animateLine() {
  const line = document.getElementById("linePath");
  const width = window.innerWidth;

  gsap.to(line, {
    duration: 1, // Duration of the animation
    ease: "power2.out", // Easing for smooth animation
    attr: { d: `M 0 0 H ${width}` },
  });
}
window.addEventListener("resize", animateLine);

// animate vertical
function animateVertical() {
  const lineVertical = document.querySelectorAll(".linePathVertical");
  gsap.to(lineVertical, {
    duration: 1, // Duration of the animation
    ease: "power2.out", // Easing for smooth animation
    attr: { d: `M 0 0 V 80` },
  });
}

// product box
const productBoxShow = document.querySelectorAll(".product-box");
productBoxShow.forEach((productBoxShow) => {
  productBoxShow.style.display = "none";
});

function productBox() {
  const productBoxAnimation = document.querySelectorAll(".product-box");
  gsap.to(productBoxAnimation, {
    y: -50,
    duration: 1,
    ease: "power2.out",
  });
  productBoxShow.forEach((productBoxShow) => {
    productBoxShow.style.display = "flex";
  });
}

// Text you want to animate
const text = "VANAHA";
const container = document.getElementById("text-container");
const video = document.getElementById("bgVideo");

// Split the text into individual letters and create a span for each letter
const letters = [];
for (let i = 0; i < text.length; i++) {
  const span = document.createElement("span");
  span.classList.add("letter");
  span.textContent = text[i];
  container.appendChild(span);
  letters.push(span);
}

// Function to distribute the letters evenly across the screen
function distributeLetters() {
  const containerWidth = window.innerWidth;
  let totalLettersWidth = 0;

  // Calculate the total width of all letters combined
  letters.forEach((letter) => {
    totalLettersWidth += letter.offsetWidth;
  });

  // Calculate the space between letters dynamically
  const spaceBetween =
    (containerWidth - totalLettersWidth) / (letters.length + 1);

  // Position each letter
  let currentX = -containerWidth / 2 + spaceBetween;
  letters.forEach((letter) => {
    gsap.set(letter, { x: currentX });
    currentX += letter.offsetWidth + spaceBetween;
  });
}

// Function to bring letters to their normal position with animation
function reduceSpaceToNormal() {
  letters.forEach((letter, index) => {
    gsap.to(letter, {
      x: 0,
      opacity: 1,
      filter: "blur(0)",
      duration: 2,
      delay: 0,
      ease: "power3.out",
    });
  });

  // Scale the text from 30% to 100% of the screen
  gsap.to(container, {
    scale: 1,
    duration: 2,
    ease: "power3.out",
  });

  // Video immediately appears at 30% scale after text animation ends
  gsap.to(video, {
    opacity: 1,
    scale: 0.4,
    delay: 1,
    duration: 2,
    ease: "power3.out",
    onStart: () => {
      // Change text color to white when the video reaches 30% scale
      gsap.to(container, {
        color: "white",
        duration: 2,
        ease: "power3.out",
      });
    },
  });

  // Wait for 4 seconds before starting to scale the video up
  gsap.to(video, {
    scale: 1,
    opacity: 1,
    duration: 3,
    delay: 3,
    ease: "power3.out",
  });

  gsap.to(container, {
    opacity: 1,
    //y: "-45%",
    scale: 0.7,
    duration: 1,
    delay: 6,
    height: "auto",
    ease: "power3.out",
    onComplete: () => {
      // Reset the transform on the letter elements to prevent unwanted translations
      gsap.set(letters, {
        transform: "none",
        opacity: 1,
      });

      // Reveal the sections after the video finishes
      sections.forEach((section) => {
        gsap.to(section, { opacity: 1, display: "block", duration: 1 });
        gsap.to(headerShow, { opacity: 1, display: "flex", duration: 1 });
        gsap.to(hamburgerMenu, { opacity: 0, display: "none", duration: 1 });
        gsap.to(rightMenu, { opacity: 0, display: "none", duration: 1 });
        gsap.to(rightBanText, { opacity: 0, display: "none", duration: 1 });
        gsap.to(leftBanText, { opacity: 0, display: "none", duration: 1 });
      });

      // gsap.set(headerShow, {
      //   opacity: 0, // Start hidden
      //   // scale: 1, // Start scaled down
      //   // borderBottomWidth: "0%", // No border initially
      // });

      // Animate headerShow to full opacity, scale, and border-bottom
      gsap.to(headerShow, {
        duration: 1.5, // Duration of the scaling and border animation
        ease: "power3.out",
        onStart: () => {
          animateLine();
        },
        onComplete: () => {
          // Once the scale and border animation are complete, fade the header into view
          gsap.to(headerShow, {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          });
          gsap.to(hamburgerMenu, { opacity: 1, display: "flex", duration: 1 });
          gsap.to(rightMenu, { opacity: 1, display: "flex", duration: 1 });
          gsap.to(rightBanText, { opacity: 1, display: "block", duration: 1 });
          gsap.to(leftBanText, { opacity: 1, display: "block", duration: 1 });
          animateVertical();
          productBox();
          //offCanvas();
        },
      });
    },
  });
}

distributeLetters();
// window.addEventListener("resize", distributeLetters);

// GSAP animation for each letter with a random delay
letters.forEach((letter, index) => {
  const randomDelay = Math.random() * 2;
  gsap.to(letter, {
    opacity: 1,
    x: "+=0",
    filter: "blur(0)",
    duration: 2,
    delay: randomDelay,
    ease: "power3.out",
  });
});

// After initial animation, reduce space to normal (collapse them together)
setTimeout(reduceSpaceToNormal, 2500);

// Start the animation after page load
function startAnimation() {
  gsap.set(video, {
    opacity: 0,
    scale: 0.4,
    transformOrigin: "center center", //scaling happens from the center
  });

  // Call the reduceSpaceToNormal function after the initial delay
  setTimeout(reduceSpaceToNormal, 2500);
}

window.onload = startAnimation;

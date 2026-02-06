// Page Navigation
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetPage = button.getAttribute('data-page');

    if (!targetPage) return;

    // Update active states
    pages.forEach(page => page.classList.remove('active'));
    navButtons.forEach(btn => btn.classList.remove('active'));

    // Show target page
    const target = document.getElementById(targetPage);
    void target.offsetWidth;
    target.classList.add('active');
    button.classList.add('active');
  });
});

// Set first button as active on load
document.querySelector('.nav-btn[data-page="home"]').classList.add('active');

// Carousel interaction (pause on hover)
const carousel = document.getElementById('carousel');

carousel.addEventListener('mouseenter', () => {
  carousel.style.animationPlayState = 'paused';
});

carousel.addEventListener('mouseleave', () => {
  carousel.style.animationPlayState = 'running';
});

// Optional: Click carousel items to view details
const carouselItems = document.querySelectorAll('.carousel-item');

carouselItems.forEach(item => {
  item.addEventListener('click', () => {
    console.log('Carousel item clicked:', item);
  });
});

// Work page scroll reveal
const workScroll = document.querySelector('.work-scroll');

function revealWorkItems() {
  if (!workScroll) return;
  const items = workScroll.querySelectorAll('.work-reveal');
  const container = workScroll.closest('.work-container');
  if (!container) return;

  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    if (rect.top < containerRect.bottom - 40) {
      item.classList.add('visible');
    }
  });
}

// Run on scroll inside work container
const workContainer = document.querySelector('.work-container');
if (workContainer) {
  workContainer.addEventListener('scroll', revealWorkItems);
}

// Reset and trigger reveals when navigating to work page
navButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetPage = button.getAttribute('data-page');
    if (targetPage === 'work') {
      document.querySelectorAll('.work-reveal').forEach(el => el.classList.remove('visible'));
      requestAnimationFrame(() => {
        if (workContainer) workContainer.scrollTop = 0;
        revealWorkItems();
      });
    }
  });
});

// Bio typewriter effect
const bioText = "I'm a self taught creative technologist who believes the best work is both beautiful and functional. What started as curiosity has grown into a passion for solving problems through design and development.\n\nI live for that space where creativity meets technology—understanding not just what works, but why, and how to make it better. My mission is to make online interaction fun again, creating experiences that feel effortless and human.";

const skillsText = "I'm currently exploring and refining my skills in p5.js, Three.js, MediaPipe, HTML, CSS, JavaScript, TouchDesigner, and Figma—constantly experimenting with these tools to discover new possibilities. Each project is an opportunity to push boundaries, learn something unexpected, and find fresh approaches to creative challenges.";

let bioTyped = false;
let skillsTyped = false;
let typewriterInterval = null;
let skillsTypewriterInterval = null;

function typewriterEffect() {
  const bioElement = document.getElementById('bioText');
  if (!bioElement || bioTyped) return;

  bioTyped = true;
  let index = 0;
  bioElement.innerHTML = '<span class="cursor"></span>';

  typewriterInterval = setInterval(() => {
    if (index < bioText.length) {
      const char = bioText[index];
      if (char === '\n') {
        bioElement.innerHTML = bioElement.innerHTML.replace('<span class="cursor"></span>', '') + '<br><span class="cursor"></span>';
      } else {
        bioElement.innerHTML = bioElement.innerHTML.replace('<span class="cursor"></span>', '') + char + '<span class="cursor"></span>';
      }
      index++;
    } else {
      clearInterval(typewriterInterval);
      // Remove cursor after typing is done
      setTimeout(() => {
        const cursor = bioElement.querySelector('.cursor');
        if (cursor) cursor.remove();
      }, 2000);
    }
  }, 30);
}

// Skills typewriter effect
function skillsTypewriterEffect() {
  const skillsElement = document.getElementById('skillsText');
  if (!skillsElement || skillsTyped) return;

  skillsTyped = true;
  let index = 0;
  skillsElement.innerHTML = '<span class="cursor"></span>';

  skillsTypewriterInterval = setInterval(() => {
    if (index < skillsText.length) {
      const char = skillsText[index];
      if (char === '\n') {
        skillsElement.innerHTML = skillsElement.innerHTML.replace('<span class="cursor"></span>', '') + '<br><span class="cursor"></span>';
      } else {
        skillsElement.innerHTML = skillsElement.innerHTML.replace('<span class="cursor"></span>', '') + char + '<span class="cursor"></span>';
      }
      index++;
    } else {
      clearInterval(skillsTypewriterInterval);
      setTimeout(() => {
        const cursor = skillsElement.querySelector('.cursor');
        if (cursor) cursor.remove();
      }, 2000);
    }
  }, 30);
}

// Trigger typewriter when navigating to about page
navButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetPage = button.getAttribute('data-page');
    if (targetPage === 'about' && !bioTyped) {
      setTimeout(typewriterEffect, 500);
    }
  });
});

// Trigger skills typewriter when scrolled into view
const aboutContainer = document.querySelector('.about-container');
if (aboutContainer) {
  aboutContainer.addEventListener('scroll', () => {
    if (skillsTyped) return;
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
      const rect = skillsSection.getBoundingClientRect();
      const containerRect = aboutContainer.getBoundingClientRect();
      if (rect.top < containerRect.bottom - 100) {
        skillsTypewriterEffect();
      }
    }
  });
}

console.log('Portfolio loaded successfully');

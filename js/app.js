const navBtn = document.querySelector('.nav-btn');
navBtn.addEventListener('click', toggleMenu);

// function toggleMenu() {
//     const navLinks = document.querySelector('.nav-links');
//     navLinks.classList.toggle('show-links');
//   }

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('closed');
    navLinks.classList.toggle('show-links');
  }
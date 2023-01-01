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

  const currentYear = new Date().getFullYear();
const dateDiv = document.getElementById('date');
dateDiv.innerText = dateDiv.innerText.replace(/\d{4}/, currentYear);
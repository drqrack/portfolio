// JavaScript File: /assets/js/script.js

// Function to handle tab switching (Skills, Education, Experience)
var tablinks = document.getElementsByClassName('tab-links');
var tabcontents = document.getElementsByClassName('tab-contents');

function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove('active-link');
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove('active-tab');
  }
  event.currentTarget.classList.add('active-link');
  document.getElementById(tabname).classList.add('active-tab');
}

// Function to handle sidemenu for mobile navigation
var sidemenu = document.getElementById('sidemenu');

function openmenu() {
  sidemenu.style.right = '0';
}
function closemenu() {
  sidemenu.style.right = '-250px'; // Adjusted to match the new width in CSS
}

// Close sidemenu when a navigation link is clicked (for smoother UX)
const navLinks = document.querySelectorAll('#sidemenu li a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    closemenu();
  });
});

// Typing Animation for Hero Section
const typingElement = document.querySelector('.typing-animation');
const words = ['Front-end Developer ', 'Web Designer', 'UI/UX Enthusiast', 'JavaScript Lover'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150; // Milliseconds per character

function typeWriter() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => (isDeleting = true), 1000); // Pause at end of word
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  const currentTypingSpeed = isDeleting ? typingSpeed / 2 : typingSpeed; // Faster deleting
  setTimeout(typeWriter, currentTypingSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
  if (typingElement) {
    typeWriter();
  }
});

// "Load More" functionality for Portfolio Section
const workList = document.querySelector('.work-list');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const initialWorksToShow = 3;
let currentWorksDisplayed = initialWorksToShow;
let allWorks = []; // This will store all project data, including those not initially visible.

// Example: More project data (you would load this from an API or a larger dataset)
const moreProjects = [
  {
    imgSrc: 'https://via.placeholder.com/450/FF5733/FFFFFF?text=Project+4',
    title: 'E-commerce Site',
    description: 'Developed a fully functional e-commerce platform.',
    link: '#',
  },
  {
    imgSrc: 'https://via.placeholder.com/450/33FF57/FFFFFF?text=Project+5',
    title: 'Blog Platform',
    description: 'A personal blogging platform with admin features.',
    link: '#',
  },
  {
    imgSrc: 'https://via.placeholder.com/450/3357FF/FFFFFF?text=Project+6',
    title: 'Task Management App',
    description: 'An intuitive app to manage daily tasks efficiently.',
    link: '#',
  },
];

function renderWorks(worksToDisplay) {
  workList.innerHTML = ''; // Clear existing works
  worksToDisplay.forEach((work) => {
    const workDiv = document.createElement('div');
    workDiv.classList.add('work');
    workDiv.innerHTML = `
            <img src="${work.imgSrc}" alt="${work.title}">
            <div class="layers">
                <h3>${work.title}</h3>
                <p>${work.description}</p>
                <a href="${work.link}" target="_blank"><span class="material-symbols-outlined"> link </span></a>
            </div>
        `;
    workList.appendChild(workDiv);
  });
}

function loadInitialWorks() {
  // Capture existing projects in the HTML
  const existingWorks = Array.from(document.querySelectorAll('#portfolio .work')).map((workDiv) => {
    return {
      imgSrc: workDiv.querySelector('img').src,
      title: workDiv.querySelector('.layers h3').textContent,
      description: workDiv.querySelector('.layers p').textContent,
      link: workDiv.querySelector('.layers a')
        ? workDiv.querySelector('.layers a').href
        : '#', // Handle cases where link might be missing
    };
  });

  allWorks = [...existingWorks, ...moreProjects]; // Combine existing with new ones
  renderWorks(allWorks.slice(0, initialWorksToShow));

  if (allWorks.length <= initialWorksToShow) {
    loadMoreBtn.style.display = 'none'; // Hide button if no more to load
  }
}

loadMoreBtn.addEventListener('click', () => {
  currentWorksDisplayed += 3; // Load 3 more projects
  renderWorks(allWorks.slice(0, currentWorksDisplayed));

  if (currentWorksDisplayed >= allWorks.length) {
    loadMoreBtn.style.display = 'none'; // Hide button if all projects are loaded
  }
});

// Initialize the "Load More" functionality
document.addEventListener('DOMContentLoaded', loadInitialWorks);

// Scroll-to-top button (optional, but good for long pages)
const scrollTopButton = document.createElement('button');
scrollTopButton.textContent = '↑';
scrollTopButton.id = 'scrollTopBtn';
document.body.appendChild(scrollTopButton);

scrollTopButton.style.cssText = `
    display: none;
    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 99;
    font-size: 24px;
    background-color: #ff0000;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    transition: background-color 0.3s;
`;

scrollTopButton.onmouseover = () => (scrollTopButton.style.backgroundColor = '#cc0000');
scrollTopButton.onmouseout = () => (scrollTopButton.style.backgroundColor = '#ff0000');

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTopButton.style.display = 'block';
  } else {
    scrollTopButton.style.display = 'none';
  }
};

scrollTopButton.onclick = function () {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
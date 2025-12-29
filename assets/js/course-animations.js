// Course Animations Script
document.addEventListener('DOMContentLoaded', function() {

  // Skill Bars Animation
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillItem = entry.target;
        const skillFill = skillItem.querySelector('.skill-fill');
        const width = skillFill.dataset.width;

        skillItem.classList.add('animate');
        setTimeout(() => {
          skillFill.style.width = width;
        }, 300);

        skillObserver.unobserve(skillItem);
      }
    });
  }, { threshold: 0.5 });

  // Observe all skill items
  document.querySelectorAll('.skill-item').forEach(item => {
    skillObserver.observe(item);
  });

  // Timeline Animation
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, index * 200);
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  // Observe all timeline items
  document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
  });

  // Demo Modal Functionality
  const demoModal = document.getElementById('demoModal');
  const demoThankYou = document.getElementById('demoThankYou');
  const closeDemo = document.getElementById('closeDemo');
  const demoForm = document.getElementById('demoForm');

  // Function to open demo modal
  window.openDemoModal = function() {
    demoModal.style.display = 'flex';
  };

  // Close modal when clicking close button
  closeDemo.addEventListener('click', function() {
    demoModal.style.display = 'none';
  });

  // Close modal when clicking outside
  demoModal.addEventListener('click', function(e) {
    if (e.target === demoModal) {
      demoModal.style.display = 'none';
    }
  });

  // Handle form submission
  demoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Here you would typically send the form data to your server
    // For now, we'll just show the thank you message

    demoModal.style.display = 'none';
    demoThankYou.style.display = 'block';

    // Hide thank you message after 3 seconds
    setTimeout(() => {
      demoThankYou.style.display = 'none';
    }, 3000);

    // Reset form
    demoForm.reset();
  });

  // Navbar toggle functionality (reused from main script)
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when link clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add scroll effect to navbar
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

});

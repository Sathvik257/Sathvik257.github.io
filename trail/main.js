emailjs.init("CrMDL6KSAiH4rynzm");

async function sendContactFormBackend(form) {
  const status = document.getElementById("form-status");
  status.textContent = "Sending...";
  status.style.color = "#2563eb";
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  try {
    const res = await fetch("http://localhost:3001/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      status.textContent = "Message sent successfully!";
      status.style.color = "green";
    } else {
      throw new Error("Backend error");
    }
  } catch (err) {
    // fallback to EmailJS
    emailjs.sendForm("service_m02m5u2", "template_k35mz24", form)
      .then(function () {
        status.textContent = "Message sent successfully! (via EmailJS)";
        status.style.color = "green";
      }, function (error) {
        status.textContent = "Failed to send. Try again.";
        status.style.color = "red";
        console.error(error);
      });
  }
  form.reset();
}

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  sendContactFormBackend(this);
});

// Interactive Skill Assessment
document.addEventListener('DOMContentLoaded', function() {
  const skillOptions = document.querySelectorAll('.skill-option');
  let score = 0;
  let totalQuestions = 0;

  skillOptions.forEach(option => {
    if (option.dataset.correct) totalQuestions++;
    
    option.addEventListener('click', function() {
      const question = this.closest('.skill-question');
      const options = question.querySelectorAll('.skill-option');
      
      // Remove previous selections
      options.forEach(opt => opt.classList.remove('selected'));
      
      // Select current option
      this.classList.add('selected');
      
      // Show feedback
      if (this.dataset.correct === 'true') {
        this.style.background = 'rgba(34, 197, 94, 0.3)';
        this.style.borderColor = '#22c55e';
        score++;
      } else {
        this.style.background = 'rgba(239, 68, 68, 0.3)';
        this.style.borderColor = '#ef4444';
      }
      
      // Show score after all questions
      setTimeout(() => {
        const answeredQuestions = document.querySelectorAll('.skill-option.selected').length;
        if (answeredQuestions === totalQuestions) {
          const percentage = Math.round((score / totalQuestions) * 100);
          const feedback = document.createElement('div');
          feedback.innerHTML = `
            <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 10px; margin-top: 1rem; text-align: center;">
              <h4>Assessment Complete!</h4>
              <p>Your Score: ${score}/${totalQuestions} (${percentage}%)</p>
              <p>${percentage >= 80 ? 'Excellent! You demonstrate strong problem-solving skills.' : 
                  percentage >= 60 ? 'Good! You show solid understanding of professional practices.' : 
                  'Keep learning! Focus on improving your problem-solving approach.'}</p>
            </div>
          `;
          document.querySelector('.skill-assessment').appendChild(feedback);
        }
      }, 1000);
    });
  });
});

// Live Coding Demo Interaction
document.addEventListener('DOMContentLoaded', function() {
  const codeDemo = document.querySelector('.code-demo');
  if (codeDemo) {
    codeDemo.addEventListener('click', function() {
      const algorithms = [
        {
          name: 'Quick Sort',
          code: [
            'function quickSort(arr) {',
            '  if (arr.length <= 1) return arr;',
            '  const pivot = arr[Math.floor(arr.length / 2)];',
            '  return [...quickSort(arr.filter(x => x < pivot)),',
            '          pivot, ...quickSort(arr.filter(x => x > pivot))];',
            '}'
          ]
        },
        {
          name: 'Binary Search',
          code: [
            'function binarySearch(arr, target) {',
            '  let left = 0, right = arr.length - 1;',
            '  while (left <= right) {',
            '    const mid = Math.floor((left + right) / 2);',
            '    if (arr[mid] === target) return mid;',
            '    if (arr[mid] < target) left = mid + 1;',
            '    else right = mid - 1;',
            '  }',
            '  return -1;',
            '}'
          ]
        },
        {
          name: 'Bubble Sort',
          code: [
            'function bubbleSort(arr) {',
            '  for (let i = 0; i < arr.length; i++) {',
            '    for (let j = 0; j < arr.length - i - 1; j++) {',
            '      if (arr[j] > arr[j + 1]) {',
            '        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];',
            '      }',
            '    }',
            '  }',
            '  return arr;',
            '}'
          ]
        }
      ];
      
      const currentAlgorithm = algorithms[Math.floor(Math.random() * algorithms.length)];
      const codeLines = this.querySelectorAll('.code-line');
      
      // Clear existing code
      codeLines.forEach((line, index) => {
        if (index < currentAlgorithm.code.length) {
          line.textContent = currentAlgorithm.code[index];
          line.style.opacity = '0';
          setTimeout(() => {
            line.style.opacity = '1';
          }, index * 200);
        } else {
          line.style.opacity = '0';
        }
      });
      
      // Update description
      const description = this.nextElementSibling;
      description.innerHTML = `<strong>Now showing: ${currentAlgorithm.name}</strong>`;
    });
  }
});

// Project Preview Interaction
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('click', function() {
      const preview = this.querySelector('.project-preview');
      const projectName = preview.textContent;
      
      // Create modal for project details
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
      `;
      
      const modalContent = document.createElement('div');
      modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 600px;
        margin: 1rem;
        cursor: default;
      `;
      
      modalContent.innerHTML = `
        <h3>${projectName}</h3>
        <p><strong>Status:</strong> ✅ Completed</p>
        <p><strong>GitHub:</strong> <a href="https://github.com/Sathvik257" target="_blank">View Code</a></p>
        <p><strong>Demo:</strong> Available upon request</p>
        <p><strong>Technologies:</strong> ${this.querySelector('.project-tech').innerHTML}</p>
        <button onclick="this.closest('.modal').remove()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
      `;
      
      modal.appendChild(modalContent);
      modal.classList.add('modal');
      document.body.appendChild(modal);
      
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.remove();
        }
      });
    });
  });
});

// Achievement Badge Interactions
document.addEventListener('DOMContentLoaded', function() {
  const badges = document.querySelectorAll('.badge');
  
  badges.forEach(badge => {
    badge.addEventListener('click', function() {
      const tooltip = this.getAttribute('data-tooltip');
      
      // Create achievement popup
      const popup = document.createElement('div');
      popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      `;
      
      popup.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">${this.textContent}</div>
        <h3>Achievement Unlocked!</h3>
        <p>${tooltip}</p>
        <button onclick="this.parentElement.remove()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: rgba(255,255,255,0.2); color: white; border: 1px solid white; border-radius: 5px; cursor: pointer;">Close</button>
      `;
      
      document.body.appendChild(popup);
      
      setTimeout(() => {
        popup.remove();
      }, 5000);
    });
  });
});

// Loading Animation
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('loading-overlay').classList.add('hide');
  }, 900);

  // Scroll Reveal
  const revealEls = document.querySelectorAll('.reveal, .card, .testimonial-card, section');
  const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.92;
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < trigger) {
        el.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // Hamburger Menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });

  // Center About, top-align others on nav click and highlight
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          let scrollY;
          if (href === '#about') {
            // Center About section
            const rect = target.getBoundingClientRect();
            scrollY = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);
          } else {
            // Top-align other sections (account for sticky header height)
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const rect = target.getBoundingClientRect();
            scrollY = window.scrollY + rect.top - headerHeight - 10;
          }
          window.scrollTo({ top: scrollY, behavior: 'smooth' });
          // Close mobile nav
          document.getElementById('nav-links').classList.remove('active');
          // Highlight the section
          target.classList.add('section-highlight');
          setTimeout(() => target.classList.remove('section-highlight'), 1200);
        }
      }
    });
  });

  // Animated Counters
  function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
      const update = () => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;
        const increment = Math.ceil(target / 60);
        if (current < target) {
          counter.innerText = Math.min(current + increment, target);
          setTimeout(update, 18);
        } else {
          counter.innerText = target;
        }
      };
      // Only animate if visible
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) update();
    });
  }
  let countersAnimated = false;
  window.addEventListener('scroll', () => {
    if (!countersAnimated && document.querySelector('.counters')) {
      const rect = document.querySelector('.counters').getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        animateCounters();
        countersAnimated = true;
      }
    }
  });
  // Animate on load if already visible
  if (document.querySelector('.counters')) {
    const rect = document.querySelector('.counters').getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      animateCounters();
      countersAnimated = true;
    }
  }

  // Animate Skill Progress Bars and Icons
  function animateSkillBars() {
    document.querySelectorAll('.skill-bar').forEach(barWrap => {
      const bar = barWrap.querySelector('.bar-fill');
      const icon = barWrap.querySelector('.skill-icon');
      const width = bar.getAttribute('data-width');
      bar.style.width = width;
      if (icon) {
        icon.classList.add('animated');
      }
    });
  }
  let barsAnimated = false;
  window.addEventListener('scroll', () => {
    if (!barsAnimated && document.querySelector('.skills-bars')) {
      const rect = document.querySelector('.skills-bars').getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        animateSkillBars();
        barsAnimated = true;
      }
    }
  });
  // Animate on load if already visible
  if (document.querySelector('.skills-bars')) {
    const rect = document.querySelector('.skills-bars').getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      animateSkillBars();
      barsAnimated = true;
    }
  }

  // List of specific repos to display (using exact names from GitHub)
  const repoNames = [
    'Justice-GPT',
    'Smart-Home',
    'Smart-Resume-Builder-with-AI-Suggestions',
    'Battle-Ship-Blitz'
  ];
  const showcase = document.querySelector('.project-showcase');
  if (showcase) {
    Promise.all(
      repoNames.map(name =>
        fetch(`https://api.github.com/repos/Sathvik257/${name}`)
          .then(res => res.ok ? res.json() : null)
      )
    ).then(repos => {
      showcase.innerHTML = '';
      repos.forEach(repo => {
        if (repo) {
          // Choose a themed Unsplash image based on project name
          let imageUrl = '';
          if (repo.name === 'Justice-GPT') imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'; // justice theme
          else if (repo.name === 'Smart-Home') imageUrl = 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80'; // smart home theme
          else if (repo.name === 'Smart-Resume-Builder-with-AI-Suggestions') imageUrl = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80'; // resume/ai theme
          else if (repo.name === 'Battle-Ship-Blitz') imageUrl = 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80'; // battleship theme
          else imageUrl = 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'; // fallback

          const card = document.createElement('div');
          card.className = 'project-card';
          card.style.cursor = 'pointer';
          card.innerHTML = `
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" aria-label="View ${repo.name} on GitHub" tabindex="0" style="text-decoration: none; color: inherit; display: block; height: 100%; width: 100%">
              <div class="project-preview">${repo.name}</div>
              <div class="project-info">
                <h3>${repo.name}</h3>
                <p>${repo.description ? repo.description : 'No description provided.'}</p>
                <div class="project-tech">
                  <span class="tech-tag">${repo.language ? repo.language : 'N/A'}</span>
                </div>
              </div>
            </a>
          `;
          showcase.appendChild(card);
        }
      });
    });
  }
});

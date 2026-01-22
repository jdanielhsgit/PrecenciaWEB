document.addEventListener("DOMContentLoaded", () => {
  initGravity();
  initNavbarScroll();
  initTeamRoulette();
  initRevealAnimations();
});

// Gravity Background Animation (Neon Cyan Edition)
function initGravity() {
  const canvas = document.getElementById("gravity-bg");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  const particleCount = 70;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.size = Math.random() * 2 + 0.5;
      // Using Cyan theme colors
      this.color = "rgba(0, 242, 255, " + (Math.random() * 0.4 + 0.1) + ")";
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, index) => {
      p.update();
      p.draw();

      // Draw thin connectors
      for (let j = index + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 242, 255, ${0.15 * (1 - dist / 180)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled", "shadow-lg");
    } else {
      navbar.classList.remove("scrolled", "shadow-lg");
    }
  });
}

// Team Roulette Logic
function initTeamRoulette() {
  const slides = document.querySelectorAll(".team-slide");
  const container = document.getElementById("team-roulette");
  if (!slides.length || !container) return;

  let currentSlide = 0;
  let isPaused = false;

  function showNextSlide() {
    if (isPaused) return;

    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  let slideInterval = setInterval(showNextSlide, 4500);

  container.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  container.addEventListener("mouseleave", () => {
    isPaused = false;
  });
}

// Reveal on Scroll Animations
function initRevealAnimations() {
  const observerOptions = {
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active"); // We'll add this class to trigger CSS
        // For now, many elements use 'reveal' class which handles the animation via delay
      }
    });
  }, observerOptions);

  document.querySelectorAll(".glass-card, .portfolio-item, .section-title").forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

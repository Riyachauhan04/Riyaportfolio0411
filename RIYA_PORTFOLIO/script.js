// ===== Enhanced Skill Card Animations =====
(function animateSkillCards() {
  const skillCards = document.querySelectorAll(".skill-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
})();

// ===== Enhanced Project Card Interactions =====
(function enhanceProjectCards() {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    const video = card.querySelector("video");
    if (video) {
      card.addEventListener("mouseenter", () => {
        video.playbackRate = 1.2;
      });

      card.addEventListener("mouseleave", () => {
        video.playbackRate = 1;
      });
    }
  });
})();

// ===== Smooth Scroll with Enhanced Offset =====
(function enhancedSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  const NAV_HEIGHT = 80; // Increased offset for better UX

  links.forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) {
        e.preventDefault();
        const el = document.querySelector(id);
        if (!el) return;

        const y = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });

        // Add active state to clicked link
        document
          .querySelectorAll(".nav-link")
          .forEach((link) => link.classList.remove("active"));
        a.classList.add("active");
      }
    });
  });
})();

// ===== Enhanced Typewriter Effect =====
(function enhancedTypewriter() {
  const el = document.getElementById("typewriter-text");
  if (!el) return;

  const words = [
    "Electronics Engineer",
    "Robotics Enthusiast",
    "Embedded Systems Developer",
    "Hardware Innovator",
    "Problem Solver",
    "Team Leader",
  ];

  let wi = 0,
    ci = 0,
    del = false;

  function tick() {
    const word = words[wi];
    el.textContent = del ? word.slice(0, --ci) : word.slice(0, ++ci);

    if (!del && ci === word.length) {
      del = true;
      setTimeout(tick, 1200); // Longer pause at end
      return;
    }
    if (del && ci === 0) {
      del = false;
      wi = (wi + 1) % words.length;
    }

    setTimeout(tick, del ? 50 : 100);
  }
  tick();
})();

// ===== Robot Eye Tracking with Independent Blinking & Enhanced Cursor Following =====
(function robotEyes() {
  const eyes = document.querySelectorAll(".eye");
  const pupils = document.querySelectorAll(".eye .pupil");
  const eyelids = document.querySelectorAll(".eye .eyelid"); // optional if you have eyelids

  const radius = 8; // max pupil radius
  const idleAmplitude = 1.5; // subtle idle motion
  const idleSpeed = 0.05;
  let lastMouseEvent;
  let time = 0;

  // ----- Enhanced pupil movement -----
  function movePupils(e) {
    pupils.forEach((p) => {
      const eye = p.parentElement;
      const rect = eye.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      // Angle and distance to cursor
      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;
      const angle = Math.atan2(deltaY, deltaX);

      // Smooth distance falloff
      const maxDistance = radius;
      const rawDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const normalizedDistance = Math.min(rawDistance / 100, 1);
      const distance = normalizedDistance * maxDistance;

      // Add subtle idle motion
      const x = Math.cos(angle) * distance + Math.sin(time) * idleAmplitude;
      const y = Math.sin(angle) * distance + Math.cos(time) * idleAmplitude;

      // Apply transform
      p.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;

      // Optional: glow effect when tracking
      eye.style.boxShadow = `0 0 ${15 + distance * 2}px var(--accent-green)`;
    });
  }

  // ----- Animation loop -----
  function animatePupils() {
    time += idleSpeed;
    if (lastMouseEvent) movePupils(lastMouseEvent);
    requestAnimationFrame(animatePupils);
  }

  // ----- Mouse tracking -----
  window.addEventListener(
    "mousemove",
    (e) => {
      lastMouseEvent = e;
    },
    { passive: true }
  );

  // ----- Blinking animation -----
  function blink() {
    if (!eyelids.length) return;

    eyelids.forEach((lid) => {
      lid.style.transition = "height 0.15s ease";
      lid.style.height = "100%"; // close eyelid
      setTimeout(() => {
        lid.style.height = "0%"; // open eyelid
      }, 150);
    });

    // Random blink interval
    setTimeout(blink, 2000 + Math.random() * 3000);
  }

  // Start animations
  animatePupils();
  blink();
})();

// ===== Enhanced Reveal Animations =====
(function enhancedRevealOnScroll() {
  const revealables = [
    ...document.querySelectorAll(
      ".skill-card, .project-card, .certification-card, .timeline-item, .contact-item, .contact-form-container, .tech-item, .internship-card"
    ),
  ];

  revealables.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) {
          ent.target.classList.add("in");
          observer.unobserve(ent.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "50px",
    }
  );

  revealables.forEach((el) => observer.observe(el));
})();

// ===== Enhanced Parallax Background =====
(function enhancedParallax() {
  const cg = document.querySelector(".circuit-grid");
  const hg = document.querySelector(".hexagon-grid");

  let ticking = false;
  function updateParallax() {
    const y = window.scrollY;
    if (cg) cg.style.transform = `translateY(${y * 0.04}px)`;
    if (hg) hg.style.transform = `translateY(${y * -0.03}px)`;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    },
    { passive: true }
  );
})();

// ===== Enhanced Card Tilt Effect =====
(function enhancedTiltCards() {
  const cards = document.querySelectorAll(
    ".project-card, .skill-card, .certification-card, .internship-card, .tech-item"
  );

  cards.forEach((card) => {
    let rAF = null;

    function onMove(e) {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const rx = (y / r.height - 0.5) * -3; // Reduced tilt for subtlety
        const ry = (x / r.width - 0.5) * 3;

        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
      });
    }

    function reset() {
      card.style.transform = "";
    }

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", reset);
  });
})();

// ===== Enhanced Contact Form =====
(function enhancedFormHandler() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const submitBtn = form.querySelector(".btn-send-message");
  const originalText = submitBtn.innerHTML;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success message
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
    submitBtn.style.background = "linear-gradient(135deg, #00ff88, #00cc6a)";

    // Reset form after delay
    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      submitBtn.style.background = "";
    }, 2000);
  });
})();

// ===== Enhanced Resume Download =====
function downloadResume() {
  const btn = event.target.closest(".btn-primary");
  const originalText = btn.innerHTML;

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
  btn.disabled = true;

  setTimeout(() => {
    window.open("assets/resume.pdf", "_blank");
    btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 1500);
  }, 800);
}
window.downloadResume = downloadResume;

// ===== Scroll to Top Button =====
(function scrollToTopButton() {
  const scrollBtn = document.getElementById("scrollToTop");
  if (!scrollBtn) return;

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  });

  // Smooth scroll to top when clicked
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
})();

// ===== Initialize All Enhanced Features =====
document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation (existing)
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    })
  );
});

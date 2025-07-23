// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")

      // Animate hamburger menu
      const bars = navToggle.querySelectorAll(".bar")
      bars.forEach((bar, index) => {
        if (navMenu.classList.contains("active")) {
          if (index === 0) bar.style.transform = "rotate(-45deg) translate(-5px, 6px)"
          if (index === 1) bar.style.opacity = "0"
          if (index === 2) bar.style.transform = "rotate(45deg) translate(-5px, -6px)"
        } else {
          bar.style.transform = "none"
          bar.style.opacity = "1"
        }
      })
    })

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        const bars = navToggle.querySelectorAll(".bar")
        bars.forEach((bar) => {
          bar.style.transform = "none"
          bar.style.opacity = "1"
        })
      })
    })
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Animate service cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
        entry.target.style.transitionDelay = `${Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.2}s`
      }
    })
  }, observerOptions)

  // Observe service cards
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card) => {
    observer.observe(card)
  })

  // Observe value cards
  const valueCards = document.querySelectorAll(".value-card")
  valueCards.forEach((card) => {
    observer.observe(card)
  })

  // Contact form handling
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const name = formData.get("name")
      const email = formData.get("email")
      const phone = formData.get("phone")
      const service = formData.get("service")
      const message = formData.get("message")

      // Simple validation
      if (!name || !email || !service || !message) {
        alert("Por favor, preencha todos os campos obrigatórios.")
        return
      }

      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalText = submitButton.innerHTML

      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'
      submitButton.disabled = true

      // Simulate API call
      setTimeout(() => {
        alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
        contactForm.reset()
        submitButton.innerHTML = originalText
        submitButton.disabled = false
      }, 2000)
    })
  }

  // Add active class to current page navigation
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active")
    }
  })

  // Animate stats numbers
  const statNumbers = document.querySelectorAll(".stat-number")
  const animateStats = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target
        const finalNumber = target.textContent
        const isNumber = !isNaN(Number.parseInt(finalNumber))

        if (isNumber) {
          const number = Number.parseInt(finalNumber)
          const increment = number / 50
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= number) {
              target.textContent = finalNumber
              clearInterval(timer)
            } else {
              target.textContent = Math.floor(current) + "+"
            }
          }, 30)
        }

        observer.unobserve(target)
      }
    })
  }

  const statsObserver = new IntersectionObserver(animateStats, {
    threshold: 0.5,
  })

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat)
  })

  // Add scroll effect to navbar
  let lastScrollTop = 0
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.transform = "translateY(-100%)"
    } else {
      // Scrolling up
      navbar.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
  })

  // Add parallax effect to floating elements
  const floatingElements = document.querySelectorAll(".floating-element, .floating-icon")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    floatingElements.forEach((element, index) => {
      const speed = (index + 1) * 0.1
      element.style.transform = `translateY(${rate * speed}px)`
    })
  })

  // Add typing effect to hero title (only on index page)
  if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
    const heroTitle = document.querySelector(".hero-title")
    if (heroTitle) {
      const text1 = "Transforme sua"
      const text2 = "Visão Digital"

      heroTitle.innerHTML = `
                <span class="text-white typing-text"></span><br>
                <span class="text-gradient typing-text-2"></span>
            `

      const typingText1 = heroTitle.querySelector(".typing-text")
      const typingText2 = heroTitle.querySelector(".typing-text-2")

      let i = 0
      const typeWriter1 = () => {
        if (i < text1.length) {
          typingText1.textContent += text1.charAt(i)
          i++
          setTimeout(typeWriter1, 100)
        } else {
          setTimeout(() => {
            let j = 0
            const typeWriter2 = () => {
              if (j < text2.length) {
                typingText2.textContent += text2.charAt(j)
                j++
                setTimeout(typeWriter2, 100)
              }
            }
            typeWriter2()
          }, 500)
        }
      }

      setTimeout(typeWriter1, 1000)
    }
  }
})

// Add CSS for typing cursor effect
const style = document.createElement("style")
style.textContent = `
    .typing-text::after,
    .typing-text-2::after {
        content: '|';
        animation: blink 1s infinite;
        color: #3b82f6;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`
document.head.appendChild(style)

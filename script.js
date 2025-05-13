document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide icons
    const lucide = window.lucide // Assuming lucide is exposed globally
    lucide.createIcons()
  
    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear()
  
    // Handle form submission
    const auditForm = document.getElementById("website-audit-form")
    const formSuccess = document.getElementById("form-success")
  
    if (auditForm) {
      auditForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // In a real implementation, you would send the form data to a server
        // For this demo, we'll just show the success message
        auditForm.style.display = "none"
        formSuccess.classList.remove("hidden")
      })
    }
  
    // Animation observer setup
    const observeElements = () => {
      const animatedElements = document.querySelectorAll(".animate-on-scroll")
      const staggeredItems = document.querySelectorAll(".staggered-item")
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate")
            }
          })
        },
        { threshold: 0.1 },
      )
  
      animatedElements.forEach((el) => observer.observe(el))
  
      // For staggered animations
      const staggeredObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add("animate")
              }, index * 100) // 100ms delay between each item
            }
          })
        },
        { threshold: 0.1 },
      )
  
      staggeredItems.forEach((el) => staggeredObserver.observe(el))
    }
  
    // Initialize animations
    observeElements()
  
    // Handle window resize
    window.addEventListener("resize", observeElements)
  
    // Mobile menu toggle
    const menuToggle = document.querySelector(".mobile-menu-toggle")
    const mainNav = document.querySelector(".main-nav")
  
    if (menuToggle && mainNav) {
      menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("mobile-active")
  
        // Change icon based on menu state
        const menuIcon = menuToggle.querySelector("[data-lucide]")
        if (mainNav.classList.contains("mobile-active")) {
          menuIcon.setAttribute("data-lucide", "x")
        } else {
          menuIcon.setAttribute("data-lucide", "menu")
        }
  
        // Re-initialize icons
        lucide.createIcons()
      })
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
  
          // Close mobile menu if open
          if (mainNav && mainNav.classList.contains("mobile-active")) {
            mainNav.classList.remove("mobile-active")
            const menuIcon = menuToggle.querySelector("[data-lucide]")
            menuIcon.setAttribute("data-lucide", "menu")
            lucide.createIcons()
          }
        }
      })
    })
  })
  
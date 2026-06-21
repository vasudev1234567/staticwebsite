/**
 * FULL STACK WEBSITE LEARNING PROJECT
 * JavaScript Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Set Current Year in Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    /* ==========================================================================
       1. THEME SWITCHER & LOCAL STORAGE
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // Check Local Storage for Theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    // Toggle Theme
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('ri-moon-line');
            themeIcon.classList.add('ri-sun-line');
        } else {
            themeIcon.classList.remove('ri-sun-line');
            themeIcon.classList.add('ri-moon-line');
        }
    }

    /* ==========================================================================
       2. RESPONSIVE NAVBAR & SMOOTH SCROLLING
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Active Link Highlighting & Smooth Scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            e.target.classList.add('active');
        });
    });

    // Intersection Observer for Scroll Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });


    /* ==========================================================================
       3. IMAGE SLIDER
       ========================================================================== */
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dotsContainer = document.getElementById('slider-dots');
    
    let currentSlide = 0;
    const maxSlide = slides.length - 1;

    // Create Dots
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.dataset.slide = i;
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(slideIndex) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });
        
        slides[slideIndex].classList.add('active');
        dots[slideIndex].classList.add('active');
        currentSlide = slideIndex;
    }

    function nextSlide() {
        if (currentSlide === maxSlide) {
            goToSlide(0);
        } else {
            goToSlide(currentSlide + 1);
        }
    }

    function prevSlide() {
        if (currentSlide === 0) {
            goToSlide(maxSlide);
        } else {
            goToSlide(currentSlide - 1);
        }
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dotsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
            const slide = parseInt(e.target.dataset.slide);
            goToSlide(slide);
        }
    });

    // Auto Slide
    setInterval(nextSlide, 5000);


    /* ==========================================================================
       4. DYNAMIC CONTENT LOADING (Services)
       ========================================================================== */
    const servicesGrid = document.getElementById('services-grid');
    
    // Simulate Fetching Data
    const servicesData = [
        {
            icon: 'ri-window-line',
            title: 'Web Design',
            description: 'Creating beautiful, responsive, and user-friendly interfaces tailored to your brand.'
        },
        {
            icon: 'ri-code-s-slash-line',
            title: 'Web Development',
            description: 'Building robust and scalable web applications using the latest technologies.'
        },
        {
            icon: 'ri-smartphone-line',
            title: 'Responsive Layouts',
            description: 'Ensuring your website looks perfectly on all devices, from desktops to smartphones.'
        },
        {
            icon: 'ri-speed-up-line',
            title: 'Performance Optimization',
            description: 'Speeding up your website for better user experience and SEO rankings.'
        }
    ];

    function loadServices() {
        servicesData.forEach((service, index) => {
            const card = document.createElement('div');
            card.classList.add('service-card', 'reveal');
            card.style.transitionDelay = `${index * 0.1}s`;
            
            card.innerHTML = `
                <div class="service-icon"><i class="${service.icon}"></i></div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            `;
            
            servicesGrid.appendChild(card);
            revealOnScroll.observe(card);
        });
    }

    loadServices();


    /* ==========================================================================
       5. PORTFOLIO DATA & DYNAMIC LOADING
       ========================================================================== */
    const portfolioGrid = document.getElementById('portfolio-grid');
    
    const portfolioData = [
        {
            id: 1,
            title: 'E-Commerce Dashboard',
            category: 'web',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
            description: 'A comprehensive admin dashboard for managing online stores, featuring sales analytics, inventory tracking, and user management.'
        },
        {
            id: 2,
            title: 'Fitness Tracking App',
            category: 'app',
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80',
            description: 'Mobile application UI for tracking workouts, nutrition, and personal fitness goals with detailed charts.'
        },
        {
            id: 3,
            title: 'TechCorp Branding',
            category: 'logo',
            image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
            description: 'Complete brand identity design including logo, typography, and color guidelines for a modern technology startup.'
        },
        {
            id: 4,
            title: 'Real Estate Platform',
            category: 'web',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80',
            description: 'Property listing website featuring advanced search filters, interactive maps, and virtual tours.'
        },
        {
            id: 5,
            title: 'Finance App UI',
            category: 'app',
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80',
            description: 'Clean and intuitive user interface for a personal finance management application.'
        },
        {
            id: 6,
            title: 'EcoStore Logo',
            category: 'logo',
            image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80',
            description: 'Minimalist and organic logo design for an environmentally conscious retail brand.'
        }
    ];

    function loadPortfolio() {
        portfolioData.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.classList.add('portfolio-item');
            portfolioItem.dataset.category = item.category;
            portfolioItem.dataset.id = item.id;
            
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="portfolio-img">
                <div class="portfolio-overlay">
                    <div class="portfolio-info">
                        <h3>${item.title}</h3>
                        <p>${item.category.toUpperCase()}</p>
                    </div>
                </div>
            `;
            
            portfolioGrid.appendChild(portfolioItem);
        });
    }

    loadPortfolio();


    /* ==========================================================================
       6. FILTER SYSTEM & SEARCH BAR
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Filter by Category
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.dataset.filter;
            const searchValue = searchInput.value.toLowerCase();
            
            filterPortfolio(filterValue, searchValue);
        });
    });

    // Search functionality
    searchInput.addEventListener('keyup', (e) => {
        const searchValue = e.target.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        
        filterPortfolio(activeFilter, searchValue);
    });

    function filterPortfolio(category, searchTerm) {
        portfolioItems.forEach(item => {
            // We need to re-query elements to ensure we have the newly loaded ones
            const title = item.querySelector('h3').textContent.toLowerCase();
            const itemCategory = item.dataset.category;
            
            const matchesCategory = category === 'all' || itemCategory === category;
            const matchesSearch = title.includes(searchTerm);
            
            if (matchesCategory && matchesSearch) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }


    /* ==========================================================================
       7. MODAL POPUP
       ========================================================================== */
    const modal = document.getElementById('portfolio-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalContent = document.getElementById('modal-content');

    // We use event delegation since portfolio items are loaded dynamically
    portfolioGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.portfolio-item');
        
        if (item) {
            const itemId = parseInt(item.dataset.id);
            const project = portfolioData.find(p => p.id === itemId);
            
            if (project) {
                openModal(project);
            }
        }
    });

    function openModal(project) {
        modalContent.innerHTML = `
            <img src="${project.image}" alt="${project.title}" style="width:100%; border-radius:8px; margin-bottom:1.5rem;">
            <h2>${project.title}</h2>
            <p style="color:var(--primary); font-weight:600; margin-bottom:1rem;">${project.category.toUpperCase()}</p>
            <p style="line-height:1.8;">${project.description}</p>
            <div style="margin-top:2rem;">
                <a href="#" class="btn btn-primary">Live Preview <i class="ri-external-link-line"></i></a>
                <a href="#" class="btn btn-secondary">Source Code <i class="ri-github-fill"></i></a>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
        
        // Clear content after animation
        setTimeout(() => {
            modalContent.innerHTML = '';
        }, 300);
    }

    modalCloseBtn.addEventListener('click', closeModal);
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });


    /* ==========================================================================
       8. FORM VALIDATION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    // Load saved draft from Local Storage if it exists
    const savedName = localStorage.getItem('contactDraftName');
    const savedEmail = localStorage.getItem('contactDraftEmail');
    if(savedName) document.getElementById('name').value = savedName;
    if(savedEmail) document.getElementById('email').value = savedEmail;

    // Save draft on input
    contactForm.addEventListener('input', (e) => {
        if (e.target.id === 'name') {
            localStorage.setItem('contactDraftName', e.target.value);
        } else if (e.target.id === 'email') {
            localStorage.setItem('contactDraftEmail', e.target.value);
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate Name
        const nameInput = document.getElementById('name');
        if (nameInput.value.trim() === '') {
            setErrorFor(nameInput);
            isValid = false;
        } else {
            setSuccessFor(nameInput);
        }
        
        // Validate Email
        const emailInput = document.getElementById('email');
        if (emailInput.value.trim() === '') {
            setErrorFor(emailInput);
            isValid = false;
        } else if (!isEmail(emailInput.value.trim())) {
            setErrorFor(emailInput);
            document.getElementById('email-error').textContent = "Not a valid email format.";
            isValid = false;
        } else {
            setSuccessFor(emailInput);
        }
        
        // Validate Subject
        const subjectInput = document.getElementById('subject');
        if (subjectInput.value.trim() === '') {
            setErrorFor(subjectInput);
            isValid = false;
        } else {
            setSuccessFor(subjectInput);
        }
        
        // Validate Message
        const messageInput = document.getElementById('message');
        if (messageInput.value.trim() === '') {
            setErrorFor(messageInput);
            isValid = false;
        } else {
            setSuccessFor(messageInput);
        }
        
        // If form is valid
        if (isValid) {
            // Simulate API Call
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="ri-loader-4-line" style="animation: spin 1s linear infinite;"></i> Sending...';
            submitBtn.disabled = true;
            
            // Inject spin keyframes if not exists
            if (!document.getElementById('spin-animation')) {
                const style = document.createElement('style');
                style.id = 'spin-animation';
                style.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } }`;
                document.head.appendChild(style);
            }
            
            setTimeout(() => {
                // Reset Form
                contactForm.reset();
                
                // Clear errors/success styling
                const formGroups = document.querySelectorAll('.form-group');
                formGroups.forEach(group => group.classList.remove('error'));
                
                // Show Success Message
                formSuccess.style.display = 'block';
                
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Clear local storage drafts
                localStorage.removeItem('contactDraftName');
                localStorage.removeItem('contactDraftEmail');
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }, 1500); // 1.5s simulated delay
        }
    });

    function setErrorFor(input) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
    }

    function setSuccessFor(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
    }

    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }
});

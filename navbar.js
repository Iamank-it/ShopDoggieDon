// Function to include navbar in all pages
async function includeNavbar() {
    try {
        const response = await fetch('navbar.html');
        const html = await response.text();
        document.getElementById('navbar-placeholder').innerHTML = html;
        
        // After navbar is loaded, set active link and mobile menu
        setActiveLink();
        setupMobileMenu();
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// Function to set active link based on current page
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const links = {
        'index.html': 'home-link',
        'toys.html': 'shop-link',
        'food.html': 'shop-link',
        'medi.html': 'shop-link',
        'accessory.html': 'shop-link',
        'contact.html': 'contact-link'
    };
    
    // Remove all active classes first
    document.querySelectorAll('.link').forEach(link => link.classList.remove('link-active'));
    
    // Add active class to current page link
    const activeLinkId = links[currentPage];
    if (activeLinkId) {
        const activeLink = document.getElementById(activeLinkId);
        if (activeLink) {
            activeLink.classList.add('link-active');
        }
    }
}

// Function to setup mobile menu toggle
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navlist = document.querySelector('.navlist');
    
    if (hamburger && navlist) {
        hamburger.addEventListener('click', () => {
            navlist.classList.toggle('active');
            // Toggle hamburger icon
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navlist.contains(e.target)) {
                navlist.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });

        // Close menu when clicking a link
        navlist.querySelectorAll('.link').forEach(link => {
            link.addEventListener('click', () => {
                navlist.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }
}

// Include navbar when page loads
document.addEventListener('DOMContentLoaded', includeNavbar); 
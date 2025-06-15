// Function to load and inject reusable components
const loadComponent = (componentPath, placeholderId) => {
    const placeholder = document.getElementById(placeholderId);
    if (placeholder) {
        fetch(componentPath)
            .then(response => response.ok ? response.text() : Promise.reject('Component not found.'))
            .then(html => {
                placeholder.innerHTML = html;
                // After loading the navbar, initialize its event listeners
                if (placeholderId === 'navbar-placeholder') {
                    initializeNavbar();
                }
            })
            .catch(error => console.error(`Error loading component from ${componentPath}:`, error));
    }
};

// Function to initialize navbar functionality (mobile menu, dropdowns)
const initializeNavbar = () => {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            // Change icon to 'X' when menu is open
            navToggle.querySelector('i').classList.toggle('fa-bars');
            navToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Dropdown toggle
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            event.preventDefault();
            const dropdown = toggle.parentElement;
            dropdown.classList.toggle('open');
        });
    });
};

// Load components when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('/components/navbar.html', 'navbar-placeholder');
    loadComponent('/components/footer.html', 'footer-placeholder');
});

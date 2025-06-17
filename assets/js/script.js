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

// Function to initialize the moving cost calculator
const initializeCalculator = () => {
    const calcBtn = document.querySelector('.calc-btn');
    const moveSizeSelect = document.getElementById('move-size');
    const moveDistanceSelect = document.getElementById('move-distance');
    const resultsContainer = document.getElementById('results');
    const costEstimateEl = document.getElementById('cost-estimate');
    const timeEstimateEl = document.getElementById('time-estimate');

    if (calcBtn) {
        calcBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent form submission

            const moveSize = moveSizeSelect.value;
            const moveDistance = moveDistanceSelect.value;

            if (!moveSize || !moveDistance) {
                alert('Please select both home size and moving distance.');
                return;
            }

            // --- Basic Estimation Logic ---
            let baseHours = 0;
            let hourlyRate = 120; // Example hourly rate

            // Determine hours based on home size
            switch (moveSize) {
                case 'studio': baseHours = 3; break;
                case '2bed': baseHours = 5; break;
                case '3bed': baseHours = 7; break;
                case '4bed': baseHours = 9; break;
                case 'office': baseHours = 8; break;
            }

            // Adjust rate/hours based on distance
            switch (moveDistance) {
                case 'local':
                    // No change for local
                    break;
                case 'instate':
                    baseHours += 4; // Add travel time
                    hourlyRate = 150; // Higher rate for longer distance
                    break;
                case 'longdist':
                    baseHours += 8; // Add significant travel time
                    hourlyRate = 180; // Highest rate
                    break;
            }

            const minCost = baseHours * hourlyRate * 0.9;
            const maxCost = baseHours * hourlyRate * 1.1;

            // --- Display Results ---
            costEstimateEl.textContent = `$${minCost.toFixed(0)} - $${maxCost.toFixed(0)}`;
            timeEstimateEl.textContent = `${baseHours - 1} - ${baseHours + 1} hours`;
            resultsContainer.style.display = 'block';
        });
    }
};

// Load components and initialize scripts when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('/components/navbar.html', 'navbar-placeholder');
    loadComponent('/components/footer.html', 'footer-placeholder');
    
    // Initialize the calculator if it's on the page
    if (document.querySelector('.calculator-section')) {
        initializeCalculator();
    }
});
// Function to determine the correct base path for components
// This ensures components load correctly whether on index.html or in /pages/
const getBasePath = () => {
    const path = window.location.pathname;
    // If the path includes '/pages/', we are on a subpage
    if (path.includes('/pages/')) {
        return '../';
    }
    // Otherwise, we are at the root
    return './';
};

// Function to load and inject reusable components using the correct base path
const loadComponent = (componentPath, placeholderId) => {
    const placeholder = document.getElementById(placeholderId);
    if (placeholder) {
        const basePath = getBasePath();
        fetch(`${basePath}${componentPath}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Component not found at ${basePath}${componentPath}`);
                }
                return response.text();
            })
            .then(html => {
                placeholder.innerHTML = html;
                // After loading the navbar, initialize its event listeners
                if (placeholderId === 'navbar-placeholder') {
                    initializeNavbar();
                }
            })
            .catch(error => console.error(`Error loading component:`, error));
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
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Dropdown toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if(toggle) {
            toggle.addEventListener('click', (event) => {
                event.preventDefault();
                // Close other open dropdowns
                dropdowns.forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('open');
                    }
                });
                // Toggle the current one
                dropdown.classList.toggle('open');
            });
        }
    });

    // Close dropdowns if clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        }
    });
};

// Function to initialize the new, robust lead generation form
const initializeCalculator = () => {
    const formContainer = document.getElementById('quote-form-container');
    const form = document.getElementById('lead-gen-form');
    const continueBtn = document.getElementById('continue-btn');
    const submitBtn = document.getElementById('submit-quote-btn');
    const step1Div = document.getElementById('form-step-1');
    const step2Div = document.getElementById('form-step-2');
    const successContainer = document.getElementById('success-message');
    const successText = document.getElementById('success-text');
    const errorMsg = document.getElementById('form-error-message');

    if (!form || !continueBtn || !submitBtn) return;

    // --- Logic for the "Continue" button (Step 1 to Step 2) ---
    continueBtn.addEventListener('click', () => {
        const fromZip = document.getElementById('move-from-zip');
        const toZip = document.getElementById('move-to-zip');
        
        // Simple validation
        if (fromZip.value.trim() === '' || toZip.value.trim() === '') {
            errorMsg.textContent = 'Please enter both ZIP codes to continue.';
            errorMsg.style.display = 'block';
            return;
        }

        // Hide error message and proceed
        errorMsg.style.display = 'none';
        step1Div.style.display = 'none';
        step2Div.style.display = 'block';
    });

    // --- Logic for the final submission ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('email');
        const sizeInput = document.getElementById('move-size');

        // Final validation
        if (emailInput.value.trim() === '' || sizeInput.value.trim() === '') {
            errorMsg.textContent = 'Please select your home size and enter your email address.';
            errorMsg.style.display = 'block';
            return;
        }
        
        // Hide error message
        errorMsg.style.display = 'none';
        
        // Disable button to prevent multiple submissions
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';

        const formData = new FormData(form);
        const action = form.getAttribute('action');

        fetch(action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                // Hide the form and show the success message
                formContainer.style.display = 'none';
                successText.textContent = `Your personalized quote has been sent to ${emailInput.value}. Please check your inbox!`;
                successContainer.style.display = 'block';
            } else {
                // Handle server errors from Formspree
                response.json().then(data => {
                    errorMsg.textContent = data.errors ? data.errors.map(err => err.message).join(', ') : 'An unknown error occurred. Please try again.';
                    errorMsg.style.display = 'block';
                    submitBtn.disabled = false;
                    submitBtn.querySelector('.btn-text').textContent = 'Get My Instant Quote';
                });
            }
        }).catch(error => {
            // Handle network errors
            errorMsg.textContent = 'A network error occurred. Please check your connection and try again.';
            errorMsg.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').textContent = 'Get My Instant Quote';
        });
    });
};

// Main execution block that runs after the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load reusable components
    loadComponent('components/navbar.html', 'navbar-placeholder');
    loadComponent('components/footer.html', 'footer-placeholder');
    
    // Initialize the calculator only if it exists on the current page
    if (document.querySelector('.calculator-section')) {
        initializeCalculator();
    }
});

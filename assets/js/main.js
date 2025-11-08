// Analytics tracking
function trackEvent(event, path) {
  const data = {
    event: event,
    path: window.location.pathname,
    ts: new Date().toISOString()
  };

  // Stub implementation - will be wired to backend later
  fetch('/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).catch(err => {
    console.log('Analytics tracking failed:', err);
  });
}

// Initialize analytics tracking on page load
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (mobileMenuToggle && navList) {
    mobileMenuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navList.classList.toggle('active');
      this.classList.toggle('active');
      document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navList.classList.contains('active') && 
          !navList.contains(e.target) && 
          !mobileMenuToggle.contains(e.target)) {
        navList.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking on a link
    const navLinks = navList.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          navList.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // Mobile dropdown toggle
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = this.parentElement;
        dropdown.classList.toggle('active');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
          dropdown.classList.remove('active');
        });
      }
    }
  });

  // Track all elements with data-track attribute
  const trackElements = document.querySelectorAll('[data-track]');
  
  trackElements.forEach(element => {
    element.addEventListener('click', function(e) {
      const eventName = this.getAttribute('data-track');
      trackEvent(eventName, window.location.pathname);
    });
  });

  // Contact form submission with validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    // Clear error messages on input
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
      input.addEventListener('input', function() {
        clearFieldError(this.id);
        this.classList.remove('error');
      });
    });

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Clear previous errors
      clearAllErrors();
      hideMessages();
      
      // Validate form
      if (!validateForm()) {
        return;
      }
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoader = submitBtn.querySelector('.btn-loader');
      const originalText = btnText ? btnText.textContent : submitBtn.textContent;
      
      // Disable button and show loading
      submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Sending...';
      if (btnLoader) btnLoader.style.display = 'inline-block';
      submitBtn.style.cursor = 'wait';
      
      // Get form data
      const formData = new FormData(this);
      const data = {
        name: formData.get('name').trim(),
        phone: formData.get('phone').trim(),
        service: formData.get('service'),
        pickup: formData.get('pickup').trim()
      };
      
      // Track form submission
      trackEvent('dispatch-submit', window.location.pathname);
      
      // Submit to webhook
      fetch('/webhooks/dispatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          // Show success message
          const successMsg = document.getElementById('form-success');
          if (successMsg) {
            successMsg.style.display = 'block';
            contactForm.reset();
            contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        // Show error message
        const errorMsg = document.getElementById('form-error');
        if (errorMsg) {
          errorMsg.style.display = 'block';
        } else {
          alert('There was an error submitting your request. Please call us directly.');
        }
        console.error('Form submission error:', error);
      })
      .finally(() => {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.style.cursor = 'pointer';
        if (btnText) btnText.textContent = originalText;
        if (btnLoader) btnLoader.style.display = 'none';
      });
    });

    // Form validation functions
    function validateForm() {
      let isValid = true;
      
      // Validate name
      const name = document.getElementById('name');
      if (!name.value.trim()) {
        showFieldError('name', 'Please enter your name');
        isValid = false;
      } else if (name.value.trim().length < 2) {
        showFieldError('name', 'Name must be at least 2 characters');
        isValid = false;
      }
      
      // Validate phone
      const phone = document.getElementById('phone');
      const phoneRegex = /^[\d\s\-\(\)]+$/;
      if (!phone.value.trim()) {
        showFieldError('phone', 'Please enter your phone number');
        isValid = false;
      } else if (!phoneRegex.test(phone.value.trim()) || phone.value.replace(/\D/g, '').length < 10) {
        showFieldError('phone', 'Please enter a valid phone number');
        isValid = false;
      }
      
      // Validate service
      const service = document.getElementById('service');
      if (!service.value) {
        showFieldError('service', 'Please select a service');
        isValid = false;
      }
      
      // Validate pickup address
      const pickup = document.getElementById('pickup');
      if (!pickup.value.trim()) {
        showFieldError('pickup', 'Please enter your pickup address');
        isValid = false;
      } else if (pickup.value.trim().length < 10) {
        showFieldError('pickup', 'Please provide a complete address');
        isValid = false;
      }
      
      return isValid;
    }

    function showFieldError(fieldId, message) {
      const field = document.getElementById(fieldId);
      const errorElement = document.getElementById(fieldId + '-error');
      
      if (field) {
        field.classList.add('error');
        field.style.borderColor = 'var(--error)';
      }
      
      if (errorElement) {
        errorElement.textContent = message;
      }
    }

    function clearFieldError(fieldId) {
      const field = document.getElementById(fieldId);
      const errorElement = document.getElementById(fieldId + '-error');
      
      if (field) {
        field.classList.remove('error');
        field.style.borderColor = '';
      }
      
      if (errorElement) {
        errorElement.textContent = '';
      }
    }

    function clearAllErrors() {
      formInputs.forEach(input => {
        clearFieldError(input.id);
      });
    }

    function hideMessages() {
      const successMsg = document.getElementById('form-success');
      const errorMsg = document.getElementById('form-error');
      if (successMsg) successMsg.style.display = 'none';
      if (errorMsg) errorMsg.style.display = 'none';
    }
  }

  // Send location functionality - handled by sendLocationEmail() function
});

// Send location email function (called from footer button)
function sendLocationEmail() {
  if (!navigator.geolocation) {
    alert('Location services are not supported by your browser.');
    return;
  }
  
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const locationData = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        to: '{{EMAIL}}'
      };
      
      fetch('/webhooks/send-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(locationData)
      })
      .then(response => {
        if (response.ok) {
          alert('Location sent successfully!');
        } else {
          throw new Error('Failed to send location');
        }
      })
      .catch(error => {
        console.error('Error sending location:', error);
        alert('Failed to send location. Please call us directly.');
      });
    },
    (error) => {
      console.error('Geolocation error:', error);
      alert('Unable to get your location. Please call us directly.');
    }
  );
}


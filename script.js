// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Services Dropdown Toggle
    const servicesToggle = document.querySelector('.services-toggle');
    const servicesMenu = document.querySelector('.services-menu');
    const servicesDropdown = document.querySelector('.services-dropdown');
    
    if (servicesToggle && servicesMenu) {
        servicesToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            servicesMenu.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (servicesDropdown && !servicesDropdown.contains(event.target)) {
                servicesMenu.classList.add('hidden');
            }
        });
    }
    
    // Find Location Button
    const findLocationBtn = document.getElementById('find-location-btn');
    if (findLocationBtn) {
        findLocationBtn.addEventListener('click', function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank');
                }, function(error) {
                    console.error('Error finding location:', error);
                    alert('Unable to find your location. Please check your browser permissions.');
                });
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        });
    }
    
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});


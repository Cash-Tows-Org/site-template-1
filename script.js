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
    
    
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Dynamically generate service items
    const SERVICES = [
        { name: '{{PROMPT: Write first service name.}}', file: 'service-1.html', icon: 'M5 13l4 4L19 7', color: 'primary' },
        { name: '{{PROMPT: Write second service name.}}', file: 'service-2.html', icon: 'M5 13l4 4L19 7', color: 'accent' },
        { name: '{{PROMPT: Write third service name.}}', file: 'service-3.html', icon: 'M5 13l4 4L19 7', color: 'primary' },
        { name: '{{PROMPT: Write fourth service name.}}', file: 'service-4.html', icon: 'M5 13l4 4L19 7', color: 'accent' },
        // Add more services here (up to 8)
    ];

    const serviceGrid = document.querySelector('.services-overview .grid');
    const mobileServiceMenuItems = document.querySelector('.mobile-menu #MOBILE_SERVICE_MENU_ITEMS');

    if (serviceGrid) {
        serviceGrid.innerHTML = SERVICES.map(service => `
            <a href="services/${service.file}" class="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
                <div class="flex-shrink-0 w-8 h-8 bg-${service.color}/10 rounded-md flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-${service.color}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${service.icon}" />
                    </svg>
                </div>
                <div class="flex-grow">
                    <h3 class="font-semibold text-sm text-gray-900 leading-tight">
                        ${service.name}
                    </h3>
                </div>
            </a>
        `).join('');
    }

    if (mobileServiceMenuItems) {
        mobileServiceMenuItems.innerHTML = SERVICES.map(service => `
            <li>
                <a href="services/${service.file}" class="block bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white px-5 py-3 rounded-lg text-center font-semibold hover:bg-white hover:text-accent hover:border-white transition-all duration-300 shadow-md transform hover:scale-105" style="text-shadow: 0 1px 3px rgba(0,0,0,0.3);">
                    ${service.name}
                </a>
            </li>
        `).join('');
    }
});


# Template 1 - Clean/Modern Towing Website

A clean, modern static website template for towing and roadside assistance businesses.

## Features

- Clean, modern design with lots of white space
- Rounded corners and subtle shadows
- Blue/cyan color scheme
- Mobile-first responsive design
- Analytics tracking hooks
- Send My Location functionality
- Contact form with webhook integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Running Locally

Start the development server:

```bash
npm start
```

or

```bash
npm run dev
```

This will start a local server on port 3001 and automatically open your browser.

### Viewing the Site

Once the server is running, you can access the site at:
- http://localhost:3001

### Available Pages

- Home: `index.html`
- Contact: `contact.html`
- Services:
  - Light-Duty Towing: `services/towing.html`
  - Roadside Assistance: `services/roadside-assistance.html`
  - Jump Start: `services/jump-start.html`
  - Tire Change: `services/tire-change.html`
  - Fuel Delivery: `services/fuel-delivery.html`
  - Lockout: `services/lockout.html`

## Customization

### Content Tokens

Replace these tokens throughout the HTML files with your actual business information:

- `{{BUSINESS_NAME}}` - Your business name
- `{{PHONE_PRIMARY}}` - Primary phone number
- `{{SERVICE_CITY}}` - Your service city
- `{{SERVICE_RADIUS}}` - Service radius in miles
- `{{ABOUT_SHORT}}` - Short about description
- `{{EMAIL}}` - Business email
- `{{YEAR}}` - Current year

### Images

Replace the placeholder images:
- `assets/img/hero.jpg` - Hero image (recommended: 1920x1080px)
- `assets/img/logo.png` - Logo image (recommended: 200x200px, transparent background)

### Colors

Edit CSS variables in `assets/css/shared.css` to customize colors:

```css
:root {
  --brand: #2563eb;      /* Brand color */
  --accent: #06b6d4;     /* Accent color */
  --bg: #ffffff;         /* Background */
  --text: #1f2937;       /* Text color */
  --muted: #6b7280;      /* Muted text */
  --card: #f9fafb;       /* Card background */
}
```

## Build & Deploy

This is a static website, so you can deploy it to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any web server

Simply upload all files (except `node_modules/`) to your hosting provider.


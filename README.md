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

### Token Reference

All business-specific content is expressed as double-curly tokens so automation can replace values in one pass. The table below maps the tokens used in this template to the `public.free_websites` table (or derived values):

| Token | Description | Source |
| --- | --- | --- |
| `{{SITE_ID}}` | Unique site identifier | `free_websites.id` |
| `{{TEMPLATE_ID}}` | Template identifier | `free_websites.template_id` |
| `{{REPO_SLUG}}` | Repository/package slug (kebab-case) | Derived from business name + city |
| `{{LANGUAGE_CODE}}` | IETF language tag (e.g. `en`, `es`) | `free_websites.meta->>'language_code'` (fallback `en`) |
| `{{MODE}}` | Color mode (`light` \| `dark`) | `free_websites.mode` |
| `{{BUSINESS_NAME}}` | Display name shown on-site | `free_websites.business_name` (generated column) |
| `{{PHONE_PRIMARY}}` | Primary phone / dispatch line | `free_websites.customer_phone` |
| `{{EMAIL}}` | Public contact email | `free_websites.customer_email` |
| `{{SERVICE_CITY}}` | Primary service city | `free_websites.service_city` |
| `{{SERVICE_RADIUS_KM}}` | Service radius in kilometers | `free_websites.service_radius_km` |
| `{{ABOUT_SHORT}}` | Short intro/hero blurb | `free_websites.meta->>'about_short'` |
| `{{HERO_PHOTO_URL}}` | Hero image source URL | `free_websites.meta->>'hero_photo_url'` |
| `{{LOGO_URL}}` | Logo image source URL | `free_websites.logo_path` (absolute URL) |
| `{{PRIMARY_COLOR}}` | Primary brand color (hex) | `free_websites.primary_color` |
| `{{ACCENT_COLOR}}` | Accent color (hex) | `free_websites.accent_color` |
| `{{YEAR}}` | Copyright year | runtime value or `meta->>'year'` |

> ℹ️ If a source value is missing, the automation layer should inject a sensible default before publishing. Tokens should not remain unreplaced in production.

A machine-readable copy of this map is stored in `template.tokens.json` for builder scripts.

### Assets

- `assets/img/hero.jpg` — optional local fallback if you do not provide `{{HERO_PHOTO_URL}}`
- `assets/img/logo.png` — optional local fallback if you do not provide `{{LOGO_URL}}`

### Theme & Mode

Colors are controlled through custom properties in `assets/css/shared.css`. Set `{{PRIMARY_COLOR}}`, `{{ACCENT_COLOR}}`, and `{{MODE}}` (`light` or `dark`) for each deployment. The stylesheet includes auto dark-mode adjustments when `data-theme="dark"` is present on the `<body>` tag.

### Automation Playbook

When cloning this template for a new customer, the bot should:

1. Copy the repository into a new workspace.
2. Replace every token listed above (HTML, CSS, JS, JSON) with business-specific values from `free_websites`.
3. Regenerate the project slug (`{{REPO_SLUG}}`) from the business name + city (kebab-case) and update `package.json` plus the new GitHub repository name.
4. Swap image assets if the customer provided branded media.
5. Push to a new GitHub repository named `{{REPO_SLUG}}` (or similar) under the correct organization/user.

Keep this repository tokenized—do not commit concrete customer data here.

## Build & Deploy

This is a static website, so you can deploy it to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any web server

Simply upload all files (except `node_modules/`) to your hosting provider.


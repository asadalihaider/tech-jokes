# Tech Jokes

## Overview

Tech Jokes is a Progressive Web App built using Vue CLI and Vue 3 Composition API. This app provides a fun way to explore tech-related jokes. Users can seamlessly switch between different languages and choose their preferred theme (dark or light). The app leverages the power of Vue 3's Composition API for efficient and organized code.

## Features

- **Tech Jokes:** Enjoy a collection of tech-related jokes to brighten your day.
- **Language Selection:** Choose from a variety of languages for the jokes to suit your preference.
- **Theme Switch:** Toggle between light and dark themes for a personalized viewing experience.

## Technologies Used

- Vue.js 3
- Vue CLI
- Vue Router (for future enhancements)
- Composition API
- Service Worker for PWA capabilities
- Tailwind CSS for styling
- Check API Docs [here](jokeapi.dev)

## Getting Started

Follow these steps to get the Tech Jokes PWA up and running on your local machine:

**1. Clone Repository:**

```bash
git clone https://github.com/asadalihaider/tech-jokes.git
```

**2. Navigate to Project Directory:**

```bash
cd tech-jokes-pwa
```

**3. Install Dependencies:**

```bash
npm install
```

**4. Run Development Server:**

```bash
npm run serve
```

**5. Access the App:**
Open your browser and go to http://localhost:8080 to view the app.

## Configuration

**Environment Variables**

```bash
VUE_APP_JOKE_API_URL: API URL for fetching jokes.
VUE_APP_API_BASE_URL: Base URL for fetching jokes API.
VUE_APP_DEFAULT_THEME: Default theme (light or dark).
```

## Deployment

To deploy the Tech Jokes PWA, follow these steps:

1. Build for Production:

```bash
npm run build
```

2. Deploy the Contents of the `dist` Directory to Your Hosting Service.
3. Configure HTTPS for PWA Functionality.

## Contributing

If you'd like to contribute to the development of Tech Jokes PWA, please follow the guidelines in CONTRIBUTING.md.

## License

This project is licensed under the MIT License.

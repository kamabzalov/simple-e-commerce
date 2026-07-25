# Simple E-Commerce

> A modern, responsive e-commerce application built with Angular and powered by the Fake Store API.

![Angular](https://img.shields.io/badge/Angular-22.0.0-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.3-blue?logo=tailwindcss)
![Node](https://img.shields.io/badge/Node-22.0+-green?logo=node.js)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Development](#development)
- [Project Structure](#project-structure)
- [API](#api)
- [Tech Stack](#tech-stack)
- [Available Commands](#available-commands)
- [Testing](#testing)
- [Build & Deployment](#build--deployment)
- [Support](#support)

## 🎯 Features

- ✅ **Modern Architecture** - Angular 22 with latest features
- 🎨 **Responsive Design** - Beautiful UI with Tailwind CSS
- 🌍 **Internationalization** - Multi-language support (@ngx-translate)
- 📦 **Fake Store API Integration** - Mock data for testing
- 🚀 **Server-Side Rendering (SSR)** - Angular SSR support for better SEO
- 🧪 **Complete Test Coverage** - Vitest for unit testing
- 💻 **TypeScript** - Strict typing for reliable code
- 🎯 **ESLint & Prettier** - Automatic code formatting
- ⚡ **Express Integration** - Built-in backend for SSR

## 📋 Requirements

Before you get started, make sure you have installed:

- **Node.js**: version 18 or higher ([download](https://nodejs.org/))
- **npm**: version 11.13.0 or higher (comes with Node.js)
- **Angular CLI**: automatically installed as a dev dependency

Check your versions:
```bash
node --version
npm --version
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kamabzalov/simple-e-commerce.git
cd simple-e-commerce
```

### 2. Install Dependencies

```bash
npm install
```

## 💻 Development

### Start the Development Server

```bash
npm start
# or
ng serve
```

Navigate to **http://localhost:4200/** in your browser. The application will automatically reload when you modify any source files.

### Generate Components and Modules

```bash
# Generate a new component
ng generate component feature/my-component

# Generate a new service
ng generate service shared/services/my-service

# View all available schematics
ng generate --help
```

### Code Quality and Formatting

```bash
# Lint code
npm run lint

# Auto-fix lint errors
npm run lint:fix

# Format code with Prettier
npm run format
```

## 🔌 API

This application uses the **Fake Store API** to fetch product, category, and order data.

📖 Documentation: https://fakestoreapi.com/docs

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Angular** | 22.0.0 | UI Framework |
| **TypeScript** | 6.0.2 | Programming Language |
| **RxJS** | 7.8.0 | Reactive Programming |
| **Angular SSR** | 22.0.5 | Server-Side Rendering |
| **Tailwind CSS** | 4.3.2 | Utility-first CSS |
| **ngx-translate** | 18.0.0 | Internationalization |
| **Express** | 5.1.0 | Backend for SSR |
| **Vitest** | 4.0.8 | Unit Testing |
| **ESLint** | 10.3.0 | Code Linting |
| **Prettier** | 3.9.4 | Code Formatting |

## 📝 Available Commands

### Core Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Watch mode (auto rebuild)
npm run watch

# Run production SSR server
npm run serve:ssr:e-commerce
```

### Testing and Code Quality

```bash
# Run unit tests
npm test

# Lint code
npm run lint

# Auto-fix lint errors
npm run lint:fix

# Format all code
npm run format
```

### End-to-End Testing

```bash
# Run e2e tests
ng e2e
```

## 🧪 Testing

### Unit Tests

The project uses **Vitest** for unit testing.

```bash
# Run all tests
npm test

# Run tests in watch mode
ng test --watch

# Run tests with coverage
ng test --code-coverage
```

### E2E Tests

```bash
ng e2e
```

**Note**: Angular CLI doesn't include an E2E testing framework by default. Consider using:
- **Cypress** - Easy to use and intuitive
- **Playwright** - High performance
- **WebDriver** - Cross-browser testing

## 🏗 Build & Deployment

### Build for Production

```bash
npm run build
```

Build artifacts will be stored in the `dist/` directory.

**Production build includes:**
- Minified code
- Tree-shaking (removal of unused code)
- Bundle optimization
- AOT compilation

### Production Server (SSR)

```bash
npm run serve:ssr:e-commerce
```

The application will start at http://localhost:4000/

### Deploy to Hosting

**Option 1: Static Hosting (GitHub Pages, Netlify, Vercel)**

```bash
npm run build
# Upload contents of dist/ to your hosting
```

**Option 2: Server-Side Rendering**

```bash
npm run build
npm run serve:ssr:e-commerce
# Deploy files from dist/e-commerce/
```

**Recommended Hosting Providers:**
- 🟦 [Vercel](https://vercel.com/) - Great for Angular with SSR
- 🟨 [Netlify](https://netlify.com/) - Perfect for static sites
- ☁️ [Heroku](https://www.heroku.com/) - For applications with backend
- ☁️ [AWS](https://aws.amazon.com/) - For scalable applications

## 📚 Useful Resources

- 📖 [Angular Documentation](https://angular.dev/)
- 📖 [Angular CLI Documentation](https://angular.dev/tools/cli)
- 📖 [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- 📖 [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- 📖 [RxJS Documentation](https://rxjs.dev/guide/overview)
- 🧪 [Vitest Documentation](https://vitest.dev/)
- 🔌 [Fake Store API](https://fakestoreapi.com/docs)

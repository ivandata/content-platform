# Content Platform

A modern React application for displaying and managing photo content with advanced features like masonry grid layout, infinite scrolling, and responsive image loading.

## 🛠 Tech Stack

- **Package Manager:** pnpm
- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite 6
- **Styling:** [Emotion](https://emotion.sh/docs/introduction)
- **Data Fetching:**[TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Virtualization:** [TanStack Virtual](https://tanstack.com/virtual/latest)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Animation:** [Motion](https://motion.dev/)
- **Testing:**
    - [Vitest](https://vitest.dev/)
    - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
    - [Happy DOM](https://github.com/capricorn86/happy-dom)
- **Development Tools:**
    - [ESLint 9](https://eslint.org/) flat config with [Stylistic](https://eslint.style/)
    - TypeScript 5.7
    - [Faker.js](https://fakerjs.dev/) for mock data generation

## 📁 Project Structure

```
src/
├── modules/                   # Feature-based modules
│   ├── photo-grid/           # Photo grid feature
│   │   ├── components/       # Grid-specific components
│   │   │   ├── masonry-grid/
│   │   │   └── ...
│   ├── photo-details/        # Photo details feature
│   │   ├── components/       # Detail view components
│   │   └── ...
│   └── ...
├── shared/                   # Shared resources
│   ├── api/                  # API integration
│   ├── components/           # Common components
│   ├── helpers/             # Utility functions
│   └── ...
├── assets/                  # Static assets
├── App.tsx                  # Root component
├── main.tsx                 # Entry point
└── vite-env.d.ts           # Vite type declarations
```

## 🌟 Key Features

- Modular architecture with feature-based organization
- Responsive masonry grid layout with virtualization
- Advanced image loading with fallbacks and skeletons
- Infinite scrolling implementation
- Type-safe API integration
- Comprehensive testing setup
- Modern animation integration

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Development**
   ```bash
   pnpm dev
   ```

3. **Build**
   ```bash
   pnpm build
   ```

4. **Testing**
   ```bash
   # Run tests
   pnpm test

   # Generate coverage report
   pnpm coverage
   ```

5. **Linting**
   ```bash
   pnpm lint
   ```

## 📦 Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm preview`: Preview production build
- `pnpm test`: Run tests
- `pnpm coverage`: Generate test coverage report
- `pnpm lint`: Run ESLint

## 🧩 Project Architecture

The project follows a [modular architecture](https://imalov.dev/articles/react-modular-approach-structure/) with these key principles:

- **Feature-based Organization**: Each major feature is contained in its own module
- **Shared Resources**: Common utilities and components are centralized
- **Type Safety**: Comprehensive TypeScript implementation
- **Component Isolation**: Each component has its own types, tests, and styles
- **API Abstraction**: Centralized API handling with React Query

## 📋 Development Guidelines

- Use TypeScript for all new code
- Follow the modular structure for new features
- Write tests for new components and utilities
- Use Emotion for styling
- Implement proper error boundaries and loading states
- Follow ESLint rules and maintain code quality

## 🔧 Configuration

- ESLint configuration for code quality
- Vite configuration for optimal development experience
- TypeScript configuration for type safety
- Testing configuration with Vitest and React Testing Library

## 🧪 Testing Strategy

- Unit tests for utilities and hooks
- Component tests with React Testing Library
- Mock data generation with Faker.js
# Fancy Form - Currency Exchange

🚀 Demo

You can view the demo video here: [Demo Video](./docs/Demo.mov)

## Technologies Used & Reasoning

- **React 19 & Vite**: Chosen for the latest React features and extremely fast development environment with HMR.
- **TypeScript**: Provides robust type safety, reducing bugs and improving code maintainability.
- **Tailwind CSS 4**: Utilized for rapid UI development using utility classes and modern CSS features like CSS variables and container queries.
- **React Hook Form & Zod**: Combines efficient form state management with powerful schema-based validation for a seamless user experience.
- **TanStack Query (React Query)**: Handles data fetching, caching, and synchronization with the server state effortlessly.
- **Vitest & React Testing Library**: Ensures high code quality through comprehensive unit and integration tests.
- **Lucide React**: Provides a beautiful and consistent icon set for the UI.

## Project Structure

The project follows a feature-based organization to ensure scalability and maintainability.

```text
src
├── components      # Shared UI components (Button, Input, etc.)
├── features        # Feature-specific logic and components
│   └── ExchangeForm # The main currency exchange feature
│       ├── components # Sub-components specific to the exchange form
│       ├── hooks      # Custom hooks for exchange logic
│       ├── utils      # Helper functions for the exchange feature
│       └── validation # Zod validation schemas
├── pages           # Page level components
├── services        # API service layers for external data fetching
├── types           # Global TypeScript type definitions
├── utils           # General utility functions
└── test            # Global test setup and configuration
```

## Test Coverage

We maintain high test coverage to ensure the reliability of the exchange logic and UI components.

To generate the coverage report, run:

```bash
npm run coverage
```

### Current Coverage Results (V8)

| Category   | Percentage |
| ---------- | ---------- |
| Statements | 97.31%     |
| Branches   | 97.05%     |
| Functions  | 93.93%     |
| Lines      | 98.25%     |

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- pnpm (or npm/yarn)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

```

```

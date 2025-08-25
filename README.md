# Next.js v15 Features Examples

This project demonstrates the usage of new React 19 hooks in a Next.js application, as well as new features introduced in Next.js 15. It includes comprehensive examples of various hooks, components, and React best practices including when and when not to use useEffect.

## Getting Started

First, install the dependencies:

```bash
yarn install
```

Then, run the development server (turbopack):

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project is organized as follows:

```txt
.
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── components/
│   │   └── FooterLink.tsx
│   ├── form-showcase/
│   │   └── page.tsx
│   ├── search/
│   │   └── page.tsx
│   ├── useeffect-showcase/
│   │   ├── page.tsx
│   │   ├── api-fetching/
│   │   │   └── page.tsx
│   │   ├── browser-events/
│   │   │   └── page.tsx
│   │   ├── button-click-state/
│   │   │   └── page.tsx
│   │   ├── external-state/
│   │   │   └── page.tsx
│   │   ├── props-calculation/
│   │   │   └── page.tsx
│   │   ├── render-logic/
│   │   │   └── page.tsx
│   │   └── subscriptions/
│   │       └── page.tsx
│   └── react-19-hooks/
│       ├── page.tsx
│       ├── action-state/
│       │   └── page.tsx
│       ├── use-optimistic/
│       │   └── page.tsx
│       ├── use-hook/
│       │   └── page.tsx
│       └── use-form-status/
│           └── page.tsx
├── public/
│   ├── next.svg
│   └── vercel.svg
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## Testing

The project uses Vitest for testing React components. Tests are automatically run on pull requests and pushes to the main branch.

### Running Tests

To run tests in watch mode (development):

```bash
yarn test
```

To run tests once with coverage:

```bash
yarn test:coverage
```

### Test Structure

Tests are co-located with their components in the `app/components` directory. For example:

- `app/components/FooterLink.tsx`
- `app/components/FooterLink.test.tsx`

### CI/CD

Tests are automatically run in GitHub Actions on:

- Pull requests targeting the main branch
- Direct pushes to the main branch

Coverage reports are generated and uploaded as artifacts in the GitHub Actions UI.

## Examples

The project includes the following examples:

### React Best Practices

1. **useEffect Showcase**: A comprehensive guide on when to use and when NOT to use useEffect.

   - URL: `/useeffect-showcase`
   - **When you SHOULD use useEffect:**
     - API data fetching (`/useeffect-showcase/api-fetching`)
     - Setting up subscriptions/intervals (`/useeffect-showcase/subscriptions`)
     - Browser event listeners (`/useeffect-showcase/browser-events`)
     - External state synchronization (`/useeffect-showcase/external-state`)
   - **When you DON'T need useEffect:**
     - Button click state updates (`/useeffect-showcase/button-click-state`)
     - Props-based calculations (`/useeffect-showcase/props-calculation`)
     - Render-time logic (`/useeffect-showcase/render-logic`)

### Next.js 15 Features

1. **Next.js 15 Form Component**: Demonstrates the new Form component introduced in Next.js 15.

   - URL: `/form-showcase`

2. **Search with Async SearchParams**: Shows how to use async searchParams in Next.js 15.

   - URL: `/search`

### React 19 Hooks

1. **useActionState**: Demonstrates form submission with server-side actions and state management.

   - URL: `/react-19-hooks/action-state`

2. **useOptimistic**: Shows optimistic updates in the UI before server confirmation.

   - URL: `/react-19-hooks/use-optimistic`
   - Features:
     - Real-time optimistic UI updates
     - Title history tracking with timestamps
     - Error handling and validation
     - Loading states and animations
     - Dark mode support
     - Responsive design

3. **use**: Illustrates data fetching with the `use` hook.

   - URL: `/react-19-hooks/use-hook`

4. **useFormStatus**: Displays form submission status and pending state.
   - URL: `/react-19-hooks/use-form-status`

## Features Demonstrated

- **useEffect Best Practices**: Comprehensive examples showing when to use and avoid useEffect
- **Next.js 15 Form Component**: New form handling capabilities
- **Async SearchParams**: Next.js 15 search parameter handling
- **React 19 Hooks**: useActionState, useOptimistic, use, useFormStatus examples
- **Enhanced Text Visibility**: Context-aware CSS system for better readability
- **Tailwind CSS Styling**: Modern utility-first CSS framework
- **Dark Mode Support**: Theme switching capabilities
- **Responsive Design**: Mobile-first approach

## Code Quality and Development

### Linting and Formatting

This project uses ESLint and Prettier for code quality and formatting. The setup includes:

- Pre-commit hooks using Husky
- Automatic formatting of staged files using lint-staged
- ESLint for TypeScript/JavaScript linting
- Prettier for consistent code formatting

Available scripts:

- `yarn lint` - Run ESLint
- `yarn format` - Format all files using Prettier
- `yarn format:check` - Check if files are formatted correctly

Configuration files:

- `.eslintrc.json` - ESLint configuration
- `.prettierrc` - Prettier configuration with:
  - Single quotes
  - 2-space indentation
  - 100 character line length
  - ES5 trailing commas
  - And more best practices

Pre-commit hooks ensure that:

- All staged TypeScript/JavaScript files are linted and formatted
- All staged JSON/Markdown files are properly formatted
- Code meets the project's quality standards before being committed

## Learn More

To learn more about Next.js and React, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [React Documentation](https://reactjs.org/) - learn about React features and API.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Next.js v15 Features Examples

This project demonstrates the usage of new React 19 hooks in a Next.js application, as well as new features introduced in Next.js 15. It includes examples of various hooks and components.

## Getting Started

First, install the dependencies:

```bash
yarn install
````

Then, run the development server (turbopack):

```bash
yarn dev
````


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project is organized as follows:

````
.
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── form-showcase/
│   │   └── page.tsx
│   ├── search/
│   │   └── page.tsx
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
````


## Examples

The project includes the following examples:

1. **Next.js 15 Form Component**: Demonstrates the new Form component introduced in Next.js 15.
   - URL: `/form-showcase`

2. **Search with Async SearchParams**: Shows how to use async searchParams in Next.js 15.
   - URL: `/search`

3. **useActionState**: Demonstrates form submission with server-side actions and state management.
   - URL: `/react-19-hooks/action-state`

4. **useOptimistic**: Shows optimistic updates in the UI before server confirmation.
   - URL: `/react-19-hooks/use-optimistic`

5. **use**: Illustrates data fetching with the `use` hook.
   - URL: `/react-19-hooks/use-hook`

6. **useFormStatus**: Displays form submission status and pending state.
   - URL: `/react-19-hooks/use-form-status`

## Features Demonstrated

- Next.js 15 Form Component
- Async SearchParams
- React 19 Hooks: useActionState, useOptimistic, use, useFormStatus

## Learn More

To learn more about Next.js and React, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [React Documentation](https://reactjs.org/) - learn about React features and API.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

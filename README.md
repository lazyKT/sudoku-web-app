**Sudoku web game**

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies:

`npm install`

Then, run the development server:

`npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Running Tests

You can run unit and components tests by `npm test` that will run all the tests under `__tests__` folder.
Alternatively, you can run `npm run test -- --watch` in the watch mode.

### Tool used for testing
- Jest
- React testing library

## Formatting

`Prettier` is currently used for code formatting and to make sure that all lines of codes in the project would follow the same formatting rule.


## Continuous Integration/ Continuous Delivery
- For CI, `.github/workflows/main.yml` will be run upon every push action to the any branches in the project.
- `.github/workflows/deploy-preview.yml` will be run upon every push action to the any branches in the project, for deployment of preview version to vercel.
- `.github/workflows/deploy-production.yml` will be run upon every push action to the *main branch* in the project, for deployment of production version to vercel.


## Additional tool used
- material-ui (For icons)
- supabase
- tailwind
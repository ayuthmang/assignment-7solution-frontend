# Welcome 7solutions Frontend Assignment

This project is a frontend assignment for 7solutions, built using Remix and TypeScript consist of two parts:

- Part 1: 1. Auto Delete Todo List:
  - Start a server and access the Auto Delete Todo List via `http://<SERVER_URL>/`.
- Part 2: 2. Create data from API (OPTIONAL):

  - All files are located in the `app/routes/departments` directory. When the server starts, you can access via `http://<SERVER_URL>/departments`.

  - The test is written with vitest and can be run with the command:

    ```sh
    pnpm run test
    ```

---

## Development

Run the dev server:

```sh
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

## Further Reading

- 📖 [Remix docs](https://remix.run/docs)

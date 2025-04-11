# Gossip | Backend

> *Eventure is a modern event management platform that allows users to easily create, manage, and attend events. Whether it's a virtual webinar, a local concert, or a corporate conference, Eventure simplifies the process with features like event creation, RSVP tracking, ticket sales, and real-time notifications. With an intuitive dashboard for organizers and a seamless discovery experience for attendees, planning and participating in events has never been easier.*

[Web App](https://github.com/genuinestalwart/eventure-web) | [Live Site](https://gs-eventure.vercel.app/)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript

## Documentation

If you want to create this project on your own, do the following steps:

1. Create the `package.json` file with default config. Then, install the necessary packages.

    ```bash
    npm init -y
    npm i cors dotenv express moment mongodb mongoose jsonwebtoken
    npm i -D typescript nodemon rimraf tsconfig-paths typescript-transform-paths ts-patch @types/node @types/express @types/cors @types/bcrypt @types/jsonwebtoken
    ```

2. Then, add these extra scripts in there.

    ```json
    "build": "rimraf dist && tspc",
    "dev": "nodemon -r tsconfig-paths/register src/index.ts",
    "start": "nodemon src/index.ts",
    ```

3. Now, set up eslint and typescript.

    ```bash
    npm init @eslint/config@latest
    npx tsc --init
    ```

4. After that, generate a `tsconfig.json` file with these settings.

    ```json
    {
        "compilerOptions": {
            "allowSyntheticDefaultImports": true,
            "baseUrl": "src",
            "esModuleInterop": true,
            "forceConsistentCasingInFileNames": true,
            "module": "commonjs",
            "moduleResolution": "Node",
            "outDir": "dist",
            "paths": { "@/*": ["./*"] },
            "plugins": [
                { "transform": "typescript-transform-paths" },
                {
                    "transform": "typescript-transform-paths",
                    "afterDeclarations": true
                }
            ],
            "strict": true,
            "target": "ESNext"
        },
        "include": ["src/**/*"]
    }
    ```

If you don't know how to generate a random string to use as a token secret, try this in the terminal:

```bash
node
require("crypto").randomBytes(64).toString("hex")
```

## Hosting

For hosting on vercel, create a `vercel.json` file with these configurations.

```json
{
    "version": 2,
    "builds": [
        {
            "src": "dist/index.js",
            "use": "@vercel/node",
            "config": { "includeFiles": ["dist/**"] }
        }
    ],
    "routes": [{ "src": "/(.*)", "dest": "dist/index.js" }]
}
```

**However, vercel will expect a `/dist` folder in your project. So if you're automatically deploying from GitHub, don't forget to use `npm run build` to regenerate `/dist` folder everytime before committing.**

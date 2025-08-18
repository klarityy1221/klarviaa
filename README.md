klarviaa

Setup
1. Install dependencies for both client and server:

```bash
npm run install:all
```

2. Start client dev server (Vite):

```bash
npm run dev
```

3. Start backend dev server with automatic restart (nodemon):

```bash
npm --prefix server run dev
```

Or start both in parallel:

```bash
npm run dev:all
```

Build

```bash
npm run -s build
```

Start (production)

```bash
npm run start:server
```

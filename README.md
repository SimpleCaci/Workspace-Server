# Workspace Server

A small Express messaging prototype built while learning how browser clients communicate with a Node.js backend.

## Tech stack

- Node.js and Express
- JSON-based HTTP endpoints
- Vanilla HTML, CSS, and JavaScript client
- File-backed local development storage

## What it does

- Serves the included browser client from `website/`.
- Accepts messages through `POST /messageSend`.
- Returns saved messages through `GET /messageView`.
- Validates required message fields and returns useful HTTP errors.

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:3000`. Set `PORT` to use another port.

Check server syntax with:

```bash
npm run check
```

## Architecture

The Express server in `index.js` serves the static client and exposes two lightweight API routes. Messages are stored in `allMessages.json` so the original learning project remains easy to inspect without a database.

## Project status

Educational prototype. The core local messaging flow is implemented, but authentication, multi-user authorization, database storage, and production deployment are intentionally outside its current scope.

## Usage notes

Use sample content only. File-backed storage is appropriate for local learning, not private or production conversations.

## Next steps

- Add route tests with a temporary message file.
- Replace file storage with a small database.
- Add user sessions before supporting real accounts.

Built by [SimpleCaci](https://github.com/SimpleCaci).

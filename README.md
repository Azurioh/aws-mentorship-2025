# test-connect

This is a fullstack template for a monolithic application using Fastify for the backend and Vite + React for the frontend. It's set up as a monorepo using npm workspaces.

## Project Structure

- `apps/backend`: The Fastify backend application.
- `apps/frontend`: The React frontend application.
- `packages/*`: Shared packages between the apps (if any).

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository and navigate to the project directory.

2. Install the dependencies for all workspaces:
   ```bash
   npm install
   ```

3. Set up environment variables for the backend. Create a `.env` file in the `apps/backend` directory and add the following:

   ```
   NODE_ENV=development
   PORT=3000
   API_BASE_URL=http://localhost:3001
   ```

   *Note: The frontend runs on port 5173 by default, so the backend should run on a different port.*

4. Build and run the services using Docker Compose:

    ```bash
    cd apps/backend
    docker-compose --env-file .env up --build
    ```

### Running the application

You need to run the backend and frontend in separate terminals.

- **Run the backend (in one terminal):**

  This will start the backend server in development mode with hot-reloading.

  ```bash
  npm run backend:dev
  ```

  The backend will be available at `http://localhost:3001`.

- **Run the frontend (in another terminal):**

  This will start the frontend development server.

  ```bash
  npm run frontend:dev
  ```

  The frontend will be available at `http://localhost:5173`.

### Building for Production

To build both applications for production, you can run the build commands from the root directory.

- **Build backend:**
  ```bash
  npm run backend:build
  ```
  The output will be in `apps/backend/dist`. To run the built backend, use `npm run backend:start`.

- **Build frontend:**
  ```bash
  npm run frontend:build
  ```
  The output will be in `apps/frontend/dist`. You can serve these static files with a web server.
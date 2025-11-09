# Langdock MVP - Backend

This is the backend service for the Langdock MVP application. It is a Node.js server built likely using a framework like Express.js.

## Features

Based on the project configuration, the backend includes the following functionality:

- **API Server**: Exposes an API running on port 5000.
- **Database**: Connects to a MongoDB database named `agentic`.
- **Authentication**: Uses JSON Web Tokens (JWT) for securing endpoints.
- **AI Integration**: Connects to the Groq API for Large Language Model (LLM) functionalities.
- **Email Service**: Integrates with SendGrid for sending emails.

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- MongoDB

### Installation

1.  Clone the repository.
2.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Environment Configuration

This project uses a `.env` file to manage environment variables. Create a `.env` file in the `backend` root directory and add the following variables.

```properties
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agentic
JWT_SECRET=your-super-secret-key
NODE_ENV=development
GROQ_API_KEY=your-groq-api-key
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=your-verified-sendgrid-email@example.com
```

### Running the Application

To run the server in development mode with automatic restarts on file changes, use:

```bash
npm run dev
```

*(Note: This assumes you have a `dev` script in your `package.json` that runs `nodemon`, for example: `"dev": "nodemon index.js"`)*
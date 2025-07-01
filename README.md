# AI Library Chat

A modern, conversational chat interface for a smart university library. This application allows users to interact with an AI-powered chatbot to get information and assistance with library services.

## Features

- **Conversational Interface:** Chat with an AI assistant to get help with library services.
- **AI-Powered Responses:** Integrated with an external AI to provide intelligent answers to user queries.
- **Real-time Interaction:** Built with a responsive frontend that communicates with a Python backend.
- **Modern Tech Stack:** Utilizes React, FastAPI, and Tailwind CSS for a modern development experience.

## Tech Stack

### Frontend
- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool for modern web development.
- **TypeScript:** A typed superset of JavaScript.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Shadcn/ui:** A collection of reusable UI components.
- **TanStack Query:** For data fetching and state management.
- **react-markdown:** To render AI responses in Markdown format.

### Backend (AI Service)
- **Python:** A versatile programming language.
- **FastAPI:** A modern, fast (high-performance) web framework for building APIs with Python.
- **Uvicorn:** An ASGI server for running the FastAPI application.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm / yarn / pnpm
- Python (v3.8 or later)
- pip

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rujirapongsn2/ChatLibrary.git
    cd ChatLibrary
    ```

2.  **Install Node.js dependencies:**
    ```bash
    npm install
    ```

3.  **Set up the Python AI Service:**
    - Navigate to the Python backend directory:
      ```bash
      cd python-backend
      ```
    - Install Python dependencies:
      ```bash
      pip install -r requirements.txt
      ```
    - Create a `.env` file in the `python-backend` directory and add your API key:
      ```
      API_KEY=your_actual_api_key_here
      ```
    - Return to the root directory:
      ```bash
      cd ..
      ```

### Running the Application

You will need to run two separate processes in two different terminals from the project's root directory.

1.  **Terminal 1: Start the Python AI Service:**
    ```bash
    uvicorn python-backend.main:app --reload
    ```
    This service will run on `http://127.0.0.1:8000`.

2.  **Terminal 2: Start the Frontend Application:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000` (or the port you have configured).

## Available Scripts

- `npm run dev`: Starts the main application in development mode.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run check`: Runs the TypeScript compiler to check for type errors.
- `npm run db:push`: Pushes database schema changes using Drizzle Kit.

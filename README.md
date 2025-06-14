# PromptGenius AI

A powerful web application that transforms basic prompts into high-quality, professional AI prompts using OpenAI's GPT-4.

## Features

- Transform basic prompts into professional-grade AI prompts
- Customize prompts with role, tone, format, and use-case selections
- Powered by OpenAI's GPT-4
- Modern UI built with React, TailwindCSS, and shadcn/ui
- Copy-to-clipboard functionality
- Production-ready architecture

## Tech Stack

### Frontend
- React
- TailwindCSS
- shadcn/ui
- Vite

### Backend
- Node.js
- Express
- OpenAI API
- MongoDB (optional)

## Project Structure

```
prompt-genius-ai/
├── client/                 # Frontend React application
│   ├── src/
│   ├── public/
│   └── package.json
├── server/                 # Backend Node.js application
│   ├── src/
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key

### Environment Setup

1. Frontend (.env file in client directory):
```
VITE_API_URL=http://localhost:3000
```

2. Backend (.env file in server directory):
```
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the contents from the Frontend Environment Setup section
4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the contents from the Backend Environment Setup section
4. Start the server:
   ```bash
   npm run dev
   ```

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set the environment variable `VITE_API_URL` to your backend URL
4. Deploy

### Backend (Render)
1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your repository
4. Set the environment variables:
   - `PORT`: 3000
   - `OPENAI_API_KEY`: Your OpenAI API key
5. Deploy

## License

MIT 
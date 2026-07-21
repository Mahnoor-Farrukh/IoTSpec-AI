# IoTSpec AI

IoTSpec AI is an AI-powered requirement summarizer developed for IoT and Smart Home systems. The application helps users convert unstructured requirements into a structured software requirement summary using Generative AI.

## Features

- Generate an executive summary
- Extract functional requirements
- Extract non-functional requirements
- Identify IoT devices
- Detect sensors
- Highlight missing requirements
- Identify potential risks
- Provide improvement suggestions
- Download the generated report as a PDF

## Technologies Used

- React.js
- Express.js
- JavaScript
- Groq API
- jsPDF
- HTML5 & CSS3
- Vite

## Project Structure

```
IoTSpec-AI/
│
├── frontend/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── server.js
│   ├── groqClient.js
│   └── package.json
│
└── README.md
```

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/IoTSpec-AI.git
```

### Install frontend dependencies

```bash
cd frontend
npm install
```

### Install backend dependencies

```bash
cd ../backend
npm install
```

### Create a `.env` file

```env
GROQ_API_KEY=your_api_key
MODEL=your_model_name
PORT=5000
```

### Start the backend

```bash
npm start
```

### Start the frontend

```bash
npm run dev
```

## Author

**Mahnoor Farrukh**

BS Computer Science

Riphah International University
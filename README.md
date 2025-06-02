# SkillSync

SkillSync is a platform that matches buyers with the most suitable freelance sellers using AI-powered recommendations. It consists of a Next.js frontend and a FastAPI backend agent.

## Project Structure

- **/app, /components, /lib, /hooks, /providers, /store, /types**: Next.js frontend code
- **/agent**: FastAPI backend agent for AI-powered recommendations

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Python 3.8+

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Install Backend Agent Dependencies

```bash
cd agent
pip install -r requirements.txt
```

### 3. Environment Variables

Create a `.env.local` file in the root for Next.js and a `.env` file in `agent/` for the backend. Example for the backend:

```
GEMINI_API_KEY=your_google_gemini_api_key
```

### 4. Run the Development Servers

#### Frontend (Next.js)

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

#### Backend (FastAPI)

```bash
cd agent
uvicorn main:app --reload
```

## Usage

- Edit frontend pages in `app/page.tsx`.
- The backend agent exposes a `/chat` endpoint for recommendations.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

## License

MIT

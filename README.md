# SkillSync

SkillSync is an AI-powered marketplace platform that intelligently connects buyers with the most suitable freelance sellers through advanced recommendation algorithms. The platform features a modern Next.js frontend with a FastAPI backend agent that leverages machine learning to provide personalized matches based on project requirements, seller expertise, and historical performance data.
![No Image](chat%20bot.png)


## Features

- **AI-Powered Matching**: Intelligent recommendation system that analyzes project requirements and seller profiles
- **Real-time Chat**: Built-in messaging system for seamless communication between buyers and sellers
- **Smart Filtering**: Advanced search and filter capabilities to find the perfect match
- **Performance Analytics**: Comprehensive dashboards for tracking project success and seller performance
- **Secure Payments**: Integrated payment processing with escrow protection
- **Review System**: Transparent rating and review system for quality assurance

## Tech Stack

### Frontend

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **React Hook Form**: Form handling and validation

### Backend

- **FastAPI**: High-performance Python web framework
- **Google Gemini AI**: Advanced language model for recommendations
- **Pydantic**: Data validation and serialization
- **Uvicorn**: ASGI web server

## Project Structure

```
skillsync/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── .env.local.example
│
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── (auth)/                  # Authentication routes
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/               # User dashboard
│   ├── projects/                # Project management
│   └── profile/                 # User profile pages
│
├── components/                   # Reusable React components
│   ├── ui/                      # Base UI components
│   ├── forms/                   # Form components
│   ├── layout/                  # Layout components
│   └── features/                # Feature-specific components
│
├── lib/                         # Utility functions and configurations
│   ├── utils.ts                 # General utilities
│   ├── api.ts                   # API client configuration
│   ├── auth.ts                  # Authentication helpers
│   └── validations.ts           # Form validation schemas
│
├── hooks/                       # Custom React hooks
│   ├── useAuth.ts              # Authentication hook
│   ├── useApi.ts               # API interaction hook
│   └── useLocalStorage.ts      # Local storage hook
│
├── providers/                   # React context providers
│   ├── AuthProvider.tsx        # Authentication context
│   └── ThemeProvider.tsx       # Theme context
│
├── store/                       # Zustand store definitions
│   ├── authStore.ts            # Authentication state
│   ├── userStore.ts            # User data state
│   └── projectStore.ts         # Project management state
│
├── types/                       # TypeScript type definitions
│   ├── auth.ts                 # Authentication types
│   ├── user.ts                 # User-related types
│   └── project.ts              # Project-related types
│
├── public/                      # Static assets
│   ├── images/
│   ├── icons/
│   └── favicon.ico
│
└── agent/                       # FastAPI backend agent
    ├── main.py                  # FastAPI application entry point
    ├── requirements.txt         # Python dependencies
    ├── .env.example            # Environment variables example
    │
    ├── app/                     # Application modules
    │   ├── __init__.py
    │   ├── models/              # Pydantic models
    │   │   ├── __init__.py
    │   │   ├── user.py
    │   │   ├── project.py
    │   │   └── recommendation.py
    │   │
    │   ├── services/            # Business logic services
    │   │   ├── __init__.py
    │   │   ├── ai_service.py    # AI recommendation service
    │   │   ├── matching_service.py
    │   │   └── chat_service.py
    │   │
    │   ├── api/                 # API route handlers
    │   │   ├── __init__.py
    │   │   ├── chat.py          # Chat endpoints
    │   │   ├── recommendations.py
    │   │   └── health.py
    │   │
    │   └── core/                # Core configurations
    │       ├── __init__.py
    │       ├── config.py        # Application settings
    │       └── dependencies.py  # Dependency injection
    │
    └── tests/                   # Test files
        ├── __init__.py
        ├── test_api.py
        └── test_services.py
```

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v18.0 or later) - [Download here](https://nodejs.org/)
- **Python** (3.8 or later) - [Download here](https://python.org/)
- **Git** - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/skillsync.git
   cd skillsync
   ```

2. **Install Frontend Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd agent
   pip install -r requirements.txt
   # or use virtual environment (recommended)
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

### Environment Configuration

#### Frontend Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication (if using third-party auth)
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# Database (if applicable)
DATABASE_URL=your-database-url
```

#### Backend Environment Variables

Create a `.env` file in the `agent/` directory:

```env
# AI Service Configuration
GEMINI_API_KEY=your_google_gemini_api_key
OPENAI_API_KEY=your_openai_api_key  # Optional alternative

# Application Settings
ENVIRONMENT=development
DEBUG=true
SECRET_KEY=your-secret-key

# Database Configuration
DATABASE_URL=sqlite:///./skillsync.db

# CORS Settings
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Running the Application

#### Development Mode

1. **Start the Backend Server**

   ```bash
   cd agent
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at [http://localhost:8000](http://localhost:8000)

   API documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

2. **Start the Frontend Server** (in a new terminal)
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000)

#### Production Mode

1. **Build the Frontend**

   ```bash
   npm run build
   npm start
   ```

2. **Run the Backend**
   ```bash
   cd agent
   uvicorn main:app 
   ```

## API Endpoints

### Core Endpoints

- `GET /` - Health check
- `POST /api/chat` - AI-powered chat for recommendations
- `GET /api/recommendations` - Get personalized seller recommendations
- `POST /api/projects` - Create new project
- `GET /api/sellers` - List available sellers with filters

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh authentication token

## Usage Examples

### Making API Requests

```javascript
// Get recommendations
const response = await fetch("/api/recommendations", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    projectDescription: "I need a responsive website for my business",
    budget: 5000,
    timeline: "2 weeks",
    skills: ["React", "Node.js", "MongoDB"],
  }),
});

const recommendations = await response.json();
```

### Using the Chat Feature

```javascript
// Send chat message for AI recommendations
const chatResponse = await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message:
      "I'm looking for a mobile app developer with React Native experience",
    context: {
      budget: 10000,
      timeline: "1 month",
    },
  }),
});
```

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use conventional commit messages
- Write unit tests for critical functionality

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

### Frontend Tests

```bash
npm run test
# or
npm run test:watch
```

### Backend Tests

```bash
cd agent
pytest
# or
python -m pytest tests/
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**

   - Change ports in the configuration files
   - Kill existing processes using the ports

2. **API Key Issues**

   - Verify your Gemini API key is correct
   - Check API key permissions and quotas

3. **CORS Errors**
   - Ensure ALLOWED_ORIGINS in backend env includes your frontend URL
   - Check that API_URL in frontend env points to correct backend

## Learn More

### Documentation

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [FastAPI Documentation](https://fastapi.tiangolo.com/) - FastAPI framework documentation
- [Google Gemini AI](https://ai.google.dev/) - AI service documentation

### Tutorials

- [Next.js Tutorial](https://nextjs.org/learn)
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**SkillSync** - Connecting talent with opportunity through AI-powered matching.

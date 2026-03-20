# Contributing to MernLearning

Thank you for your interest in contributing! 🚀

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-user/MernLearning.git`
3. Follow the setup guide in [docs/SETUP.md](docs/SETUP.md)

## Development Workflow

```bash
# Install all dependencies
npm run install:all

# Start development servers (backend + frontend)
npm run dev
```

## Project Structure

```
MernLearning/
├── backend/          # Node.js / Express API
│   └── src/
│       ├── config/   # Database & passport config
│       ├── controllers/
│       ├── middleware/
│       ├── models/   # Mongoose models
│       ├── routes/
│       ├── seeds/    # Database seed data
│       ├── services/ # Gemini AI service
│       └── utils/
├── frontend/         # React TypeScript app
│   └── src/
│       ├── components/
│       ├── context/  # Auth context
│       ├── hooks/
│       ├── pages/
│       ├── styles/
│       ├── types/
│       └── utils/
└── docs/             # Documentation
```

## Code Style

- **Backend**: CommonJS modules, async/await, clear error handling
- **Frontend**: TypeScript strict mode, functional components with hooks
- Keep components small and focused
- Add JSDoc comments for public functions

## Pull Request Guidelines

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make focused, atomic commits
3. Ensure the TypeScript build passes: `cd frontend && npx tsc --noEmit`
4. Write a clear PR description explaining the change

## Reporting Issues

Open a GitHub Issue with:
- Clear description of the bug or feature request
- Steps to reproduce (for bugs)
- Expected vs actual behavior

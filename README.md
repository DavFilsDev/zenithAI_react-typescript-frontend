# Frontend Repository README

## zenithAI Platform - Frontend (React + TypeScript)

### 🎉 Live Demo

Not availible from now

### 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/DavFilsDev/zenithAI_react-typescript-frontend.git
cd zenithAI_react-typescript-frontend

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your backend URL

# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 📋 Prerequisites

- Node.js 18+ or 20+
- npm, yarn, or pnpm
- Backend API running (see backend repository)

### 🏗️ Project Structure

```
zenithAI_react-typescript-frontend/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable components
│   │   ├── ui/         # UI components (Button, Input, etc.)
│   │   ├── chat/       # Chat-specific components
│   │   └── layout/     # Layout components
│   ├── contexts/       # React contexts (Auth, Theme, etc.)
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services
│   ├── types/          # TypeScript types
│   ├── utils/          # Utility functions
│   ├── pages/          # Page components
│   ├── styles/         # Global styles
│   └── App.tsx         # Main App component
├── .env.example        # Environment variables template
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

### 🔧 Configuration

1. **Environment Variables** (`/.env.local`):
```env
VITE_API_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000/ws
VITE_APP_NAME=ChatGPT Clone
VITE_DEFAULT_THEME=dark
```

### 📦 Installation

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types
- `npm run format` - Format code with Prettier

### 🎨 Features

- **Modern UI/UX**: Clean, responsive interface
- **Real-time Chat**: WebSocket support
- **Dark/Light Mode**: Theme switching
- **JWT Authentication**: Secure login system
- **Markdown Support**: Render code and formatted text
- **Conversation History**: Save and load previous chats
- **Responsive Design**: Mobile-first approach
- **Type Safety**: Full TypeScript support

### 📚 Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + CSS Modules
- **State Management**: React Context + Zustand
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: React Icons
- **Markdown**: React Markdown
- **Code Highlighting**: Prism.js
- **WebSocket**: Native WebSocket API

### 📱 Pages

1. **Login/Register** - Authentication pages
2. **Chat Dashboard** - Main chat interface
3. **Conversation List** - History sidebar
4. **Settings** - User preferences
5. **Profile** - User profile management


### 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### 🚀 Deployment

#### Free Hosting Options:

1. **Vercel** (Recommended)
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Netlify**
   ```bash
   # Install Netlify CLI
   npm i -g netlify-cli
   
   # Deploy
   netlify deploy --prod
   ```

3. **GitHub Pages**
   ```bash
   # Build and deploy
   npm run build
   npm run deploy
   ```

#### Environment Variables for Production:
```env
VITE_API_URL=https://your-backend.railway.app/api
VITE_WS_URL=wss://your-backend.railway.app/ws
```

### 📦 Build for Production

```bash
# Create production build
npm run build

# The build output will be in /dist folder
# You can serve it with:
npx serve dist
```

### 🔧 Development Guidelines

1. **Code Style**:
   - Use TypeScript strict mode
   - Follow ESLint rules
   - Use Prettier formatting

2. **Component Structure**:
   - One component per file
   - Use functional components with hooks
   - Prop types with TypeScript interfaces

3. **State Management**:
   - Local state: `useState`, `useReducer`
   - Global state: Context API
   - Server state: React Query

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### 🐛 Common Issues

1. **CORS Errors**: Ensure backend CORS settings allow your frontend URL
2. **WebSocket Issues**: Check WebSocket URL and backend WebSocket server
3. **Build Errors**: Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### 📄 License

MIT License - see LICENSE file for details

### 🆘 Support

- Issues: [GitHub Issues](https://github.com/DavFilsDev/zenithAI_react-typescript-frontend/issues)
- Documentation: Check the Wiki
- Email: miharisoadavidfils.com

### 🙏 Acknowledgments

- OpenAI for inspiration
- React and TypeScript communities
- Vite team for excellent tooling
- All contributors and users

---

**Author:** Fanampinirina Miharisoa David Fils RATIANDRAIBE 

---

## 🔗 Connecting Frontend & Backend

### Development Setup:
1. Start backend: `cd zenithAI_django-backend && docker-compose up`
2. Start frontend: `cd zenithAI_react-typescript-frontend && npm run dev`
3. Access frontend: http://localhost:5173
4. API running at: http://localhost:8000/api

### Environment Variables Example:
```env
# Backend (.env)
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Frontend (.env.local)
VITE_API_URL=http://localhost:8000/api
```
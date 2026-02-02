# AgentFlow Setup Guide

Welcome to AgentFlow! This guide will help you get your AI agent team up and running.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Cohere API key (for chatbot functionality)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory and add your Cohere API key:

```bash
# Copy the example file
cp .env.example .env.local
```

Then edit `.env.local` and add your Cohere API key:

```
COHERE_API_KEY=your_actual_api_key_here
```

**How to get a Cohere API Key:**
1. Go to [Cohere Dashboard](https://dashboard.cohere.ai/)
2. Sign up or log in to your account
3. Navigate to "API Keys" section
4. Create a new API key and copy it
5. Paste it in your `.env.local` file

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
myagentflow/
├── src/
│   ├── app/
│   │   ├── page.js              # Home page
│   │   ├── home/                # Home page components
│   │   ├── opsRoom/             # Operations room with task management
│   │   ├── agents/              # Agent management page
│   │   ├── tasks/               # Task tracking page
│   │   ├── orchestrator/        # Workflow orchestration
│   │   ├── memory/              # Knowledge management
│   │   ├── analytics/           # Performance metrics
│   │   ├── get-started/         # Getting started guide
│   │   ├── api/
│   │   │   ├── chat/           # Cohere chatbot API
│   │   │   ├── agents/         # Agent management API
│   │   │   ├── tasks/          # Task management API
│   │   │   └── workflows/      # Workflow management API
│   │   └── layout.js
│   └── components/
│       ├── Navbar.jsx
│       ├── Footer.jsx
│       ├── Chatbot.jsx         # Cohere-powered chatbot
│       └── ...
├── public/
│   └── Workers/               # Agent avatar images
└── package.json
```

## Available Pages

### 1. **Home** (`/`)
Landing page showcasing AgentFlow features and capabilities.

### 2. **OpsRoom** (`/opsRoom`)
Central command center where you can:
- Monitor agent activity
- View task assignments and progress
- Interact with the AI chatbot
- Manage workflow execution

### 3. **Agents** (`/agents`)
Manage your AI agents:
- View all available agents
- Check agent status and efficiency
- View task assignments
- Configure agent settings

### 4. **Tasks** (`/tasks`)
Track and manage tasks:
- Filter tasks by status (todo, in-progress, completed)
- Search and filter tasks
- Monitor task progress
- Update task status

### 5. **Orchestrator** (`/orchestrator`)
Manage agent workflows:
- Create and run workflows
- Monitor workflow progress
- Manage agent assignments
- Start, pause, or stop workflows

### 6. **Memory** (`/memory`)
Knowledge management:
- Store agent knowledge
- Manage context logs
- Share information between agents
- Search memory items

### 7. **Analytics** (`/analytics`)
Performance monitoring:
- View team metrics
- Track agent efficiency
- Monitor task completion rates
- Download reports

### 8. **Get Started** (`/get-started`)
Onboarding and FAQ:
- Step-by-step setup guide
- Feature overview
- Frequently asked questions

## API Endpoints

### Chat API
**Endpoint:** `POST /api/chat`

Request body:
```json
{
  "message": "Your question here",
  "conversationHistory": [
    { "role": "user", "content": "Previous message" },
    { "role": "assistant", "content": "Assistant response" }
  ]
}
```

Response:
```json
{
  "message": "Assistant response",
  "success": true
}
```

### Agents API
**Endpoints:** 
- `GET /api/agents` - Get all agents
- `GET /api/agents?id=1` - Get specific agent
- `POST /api/agents` - Create new agent
- `PUT /api/agents` - Update agent
- `DELETE /api/agents?id=1` - Delete agent

### Tasks API
**Endpoints:**
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks?status=todo` - Filter by status
- `POST /api/tasks` - Create new task
- `PUT /api/tasks` - Update task
- `DELETE /api/tasks?id=1` - Delete task

### Workflows API
**Endpoints:**
- `GET /api/workflows` - Get all workflows
- `POST /api/workflows` - Create new workflow
- `PUT /api/workflows` - Update workflow
- `DELETE /api/workflows?id=1` - Delete workflow

## Available Agents

1. **Planzilla** (Planner)
   - Role: Project planning and task breakdown
   - Specialty: Creating project roadmaps and task lists

2. **QueryLyn** (Researcher)
   - Role: Research and information gathering
   - Specialty: Finding and summarizing information

3. **CodeWizard** (Developer)
   - Role: Software development
   - Specialty: Writing and reviewing code

4. **BugBuster** (Tester)
   - Role: Quality assurance and testing
   - Specialty: Finding and documenting bugs

5. **DataBard** (Reporter)
   - Role: Reporting and documentation
   - Specialty: Creating reports and summaries

## Features

- **AI-Powered Chat**: Cohere AI integration for intelligent assistant
- **Multi-Agent System**: 5 specialized agents working together
- **Workflow Orchestration**: Automate complex processes
- **Real-Time Monitoring**: Track agent progress and performance
- **Knowledge Management**: Store and retrieve collective knowledge
- **Analytics Dashboard**: Comprehensive performance metrics
- **Responsive Design**: Works on desktop and mobile devices

## Troubleshooting

### Chatbot Not Working
1. Verify your Cohere API key is set in `.env.local`
2. Check the browser console for errors (F12)
3. Ensure the API route is accessible at `/api/chat`

### Agents Not Displaying
1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart the development server
3. Check for console errors

### Performance Issues
1. Disable browser extensions that might interfere
2. Clear browser cache and cookies
3. Use a different browser to test

## Building for Production

```bash
npm run build
npm start
```

The application will be optimized and ready for deployment.

## Deployment

AgentFlow can be deployed to:
- **Vercel** (Recommended): `vercel deploy`
- **Netlify**: Push to connected GitHub repo
- **Docker**: Create a Dockerfile and containerize
- **Traditional Servers**: Build and run with Node.js

## Next Steps

1. Configure your Cohere API key
2. Start the development server
3. Navigate to `http://localhost:3000`
4. Visit `/get-started` for a guided tour
5. Launch the OpsRoom to start managing your AI team

## Support

For issues and questions:
- Check the FAQ section in `/get-started`
- Review the API documentation above
- Check browser console for error messages

## License

This project is part of AgentFlow - Your Digital Team of AI Agents.

---

**Ready to build your AI team? Let's go!** 🚀

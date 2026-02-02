# AgentFlow: Professional Multi-Agent AI Orchestration Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248)](https://www.mongodb.com/)
[![Status: Production Ready](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)](https://github.com/)

## Overview

AgentFlow is a professional-grade multi-agent AI orchestration platform that leverages Cohere's advanced language models to intelligently decompose complex user requests into manageable tasks and automatically assign them to specialized AI agents. Built with a modern tech stack and enterprise-level architecture.

## Key Features

### Intelligent Task Orchestration
- Automatic query decomposition using Cohere AI
- Intelligent task breakdown into 5 specialized subtasks
- Context-aware agent assignment based on capabilities
- Real-time workflow status tracking

### Multi-Agent System
- 5 specialized AI agents: Planner, Developer, Researcher, Tester, Reporter
- Dynamic agent status management (active, idle, offline)
- Performance metrics and efficiency tracking
- Automatic workload distribution

### Professional Data Management
- **MongoDB Integration**: Scalable NoSQL database
- **Mongoose Models**: Type-safe schema definitions
- **Database Indexing**: Optimized query performance
- **Transaction Support**: ACID compliance

### Enterprise-Grade Architecture
- **Service Layer Pattern**: Separation of concerns
- **Error Handling**: Comprehensive error management with Winston logging
- **Input Validation**: Zod schema validation on all endpoints
- **Security**: JWT-ready authentication framework

### Real-Time Features
- Live task status updates (3-5 second refresh)
- Agent performance metrics
- Workflow progress tracking
- Conversation history with metadata

### Knowledge Management
- Persistent memory/knowledge base
- Context-aware learning
- Document categorization (Technical, Documentation, Learning)
- Access control (Private, Shared, Public)

## Technology Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Next.js 15.5.9 with App Router
- **Database**: MongoDB 6.0+ with Mongoose ODM
- **AI Integration**: Cohere API (command-r-plus model)
- **Logging**: Winston
- **Validation**: Zod
- **Security**: bcryptjs, JWT

### Frontend
- **Framework**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Routing**: Next.js Client-side Navigation

### DevOps
- **Package Manager**: npm
- **Version Control**: Git/GitHub
- **Deployment**: Vercel, Docker, or Traditional VPS
- **Monitoring**: Winston Logs, MongoDB Metrics

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- Cohere API Key

### Installation

1. **Clone and Setup**
```bash
git clone https://github.com/yourusername/agentflow.git
cd myagentflow
npm install
```

2. **Configure Environment**
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

3. **Setup MongoDB**

**Local MongoDB:**
```bash
# macOS with Homebrew
brew install mongodb-community
brew services start mongodb-community

# Linux (Ubuntu)
sudo apt install mongodb-server
sudo systemctl start mongod
```

**MongoDB Atlas (Cloud):**
- Create account at https://www.mongodb.com/cloud/atlas
- Create cluster and user
- Copy connection string to `.env.local`

4. **Start Development Server**
```bash
npm run dev
```

5. **Access Application**
- Open http://localhost:3000
- Navigate to OpsRoom at http://localhost:3000/opsRoom
- Try: "Build a landing page" to see orchestration in action

## Project Structure

```
myagentflow/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── chat/         # Cohere integration
│   │   │   ├── tasks/        # Task management
│   │   │   ├── agents/       # Agent management
│   │   │   ├── memory/       # Knowledge base
│   │   │   ├── analytics/    # Metrics
│   │   │   └── orchestrate/  # Task orchestration
│   │   ├── layout.js         # Root layout
│   │   ├── page.js           # Home page
│   │   ├── opsRoom/          # Operations center
│   │   ├── agents/           # Agents dashboard
│   │   ├── tasks/            # Tasks dashboard
│   │   ├── memory/           # Memory/KB page
│   │   ├── analytics/        # Analytics page
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Chatbot.jsx       # AI Chatbot UI
│   │   └── ...
│   ├── lib/
│   │   ├── mongodb.js        # MongoDB connection
│   │   ├── orchestrator.js   # Task decomposition
│   │   ├── logger.js         # Winston logging
│   │   ├── errors.js         # Error classes
│   │   └── validators.js     # Zod schemas
│   ├── models/               # Mongoose schemas
│   │   ├── User.js
│   │   ├── Agent.js
│   │   ├── Task.js
│   │   ├── Conversation.js
│   │   ├── Memory.js
│   │   └── Workflow.js
│   └── services/             # Business logic
│       ├── taskService.js
│       ├── agentService.js
│       ├── conversationService.js
│       └── ...
├── public/                   # Static assets
├── logs/                     # Application logs
├── .env.local               # Environment variables (local only)
├── package.json
├── next.config.mjs
└── tailwind.config.ts
```

## API Endpoints

### Tasks Management
- `GET /api/tasks` - List tasks with filters
- `POST /api/tasks` - Create task
- `PUT /api/tasks` - Update task
- `DELETE /api/tasks` - Delete task

### Agents Management
- `GET /api/agents` - List agents with metrics
- `POST /api/agents` - Create agent
- `PUT /api/agents` - Update agent
- `DELETE /api/agents` - Delete agent

### Chat & Orchestration
- `POST /api/chat` - Send message (Cohere AI + auto-orchestration)
- `POST /api/orchestrate` - Trigger task decomposition

### Other Resources
- `GET /api/memory` - Knowledge base search
- `POST /api/memory` - Add memory entry
- `GET /api/analytics` - System metrics

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed endpoint specifications.

## Database Models

### User
- User accounts with secure password storage
- Role-based access control (admin, manager, user)
- Preferences (theme, notifications)

### Agent
- AI agent definitions with capabilities
- Status tracking (active, idle, offline)
- Performance metrics (tasks, efficiency, activity)

### Task
- Task assignments with priority levels
- Status tracking (todo, in-progress, completed, blocked)
- Progress tracking and subtasks
- Comments and attachments

### Conversation
- Chat history with AI
- Message metadata and token usage
- Related tasks tracking
- Archive functionality

### Memory
- Knowledge base entries
- Type categorization (knowledge, context, learning, decision)
- Access control (private, shared, public)
- Full-text searchable

### Workflow
- Orchestration execution records
- Task decomposition logs
- Agent assignments
- Performance metrics

## Configuration

### Environment Variables

```bash
# Application
NODE_ENV=development                    # development or production
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/agentflow
# For MongoDB Atlas: mongodb+srv://user:pass@cluster.mongodb.net/agentflow

# AI
COHERE_API_KEY=your-api-key-here

# Security
JWT_SECRET=generate-with-openssl
SESSION_SECRET=generate-with-openssl

# Logging
LOG_LEVEL=info
```

See [MONGODB_SETUP.md](./MONGODB_SETUP.md) for detailed MongoDB configuration.

## Monitoring and Logging

### Log Files
- **Location**: `/logs`
- **Error Log**: `error.log` (500+ errors)
- **Combined Log**: `combined.log` (all logs)
- **Rotation**: 5MB per file, 5-10 files retained

### Log Format
```json
{
  "timestamp": "2024-01-20 10:30:45",
  "level": "info",
  "message": "Task created",
  "service": "agentflow-api",
  "taskId": "65abc...",
  "metadata": {}
}
```

## Security

### Authentication (Future)
- JWT-based authentication
- Secure password hashing with bcrypt
- Session management
- Role-based access control

### Data Security
- Input validation with Zod
- SQL injection prevention (using MongoDB)
- CORS configuration
- Rate limiting (production)

### Environment Security
- Never commit `.env.local`
- Rotate secrets regularly
- Use secure secret management in production

## Performance

### Optimization Strategies
- MongoDB indexing on frequently queried fields
- Lean queries for read operations
- Connection pooling
- Async operations with proper error handling

### Scalability
- Stateless API design
- Horizontal scaling ready
- Database sharding support
- Caching layer ready (Redis)

## Deployment

### Quick Deploy to Vercel

```bash
vercel login
vercel --prod
```

### Docker Deployment

```bash
docker build -t agentflow .
docker run -p 3000:3000 \
  -e MONGODB_URI=your-uri \
  -e COHERE_API_KEY=your-key \
  agentflow
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment guides.

## Testing

### Test API Endpoints

```bash
# Create task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "priority": "high",
    "assignedAgent": "CodeWizard"
  }'

# Get agents
curl http://localhost:3000/api/agents

# Send chat message
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Build a website"}'
```

## Troubleshooting

### MongoDB Connection Issues
- Verify `MONGODB_URI` in `.env.local`
- Check MongoDB is running: `mongosh`
- For Atlas: verify IP whitelist and credentials

### Cohere API Errors
- Verify API key is valid
- Check Cohere quota and billing
- Review rate limiting

### Application Won't Start
- Check Node.js version: `node --version` (requires 18+)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check logs: `cat logs/error.log`

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

MIT License - see [LICENSE](./LICENSE) file for details

## Roadmap

### Version 2.0 (Q2 2024)
- [ ] User authentication with JWT
- [ ] Advanced filtering and pagination
- [ ] Workflow templates
- [ ] Real-time WebSocket updates
- [ ] Advanced analytics dashboard

### Version 3.0 (Q4 2024)
- [ ] Multi-language support
- [ ] Custom agent creation UI
- [ ] Integration marketplace
- [ ] Advanced security features
- [ ] Enterprise features (SSO, audit logs)

## Support

### Documentation
- [API Documentation](./API_DOCUMENTATION.md)
- [MongoDB Setup](./MONGODB_SETUP.md)
- [Deployment Guide](./DEPLOYMENT.md)

### Getting Help
- GitHub Issues: [Report bugs](https://github.com/yourusername/agentflow/issues)
- Discussions: [Q&A and ideas](https://github.com/yourusername/agentflow/discussions)
- Email: support@agentflow.io

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [Cohere](https://cohere.ai/)
- Database by [MongoDB](https://www.mongodb.com/)
- UI components by [Lucide React](https://lucide.dev/)

## Author

[Your Name/Company]
- GitHub: [@yourusername](https://github.com/yourusername)
- Website: https://agentflow.io

---

**Made with ❤️ for the AI community**

# AgentFlow - Quick Start Guide

Get your AI agent team running in 5 minutes!

## Step 1: Set Up API Key (2 minutes)

1. Get your Cohere API key from [dashboard.cohere.ai](https://dashboard.cohere.ai/api-keys)
2. Create a `.env.local` file in the project root:
   ```
   COHERE_API_KEY=your_api_key_here
   ```

## Step 2: Install & Run (3 minutes)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` - you're done!

---

## What You Get

### 5 AI Agents
- **Planzilla** - Project planner
- **CodeWizard** - Developer
- **QueryLyn** - Researcher
- **BugBuster** - QA tester
- **DataBard** - Reporter

### 8 Pages
- **Home** - Overview
- **OpsRoom** - Command center with chatbot
- **Agents** - Team management
- **Tasks** - Task tracking
- **Orchestrator** - Workflow automation
- **Memory** - Knowledge base
- **Analytics** - Performance metrics
- **Get Started** - Learning guide

### 4 API Endpoints
- `/api/chat` - Cohere AI chatbot
- `/api/agents` - Agent management
- `/api/tasks` - Task management
- `/api/workflows` - Workflow automation

---

## Quick Navigation

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Landing page |
| OpsRoom | `/opsRoom` | Main control center |
| Agents | `/agents` | Manage AI agents |
| Tasks | `/tasks` | Track tasks |
| Orchestrator | `/orchestrator` | Automate workflows |
| Memory | `/memory` | Knowledge storage |
| Analytics | `/analytics` | View metrics |
| Get Started | `/get-started` | Onboarding |

---

## Using the Chatbot

Go to `/opsRoom` and you'll see the Cohere AI chatbot on the left side. Ask it anything!

### Example Prompts:
- "What can you do?"
- "How do I create a new task?"
- "Show me agent performance insights"
- "Help me plan a project"

---

## Using the API

### Chat Example
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello!","conversationHistory":[]}'
```

### Get Agents
```bash
curl http://localhost:3000/api/agents
```

### Create Task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title":"My Task",
    "priority":"high",
    "assignedTo":"CodeWizard",
    "dueDate":"2024-02-01"
  }'
```

---

## Troubleshooting

**Chatbot not working?**
- Check your Cohere API key in `.env.local`
- Restart the development server: `npm run dev`
- Clear browser cache (Ctrl+Shift+Delete)

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Missing dependencies?**
```bash
npm install
```

---

## Next Steps

1. Explore the OpsRoom dashboard
2. Check out the Analytics page for metrics
3. Read the full setup guide: [SETUP.md](./SETUP.md)
4. See API docs: [API_REFERENCE.md](./API_REFERENCE.md)
5. Deploy to production

---

## Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms
- **Netlify**: Push to GitHub and connect
- **Railway**: `railway init`
- **Docker**: Build and deploy container

---

## Key Features

✅ AI-powered chatbot (Cohere)  
✅ 5 specialized agents  
✅ Real-time task management  
✅ Workflow automation  
✅ Performance analytics  
✅ Knowledge management  
✅ Full REST API  
✅ Responsive design  

---

## File Structure

```
myagentflow/
├── src/app/
│   ├── page.js              ← Home page
│   ├── opsRoom/page.jsx     ← Command center
│   ├── agents/page.jsx      ← Agent management
│   ├── tasks/page.jsx       ← Task tracking
│   └── api/
│       ├── chat/route.js    ← Cohere chatbot
│       ├── agents/route.js  ← Agent API
│       ├── tasks/route.js   ← Task API
│       └── workflows/route.js ← Workflow API
└── public/Workers/          ← Agent images
```

---

## Resources

- [Cohere AI Docs](https://docs.cohere.ai/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Run linter

# Help
npm --help              # Show npm help
npm list                # List installed packages
npm outdated            # Check for updates
```

---

## Tips & Tricks

1. **Use the chatbot for help** - It can explain features
2. **Check analytics** - Monitor your team's performance
3. **Organize with tags** - Use memory for knowledge sharing
4. **Automate workflows** - Set up recurring automations
5. **Monitor metrics** - Track efficiency and completion rates

---

## Need Help?

1. Check [Get Started](http://localhost:3000/get-started) page (FAQ)
2. Review [API_REFERENCE.md](./API_REFERENCE.md)
3. Check browser console for errors (F12)
4. Verify `.env.local` has your API key

---

**Ready? Let's build something amazing!** 🚀

Start at: `http://localhost:3000`

# AgentFlow Quick Reference

## Get Started in 3 Steps

```bash
# 1. Set your Cohere API key
echo "COHERE_API_KEY=your_key_here" > .env.local

# 2. Install dependencies
npm install

# 3. Start the server
npm run dev
```

Visit: `http://localhost:3000/opsRoom`

## The Magic Workflow

1. **Open OpsRoom** → `/opsRoom`
2. **Type in Chatbot** → "Build a landing page"
3. **Watch it happen:**
   - Chatbot responds with Cohere AI
   - System creates 5 tasks automatically
   - Tasks assigned to agents (Planner → Developer → Tester → Reporter)
   - Tasks appear in center panel
   - Live updates every 3 seconds

## Action Keywords (Triggers Orchestration)

These words trigger automatic task creation:
```
✓ build     ✓ create    ✓ develop   ✓ design
✓ implement ✓ code      ✓ test      ✓ deploy
✓ research  ✓ analyze   ✓ plan      ✓ verify
```

Example: "Build a login system" ✓ (triggers)
Example: "Hello, how are you?" ✗ (no trigger)

## Pages Reference

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Landing page |
| OpsRoom | `/opsRoom` | **Main control center** |
| Tasks | `/tasks` | View/filter tasks |
| Agents | `/agents` | Agent performance |
| Memory | `/memory` | Knowledge base |
| Analytics | `/analytics` | Metrics dashboard |
| Orchestrator | `/orchestrator` | Workflow monitor |
| Get Started | `/get-started` | Onboarding |

## Agent Roles

```
Planzilla (🟠 Orange)   → Planning & structure
QueryLyn  (🟣 Purple)   → Research & analysis  
CodeWizard (🔵 Blue)   → Development & coding
BugBuster (🟢 Green)   → Testing & QA
DataBard  (🟡 Yellow)  → Reporting & summary
```

## API Endpoints

```javascript
// Chat & Orchestration
POST   /api/chat              // Send message, auto-create tasks
POST   /api/orchestrate       // Manually decompose tasks

// Task Management
GET    /api/tasks             // Get all tasks
GET    /api/tasks?status=todo // Filter by status
GET    /api/tasks?assignedTo=CodeWizard
POST   /api/tasks             // Create task
PUT    /api/tasks             // Update task

// Agents
GET    /api/agents            // Get all agents with stats

// Knowledge
GET    /api/memory            // Get memory entries
GET    /api/memory?query=landing
POST   /api/memory            // Save memory

// Metrics
GET    /api/analytics         // Get dashboard data
```

## Data Stored In

Location: `/data/` folder (JSON files)
- `tasks.json` - All tasks
- `agents.json` - Agent definitions
- `memory.json` - Knowledge base
- `analytics.json` - Metrics
- `conversations.json` - Chat history
- `workflows.json` - Orchestration records

**All data persists** - Page refresh = data stays!

## Common Tasks

### How to see all tasks?
```
Go to /tasks page
Or: GET /api/tasks
```

### How to see agent stats?
```
Go to /agents page
Or: GET /api/agents
```

### How to view analytics?
```
Go to /analytics page
Or: GET /api/analytics
```

### How to search memory?
```
Go to /memory page
Or: GET /api/memory?query=landing
```

### How to create a task manually?
```javascript
POST /api/tasks
{
  "title": "My task",
  "description": "Details",
  "assignedTo": "CodeWizard",
  "priority": "high"
}
```

## Real-Time Updates

- Pages automatically refresh every **3-5 seconds**
- No manual refresh needed
- All data live and current
- Changes from any page visible everywhere

## File Structure (Key Files)

```
src/
├── lib/
│   ├── storage.js           ← Data persistence
│   └── orchestrator.js      ← Task decomposition
├── app/
│   ├── opsRoom/page.jsx     ← Main interface
│   ├── tasks/page.jsx
│   ├── agents/page.jsx
│   ├── api/
│   │   ├── chat/route.js    ← Cohere + auto-trigger
│   │   ├── orchestrate/route.js
│   │   ├── tasks/route.js
│   │   └── ...
│   └── ...
data/                         ← JSON storage
├── tasks.json
├── agents.json
└── ...
```

## Troubleshooting Quick Fixes

| Problem | Fix |
|---------|-----|
| "No tasks appearing" | Make sure message has action keywords |
| "Cohere API error" | Check COHERE_API_KEY in .env.local |
| "Tasks not persisting" | Verify /data folder exists |
| "Page not updating" | Manually refresh browser (F5) |
| "Server won't start" | Run `npm install` first |

## Keyboard Shortcuts

- `Ctrl+Shift+J` - Open browser console (debug)
- `F5` - Refresh page
- `Ctrl+K` - Quick search (browser feature)

## Environment Variables

**Required:**
```
COHERE_API_KEY=your_key_from_https://dashboard.cohere.ai/api-keys
```

**Optional:**
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Set in `.env.local` file.

## Example Queries to Try

```
"Build a website for a fitness company"
"Create a REST API with authentication"
"Design a mobile app interface"
"Develop a data pipeline for CSV files"
"Build and test a chat application"
"Research cloud deployment options"
"Create a blog platform with comments"
"Build a real-time dashboard"
```

## Important Notes

- ⚠️ JSON storage is for development. Use a database for production.
- ⚠️ Make sure Cohere API key is valid and has quota
- ⚠️ `/data` folder must be writable by the application
- ✓ All data persists automatically
- ✓ Changes sync across all pages in real-time
- ✓ No database setup needed - works out of the box

## Next Steps After Testing

1. Go to `/opsRoom` and test the chatbot
2. Visit `/tasks` to see created tasks
3. Check `/agents` for live statistics
4. View `/memory` to see stored knowledge
5. Check `/analytics` for metrics
6. Explore `/orchestrator` for workflow details

## For Production

Replace JSON storage:
```javascript
// Use MongoDB, PostgreSQL, or your favorite database
// Modify src/lib/storage.js to use database instead of JSON
```

Add authentication:
```javascript
// Integrate Auth0, NextAuth, or your auth provider
```

## Support

- Docs: See `FULL_IMPLEMENTATION_GUIDE.md`
- API: See `API_REFERENCE.md`
- Architecture: See `ARCHITECTURE.md`
- Cohere: https://docs.cohere.com/

---

**That's it! You're ready to go. Start in OpsRoom and watch the magic happen.**

# AgentFlow - Complete Working Implementation Guide

## Project Overview

AgentFlow is a fully functional multi-agent orchestration platform where:
- Users ask the chatbot to build/create/develop something
- The Orchestrator breaks down the request into tasks
- Tasks are assigned to specialized AI agents
- Agents execute their tasks with real data persistence
- All operations are tracked in real-time

## Architecture

```
User Input (Chatbot)
    ↓
Cohere API (Natural Language)
    ↓
Orchestrator API (/api/orchestrate)
    ↓
Task Decomposition & Agent Assignment
    ↓
Real-Time Task Tracking (OpsRoom, Tasks Page)
    ↓
Memory System (Context Storage)
    ↓
Analytics & Reporting
```

## Quick Start (5 Minutes)

### 1. Setup Environment Variables

Create or update `.env.local` in the project root:

```bash
# Get your Cohere API key from: https://dashboard.cohere.ai/api-keys
COHERE_API_KEY=your_cohere_api_key_here
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

### 4. Test the System

Go to **OpsRoom** (`/opsRoom`) and:
1. Open the Chatbot in the left panel
2. Type: "Build a landing page for AgentFlow"
3. Watch the orchestration happen:
   - Chatbot responds
   - Tasks are automatically created
   - Tasks appear in the center panel
   - Agents are assigned automatically

## How It Works - Step by Step

### Step 1: User Input (OpsRoom Chatbot)

User types a request like: **"Build a landing page for AgentFlow and test it"**

### Step 2: Cohere API Processing

The chatbot uses Cohere to understand the request and provide helpful context.

**Endpoint**: `POST /api/chat`
```javascript
{
  "message": "Build a landing page for AgentFlow and test it",
  "conversationHistory": [...]
}
```

### Step 3: Automatic Orchestration Trigger

If the message contains action keywords (build, create, develop, test, etc.), the system automatically triggers the Orchestrator.

**Endpoint**: `POST /api/orchestrate`

### Step 4: Task Decomposition

The Orchestrator analyzes the query and creates tasks:

```javascript
// Example decomposition for "Build a landing page"
[
  {
    "title": "Plan landing page structure",
    "description": "Create planning document",
    "agent": "Planner",      // Assigned to Planzilla
    "priority": "high",
    "order": 1
  },
  {
    "title": "Research similar products",
    "description": "Gather research",
    "agent": "Researcher",    // Assigned to QueryLyn
    "priority": "high",
    "order": 2
  },
  {
    "title": "Development: Build landing page",
    "description": "Implement the solution",
    "agent": "Developer",     // Assigned to CodeWizard
    "priority": "high",
    "order": 3
  },
  {
    "title": "Testing and QA",
    "description": "Test the implementation",
    "agent": "Tester",        // Assigned to BugBuster
    "priority": "medium",
    "order": 4
  },
  {
    "title": "Final Report",
    "description": "Summarize results",
    "agent": "Reporter",      // Assigned to DataBard
    "priority": "medium",
    "order": 5
  }
]
```

### Step 5: Real-Time Task Display

Tasks appear in **OpsRoom** organized by status:
- **To Do** - Newly created tasks
- **In Progress** - Tasks being worked on
- **Completed** - Finished tasks

### Step 6: Agent Assignments

Each task is automatically assigned to the appropriate agent based on role.

## API Endpoints

### Chat & Orchestration
- `POST /api/chat` - Send messages to Cohere, triggers orchestration if needed
- `POST /api/orchestrate` - Manually trigger task decomposition
- `GET /api/orchestrate` - View orchestration documentation

### Tasks Management
- `GET /api/tasks` - Fetch all tasks (supports filters: ?status=todo, ?assignedTo=CodeWizard)
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks` - Update a task (requires task ID)

### Agents
- `GET /api/agents` - Get all agents with real-time stats
- Each agent shows: total tasks, completed tasks, efficiency percentage

### Memory/Knowledge Base
- `GET /api/memory` - Fetch memory entries (supports ?query=search_term)
- `POST /api/memory` - Save a memory entry
- Automatically populated from user queries and task decompositions

### Analytics
- `GET /api/analytics` - Get comprehensive analytics dashboard data
- Includes: completion rates, agent performance, task distribution

## Pages & Features

### 1. Home Page (`/`)
- Landing page with product overview
- Links to all major features

### 2. OpsRoom (`/opsRoom`) - MAIN CONTROL CENTER
- **Left Panel**: Chatbot for user input
  - Type requests here
  - Automatic orchestration triggers
  - Chat history
  - Cohere AI powered responses

- **Top Bar**: Active agents display
  - Click agents to filter tasks
  - See agent statistics
  - Real-time agent status

- **Main Panel**: Task board
  - To Do | In Progress | Completed columns
  - Drag-and-drop tasks (visual design ready)
  - Live task updates every 3 seconds

### 3. Tasks Page (`/tasks`)
- View all tasks in a list
- Filter by status (All, To Do, In Progress, Completed)
- Search by title or assignee
- See priority levels and progress

### 4. Agents Page (`/agents`)
- View all AI agents
- See statistics: total tasks, completed, efficiency %
- Agent status (active/idle)
- Real-time performance metrics

### 5. Orchestrator Page (`/orchestrator`)
- View active workflows
- See task decomposition results
- Monitor orchestration process

### 6. Memory Page (`/memory`)
- Knowledge base of past queries and learnings
- Search memory by keywords
- Filter by tags
- Auto-populated from orchestration

### 7. Analytics Page (`/analytics`)
- Real-time performance dashboard
- Completion rates
- Agent efficiency metrics
- Task distribution charts
- Performance trends

## Data Storage

All data is stored in JSON files in `/data` directory:
- `tasks.json` - Task records
- `agents.json` - Agent data
- `memory.json` - Knowledge base entries
- `conversations.json` - Chat history
- `analytics.json` - Performance metrics
- `workflows.json` - Orchestration workflows

### Persistent State Management
The storage layer (`src/lib/storage.js`) handles:
- Creating/reading/updating task data
- Maintaining agent information
- Storing memory entries
- Tracking analytics
- Preserving all changes to disk

## Agent Roles Explained

### Planzilla (Planner)
- Role: Creates planning documents
- Triggers: Keywords like "plan", "design", "structure"
- Output: Planning documents, task breakdowns

### QueryLyn (Researcher)
- Role: Research and analysis
- Triggers: Keywords like "research", "analyze", "investigate"
- Output: Research reports, findings

### CodeWizard (Developer)
- Role: Implementation and coding
- Triggers: Keywords like "build", "create", "develop", "code"
- Output: Code, implementations, features

### BugBuster (Tester)
- Role: Quality assurance
- Triggers: Keywords like "test", "quality", "verify"
- Output: Test reports, bug findings

### DataBard (Reporter)
- Role: Final summarization and reporting
- Always runs last to aggregate results
- Output: Executive summary, final reports

## Keyword Triggers for Orchestration

The system automatically triggers when your message contains:
- **Action Keywords**: build, create, develop, design, implement, code, test, deploy, research, analyze, plan

Example triggers:
- "Build a login page" ✓
- "Create an API" ✓
- "Design the database schema" ✓
- "Test the authentication" ✓
- "Research best practices" ✓
- "Hello, how are you?" ✗ (no action keyword)

## Example Workflows

### Workflow 1: Build a Website
User: "Build a professional website for my e-commerce business"

Decomposition:
1. Planner - Creates website structure plan
2. Researcher - Research e-commerce best practices
3. Developer - Build website code
4. Tester - QA testing
5. Reporter - Create final documentation

### Workflow 2: Code Review
User: "Review and improve this authentication code"

Decomposition:
1. Researcher - Analyze current implementation
2. Developer - Create improved version
3. Tester - Validate improvements
4. Reporter - Generate report

### Workflow 3: System Design
User: "Design a scalable database architecture"

Decomposition:
1. Planner - Create architecture document
2. Researcher - Research scalability patterns
3. Developer - Code schema implementation
4. Reporter - Final technical specification

## Real-Time Updates

All pages auto-refresh every 3-5 seconds to show:
- New tasks as they're created
- Task status changes
- Agent activity updates
- Memory entries
- Analytics changes

## Troubleshooting

### Cohere API Not Working
- Check if `COHERE_API_KEY` is set in `.env.local`
- Verify the key is valid: https://dashboard.cohere.ai/api-keys
- Restart the dev server after setting env vars

### No Tasks Being Created
- Make sure your message contains action keywords
- Check browser console for errors
- Verify `/api/orchestrate` endpoint is accessible

### Tasks Not Showing
- Click refresh button in OpsRoom header
- Check if data directory exists: `/myagentflow/data`
- Verify file permissions in `/data` directory

### Memory Not Saving
- Check if `/data/memory.json` is readable/writable
- Ensure proper file permissions
- Check browser console for errors

## Performance Notes

- System polls for updates every 3-5 seconds (configurable)
- Data stored as JSON files (suitable for development)
- For production, integrate with database (MongoDB, PostgreSQL, etc.)
- Memory usage increases with task/memory volume

## Next Steps for Production

1. **Replace JSON Storage**: Integrate MongoDB or PostgreSQL
2. **Add Authentication**: Secure the platform with Auth0 or NextAuth
3. **Implement Database Models**: Use Prisma or TypeORM for ORM
4. **Add Real Agent Execution**: Connect to actual AI models
5. **Deploy**: Use Vercel, AWS, or your preferred platform
6. **Scale**: Add load balancing, caching, and CDN

## File Structure

```
/myagentflow/
├── src/
│   ├── app/
│   │   ├── page.js                 (Home)
│   │   ├── home/
│   │   ├── opsRoom/page.jsx        (Main control center)
│   │   ├── tasks/page.jsx
│   │   ├── agents/page.jsx
│   │   ├── orchestrator/page.jsx
│   │   ├── memory/page.jsx
│   │   ├── analytics/page.jsx
│   │   ├── get-started/page.jsx
│   │   ├── layout.js
│   │   ├── globals.css
│   │   ├── api/
│   │   │   ├── chat/route.js       (Cohere + Orchestration)
│   │   │   ├── orchestrate/route.js (Task decomposition)
│   │   │   ├── tasks/route.js      (Task CRUD)
│   │   │   ├── agents/route.js     (Agent stats)
│   │   │   ├── memory/route.js     (Memory management)
│   │   │   └── analytics/route.js  (Metrics)
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Chatbot.jsx             (Main chatbot interface)
│   │   └── home/
│   ├── lib/
│   │   ├── storage.js              (Data persistence layer)
│   │   └── orchestrator.js         (Task decomposition logic)
├── data/                            (JSON data storage)
│   ├── tasks.json
│   ├── agents.json
│   ├── memory.json
│   ├── conversations.json
│   ├── workflows.json
│   └── analytics.json
├── package.json
├── .env.example
└── .env.local                       (Your local config)
```

## Success Indicators

Your implementation is working when:
1. ✓ Server starts without errors: `npm run dev`
2. ✓ Chatbot loads in OpsRoom
3. ✓ Type "Build something" triggers task creation
4. ✓ Tasks appear in To Do column
5. ✓ Agents page shows live statistics
6. ✓ Analytics updates in real-time
7. ✓ Memory stores past queries
8. ✓ Data persists across page refreshes

## Additional Resources

- Cohere API: https://docs.cohere.com/
- Next.js Docs: https://nextjs.org/docs
- React: https://react.dev

---

**Your AgentFlow system is now fully functional and ready to use!**

Start by testing in OpsRoom: Ask the chatbot to "Build a landing page" and watch the orchestration happen.

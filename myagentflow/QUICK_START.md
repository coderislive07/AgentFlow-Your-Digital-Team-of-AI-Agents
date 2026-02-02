# AgentFlow Quick Start Checklist

## Get Running in 10 Minutes

### Step 1: Prerequisites Check (2 min)
- [ ] Node.js 18+ installed: `node --version`
- [ ] npm installed: `npm --version`
- [ ] Cohere API key ready (you already have this)
- [ ] MongoDB available (local or Atlas)

### Step 2: Install & Setup (3 min)

```bash
# Install dependencies
npm install

# If you get any errors, try:
# rm -rf node_modules package-lock.json
# npm install --legacy-peer-deps
```

- [ ] Dependencies installed successfully
- [ ] No critical errors in console

### Step 3: Configure Database (2 min)

#### Option A: Local MongoDB
```bash
# macOS (Homebrew)
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt install mongodb-server
sudo systemctl start mongod

# Windows
# Download from: https://www.mongodb.com/try/download/community
# Run installer, MongoDB should start automatically
```

Verify it's running:
```bash
mongosh
# If you see the prompt, you're good!
# Type: exit
```

- [ ] MongoDB is running locally

#### Option B: MongoDB Atlas (Cloud)
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster (free tier)
4. Get connection string
5. Update `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agentflow
   ```

- [ ] MongoDB connection string configured

### Step 4: Environment Setup (1 min)

Your `.env.local` should have:

```bash
# Check current settings
cat .env.local
```

Required variables:
- [x] `COHERE_API_KEY` - Already set
- [ ] `MONGODB_URI` - Set to your database
- [ ] `NODE_ENV` - Should be "development"

Run once more if needed:
```bash
npm install
```

- [ ] All environment variables set

### Step 5: Start the Server (2 min)

```bash
npm run dev
```

Expected output:
```
> next dev
  ▲ Next.js 15.5.9
  - Local:        http://localhost:3000
```

- [ ] Server started without errors
- [ ] Terminal shows "Local: http://localhost:3000"

### Step 6: Test the Application (1 min)

In a new terminal window:

```bash
# Option 1: View homepage
curl http://localhost:3000

# Option 2: Open in browser
# Go to: http://localhost:3000
```

- [ ] HomePage loads successfully

### Step 7: Access OpsRoom (1 min)

Open browser and navigate to:
```
http://localhost:3000/opsRoom
```

You should see:
- Chatbot on the left
- Task panel in the middle
- Agent panel on the right
- Real-time updates

- [ ] OpsRoom dashboard loads
- [ ] Chatbot is visible

### Step 8: Test the AI Orchestration (2 min)

In the chatbot on the left, type:
```
"Build a landing page for my startup"
```

Expected:
1. AI responds with a plan
2. 5 tasks appear in the center panel
3. 5 agents assigned on the right
4. Green notification: "Created 5 tasks assigned to 5 agents"

- [ ] Chatbot responds
- [ ] Tasks created automatically
- [ ] Agents assigned

## Troubleshooting During Setup

### Issue: MongoDB Connection Failed
```bash
# Check if MongoDB is running
mongosh

# If error, start MongoDB:
# macOS: brew services start mongodb-community
# Ubuntu: sudo systemctl start mongod
# Windows: MongoDB should start on boot
```

### Issue: Port 3000 Already in Use
```bash
# Use different port
npm run dev -- -p 3001

# Then visit: http://localhost:3001
```

### Issue: Dependencies Won't Install
```bash
# Clear cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Cohere API Error
- Verify your API key in `.env.local`
- Check you haven't exceeded Cohere quota
- Test with: `echo $COHERE_API_KEY`

### Issue: "Cannot find module" errors
```bash
# Make sure you're in the right directory
cd /path/to/myagentflow

# Reinstall
npm install

# Try again
npm run dev
```

## Testing the API Directly

### Quick API Tests

```bash
# Terminal 1: Keep server running
npm run dev

# Terminal 2: Test endpoints

# Get all agents
curl http://localhost:3000/api/agents

# Get all tasks
curl http://localhost:3000/api/tasks

# Send chat message
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Create a task to build a login page"}'
```

## Exploring the Project

### Key Files to Review

1. **Start here**: `src/app/opsRoom/page.js` - Main dashboard
2. **Chat logic**: `src/app/api/chat/route.js` - Cohere integration
3. **Task management**: `src/services/taskService.js` - Task operations
4. **Agent management**: `src/services/agentService.js` - Agent operations
5. **Database setup**: `src/lib/mongodb.js` - DB connection

### Viewing Logs

```bash
# Real-time logs
tail -f logs/combined.log

# Error logs only
tail -f logs/error.log

# Search for specific errors
grep "error" logs/combined.log
```

### Database Exploration

```bash
# Connect to MongoDB
mongosh

# Switch to agentflow database
use agentflow

# See all collections
show collections

# View some data
db.agents.find().pretty()
db.tasks.find().pretty()

# Count records
db.tasks.countDocuments()

# Exit
exit
```

## Next Steps After Getting Started

### Immediate (Within 1 hour)
1. Read: `README_PROFESSIONAL.md`
2. Test: Different chatbot commands
3. Explore: Each dashboard page

### Short-term (Within 1 day)
1. Review: `API_DOCUMENTATION.md`
2. Test: API endpoints with cURL
3. Check: Database structure

### Before Production (Before deploying)
1. Review: `DEPLOYMENT.md`
2. Setup: MongoDB Atlas or production database
3. Configure: Production environment variables
4. Enable: SSL/HTTPS
5. Setup: Error monitoring (Sentry)

## Documentation Reference

- **Getting Started**: This file
- **Full Overview**: `README_PROFESSIONAL.md`
- **API Endpoints**: `API_DOCUMENTATION.md`
- **Database Setup**: `MONGODB_SETUP.md`
- **Deployment**: `DEPLOYMENT.md`
- **Developer Guide**: `DEVELOPER_GUIDE.md`
- **All Changes**: `CHANGES.md`

## Quick Command Reference

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Lint code

# Database
mongosh                  # Connect to MongoDB
# View logs
tail -f logs/combined.log
tail -f logs/error.log

# Stop the server
# Press: Ctrl + C
```

## Success Checklist

When you see all of these, you're good to go:

- [ ] `npm install` completed without critical errors
- [ ] MongoDB is running
- [ ] `npm run dev` shows "Local: http://localhost:3000"
- [ ] Browser opens to homepage successfully
- [ ] OpsRoom dashboard loads at http://localhost:3000/opsRoom
- [ ] Chatbot is visible and responsive
- [ ] Can type in chatbot
- [ ] AI responds to messages
- [ ] Tasks appear when triggering orchestration
- [ ] Agents are assigned to tasks
- [ ] Logs are being written to `/logs`

## Common First Test Commands

```bash
# Terminal 1: Start server
npm run dev

# Terminal 2: Test these one by one

# 1. Check API is running
curl http://localhost:3000/api/agents

# 2. Check database connection
curl http://localhost:3000/api/tasks

# 3. Test chat (basic)
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "hello"}'

# 4. Test orchestration (action word triggers)
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "build a new feature"}'
```

## Getting Help

1. **Check logs**: `cat logs/error.log`
2. **Read docs**: See documentation reference above
3. **Review examples**: See API_DOCUMENTATION.md for examples
4. **Common issues**: See Troubleshooting section above
5. **Developer guide**: DEVELOPER_GUIDE.md for detailed help

## System Requirements

- **OS**: macOS, Linux, Windows
- **Node.js**: 18 or higher
- **npm**: 8 or higher
- **RAM**: 2GB minimum
- **Disk Space**: 500MB minimum
- **MongoDB**: 4.4 or higher (local or cloud)
- **Internet**: Required for Cohere API calls

## Performance Notes

- First startup may be slower (creating indexes)
- Subsequent startups will be faster
- Logs are auto-rotated after 5MB
- Database queries are optimized with indexes
- Real-time updates every 3-5 seconds

## Security Reminders

- Never commit `.env.local` to git
- Keep Cohere API key private
- Don't share your MongoDB connection string
- Use strong passwords for production databases
- Enable IP whitelist for production MongoDB

## What's Next?

After basic testing:

1. Try different commands in the chatbot
2. Explore different dashboard pages
3. Read the documentation
4. Try the API examples
5. Modify the code to learn
6. Deploy to production when ready

## Support

- Documentation: See files listed above
- API Examples: `API_DOCUMENTATION.md`
- Setup Help: `MONGODB_SETUP.md`
- Deployment: `DEPLOYMENT.md`
- Development: `DEVELOPER_GUIDE.md`

---

**You're all set! Happy coding! 🚀**

Start with: `npm run dev` and visit `http://localhost:3000/opsRoom`

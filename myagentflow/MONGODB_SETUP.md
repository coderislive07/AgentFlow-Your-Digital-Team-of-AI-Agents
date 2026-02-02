# MongoDB Setup Guide for AgentFlow

## Prerequisites

- Node.js 16+ and npm
- MongoDB Server 4.4+ OR MongoDB Atlas Account
- Cohere API Key

## Option 1: Local MongoDB Setup

### 1.1 Install MongoDB Community Edition

**Windows:**
```bash
# Download from https://www.mongodb.com/try/download/community
# Run installer and follow instructions
# Or use Chocolatey:
choco install mongodb-community
```

**macOS:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### 1.2 Verify MongoDB is Running

```bash
mongosh
# You should see the MongoDB shell prompt
```

### 1.3 Update .env.local

Ensure MongoDB URI is set:
```
MONGODB_URI=mongodb://localhost:27017/agentflow
```

## Option 2: MongoDB Atlas (Cloud)

### 2.1 Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new project

### 2.2 Create a Cluster

1. Click "Create" to build a cluster
2. Choose "FREE" tier
3. Select region closest to you
4. Click "Create Cluster"

### 2.3 Setup Database Access

1. Go to "Database Access" tab
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username and password
5. Click "Add User"

### 2.4 Setup Network Access

1. Go to "Network Access" tab
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0) for development
4. Click "Confirm"

### 2.5 Get Connection String

1. Click "Connect" on your cluster
2. Choose "Drivers"
3. Copy the connection string
4. Replace `<password>` with your database password

### 2.6 Update .env.local

```
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/agentflow?retryWrites=true&w=majority
```

## Setting up AgentFlow

### 1. Install Dependencies

```bash
cd /myagentflow
npm install
```

### 2. Create Initial Database

The application will automatically create collections on first run. To manually initialize:

```bash
npm run db:seed  # (if seed script is available)
```

### 3. Run Application

```bash
npm run dev
```

Visit: http://localhost:3000

## Database Structure

AgentFlow uses the following MongoDB collections:

### Users
- Store user account information
- Encrypted passwords with bcrypt
- Role-based access control

### Agents
- AI agent definitions
- Status tracking (active, idle, offline)
- Performance metrics

### Tasks
- Task assignments to agents
- Status tracking (todo, in-progress, completed, blocked)
- Priority levels and progress tracking
- Subtasks and comments

### Conversations
- Chat history with AI
- Message logs with metadata
- Related tasks and context

### Memory
- Knowledge base entries
- Context and learnings
- Categorized information
- Access levels (private, shared, public)

### Workflows
- Orchestration results
- Task decomposition logs
- Agent assignments
- Execution metrics

## Monitoring MongoDB

### Local MongoDB

```bash
# Open MongoDB shell
mongosh

# Check database
use agentflow
db.stats()

# View collections
show collections

# Query data
db.tasks.find().limit(5)
db.agents.find()
db.conversations.find()
```

### MongoDB Atlas

1. Go to "Metrics" tab in Atlas dashboard
2. View real-time performance metrics
3. Monitor connections and operations

## Security Best Practices

### Development
- Use `mongodb://localhost:27017` for local development
- Store credentials in `.env.local`
- Never commit `.env.local` to git

### Production
- Use MongoDB Atlas with strong passwords
- Enable IP whitelisting (not 0.0.0.0/0)
- Use VPC peering for production deployments
- Enable encryption at rest and in transit
- Regularly backup your database
- Monitor and audit all database access

### Secrets Management
```bash
# Add to .gitignore
.env.local
.env.*.local
logs/
```

## Troubleshooting

### Connection Issues

```bash
# Check if MongoDB is running
# Local: mongosh should connect
# Atlas: Verify connection string and network access

# Test connection
npm run test:db  # If available
```

### Performance Issues

1. Check indexes in MongoDB
2. Review logs in `/logs` directory
3. Monitor query performance in Atlas

### Data Issues

1. Backup before making changes:
```bash
mongodump --uri="mongodb://localhost:27017/agentflow"
```

2. Restore from backup:
```bash
mongorestore --uri="mongodb://localhost:27017/agentflow" ./dump/agentflow
```

## Maintenance

### Regular Tasks

- Monitor disk usage
- Review error logs
- Update MongoDB regularly
- Backup data regularly
- Clean up old logs (kept in `/logs` for 5 files max)

### Scaling

- Consider MongoDB Atlas auto-scaling
- Implement caching layers
- Use database indexes effectively
- Monitor and optimize slow queries

## Support

For MongoDB issues:
- MongoDB Documentation: https://docs.mongodb.com
- MongoDB Atlas Support: https://support.mongodb.com
- AgentFlow Issues: See project repository

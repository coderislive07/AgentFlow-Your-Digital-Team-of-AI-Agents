# AgentFlow Developer Quick Reference Guide

## Quick Start (5 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Start MongoDB (in another terminal)
mongosh  # or: brew services start mongodb-community

# 3. Start dev server
npm run dev

# 4. Open browser
# Main: http://localhost:3000
# OpsRoom: http://localhost:3000/opsRoom

# 5. Test with chat
# Type: "Build a landing page"
```

## Project Structure

```
src/
├── app/
│   ├── api/              # API Route Handlers
│   ├── opsRoom/          # Main dashboard
│   ├── agents/           # Agents page
│   ├── tasks/            # Tasks page
│   └── layout.js         # Root layout
├── components/           # React components
├── lib/
│   ├── mongodb.js        # DB connection
│   ├── logger.js         # Logging
│   ├── errors.js         # Error handling
│   └── validators.js     # Zod schemas
├── models/               # Mongoose schemas
│   ├── User.js
│   ├── Agent.js
│   ├── Task.js
│   ├── Conversation.js
│   ├── Memory.js
│   └── Workflow.js
└── services/             # Business logic
    ├── taskService.js
    ├── agentService.js
    └── conversationService.js
```

## Common Tasks

### Creating a New API Endpoint

```javascript
// src/app/api/myroute/route.js
import { asyncHandler, handleError } from '@/lib/errors';
import logger from '@/lib/logger';
import connectDB from '@/lib/mongodb';

export const GET = asyncHandler(async (request) => {
  try {
    await connectDB();
    
    // Your logic here
    const data = await MyModel.find();
    
    logger.info('Data retrieved', { count: data.length });
    return Response.json({ success: true, data });
  } catch (error) {
    return handleError(error, Response);
  }
});

export const POST = asyncHandler(async (request) => {
  try {
    const body = await request.json();
    
    // Validate
    const validated = mySchema.parse(body);
    
    // Create
    const result = await MyModel.create(validated);
    
    logger.info('Item created', { id: result._id });
    return Response.json({ success: true, result }, { status: 201 });
  } catch (error) {
    return handleError(error, Response);
  }
});
```

### Creating a New Mongoose Model

```javascript
// src/models/MyModel.js
import mongoose from 'mongoose';

const MySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    // Add more fields...
  },
  { timestamps: true }
);

// Add indexes for performance
MySchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.MyModel || mongoose.model('MyModel', MySchema);
```

### Creating a New Service

```javascript
// src/services/myService.js
import MyModel from '@/models/MyModel';
import logger from '@/lib/logger';
import { NotFoundError } from '@/lib/errors';
import connectDB from '@/lib/mongodb';

export const myService = {
  async getAll(filters = {}) {
    await connectDB();
    try {
      const query = MyModel.find();
      
      if (filters.status) {
        query.where('status').equals(filters.status);
      }
      
      const items = await query.lean();
      logger.info('Items retrieved', { count: items.length });
      return items;
    } catch (error) {
      logger.error('Error fetching items:', error);
      throw error;
    }
  },

  async getById(id) {
    await connectDB();
    try {
      const item = await MyModel.findById(id);
      if (!item) throw new NotFoundError('Item');
      return item;
    } catch (error) {
      logger.error('Error fetching item:', error);
      throw error;
    }
  },

  async create(data) {
    await connectDB();
    try {
      const item = new MyModel(data);
      await item.save();
      logger.info('Item created', { id: item._id });
      return item;
    } catch (error) {
      logger.error('Error creating item:', error);
      throw error;
    }
  },

  async update(id, data) {
    await connectDB();
    try {
      const item = await MyModel.findByIdAndUpdate(id, data, { new: true });
      if (!item) throw new NotFoundError('Item');
      logger.info('Item updated', { id });
      return item;
    } catch (error) {
      logger.error('Error updating item:', error);
      throw error;
    }
  },

  async delete(id) {
    await connectDB();
    try {
      const item = await MyModel.findByIdAndDelete(id);
      if (!item) throw new NotFoundError('Item');
      logger.info('Item deleted', { id });
      return item;
    } catch (error) {
      logger.error('Error deleting item:', error);
      throw error;
    }
  },
};

export default myService;
```

### Adding Validation

```javascript
// src/lib/validators.js - Add your schema
import { z } from 'zod';

export const myItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email'),
  status: z.enum(['active', 'inactive']).optional(),
  tags: z.array(z.string()).optional(),
});

// In your route handler:
export const POST = asyncHandler(async (request) => {
  const body = await request.json();
  const validated = myItemSchema.parse(body);
  // ... rest of logic
});
```

### Adding Custom Error Handling

```javascript
import {
  AppError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
} from '@/lib/errors';

// Throw custom errors:
if (!user) throw new NotFoundError('User');
if (!hasPermission) throw new ForbiddenError('No access');
if (emailExists) throw new ConflictError('Email already in use');
if (invalidInput) throw new ValidationError('Invalid input');
```

### Logging

```javascript
import logger from '@/lib/logger';

// Different log levels
logger.info('User logged in', { userId: user._id });
logger.warn('Rate limit approaching', { limit: 1000 });
logger.error('Database connection failed', { error: err });

// View logs
// cat logs/combined.log
// cat logs/error.log
```

## Database Operations

### Query Examples

```javascript
import connectDB from '@/lib/mongodb';
import Task from '@/models/Task';

await connectDB();

// Find all
const tasks = await Task.find();

// Find with filter
const activeTasks = await Task.find({ status: 'in-progress' });

// Find one
const task = await Task.findById(id);

// Find and update
const updated = await Task.findByIdAndUpdate(id, updateData, { new: true });

// Find and delete
const deleted = await Task.findByIdAndDelete(id);

// Count
const count = await Task.countDocuments({ status: 'completed' });

// Aggregate (for complex queries)
const stats = await Task.aggregate([
  { $match: { status: 'completed' } },
  {
    $group: {
      _id: '$priority',
      count: { $sum: 1 },
      avgProgress: { $avg: '$progress' },
    },
  },
]);

// Lean queries (for read-only, faster)
const tasks = await Task.find().lean();

// Populate references
const task = await Task.findById(id).populate('assignedTo', 'name role');

// Sort
const tasks = await Task.find().sort({ createdAt: -1 });

// Limit and skip (pagination)
const tasks = await Task.find().limit(10).skip(0);
```

### Indexing

```javascript
// Indexes speed up queries
// Add in model file:

MySchema.index({ email: 1 }); // Single field
MySchema.index({ status: 1, createdAt: -1 }); // Compound
MySchema.index({ email: 1 }, { unique: true }); // Unique
MySchema.index({ title: 'text', content: 'text' }); // Full-text search

// View indexes
db.mycollection.getIndexes();

// Drop index
db.mycollection.dropIndex('indexName');
```

## Debugging

### Console Logging

```javascript
// Use descriptive messages
console.log('[v0] API call starting', { userId, timestamp: new Date() });
console.log('[v0] Response received', { status: response.status });
console.log('[v0] Error occurred', { message: error.message });
```

### Check Logs

```bash
# Real-time logs
tail -f logs/combined.log

# Error logs only
tail -f logs/error.log

# Search logs
grep "error" logs/combined.log

# Count errors
grep -c "error" logs/error.log
```

### MongoDB Shell

```bash
# Connect
mongosh

# Use database
use agentflow

# Check collections
show collections

# Find data
db.tasks.find().pretty()
db.agents.find({ name: "CodeWizard" })
db.tasks.find({ status: "in-progress" }).count()

# Insert test data
db.tasks.insertOne({ title: "Test", status: "todo" })

# Update
db.tasks.updateOne({ _id: ObjectId("...") }, { $set: { status: "completed" } })

# Delete
db.tasks.deleteOne({ _id: ObjectId("...") })

# Create index
db.tasks.createIndex({ status: 1, priority: 1 })

# Get stats
db.tasks.stats()
```

## Testing Endpoints

### Using cURL

```bash
# GET - List tasks
curl http://localhost:3000/api/tasks

# GET - Filter tasks
curl "http://localhost:3000/api/tasks?status=in-progress&priority=high"

# GET - Single task
curl "http://localhost:3000/api/tasks?id=ObjectId"

# POST - Create task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","priority":"high"}'

# PUT - Update task
curl -X PUT http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"id":"ObjectId","status":"completed"}'

# DELETE - Delete task
curl -X DELETE "http://localhost:3000/api/tasks?id=ObjectId"
```

### Using Postman

1. Create collection
2. Set base URL: `http://localhost:3000`
3. Create requests for each endpoint
4. Test with sample data
5. Export collection

## Common Issues & Solutions

### MongoDB Connection Failed
```bash
# Check MongoDB is running
mongosh

# Check connection string
cat .env.local | grep MONGODB_URI

# If using Atlas, verify IP whitelist
```

### API Returns 400 Validation Error
```javascript
// Check error message in response
// error.fieldErrors shows which fields failed
// Ensure all required fields are included
```

### Database Indexes Missing
```bash
# Check indexes
db.tasks.getIndexes()

# Create missing index
db.tasks.createIndex({ status: 1, priority: 1 })
```

### Service Layer Error
```javascript
// Always await connectDB()
await connectDB();

// Always wrap in try-catch
try {
  // database operation
} catch (error) {
  logger.error('Operation failed:', error);
  throw error;
}
```

### Route Handler Errors
```javascript
// Always use asyncHandler
export const GET = asyncHandler(async (request) => {
  // Your code
});

// Always call handleError for failures
} catch (error) {
  return handleError(error, Response);
}
```

## Environment Variables Reference

```bash
# Development
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/agentflow

# Production
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/agentflow

# API Keys
COHERE_API_KEY=your-api-key

# Secrets (generate with: openssl rand -base64 32)
JWT_SECRET=generated-secret
SESSION_SECRET=generated-secret

# Logging
LOG_LEVEL=info  # or: debug, warn, error
```

## Performance Tips

1. **Use Lean Queries** - When not modifying data
   ```javascript
   const tasks = await Task.find().lean();
   ```

2. **Add Indexes** - For frequently filtered fields
   ```javascript
   MySchema.index({ userId: 1, createdAt: -1 });
   ```

3. **Limit Fields** - Only select needed fields
   ```javascript
   const tasks = await Task.find().select('title status');
   ```

4. **Batch Operations** - When processing many records
   ```javascript
   await Task.insertMany(tasksArray);
   ```

5. **Connection Pooling** - Already configured in mongodb.js

## Security Reminders

- Never commit `.env.local`
- Always validate user input with Zod
- Use bcryptjs for password hashing
- Implement JWT for authentication
- Enable CORS properly
- Use HTTPS in production
- Rotate secrets regularly
- Never log sensitive data

## Useful Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# View logs
tail -f logs/combined.log

# MongoDB backup
mongodump --uri="mongodb://localhost:27017/agentflow"

# MongoDB restore
mongorestore --uri="mongodb://localhost:27017/agentflow" ./dump/agentflow
```

## Documentation Files

- `README_PROFESSIONAL.md` - Full project overview
- `API_DOCUMENTATION.md` - All endpoints with examples
- `MONGODB_SETUP.md` - Database setup guide
- `DEPLOYMENT.md` - Deployment instructions
- `PROFESSIONAL_IMPLEMENTATION_SUMMARY.md` - Architecture overview

## Getting Help

1. Check error logs: `logs/error.log`
2. Read API docs: `API_DOCUMENTATION.md`
3. Check similar services for patterns
4. Review Mongoose docs: `docs.mongoosejs.com`
5. Check Next.js docs: `nextjs.org/docs`

## Tips for Contributing

- Follow existing patterns
- Add logging to new features
- Include error handling
- Add to validators.js for new input types
- Update API docs
- Test with sample data
- Keep functions focused and small
- Use meaningful variable names

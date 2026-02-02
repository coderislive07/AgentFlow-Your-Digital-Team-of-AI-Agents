# AgentFlow API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently, the API uses conversation context. Future versions will implement JWT-based authentication.

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "statusCode": 400,
    "fieldErrors": {
      "field_name": "Error for this field"
    }
  }
}
```

## Endpoints

### Tasks API

#### GET /api/tasks
Retrieve all tasks with optional filters.

**Query Parameters:**
- `id` (string) - Get specific task by ID
- `status` (string) - Filter by status: `todo`, `in-progress`, `completed`, `blocked`
- `priority` (string) - Filter by priority: `low`, `medium`, `high`, `critical`
- `assignedAgent` (string) - Filter by assigned agent name

**Response:**
```json
{
  "success": true,
  "tasks": [
    {
      "_id": "ObjectId",
      "title": "Task title",
      "description": "Task description",
      "status": "in-progress",
      "priority": "high",
      "assignedAgent": "CodeWizard",
      "progress": 50,
      "createdAt": "2024-01-20T10:00:00Z",
      "updatedAt": "2024-01-20T10:00:00Z"
    }
  ],
  "total": 10
}
```

#### POST /api/tasks
Create a new task.

**Request Body:**
```json
{
  "title": "Build landing page",
  "description": "Create a responsive landing page",
  "priority": "high",
  "assignedAgent": "CodeWizard",
  "dueDate": "2024-02-01",
  "estimatedHours": 8,
  "tags": ["frontend", "urgent"]
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "task": { ... },
  "message": "Task created successfully"
}
```

#### PUT /api/tasks
Update an existing task.

**Request Body:**
```json
{
  "id": "ObjectId",
  "status": "completed",
  "progress": 100,
  "priority": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "task": { ... },
  "message": "Task updated successfully"
}
```

#### DELETE /api/tasks
Delete a task.

**Query Parameters:**
- `id` (string, required) - Task ID to delete

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

### Agents API

#### GET /api/agents
Retrieve all agents with performance metrics.

**Query Parameters:**
- `id` (string) - Get specific agent by ID
- `status` (string) - Filter by status: `active`, `idle`, `offline`
- `role` (string) - Filter by role

**Response:**
```json
{
  "success": true,
  "agents": [
    {
      "_id": "ObjectId",
      "name": "CodeWizard",
      "role": "Developer",
      "status": "active",
      "totalTasks": 15,
      "completedTasks": 12,
      "activeTasks": 2,
      "efficiency": "80%",
      "capabilities": ["backend", "frontend", "database"],
      "lastActivity": "2024-01-20T10:30:00Z"
    }
  ],
  "total": 5
}
```

#### POST /api/agents
Create a new agent.

**Request Body:**
```json
{
  "name": "NewAgent",
  "role": "Developer",
  "description": "Expert in backend development",
  "capabilities": ["Python", "Node.js", "Database"]
}
```

#### PUT /api/agents
Update agent information.

**Request Body:**
```json
{
  "id": "ObjectId",
  "status": "offline",
  "capabilities": ["updated", "list"]
}
```

#### DELETE /api/agents
Delete an agent.

**Query Parameters:**
- `id` (string, required) - Agent ID to delete

---

### Chat API

#### POST /api/chat
Send a message to the AI chatbot.

**Request Body:**
```json
{
  "message": "Build a landing page for my startup",
  "conversationId": "ObjectId (optional)",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Previous message"
    }
  ]
}
```

**Response:**
```json
{
  "message": "AI response here",
  "success": true,
  "triggeredOrchestration": true,
  "orchestration": {
    "success": true,
    "tasks": [...],
    "agents": [...],
    "workflowId": "ObjectId"
  }
}
```

---

### Memory API

#### GET /api/memory
Retrieve knowledge base entries.

**Query Parameters:**
- `type` (string) - Filter by type: `knowledge`, `context`, `learning`, `decision`
- `tags` (string) - Search by tags (comma-separated)
- `search` (string) - Full-text search

**Response:**
```json
{
  "success": true,
  "memory": [
    {
      "_id": "ObjectId",
      "type": "knowledge",
      "title": "RGB Color Picker Algorithm",
      "description": "Advanced color conversion algorithm",
      "category": "Technical",
      "tags": ["algorithm", "color"],
      "access": "shared",
      "importance": 5
    }
  ],
  "tags": ["algorithm", "color", ...]
}
```

#### POST /api/memory
Add new memory entry.

**Request Body:**
```json
{
  "type": "knowledge",
  "title": "Best Practices",
  "description": "Collection of best practices",
  "content": "Detailed content here",
  "category": "Technical",
  "tags": ["practices"],
  "access": "shared"
}
```

---

### Analytics API

#### GET /api/analytics
Get system analytics and metrics.

**Response:**
```json
{
  "success": true,
  "analytics": {
    "summary": {
      "totalTasks": 50,
      "completedTasks": 35,
      "activeTasks": 10,
      "totalAgents": 5
    },
    "tasksByStatus": {
      "todo": 5,
      "in-progress": 10,
      "completed": 35,
      "blocked": 0
    },
    "agentStats": [
      {
        "name": "CodeWizard",
        "totalTasks": 15,
        "completedTasks": 12,
        "efficiency": 80
      }
    ],
    "workflowStats": {
      "totalWorkflows": 8,
      "successfulWorkflows": 7,
      "failedWorkflows": 1
    }
  }
}
```

---

### Workflows/Orchestration API

#### POST /api/orchestrate
Trigger task orchestration from user query.

**Request Body:**
```json
{
  "query": "Build a complete e-commerce website",
  "priority": "high"
}
```

**Response:**
```json
{
  "success": true,
  "workflow": {
    "_id": "ObjectId",
    "tasks": [...],
    "agents": [...],
    "overallProgress": 0,
    "status": "in-progress"
  }
}
```

---

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 400 | Validation failed | Invalid input parameters |
| 401 | Unauthorized access | Authentication required |
| 403 | Access forbidden | Insufficient permissions |
| 404 | Resource not found | Requested resource doesn't exist |
| 409 | Resource already exists | Conflict with existing data |
| 500 | Internal server error | Server-side error |

## Rate Limiting

Currently no rate limiting is implemented. Production deployment should include:
- IP-based rate limiting
- User-based rate limiting
- Per-endpoint rate limiting

## Pagination

Future API versions will support pagination with:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `sort` - Sort field and order

## Sorting

Future API versions will support:
- `sort=fieldName` - Ascending order
- `sort=-fieldName` - Descending order

## Filtering

Future API versions will support advanced filtering with operators:
- `field[$gt]=value` - Greater than
- `field[$lt]=value` - Less than
- `field[$in]=value1,value2` - In array

## Testing

### Using cURL

```bash
# Create a task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "priority": "high",
    "assignedAgent": "CodeWizard"
  }'

# Get all tasks
curl http://localhost:3000/api/tasks

# Chat
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Create a new task"
  }'
```

### Using Postman

1. Import collection from `/postman_collection.json` (when available)
2. Set base URL to `http://localhost:3000/api`
3. Run requests with example data

## Webhooks

Future feature to send notifications on events:
- Task completed
- Workflow finished
- Agent status changed
- Error occurred

## WebSocket API

Future real-time updates:
- Live task progress
- Agent status changes
- Conversation streaming
- Live notifications

## Versioning

API follows semantic versioning:
- Current version: v1
- Future versions: `/api/v2`, `/api/v3`, etc.

## Deprecation Policy

Deprecated endpoints will:
1. Be marked as deprecated for 6 months
2. Show deprecation warnings in responses
3. Be removed in major version release

## Support

For API issues and questions:
- GitHub Issues: [project repository]
- Documentation: https://agentflow.io/docs
- Email: support@agentflow.io

# AgentFlow API Reference

Complete API documentation for AgentFlow endpoints.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently, the APIs don't require authentication. In production, add authentication headers to all requests.

---

## Chat API

### POST /api/chat

Send a message to the Cohere AI assistant.

**Request:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is AgentFlow?",
    "conversationHistory": []
  }'
```

**Request Body:**
```json
{
  "message": "Your question or prompt",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Previous user message"
    },
    {
      "role": "assistant",
      "content": "Previous assistant response"
    }
  ]
}
```

**Response:**
```json
{
  "message": "The assistant's response",
  "success": true
}
```

**Error Response:**
```json
{
  "error": "Failed to process chat message",
  "details": "Error message details"
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad request (missing message)
- `500` - Server error (missing API key or API failure)

---

## Agents API

### GET /api/agents

Get all agents or specific agent.

**Get all agents:**
```bash
curl http://localhost:3000/api/agents
```

**Response:**
```json
{
  "agents": [
    {
      "id": 1,
      "name": "Planzilla",
      "role": "Planner",
      "status": "active",
      "tasks": 12,
      "efficiency": "90%",
      "createdAt": "2024-01-10"
    }
  ],
  "total": 5
}
```

**Get specific agent:**
```bash
curl http://localhost:3000/api/agents?id=1
```

**Response:**
```json
{
  "id": 1,
  "name": "Planzilla",
  "role": "Planner",
  "status": "active",
  "tasks": 12,
  "efficiency": "90%",
  "createdAt": "2024-01-10"
}
```

---

### POST /api/agents

Create a new agent.

**Request:**
```bash
curl -X POST http://localhost:3000/api/agents \
  -H "Content-Type: application/json" \
  -d '{
    "name": "NewAgent",
    "role": "Specialist"
  }'
```

**Request Body:**
```json
{
  "name": "Agent Name",
  "role": "Agent Role"
}
```

**Response:**
```json
{
  "message": "Agent created successfully",
  "agent": {
    "id": 6,
    "name": "NewAgent",
    "role": "Specialist",
    "status": "active",
    "tasks": 0,
    "efficiency": "0%",
    "createdAt": "2024-01-15"
  }
}
```

**Status Codes:**
- `201` - Created
- `400` - Bad request
- `500` - Server error

---

### PUT /api/agents

Update an existing agent.

**Request:**
```bash
curl -X PUT http://localhost:3000/api/agents \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "status": "idle",
    "tasks": 10
  }'
```

**Request Body:**
```json
{
  "id": 1,
  "status": "idle",
  "efficiency": "95%"
}
```

**Response:**
```json
{
  "message": "Agent updated successfully",
  "agent": {
    "id": 1,
    "name": "Planzilla",
    "role": "Planner",
    "status": "idle",
    "tasks": 10,
    "efficiency": "95%",
    "createdAt": "2024-01-10"
  }
}
```

---

### DELETE /api/agents

Delete an agent.

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/agents?id=1
```

**Response:**
```json
{
  "message": "Agent deleted successfully",
  "agent": {
    "id": 1,
    "name": "Planzilla",
    "role": "Planner",
    "status": "active",
    "tasks": 12,
    "efficiency": "90%",
    "createdAt": "2024-01-10"
  }
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad request
- `404` - Agent not found
- `500` - Server error

---

## Tasks API

### GET /api/tasks

Get all tasks with optional filters.

**Get all tasks:**
```bash
curl http://localhost:3000/api/tasks
```

**Filter by status:**
```bash
curl http://localhost:3000/api/tasks?status=in-progress
```

**Filter by agent:**
```bash
curl http://localhost:3000/api/tasks?agent=CodeWizard
```

**Get specific task:**
```bash
curl http://localhost:3000/api/tasks?id=1
```

**Response:**
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Create RGB Color Picker PRD",
      "description": "Outline features and UX",
      "status": "completed",
      "priority": "high",
      "assignedTo": "CodeWizard",
      "dueDate": "2024-01-15",
      "progress": 100,
      "createdAt": "2024-01-10"
    }
  ],
  "total": 5
}
```

---

### POST /api/tasks

Create a new task.

**Request:**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "description": "Task description",
    "priority": "high",
    "assignedTo": "CodeWizard",
    "dueDate": "2024-02-01"
  }'
```

**Request Body:**
```json
{
  "title": "Task Title",
  "description": "Task Description",
  "priority": "high|medium|low",
  "assignedTo": "Agent Name",
  "dueDate": "2024-02-01"
}
```

**Response:**
```json
{
  "message": "Task created successfully",
  "task": {
    "id": 6,
    "title": "New Task",
    "description": "Task description",
    "status": "todo",
    "priority": "high",
    "assignedTo": "CodeWizard",
    "dueDate": "2024-02-01",
    "progress": 0,
    "createdAt": "2024-01-15"
  }
}
```

---

### PUT /api/tasks

Update a task.

**Request:**
```bash
curl -X PUT http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "status": "in-progress",
    "progress": 50
  }'
```

**Request Body:**
```json
{
  "id": 1,
  "status": "in-progress",
  "progress": 50,
  "assignedTo": "DataBard"
}
```

---

### DELETE /api/tasks

Delete a task.

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/tasks?id=1
```

---

## Workflows API

### GET /api/workflows

Get all workflows with optional filters.

**Get all workflows:**
```bash
curl http://localhost:3000/api/workflows
```

**Filter by status:**
```bash
curl http://localhost:3000/api/workflows?status=running
```

**Response:**
```json
{
  "workflows": [
    {
      "id": 1,
      "name": "Color Picker Development",
      "description": "Complete workflow",
      "status": "running",
      "progress": 65,
      "agents": ["Planzilla", "CodeWizard"],
      "startTime": "2024-01-15 10:30",
      "estimatedTime": "4 hours",
      "createdAt": "2024-01-15"
    }
  ],
  "total": 3
}
```

---

### POST /api/workflows

Create a new workflow.

**Request:**
```bash
curl -X POST http://localhost:3000/api/workflows \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Workflow",
    "description": "Workflow description",
    "agents": ["CodeWizard", "BugBuster"],
    "estimatedTime": "3 hours"
  }'
```

**Request Body:**
```json
{
  "name": "Workflow Name",
  "description": "Workflow description",
  "agents": ["Agent1", "Agent2"],
  "estimatedTime": "3 hours"
}
```

---

### PUT /api/workflows

Update a workflow.

**Request:**
```bash
curl -X PUT http://localhost:3000/api/workflows \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "status": "completed",
    "progress": 100
  }'
```

---

### DELETE /api/workflows

Delete a workflow.

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/workflows?id=1
```

---

## Example Usage

### JavaScript/Fetch

```javascript
// Chat with the assistant
async function chatWithAssistant(message) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message,
      conversationHistory: [],
    }),
  });

  const data = await response.json();
  return data.message;
}

// Create a new task
async function createTask(title, assignedTo) {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      description: 'New task',
      priority: 'high',
      assignedTo: assignedTo,
      dueDate: '2024-02-01',
    }),
  });

  const data = await response.json();
  return data.task;
}

// Fetch all agents
async function getAllAgents() {
  const response = await fetch('/api/agents');
  const data = await response.json();
  return data.agents;
}
```

### Python

```python
import requests
import json

API_BASE = "http://localhost:3000/api"

# Chat with assistant
def chat(message):
    response = requests.post(
        f"{API_BASE}/chat",
        json={
            "message": message,
            "conversationHistory": []
        }
    )
    return response.json()

# Create task
def create_task(title, assigned_to):
    response = requests.post(
        f"{API_BASE}/tasks",
        json={
            "title": title,
            "description": "New task",
            "priority": "high",
            "assignedTo": assigned_to,
            "dueDate": "2024-02-01"
        }
    )
    return response.json()

# Get all agents
def get_agents():
    response = requests.get(f"{API_BASE}/agents")
    return response.json()["agents"]
```

---

## Rate Limiting

Currently no rate limiting is implemented. In production:
- Implement rate limiting (e.g., 100 requests/minute per IP)
- Add API key based throttling
- Monitor API usage

---

## Error Handling

All error responses follow this format:

```json
{
  "error": "Human-readable error message",
  "details": "Additional error details"
}
```

Common error codes:
- `400` - Bad Request (missing/invalid parameters)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

---

## Notes

- All timestamps are in ISO 8601 format or readable date format
- Progress is represented as a percentage (0-100)
- Status values: `active`, `idle`, `pending`, `running`, `completed`, `todo`, `in-progress`
- Priority values: `low`, `medium`, `high`

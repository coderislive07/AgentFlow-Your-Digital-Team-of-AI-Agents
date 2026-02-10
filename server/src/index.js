import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Orchestrator } from './orchestrator/orchestrator.js';
import { memoryStore } from './memory/memoryStore.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Store active tasks and their state
const activeTasks = new Map();

// POST /api/task - Submit a task
app.post('/api/task', async (req, res) => {
  try {
    const { task } = req.body;
    if (!task || typeof task !== 'string') {
      return res.status(400).json({ error: 'Task must be a non-empty string' });
    }

    const taskId = Date.now().toString();
    const orchestrator = new Orchestrator(taskId);
    
    activeTasks.set(taskId, {
      task,
      status: 'running',
      createdAt: new Date(),
    });

    // Run orchestrator asynchronously
    orchestrator.run(task).then((result) => {
      activeTasks.set(taskId, {
        task,
        status: 'completed',
        result,
        createdAt: activeTasks.get(taskId).createdAt,
      });
    }).catch((error) => {
      activeTasks.set(taskId, {
        task,
        status: 'failed',
        error: error.message,
        createdAt: activeTasks.get(taskId).createdAt,
      });
    });

    res.json({ taskId, status: 'accepted' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/task/:taskId - Get task status and logs
app.get('/api/task/:taskId', (req, res) => {
  const { taskId } = req.params;
  const task = activeTasks.get(taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const logs = memoryStore.getLogs(taskId) || [];
  const agentStatus = memoryStore.getAgentStatus(taskId) || {};

  res.json({
    taskId,
    task: task.task,
    status: task.status,
    logs,
    agentStatus,
    result: task.result || null,
  });
});

// GET /api/memory/:taskId - Get memory for task
app.get('/api/memory/:taskId', (req, res) => {
  const { taskId } = req.params;
  const memory = memoryStore.get(taskId);
  res.json(memory || {});
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

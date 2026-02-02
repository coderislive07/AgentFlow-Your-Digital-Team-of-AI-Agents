import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// File paths for different data types
const FILES = {
  tasks: path.join(DATA_DIR, 'tasks.json'),
  agents: path.join(DATA_DIR, 'agents.json'),
  memory: path.join(DATA_DIR, 'memory.json'),
  workflows: path.join(DATA_DIR, 'workflows.json'),
  conversations: path.join(DATA_DIR, 'conversations.json'),
  analytics: path.join(DATA_DIR, 'analytics.json'),
};

// Initialize default data
function initializeData() {
  const defaultData = {
    tasks: [],
    agents: [
      { id: 1, name: "Planzilla", role: "Planner", status: "active", color: "from-orange-500 to-red-500" },
      { id: 2, name: "QueryLyn", role: "Researcher", status: "active", color: "from-purple-500 to-pink-500" },
      { id: 3, name: "CodeWizard", role: "Developer", status: "active", color: "from-blue-500 to-cyan-500" },
      { id: 4, name: "BugBuster", role: "Tester", status: "active", color: "from-green-500 to-emerald-500" },
      { id: 5, name: "DataBard", role: "Reporter", status: "active", color: "from-yellow-500 to-orange-500" },
    ],
    memory: [],
    workflows: [],
    conversations: [],
    analytics: {
      totalTasks: 0,
      completedTasks: 0,
      activeTasks: 0,
      totalAgentExecutions: 0,
      averageExecutionTime: 0,
    },
  };

  Object.entries(FILES).forEach(([key, filePath]) => {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultData[key], null, 2));
    }
  });
}

// Read functions
export function readData(type) {
  try {
    if (!FILES[type]) throw new Error(`Invalid data type: ${type}`);
    initializeData();
    const data = fs.readFileSync(FILES[type], 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${type}:`, error);
    return [];
  }
}

// Write functions
export function writeData(type, data) {
  try {
    if (!FILES[type]) throw new Error(`Invalid data type: ${type}`);
    initializeData();
    fs.writeFileSync(FILES[type], JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${type}:`, error);
    return false;
  }
}

// Task operations
export function getTasks() {
  return readData('tasks');
}

export function addTask(task) {
  const tasks = getTasks();
  const newTask = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...task,
  };
  tasks.push(newTask);
  writeData('tasks', tasks);
  return newTask;
}

export function updateTask(taskId, updates) {
  const tasks = getTasks();
  const index = tasks.findIndex(t => t.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updates, updatedAt: new Date().toISOString() };
    writeData('tasks', tasks);
    return tasks[index];
  }
  return null;
}

export function getTaskById(taskId) {
  const tasks = getTasks();
  return tasks.find(t => t.id === taskId);
}

// Agent operations
export function getAgents() {
  return readData('agents');
}

export function getAgentByRole(role) {
  const agents = getAgents();
  return agents.find(a => a.role.toLowerCase() === role.toLowerCase());
}

// Memory operations
export function getMemory() {
  return readData('memory');
}

export function addMemory(entry) {
  const memory = getMemory();
  const newEntry = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...entry,
  };
  memory.push(newEntry);
  writeData('memory', memory);
  return newEntry;
}

export function searchMemory(query) {
  const memory = getMemory();
  const searchTerm = query.toLowerCase();
  return memory.filter(entry =>
    entry.content?.toLowerCase().includes(searchTerm) ||
    entry.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

// Conversation operations
export function getConversations() {
  return readData('conversations');
}

export function addConversation(conversation) {
  const conversations = getConversations();
  const newConversation = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...conversation,
  };
  conversations.push(newConversation);
  writeData('conversations', conversations);
  return newConversation;
}

export function updateConversation(conversationId, updates) {
  const conversations = getConversations();
  const index = conversations.findIndex(c => c.id === conversationId);
  if (index !== -1) {
    conversations[index] = { ...conversations[index], ...updates };
    writeData('conversations', conversations);
    return conversations[index];
  }
  return null;
}

// Analytics operations
export function getAnalytics() {
  return readData('analytics');
}

export function updateAnalytics(updates) {
  const analytics = getAnalytics();
  const updated = { ...analytics, ...updates };
  writeData('analytics', updated);
  return updated;
}

export function recordTaskCompletion(taskData) {
  const analytics = getAnalytics();
  analytics.totalTasks += 1;
  if (taskData.status === 'completed') {
    analytics.completedTasks += 1;
  }
  analytics.totalAgentExecutions += taskData.assignedAgents?.length || 0;
  
  // Update average execution time
  if (taskData.executionTime) {
    const totalTime = (analytics.averageExecutionTime * (analytics.totalAgentExecutions - 1)) + taskData.executionTime;
    analytics.averageExecutionTime = totalTime / analytics.totalAgentExecutions;
  }
  
  writeData('analytics', analytics);
  return analytics;
}

// Workflow operations
export function getWorkflows() {
  return readData('workflows');
}

export function addWorkflow(workflow) {
  const workflows = getWorkflows();
  const newWorkflow = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...workflow,
  };
  workflows.push(newWorkflow);
  writeData('workflows', workflows);
  return newWorkflow;
}

export function getWorkflowById(workflowId) {
  const workflows = getWorkflows();
  return workflows.find(w => w.id === workflowId);
}

// Initialize on module load
initializeData();

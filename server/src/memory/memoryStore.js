class MemoryStore {
  constructor() {
    this.memory = new Map();
  }

  // Initialize memory for a task
  initTask(taskId) {
    if (!this.memory.has(taskId)) {
      this.memory.set(taskId, {
        taskId,
        logs: [],
        agents: {
          planner: { status: 'idle', output: null },
          researcher: { status: 'idle', output: null },
          coder: { status: 'idle', output: null },
          tester: { status: 'idle', output: null },
          reporter: { status: 'idle', output: null },
        },
        output: {
          plan: null,
          research: null,
          code: null,
          tests: null,
          report: null,
        },
      });
    }
  }

  // Add a log entry
  addLog(taskId, message, agent = 'system') {
    this.initTask(taskId);
    const timestamp = new Date().toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    this.memory.get(taskId).logs.push({
      timestamp,
      agent,
      message,
    });
  }

  // Update agent status
  updateAgentStatus(taskId, agent, status, output = null) {
    this.initTask(taskId);
    const task = this.memory.get(taskId);
    if (task.agents[agent]) {
      task.agents[agent] = { status, output };
    }
  }

  // Get agent status
  getAgentStatus(taskId) {
    this.initTask(taskId);
    return this.memory.get(taskId).agents;
  }

  // Get logs
  getLogs(taskId) {
    this.initTask(taskId);
    return this.memory.get(taskId).logs;
  }

  // Save agent output
  saveAgentOutput(taskId, agent, data) {
    this.initTask(taskId);
    const task = this.memory.get(taskId);
    task.output[agent] = data;
  }

  // Get agent output
  getAgentOutput(taskId, agent) {
    this.initTask(taskId);
    return this.memory.get(taskId).output[agent];
  }

  // Get full memory
  get(taskId) {
    this.initTask(taskId);
    return this.memory.get(taskId);
  }

  // Clear task memory
  clear(taskId) {
    this.memory.delete(taskId);
  }
}

export const memoryStore = new MemoryStore();

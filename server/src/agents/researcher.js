import { memoryStore } from '../memory/memoryStore.js';

export class Researcher {
  constructor(taskId) {
    this.taskId = taskId;
    this.name = 'QueryLyn';
    this.role = 'Research Specialist';
  }

  async run(plan) {
    memoryStore.addLog(this.taskId, `${this.name} started research`, this.name);
    memoryStore.updateAgentStatus(this.taskId, 'researcher', 'running');

    try {
      const research = await this.conductResearch(plan);
      
      memoryStore.updateAgentStatus(this.taskId, 'researcher', 'done', research);
      memoryStore.saveAgentOutput(this.taskId, 'research', research);
      memoryStore.addLog(this.taskId, `${this.name} completed research`, this.name);
      
      return research;
    } catch (error) {
      memoryStore.updateAgentStatus(this.taskId, 'researcher', 'failed');
      memoryStore.addLog(this.taskId, `${this.name} failed: ${error.message}`, this.name);
      throw error;
    }
  }

  async conductResearch(plan) {
    // Simulate research phase
    memoryStore.addLog(this.taskId, `${this.name} analyzing tech stack options`, this.name);
    await new Promise(resolve => setTimeout(resolve, 800));

    memoryStore.addLog(this.taskId, `${this.name} evaluating best practices`, this.name);
    await new Promise(resolve => setTimeout(resolve, 800));

    const research = {
      techStack: {
        frontend: 'Next.js with React 19',
        backend: 'Node.js/Express',
        database: 'PostgreSQL',
        auth: 'JWT + bcrypt',
      },
      recommendations: [
        'Use TypeScript for type safety',
        'Implement proper error handling',
        'Setup comprehensive logging',
        'Use environment variables for configuration',
        'Implement database migrations',
      ],
      estimatedTimeframe: '2-3 weeks for MVP',
    };

    memoryStore.addLog(this.taskId, `${this.name} recommending: ${research.techStack.frontend}`, this.name);

    return research;
  }
}

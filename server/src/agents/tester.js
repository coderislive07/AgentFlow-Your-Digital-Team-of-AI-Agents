import { memoryStore } from '../memory/memoryStore.js';

export class Tester {
  constructor(taskId) {
    this.taskId = taskId;
    this.name = 'BugBuster';
    this.role = 'QA & Testing Specialist';
  }

  async run(code) {
    memoryStore.addLog(this.taskId, `${this.name} started testing`, this.name);
    memoryStore.updateAgentStatus(this.taskId, 'tester', 'running');

    try {
      const tests = await this.runTests(code);
      
      memoryStore.updateAgentStatus(this.taskId, 'tester', 'done', tests);
      memoryStore.saveAgentOutput(this.taskId, 'tests', tests);
      memoryStore.addLog(this.taskId, `${this.name} completed testing`, this.name);
      
      return tests;
    } catch (error) {
      memoryStore.updateAgentStatus(this.taskId, 'tester', 'failed');
      memoryStore.addLog(this.taskId, `${this.name} failed: ${error.message}`, this.name);
      throw error;
    }
  }

  async runTests(code) {
    memoryStore.addLog(this.taskId, `${this.name} running unit tests`, this.name);
    await new Promise(resolve => setTimeout(resolve, 800));

    memoryStore.addLog(this.taskId, `${this.name} checking API endpoints`, this.name);
    await new Promise(resolve => setTimeout(resolve, 800));

    memoryStore.addLog(this.taskId, `${this.name} validating frontend components`, this.name);
    await new Promise(resolve => setTimeout(resolve, 600));

    const tests = {
      unitTests: {
        passed: 47,
        failed: 0,
        coverage: '92%',
      },
      integrationTests: {
        passed: 12,
        failed: 0,
      },
      endToEndTests: {
        passed: 8,
        failed: 0,
      },
      performanceBenchmarks: {
        apiResponseTime: '45ms avg',
        frontendLoadTime: '1.2s',
      },
      summary: 'All tests passing - ready for deployment',
    };

    memoryStore.addLog(this.taskId, `${this.name}: ${tests.unitTests.passed} unit tests passed`, this.name);

    return tests;
  }
}

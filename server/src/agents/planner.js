import { llm } from '../utils/geminiLLM.js';
import { memoryStore } from '../memory/memoryStore.js';

export class Planner {
  constructor(taskId) {
    this.taskId = taskId;
    this.name = 'PlanZilla';
    this.role = 'Strategic Planner';
  }

  async run(task) {
    memoryStore.addLog(this.taskId, `${this.name} started planning`, this.name);
    memoryStore.updateAgentStatus(this.taskId, 'planner', 'running');

    try {
      const plan = await this.createPlan(task);
      
      memoryStore.updateAgentStatus(this.taskId, 'planner', 'done', plan);
      memoryStore.saveAgentOutput(this.taskId, 'plan', plan);
      memoryStore.addLog(this.taskId, `${this.name} completed planning: ${plan.steps.length} steps identified`, this.name);
      
      return plan;
    } catch (error) {
      memoryStore.updateAgentStatus(this.taskId, 'planner', 'failed');
      memoryStore.addLog(this.taskId, `${this.name} failed: ${error.message}`, this.name);
      throw error;
    }
  }

  async createPlan(task) {
    memoryStore.addLog(this.taskId, `${this.name} analyzing task complexity and scope`, this.name);

    const prompt = `You are an expert software architect and project planner.

Analyze this task and break it into concrete, implementable steps:

TASK: "${task}"

REQUIREMENTS:
1. Identify task complexity (simple/medium/complex)
2. List 5-8 concrete steps with specific deliverables
3. Flag any risks or dependencies
4. Estimate relative time for each step
5. Suggest tech stack considerations

Return ONLY valid JSON (no markdown, no code blocks):
{
  "complexity": "string",
  "estimatedDuration": "string",
  "steps": [
    {
      "id": number,
      "title": "string",
      "description": "string",
      "deliverable": "string",
      "estimatedTime": "string",
      "risks": ["string"]
    }
  ],
  "technicalConsiderations": ["string"],
  "dependencies": ["string"],
  "reasoning": "string"
}`;

    try {
      const result = await llm.generate({
        system: 'You are PlanZilla, a strategic planning agent. You think deeply about project structure and identify real risks.',
        prompt,
        temperature: 0.8,
        maxTokens: 2000,
      });

      const plan = typeof result === 'string' ? JSON.parse(result) : result;
      
      memoryStore.addLog(this.taskId, `${this.name}: ${plan.steps.length} steps, ${plan.complexity} complexity`, this.name);
      
      return plan;
    } catch (error) {
      memoryStore.addLog(this.taskId, `${this.name} LLM error, using fallback planning`, this.name);
      
      // Fallback plan if LLM fails
      return {
        complexity: 'medium',
        estimatedDuration: '2-3 weeks',
        steps: [
          {
            id: 1,
            title: 'Requirements Analysis',
            description: 'Analyze and clarify requirements',
            deliverable: 'Requirements document',
            estimatedTime: '1-2 days',
            risks: ['Unclear scope']
          },
          {
            id: 2,
            title: 'Architecture Design',
            description: 'Design system architecture',
            deliverable: 'Architecture diagram',
            estimatedTime: '2-3 days',
            risks: ['Design complexity']
          },
        ],
        technicalConsiderations: ['Use TypeScript', 'Implement proper logging'],
        dependencies: [],
        reasoning: 'Fallback plan generated due to LLM error',
      };
    }
  }
}

import { Planner } from '../agents/planner.js';
import { Researcher } from '../agents/researcher.js';
import { Coder } from '../agents/coder.js';
import { Tester } from '../agents/tester.js';
import { Reporter } from '../agents/reporter.js';
import { memoryStore } from '../memory/memoryStore.js';


export class Orchestrator {
  constructor(taskId) {
    this.taskId = taskId;
    this.agents = {
      planner: new Planner(taskId),
      researcher: new Researcher(taskId),
      coder: new Coder(taskId),
      tester: new Tester(taskId),
      reporter: new Reporter(taskId),
    };
    this.outputs = {};
  }

  /**
   * Main orchestration flow with human-like agent collaboration
   * @param {string} task - The task description
   * @returns {Promise<Object>} Complete project analysis and code
   */
  async execute(task) {
    console.log(`\n🚀 Starting orchestration for task: "${task}"\n`);
    memoryStore.addLog(this.taskId, `Orchestrator: Starting execution`, 'orchestrator');

    try {
      // Phase 1: Planning
      console.log('📋 Phase 1: Strategic Planning');
      const plan = await this.agents.planner.run(task);
      this.outputs.plan = plan;
      memoryStore.saveAgentOutput(this.taskId, 'plan', plan);

      // Phase 2: Research (uses plan as context)
      console.log('🔍 Phase 2: Technology Research');
      const research = await this.agents.researcher.run(plan);
      this.outputs.research = research;
      memoryStore.saveAgentOutput(this.taskId, 'research', research);

      // Phase 3: Code Generation (uses plan + research)
      console.log('💻 Phase 3: Code Generation');
      const code = await this.agents.coder.run(plan, research);
      this.outputs.code = code;
      memoryStore.saveAgentOutput(this.taskId, 'code', code);

      // Phase 4: Quality Testing (analyzes generated code)
      console.log('🧪 Phase 4: Quality Testing & Analysis');
      const tests = await this.agents.tester.run(code);
      this.outputs.tests = tests;
      memoryStore.saveAgentOutput(this.taskId, 'tests', tests);

      // Phase 4b: Conditional - If critical issues found, could loop back to coder
      if (tests.hasCriticalIssues && tests.issues.length > 0) {
        console.log('⚠️  Critical issues found - flagging for developer review');
        memoryStore.addLog(
          this.taskId,
          `Tester identified ${tests.issues.length} issues requiring attention`,
          'orchestrator'
        );
      }

      // Phase 5: Final Reporting (synthesizes all insights)
      console.log('📊 Phase 5: Final Report Generation');
      const report = await this.agents.reporter.run(plan, research, code, tests);
      this.outputs.report = report;
      memoryStore.saveAgentOutput(this.taskId, 'report', report);

      // Generate summary
      const summary = this.generateSummary();
      console.log('\n✅ Orchestration Complete!\n');
      console.log(summary);

      memoryStore.addLog(
        this.taskId,
        'Orchestrator: Execution completed successfully',
        'orchestrator'
      );

      return {
        taskId: this.taskId,
        task,
        outputs: this.outputs,
        summary,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('❌ Orchestration failed:', error.message);
      memoryStore.addLog(
        this.taskId,
        `Orchestrator: Execution failed - ${error.message}`,
        'orchestrator'
      );
      throw error;
    }
  }

  /**
   * Generate human-readable summary of execution
   */
  generateSummary() {
    const { plan, research, code, tests, report } = this.outputs;

    let summary = '\n' + '='.repeat(60);
    summary += '\n  MULTI-AGENT ORCHESTRATION SUMMARY';
    summary += '\n' + '='.repeat(60);

    if (plan) {
      summary += `\n\n📋 PLANNING PHASE`;
      summary += `\n   Complexity: ${plan.complexity}`;
      summary += `\n   Steps Identified: ${plan.steps?.length || 0}`;
      summary += `\n   Estimated Duration: ${plan.estimatedDuration}`;
      if (plan.steps && plan.steps.length > 0) {
        summary += `\n   First Step: ${plan.steps[0].title}`;
      }
    }

    if (research) {
      summary += `\n\n🔍 RESEARCH PHASE`;
      summary += `\n   Frontend: ${research.techStack?.frontend?.split('\n')[0] || 'N/A'}`;
      summary += `\n   Backend: ${research.techStack?.backend?.split('\n')[0] || 'N/A'}`;
      summary += `\n   Database: ${research.techStack?.database?.split('\n')[0] || 'N/A'}`;
      summary += `\n   Recommendations: ${research.recommendations?.length || 0}`;
    }

    if (code) {
      summary += `\n\n💻 CODE GENERATION PHASE`;
      summary += `\n   Files Generated: ${Object.keys(code.files || {}).length}`;
      summary += `\n   Dependencies: ${(code.dependencies?.production || []).length} prod, ${(code.dependencies?.development || []).length} dev`;
      summary += `\n   Setup Steps: ${code.setupInstructions?.length || 0}`;
    }

    if (tests) {
      summary += `\n\n🧪 TESTING PHASE`;
      summary += `\n   Quality Score: ${tests.qualityScore || 'N/A'}/100`;
      summary += `\n   Issues Found: ${tests.issues?.length || 0}`;
      summary += `\n   Critical Issues: ${tests.issues?.filter((i) => i.severity === 'critical').length || 0}`;
      summary += `\n   Security Concerns: ${tests.securityConcerns?.length || 0}`;
      summary += `\n   Status: ${tests.hasCriticalIssues ? '⚠️  NEEDS REVIEW' : '✅ READY'}`;
    }

    if (report) {
      summary += `\n\n📊 FINAL REPORT`;
      summary += `\n   Title: ${report.title}`;
      summary += `\n   Quality Score: ${report.qualityAssessment?.overallScore || 'N/A'}`;
      summary += `\n   Identified Risks: ${report.riskAnalysis?.identifiedRisks?.length || 0}`;
      summary += `\n   Recommended Next Steps: ${report.recommendedNextSteps?.length || 0}`;
    }

    summary += '\n' + '='.repeat(60) + '\n';
    return summary;
  }

  /**
   * Get all agent outputs in structured format
   */
  getAllOutputs() {
    return this.outputs;
  }

  /**
   * Get agent output by type
   */
  getOutput(type) {
    return this.outputs[type];
  }

  /**
   * Get execution logs from memory store
   */
  getExecutionLogs() {
    return memoryStore.getLogs(this.taskId);
  }

  /**
   * Stream output from agents in real-time (for live UI updates)
   * This would integrate with your WebSocket/real-time system
   */
  async *executeWithStreaming(task) {
    yield { status: 'planning', message: 'Starting strategic planning...' };

    const plan = await this.agents.planner.run(task);
    this.outputs.plan = plan;
    yield { status: 'planning_complete', data: plan };

    yield { status: 'researching', message: 'Evaluating technology options...' };
    const research = await this.agents.researcher.run(plan);
    this.outputs.research = research;
    yield { status: 'research_complete', data: research };

    yield { status: 'coding', message: 'Generating code files...' };
    const code = await this.agents.coder.run(plan, research);
    this.outputs.code = code;
    yield { status: 'coding_complete', data: code };

    yield { status: 'testing', message: 'Analyzing code quality...' };
    const tests = await this.agents.tester.run(code);
    this.outputs.tests = tests;
    yield { status: 'testing_complete', data: tests };

    yield { status: 'reporting', message: 'Generating final report...' };
    const report = await this.agents.reporter.run(plan, research, code, tests);
    this.outputs.report = report;
    yield { status: 'reporting_complete', data: report };

    yield { status: 'complete', data: { outputs: this.outputs } };
  }

  /**
   * Validate that all agents can initialize properly
   */
  async healthCheck() {
    const checks = {
      planner: false,
      researcher: false,
      coder: false,
      tester: false,
      reporter: false,
    };

    try {
      // Quick test: can we create all agents?
      Object.keys(checks).forEach((agent) => {
        checks[agent] = this.agents[agent] !== null;
      });

      return {
        healthy: Object.values(checks).every((c) => c),
        agents: checks,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        healthy: false,
        error: error.message,
        agents: checks,
      };
    }
  }
}

/**
 * Example usage:
 *
 * const orchestrator = new Orchestrator('task-123');
 * const result = await orchestrator.execute('Build a real-time chat application');
 *
 * console.log(result.summary);
 * console.log(result.outputs.plan);
 * console.log(result.outputs.code.files);
 * console.log(result.outputs.tests.issues);
 */

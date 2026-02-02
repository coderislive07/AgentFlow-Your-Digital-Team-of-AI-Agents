import { getAgents, addTask, addMemory, searchMemory } from './storage';

const AGENT_ROLES = {
  PLANNER: 'Planner',
  RESEARCHER: 'Researcher',
  DEVELOPER: 'Developer',
  TESTER: 'Tester',
  REPORTER: 'Reporter',
};

// Task decomposition using keyword analysis
function decomposeQuery(query) {
  const queryLower = query.toLowerCase();
  const tasks = [];

  // Check for planning keywords
  if (
    queryLower.includes('plan') ||
    queryLower.includes('design') ||
    queryLower.includes('structure') ||
    queryLower.includes('layout') ||
    queryLower.includes('architecture')
  ) {
    tasks.push({
      title: `Plan and structure for: ${query.substring(0, 50)}...`,
      description: `Create a planning document and task breakdown for the user request`,
      agent: AGENT_ROLES.PLANNER,
      priority: 'high',
      order: 1,
    });
  }

  // Check for research keywords
  if (
    queryLower.includes('research') ||
    queryLower.includes('investigate') ||
    queryLower.includes('analyze') ||
    queryLower.includes('explore') ||
    queryLower.includes('study')
  ) {
    tasks.push({
      title: `Research and analysis for: ${query.substring(0, 50)}...`,
      description: `Conduct research and gather relevant information`,
      agent: AGENT_ROLES.RESEARCHER,
      priority: 'high',
      order: 2,
    });
  }

  // Check for development keywords
  if (
    queryLower.includes('build') ||
    queryLower.includes('create') ||
    queryLower.includes('develop') ||
    queryLower.includes('code') ||
    queryLower.includes('implement') ||
    queryLower.includes('page') ||
    queryLower.includes('site') ||
    queryLower.includes('app')
  ) {
    tasks.push({
      title: `Development: ${query.substring(0, 50)}...`,
      description: `Implement and code the solution`,
      agent: AGENT_ROLES.DEVELOPER,
      priority: 'high',
      order: 3,
    });
  }

  // Check for testing keywords
  if (
    queryLower.includes('test') ||
    queryLower.includes('quality') ||
    queryLower.includes('check') ||
    queryLower.includes('verify') ||
    queryLower.includes('validate')
  ) {
    tasks.push({
      title: `Testing and QA: ${query.substring(0, 50)}...`,
      description: `Test the implementation and ensure quality`,
      agent: AGENT_ROLES.TESTER,
      priority: 'medium',
      order: 4,
    });
  }

  // Always add a reporting task
  tasks.push({
    title: `Final Report: ${query.substring(0, 50)}...`,
    description: `Summarize results and create final report`,
    agent: AGENT_ROLES.REPORTER,
    priority: 'medium',
    order: 5,
  });

  // If no specific tasks were created, create a general workflow
  if (tasks.length === 1) {
    tasks.unshift({
      title: `Planning: ${query.substring(0, 50)}...`,
      description: `Create a plan for the request`,
      agent: AGENT_ROLES.PLANNER,
      priority: 'high',
      order: 0,
    });
    tasks.splice(tasks.length - 1, 0, {
      title: `Implementation: ${query.substring(0, 50)}...`,
      description: `Execute the plan`,
      agent: AGENT_ROLES.DEVELOPER,
      priority: 'high',
      order: 2,
    });
  }

  return tasks.sort((a, b) => a.order - b.order);
}

// Assign tasks based on decomposition
function assignTasks(decomposedTasks) {
  const agents = getAgents();
  const assignments = [];

  decomposedTasks.forEach((task) => {
    const agent = agents.find(
      (a) => a.role === task.agent && a.status === 'active'
    );

    if (agent) {
      assignments.push({
        ...task,
        assignedTo: agent.name,
        assignedAgent: agent,
        status: 'assigned',
        startTime: null,
        endTime: null,
        output: null,
      });
    }
  });

  return assignments;
}

// Get memory context for better task execution
function getMemoryContext(query) {
  const relevantMemory = searchMemory(query);
  return relevantMemory.map((entry) => ({
    content: entry.content,
    tags: entry.tags,
    createdAt: entry.createdAt,
  }));
}

// Main orchestration function
export async function orchestrate(userQuery) {
  try {
    // 1. Analyze query and decompose into tasks
    const decomposedTasks = decomposeQuery(userQuery);

    // 2. Get memory context
    const memoryContext = getMemoryContext(userQuery);

    // 3. Assign tasks to agents
    const assignments = assignTasks(decomposedTasks);

    // 4. Create workflow entry
    const workflow = {
      userQuery,
      status: 'in-progress',
      decomposedTasks: decomposedTasks,
      assignments: assignments,
      memoryContext: memoryContext,
      taskIds: [],
      startTime: new Date().toISOString(),
      endTime: null,
    };

    // 5. Create actual task records
    const createdTasks = [];
    for (const assignment of assignments) {
      const task = addTask({
        title: assignment.title,
        description: assignment.description,
        status: 'todo',
        priority: assignment.priority,
        assignedTo: assignment.assignedTo,
        agent: assignment.assignedAgent,
        workflowId: workflow.id,
        order: assignment.order,
        progress: 0,
        output: null,
      });
      createdTasks.push(task);
      workflow.taskIds.push(task.id);
    }

    // 6. Store memory entry about this request
    addMemory({
      type: 'user_query',
      content: userQuery,
      tags: extractTags(userQuery),
      decomposition: decomposedTasks,
      taskCount: assignments.length,
    });

    return {
      success: true,
      workflow: {
        ...workflow,
        id: Date.now(),
      },
      tasks: createdTasks,
      agents: assignments.map((a) => a.assignedAgent),
    };
  } catch (error) {
    console.error('Orchestration error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Extract tags from query
function extractTags(query) {
  const tags = [];
  const keywords = {
    web: ['website', 'page', 'web', 'site'],
    mobile: ['app', 'mobile', 'ios', 'android'],
    ai: ['ai', 'machine learning', 'nlp', 'agent'],
    design: ['design', 'ui', 'ux', 'layout'],
    database: ['database', 'data', 'db'],
    api: ['api', 'backend', 'server'],
  };

  Object.entries(keywords).forEach(([tag, words]) => {
    if (words.some((word) => query.toLowerCase().includes(word))) {
      tags.push(tag);
    }
  });

  return tags.length > 0 ? tags : ['general'];
}

// Get task execution status
export function getExecutionStatus(workflow) {
  const totalTasks = workflow.taskIds?.length || 0;
  if (totalTasks === 0) return 'idle';
  
  const completedCount = workflow.assignments?.filter(
    (a) => a.status === 'completed'
  ).length || 0;

  if (completedCount === 0) return 'starting';
  if (completedCount < totalTasks) return 'in-progress';
  return 'completed';
}

export default {
  orchestrate,
  decomposeQuery,
  assignTasks,
  getMemoryContext,
  getExecutionStatus,
};

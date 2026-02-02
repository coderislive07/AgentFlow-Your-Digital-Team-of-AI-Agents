import { getTasks, getAgents, getAnalytics, updateAnalytics } from '@/lib/storage';

export async function GET(request) {
  try {
    const tasks = getTasks();
    const agents = getAgents();
    const analytics = getAnalytics();

    // Calculate real-time metrics
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === 'completed').length;
    const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length;
    const todoTasks = tasks.filter((t) => t.status === 'todo').length;

    // Task completion rate
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Priority distribution
    const priorityDistribution = {
      high: tasks.filter((t) => t.priority === 'high').length,
      medium: tasks.filter((t) => t.priority === 'medium').length,
      low: tasks.filter((t) => t.priority === 'low').length,
    };

    // Agent performance
    const agentPerformance = agents.map((agent) => {
      const agentTasks = tasks.filter((t) => t.assignedTo === agent.name);
      const completed = agentTasks.filter((t) => t.status === 'completed').length;
      const total = agentTasks.length;
      const efficiency = total > 0 ? Math.round((completed / total) * 100) : 0;

      return {
        name: agent.name,
        role: agent.role,
        totalTasks: total,
        completedTasks: completed,
        efficiency: efficiency + '%',
        status: agent.status,
      };
    });

    // Task status distribution
    const tasksByStatus = {
      todo: todoTasks,
      inProgress: inProgressTasks,
      completed: completedTasks,
    };

    // Average execution time (in hours)
    const avgExecutionTime = analytics.averageExecutionTime || 0;

    const report = {
      summary: {
        totalTasks,
        completedTasks,
        inProgressTasks,
        todoTasks,
        completionRate: completionRate + '%',
      },
      distribution: {
        byStatus: tasksByStatus,
        byPriority: priorityDistribution,
      },
      agents: agentPerformance,
      metrics: {
        totalAgents: agents.length,
        activeAgents: agents.filter((a) => a.status === 'active').length,
        averageExecutionTime: avgExecutionTime.toFixed(2) + ' hours',
        totalAgentExecutions: analytics.totalAgentExecutions || 0,
      },
      timestamp: new Date().toISOString(),
    };

    return Response.json({
      success: true,
      analytics: report,
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { ...updates } = body;

    const updated = updateAnalytics(updates);

    return Response.json({
      success: true,
      analytics: updated,
      message: 'Analytics updated successfully',
    });
  } catch (error) {
    console.error('Update analytics error:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

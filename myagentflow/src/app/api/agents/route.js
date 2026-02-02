import { getAgents, getTasks } from '@/lib/storage';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const agents = getAgents();
    const tasks = getTasks();

    // Enhance agents with task statistics
    const enhancedAgents = agents.map((agent) => {
      const agentTasks = tasks.filter((t) => t.assignedTo === agent.name);
      const completedTasks = agentTasks.filter((t) => t.status === 'completed').length;
      const totalTasks = agentTasks.length;
      const efficiency = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      return {
        ...agent,
        totalTasks: totalTasks,
        completedTasks: completedTasks,
        activeTasks: agentTasks.filter((t) => t.status === 'in-progress').length,
        efficiency: efficiency + '%',
      };
    });

    if (id) {
      const agent = enhancedAgents.find((a) => a.id === parseInt(id));
      if (!agent) {
        return Response.json(
          { success: false, error: 'Agent not found' },
          { status: 404 }
        );
      }
      return Response.json({ success: true, agent });
    }

    return Response.json({
      success: true,
      agents: enhancedAgents,
      total: enhancedAgents.length,
    });
  } catch (error) {
    console.error('Get agents error:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

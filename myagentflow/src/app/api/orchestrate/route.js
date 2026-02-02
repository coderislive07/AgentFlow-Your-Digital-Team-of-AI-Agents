import { orchestrate } from '@/lib/orchestrator';

export async function POST(request) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== 'string') {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid query. Please provide a string query.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Trigger orchestration
    const result = await orchestrate(query);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: result.error,
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        workflow: result.workflow,
        tasks: result.tasks,
        agents: result.agents,
        message: `Successfully created ${result.tasks.length} tasks assigned to ${result.agents.length} agents`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Orchestration API error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to process request: ' + error.message,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function GET(request) {
  return new Response(
    JSON.stringify({
      message: 'POST a query to /api/orchestrate to decompose tasks and assign to agents',
      example: {
        method: 'POST',
        body: {
          query: 'Build a landing page for AgentFlow and test it',
        },
      },
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

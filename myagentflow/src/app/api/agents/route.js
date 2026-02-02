import agentService from '@/services/agentService';
import logger from '@/lib/logger';
import { handleError, asyncHandler } from '@/lib/errors';
import { validateRequest, createAgentSchema } from '@/lib/validators';

export const GET = asyncHandler(async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const status = searchParams.get('status');
    const role = searchParams.get('role');

    // Get single agent
    if (id) {
      const agent = await agentService.getAgentById(id);
      return Response.json({
        success: true,
        agent,
      });
    }

    // Get all agents with filters
    const filters = {};
    if (status) filters.status = status;
    if (role) filters.role = role;

    const agents = await agentService.getAgents(filters);

    logger.info('Agents retrieved', { count: agents.length });
    return Response.json({
      success: true,
      agents,
      total: agents.length,
    });
  } catch (error) {
    return handleError(error, Response);
  }
});

export const POST = asyncHandler(async (request) => {
  try {
    const body = await request.json();

    // Validate input
    const validated = createAgentSchema.parse(body);

    const agent = await agentService.createAgent(validated);

    logger.info('Agent created successfully', { agentId: agent._id });
    return Response.json(
      {
        success: true,
        agent,
        message: 'Agent created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, Response);
  }
});

export const PUT = asyncHandler(async (request) => {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return Response.json(
        {
          success: false,
          error: { message: 'Agent ID is required', statusCode: 400 },
        },
        { status: 400 }
      );
    }

    const agent = await agentService.updateAgent(id, updateData);

    logger.info('Agent updated successfully', { agentId: id });
    return Response.json({
      success: true,
      agent,
      message: 'Agent updated successfully',
    });
  } catch (error) {
    return handleError(error, Response);
  }
});

export const DELETE = asyncHandler(async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json(
        {
          success: false,
          error: { message: 'Agent ID is required', statusCode: 400 },
        },
        { status: 400 }
      );
    }

    await agentService.deleteAgent(id);

    logger.info('Agent deleted successfully', { agentId: id });
    return Response.json({
      success: true,
      message: 'Agent deleted successfully',
    });
  } catch (error) {
    return handleError(error, Response);
  }
});

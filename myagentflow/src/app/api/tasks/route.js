import taskService from '@/services/taskService';
import logger from '@/lib/logger';
import { handleError, asyncHandler } from '@/lib/errors';
import { validateRequest, createTaskSchema, updateTaskSchema } from '@/lib/validators';

export const GET = asyncHandler(async (request, response) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const assignedAgent = searchParams.get('assignedAgent');

    // Get single task
    if (id) {
      const task = await taskService.getTaskById(id);
      return Response.json({
        success: true,
        task,
      });
    }

    // Get filtered tasks
    const filters = {};
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (assignedAgent) filters.assignedAgent = assignedAgent;

    const tasks = await taskService.getTasks(filters);

    logger.info('Tasks retrieved', { count: tasks.length, filters });
    return Response.json({
      success: true,
      tasks,
      total: tasks.length,
    });
  } catch (error) {
    return handleError(error, Response);
  }
});

export const POST = asyncHandler(async (request) => {
  try {
    const body = await request.json();

    // Validate input
    const validated = createTaskSchema.parse(body);

    const task = await taskService.createTask(validated);

    logger.info('Task created successfully', { taskId: task._id });
    return Response.json(
      {
        success: true,
        task,
        message: 'Task created successfully',
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
          error: { message: 'Task ID is required', statusCode: 400 },
        },
        { status: 400 }
      );
    }

    // Validate update data
    const validated = updateTaskSchema.parse(updateData);

    const task = await taskService.updateTask(id, validated);

    logger.info('Task updated successfully', { taskId: id });
    return Response.json({
      success: true,
      task,
      message: 'Task updated successfully',
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
          error: { message: 'Task ID is required', statusCode: 400 },
        },
        { status: 400 }
      );
    }

    await taskService.deleteTask(id);

    logger.info('Task deleted successfully', { taskId: id });
    return Response.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    return handleError(error, Response);
  }
});

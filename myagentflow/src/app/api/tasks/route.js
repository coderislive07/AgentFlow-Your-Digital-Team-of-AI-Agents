import { getTasks, addTask, updateTask, getTaskById } from '@/lib/storage';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const assignedTo = searchParams.get('assignedTo');
    const id = searchParams.get('id');

    let tasks = getTasks();

    // Get single task by ID
    if (id) {
      const task = getTaskById(parseInt(id));
      if (!task) {
        return Response.json(
          { error: 'Task not found' },
          { status: 404 }
        );
      }
      return Response.json({ success: true, task });
    }

    // Filter by status
    if (status) {
      tasks = tasks.filter((t) => t.status === status);
    }

    // Filter by assignedTo
    if (assignedTo) {
      tasks = tasks.filter((t) => t.assignedTo === assignedTo);
    }

    // Sort by creation time (newest first)
    tasks = tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return Response.json({
      success: true,
      tasks: tasks,
      total: tasks.length,
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, priority, assignedTo, status } = body;

    if (!title) {
      return Response.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }

    const newTask = addTask({
      title,
      description: description || '',
      status: status || 'todo',
      priority: priority || 'medium',
      assignedTo: assignedTo || 'Unassigned',
      progress: 0,
    });

    return Response.json({
      success: true,
      task: newTask,
      message: 'Task created successfully',
    });
  } catch (error) {
    console.error('Create task error:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return Response.json(
        { success: false, error: 'Task ID is required' },
        { status: 400 }
      );
    }

    const updatedTask = updateTask(id, updates);
    if (!updatedTask) {
      return Response.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      task: updatedTask,
      message: 'Task updated successfully',
    });
  } catch (error) {
    console.error('Update task error:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

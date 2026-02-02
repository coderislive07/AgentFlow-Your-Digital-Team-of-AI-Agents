import Task from '@/models/Task';
import Agent from '@/models/Agent';
import logger from '@/lib/logger';
import { NotFoundError, ValidationError } from '@/lib/errors';
import connectDB from '@/lib/mongodb';

export const taskService = {
  // Get all tasks with filters
  async getTasks(filters = {}) {
    await connectDB();
    try {
      const query = Task.find();

      if (filters.status) {
        query.where('status').equals(filters.status);
      }
      if (filters.priority) {
        query.where('priority').equals(filters.priority);
      }
      if (filters.assignedAgent) {
        query.where('assignedAgent').equals(filters.assignedAgent);
      }
      if (filters.search) {
        query.where('title').regex(filters.search, 'i');
      }

      const tasks = await query
        .populate('assignedTo', 'name role')
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 })
        .lean();

      logger.info('Retrieved tasks', { count: tasks.length, filters });
      return tasks;
    } catch (error) {
      logger.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Get single task
  async getTaskById(taskId) {
    await connectDB();
    try {
      const task = await Task.findById(taskId)
        .populate('assignedTo', 'name role')
        .populate('createdBy', 'name email')
        .populate('comments.author', 'name email');

      if (!task) {
        throw new NotFoundError('Task');
      }

      return task;
    } catch (error) {
      logger.error('Error fetching task:', error);
      throw error;
    }
  },

  // Create task
  async createTask(data) {
    await connectDB();
    try {
      const task = new Task(data);
      await task.save();

      const populatedTask = await Task.findById(task._id)
        .populate('assignedTo', 'name role')
        .populate('createdBy', 'name email');

      logger.info('Task created', { taskId: task._id, title: task.title });
      return populatedTask;
    } catch (error) {
      logger.error('Error creating task:', error);
      throw error;
    }
  },

  // Update task
  async updateTask(taskId, data) {
    await connectDB();
    try {
      const task = await Task.findByIdAndUpdate(taskId, data, {
        new: true,
        runValidators: true,
      })
        .populate('assignedTo', 'name role')
        .populate('createdBy', 'name email');

      if (!task) {
        throw new NotFoundError('Task');
      }

      logger.info('Task updated', { taskId, changes: Object.keys(data) });
      return task;
    } catch (error) {
      logger.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete task
  async deleteTask(taskId) {
    await connectDB();
    try {
      const task = await Task.findByIdAndDelete(taskId);

      if (!task) {
        throw new NotFoundError('Task');
      }

      logger.info('Task deleted', { taskId, title: task.title });
      return task;
    } catch (error) {
      logger.error('Error deleting task:', error);
      throw error;
    }
  },

  // Update task progress
  async updateProgress(taskId, progress) {
    await connectDB();
    try {
      if (progress < 0 || progress > 100) {
        throw new ValidationError('Progress must be between 0 and 100');
      }

      const updateData = { progress };
      if (progress === 100) {
        updateData.status = 'completed';
        updateData.completedAt = new Date();
      } else if (progress > 0) {
        updateData.status = 'in-progress';
      }

      const task = await Task.findByIdAndUpdate(taskId, updateData, { new: true });

      if (!task) {
        throw new NotFoundError('Task');
      }

      logger.info('Task progress updated', { taskId, progress });
      return task;
    } catch (error) {
      logger.error('Error updating progress:', error);
      throw error;
    }
  },

  // Get agent tasks statistics
  async getAgentTaskStats(agentName) {
    await connectDB();
    try {
      const stats = await Task.aggregate([
        { $match: { assignedAgent: agentName } },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            completed: {
              $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] },
            },
            inProgress: {
              $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] },
            },
            blocked: {
              $sum: { $cond: [{ $eq: ['$status', 'blocked'] }, 1, 0] },
            },
            avgProgress: { $avg: '$progress' },
          },
        },
      ]);

      return stats[0] || { total: 0, completed: 0, inProgress: 0, blocked: 0 };
    } catch (error) {
      logger.error('Error getting agent stats:', error);
      throw error;
    }
  },
};

export default taskService;

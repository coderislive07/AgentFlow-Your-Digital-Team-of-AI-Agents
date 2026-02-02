import Agent from '@/models/Agent';
import Task from '@/models/Task';
import logger from '@/lib/logger';
import { NotFoundError } from '@/lib/errors';
import connectDB from '@/lib/mongodb';

export const agentService = {
  // Get all agents
  async getAgents(filters = {}) {
    await connectDB();
    try {
      const query = Agent.find();

      if (filters.status) {
        query.where('status').equals(filters.status);
      }
      if (filters.role) {
        query.where('role').equals(filters.role);
      }

      const agents = await query.sort({ createdAt: -1 }).lean();

      // Enhance with task statistics
      const enhancedAgents = await Promise.all(
        agents.map(async (agent) => {
          const taskStats = await Task.aggregate([
            { $match: { assignedAgent: agent.name } },
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
              },
            },
          ]);

          const stats = taskStats[0] || { total: 0, completed: 0, inProgress: 0 };
          const efficiency = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

          return {
            ...agent,
            totalTasks: stats.total,
            completedTasks: stats.completed,
            activeTasks: stats.inProgress,
            efficiency: efficiency + '%',
          };
        })
      );

      logger.info('Retrieved agents', { count: enhancedAgents.length });
      return enhancedAgents;
    } catch (error) {
      logger.error('Error fetching agents:', error);
      throw error;
    }
  },

  // Get single agent
  async getAgentById(agentId) {
    await connectDB();
    try {
      const agent = await Agent.findById(agentId);

      if (!agent) {
        throw new NotFoundError('Agent');
      }

      // Get agent tasks
      const tasks = await Task.find({ assignedAgent: agent.name });

      return {
        ...agent.toObject(),
        tasks,
        totalTasks: tasks.length,
      };
    } catch (error) {
      logger.error('Error fetching agent:', error);
      throw error;
    }
  },

  // Create agent
  async createAgent(data) {
    await connectDB();
    try {
      const agent = new Agent(data);
      await agent.save();

      logger.info('Agent created', { agentId: agent._id, name: agent.name });
      return agent;
    } catch (error) {
      logger.error('Error creating agent:', error);
      throw error;
    }
  },

  // Update agent
  async updateAgent(agentId, data) {
    await connectDB();
    try {
      const agent = await Agent.findByIdAndUpdate(agentId, data, {
        new: true,
        runValidators: true,
      });

      if (!agent) {
        throw new NotFoundError('Agent');
      }

      logger.info('Agent updated', { agentId, changes: Object.keys(data) });
      return agent;
    } catch (error) {
      logger.error('Error updating agent:', error);
      throw error;
    }
  },

  // Delete agent
  async deleteAgent(agentId) {
    await connectDB();
    try {
      const agent = await Agent.findByIdAndDelete(agentId);

      if (!agent) {
        throw new NotFoundError('Agent');
      }

      logger.info('Agent deleted', { agentId, name: agent.name });
      return agent;
    } catch (error) {
      logger.error('Error deleting agent:', error);
      throw error;
    }
  },

  // Update agent status
  async updateAgentStatus(agentId, status) {
    await connectDB();
    try {
      const agent = await Agent.findByIdAndUpdate(
        agentId,
        {
          status,
          lastActivity: new Date(),
        },
        { new: true }
      );

      if (!agent) {
        throw new NotFoundError('Agent');
      }

      logger.info('Agent status updated', { agentId, status });
      return agent;
    } catch (error) {
      logger.error('Error updating agent status:', error);
      throw error;
    }
  },

  // Get agent performance metrics
  async getAgentMetrics(agentId) {
    await connectDB();
    try {
      const agent = await Agent.findById(agentId);

      if (!agent) {
        throw new NotFoundError('Agent');
      }

      const taskMetrics = await Task.aggregate([
        { $match: { assignedAgent: agent.name } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            avgProgress: { $avg: '$progress' },
          },
        },
      ]);

      return {
        agent: agent.name,
        metrics: taskMetrics,
        totalTasks: agent.totalTasks,
        efficiency: agent.efficiency,
      };
    } catch (error) {
      logger.error('Error getting agent metrics:', error);
      throw error;
    }
  },
};

export default agentService;

import Conversation from '@/models/Conversation';
import logger from '@/lib/logger';
import { NotFoundError } from '@/lib/errors';
import connectDB from '@/lib/mongodb';

export const conversationService = {
  // Get user conversations
  async getConversations(userId, filters = {}) {
    await connectDB();
    try {
      const query = Conversation.find({ userId });

      if (filters.status) {
        query.where('status').equals(filters.status);
      }
      if (filters.tags && filters.tags.length > 0) {
        query.where('tags').in(filters.tags);
      }

      const conversations = await query
        .select('-messages') // Exclude messages for list view
        .sort({ createdAt: -1 })
        .lean();

      logger.info('Conversations retrieved', { userId, count: conversations.length });
      return conversations;
    } catch (error) {
      logger.error('Error fetching conversations:', error);
      throw error;
    }
  },

  // Get conversation with messages
  async getConversationById(conversationId, userId) {
    await connectDB();
    try {
      const conversation = await Conversation.findOne({
        _id: conversationId,
        userId,
      });

      if (!conversation) {
        throw new NotFoundError('Conversation');
      }

      return conversation;
    } catch (error) {
      logger.error('Error fetching conversation:', error);
      throw error;
    }
  },

  // Create conversation
  async createConversation(userId, data = {}) {
    await connectDB();
    try {
      const conversation = new Conversation({
        userId,
        title: data.title || 'New Conversation',
        tags: data.tags || [],
      });

      await conversation.save();

      logger.info('Conversation created', {
        conversationId: conversation._id,
        userId,
      });

      return conversation;
    } catch (error) {
      logger.error('Error creating conversation:', error);
      throw error;
    }
  },

  // Add message to conversation
  async addMessage(conversationId, userId, message) {
    await connectDB();
    try {
      const conversation = await Conversation.findOne({
        _id: conversationId,
        userId,
      });

      if (!conversation) {
        throw new NotFoundError('Conversation');
      }

      conversation.messages.push({
        role: message.role,
        content: message.content,
        metadata: message.metadata,
      });

      await conversation.save();

      logger.info('Message added to conversation', {
        conversationId,
        messageRole: message.role,
      });

      return conversation;
    } catch (error) {
      logger.error('Error adding message:', error);
      throw error;
    }
  },

  // Update conversation title
  async updateConversation(conversationId, userId, data) {
    await connectDB();
    try {
      const conversation = await Conversation.findOneAndUpdate(
        { _id: conversationId, userId },
        {
          title: data.title,
          tags: data.tags,
          summary: data.summary,
        },
        { new: true }
      );

      if (!conversation) {
        throw new NotFoundError('Conversation');
      }

      logger.info('Conversation updated', { conversationId });
      return conversation;
    } catch (error) {
      logger.error('Error updating conversation:', error);
      throw error;
    }
  },

  // Archive conversation
  async archiveConversation(conversationId, userId) {
    await connectDB();
    try {
      const conversation = await Conversation.findOneAndUpdate(
        { _id: conversationId, userId },
        { status: 'archived' },
        { new: true }
      );

      if (!conversation) {
        throw new NotFoundError('Conversation');
      }

      logger.info('Conversation archived', { conversationId });
      return conversation;
    } catch (error) {
      logger.error('Error archiving conversation:', error);
      throw error;
    }
  },

  // Delete conversation
  async deleteConversation(conversationId, userId) {
    await connectDB();
    try {
      const conversation = await Conversation.findOneAndDelete({
        _id: conversationId,
        userId,
      });

      if (!conversation) {
        throw new NotFoundError('Conversation');
      }

      logger.info('Conversation deleted', { conversationId });
      return conversation;
    } catch (error) {
      logger.error('Error deleting conversation:', error);
      throw error;
    }
  },

  // Search conversations
  async searchConversations(userId, query) {
    await connectDB();
    try {
      const conversations = await Conversation.find({
        userId,
        $or: [{ title: { $regex: query, $options: 'i' } }, { tags: { $in: [query] } }],
      }).lean();

      return conversations;
    } catch (error) {
      logger.error('Error searching conversations:', error);
      throw error;
    }
  },
};

export default conversationService;

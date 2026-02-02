import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      default: 'New Conversation',
    },
    messages: [
      {
        role: {
          type: String,
          enum: ['user', 'assistant', 'system'],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        metadata: {
          tokenUsage: Number,
          model: String,
          triggeredOrchestration: Boolean,
        },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'archived'],
      default: 'active',
    },
    relatedTasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
    summary: String,
    tags: [String],
  },
  {
    timestamps: true,
  }
);

// Index for faster retrieval
ConversationSchema.index({ userId: 1, createdAt: -1 });
ConversationSchema.index({ status: 1 });

export default mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);

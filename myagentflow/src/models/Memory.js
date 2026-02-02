import mongoose from 'mongoose';

const MemorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
      enum: ['knowledge', 'context', 'learning', 'decision'],
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Technical', 'Documentation', 'Communication', 'Learning', 'Other'],
    },
    tags: [String],
    access: {
      type: String,
      enum: ['private', 'shared', 'public'],
      default: 'private',
    },
    relatedTasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
    relatedAgents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
      },
    ],
    importance: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    fileSize: String,
    lastAccessed: Date,
    accessCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for search and filter
MemorySchema.index({ type: 1, tags: 1 });
MemorySchema.index({ userId: 1, access: 1 });
MemorySchema.index({ title: 'text', content: 'text' });

export default mongoose.models.Memory || mongoose.model('Memory', MemorySchema);

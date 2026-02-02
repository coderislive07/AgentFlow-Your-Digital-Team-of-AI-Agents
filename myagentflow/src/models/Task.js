import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a task title'],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'completed', 'blocked'],
      default: 'todo',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agent',
    },
    assignedAgent: String, // Store agent name for quick access
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    estimatedHours: Number,
    actualHours: Number,
    dueDate: Date,
    completedAt: Date,
    subtasks: [
      {
        title: String,
        completed: Boolean,
        completedAt: Date,
      },
    ],
    attachments: [
      {
        fileName: String,
        fileUrl: String,
        uploadedAt: Date,
      },
    ],
    comments: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    tags: [String],
    workflowId: mongoose.Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

// Indexes for optimized queries
TaskSchema.index({ status: 1, priority: 1 });
TaskSchema.index({ assignedAgent: 1, status: 1 });
TaskSchema.index({ createdBy: 1, createdAt: -1 });

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);

import mongoose from 'mongoose';

const WorkflowSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a workflow name'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    originalQuery: String,
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'failed'],
      default: 'pending',
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
    assignedAgents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    startTime: Date,
    endTime: Date,
    duration: Number, // in milliseconds
    overallProgress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    errorLog: [
      {
        task: String,
        error: String,
        timestamp: Date,
      },
    ],
    results: {
      completedTasks: Number,
      failedTasks: Number,
      averageEfficiency: Number,
    },
    metadata: {
      orchestrationStrategy: String,
      decompositionMethod: String,
      totalSubtasks: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
WorkflowSchema.index({ status: 1, createdAt: -1 });
WorkflowSchema.index({ createdBy: 1 });

export default mongoose.models.Workflow || mongoose.model('Workflow', WorkflowSchema);

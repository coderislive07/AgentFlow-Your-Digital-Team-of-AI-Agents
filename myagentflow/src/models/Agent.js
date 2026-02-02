import mongoose from 'mongoose';

const AgentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide an agent name'],
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Please provide an agent role'],
      enum: ['Planner', 'Developer', 'Researcher', 'Tester', 'Reporter'],
    },
    description: {
      type: String,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ['active', 'idle', 'offline'],
      default: 'active',
    },
    capabilities: [String],
    totalTasks: {
      type: Number,
      default: 0,
    },
    completedTasks: {
      type: Number,
      default: 0,
    },
    efficiency: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    activeTasks: {
      type: Number,
      default: 0,
    },
    lastActivity: Date,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
AgentSchema.index({ name: 1, status: 1 });

export default mongoose.models.Agent || mongoose.model('Agent', AgentSchema);

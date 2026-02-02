import { z } from 'zod';

// User schemas
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Task schemas
export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().max(1000, 'Description too long').optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
  status: z.enum(['todo', 'in-progress', 'completed', 'blocked']).default('todo'),
  assignedAgent: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  estimatedHours: z.number().positive().optional(),
  tags: z.array(z.string()).optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long').optional(),
  description: z.string().max(1000, 'Description too long').optional(),
  status: z.enum(['todo', 'in-progress', 'completed', 'blocked']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  progress: z.number().min(0).max(100).optional(),
  assignedAgent: z.string().optional(),
  dueDate: z.coerce.date().optional(),
});

// Chat/Conversation schemas
export const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(5000, 'Message too long'),
});

export const conversationSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  tags: z.array(z.string()).optional(),
});

// Memory schemas
export const createMemorySchema = z.object({
  type: z.enum(['knowledge', 'context', 'learning', 'decision']),
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().max(500, 'Description too long').optional(),
  content: z.string().min(1, 'Content is required'),
  category: z.enum(['Technical', 'Documentation', 'Communication', 'Learning', 'Other']).optional(),
  tags: z.array(z.string()).optional(),
  access: z.enum(['private', 'shared', 'public']).default('private'),
});

// Agent schemas
export const createAgentSchema = z.object({
  name: z.string().min(1, 'Agent name is required').max(100),
  role: z.enum(['Planner', 'Developer', 'Researcher', 'Tester', 'Reporter']),
  description: z.string().max(500).optional(),
  capabilities: z.array(z.string()).optional(),
});

// Workflow/Orchestration schemas
export const orchestrationSchema = z.object({
  query: z.string().min(1, 'Query is required'),
  priority: z.enum(['low', 'medium', 'high']).default('medium').optional(),
});

// Validation middleware
export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req.body);
      req.validated = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce((acc, err) => {
          const field = err.path.join('.');
          acc[field] = err.message;
          return acc;
        }, {});

        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          fieldErrors,
        });
      }
      next(error);
    }
  };
};

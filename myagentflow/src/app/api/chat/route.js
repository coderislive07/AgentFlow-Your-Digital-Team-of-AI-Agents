import { CohereClientV2 } from 'cohere-ai';
import { orchestrate } from '@/lib/orchestrator';
import conversationService from '@/services/conversationService';
import logger from '@/lib/logger';
import { handleError, asyncHandler, UnauthorizedError, ValidationError } from '@/lib/errors';
import { chatSchema } from '@/lib/validators';

const client = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

const TASK_TRIGGER_KEYWORDS = [
  'build',
  'create',
  'develop',
  'design',
  'implement',
  'make',
  'code',
  'test',
  'deploy',
  'research',
  'analyze',
  'plan',
];

function shouldTriggerOrchestrator(message) {
  const messageLower = message.toLowerCase();
  return TASK_TRIGGER_KEYWORDS.some((keyword) =>
    messageLower.includes(keyword)
  );
}

export const POST = asyncHandler(async (request) => {
  try {
    const body = await request.json();
    const { message, conversationId, conversationHistory = [] } = body;

    // Validate input
    chatSchema.parse({ message });

    if (!process.env.COHERE_API_KEY) {
      throw new UnauthorizedError('Cohere API key is not configured');
    }

    logger.info('Chat request received', { messageLength: message.length });

    // Build conversation history for Cohere
    const messages = [
      ...conversationHistory,
      {
        role: 'user',
        content: message,
      },
    ];

    // Get response from Cohere
    const response = await client.chat({
      model: 'command-r-plus',
      messages: messages,
      maxTokens: 1024,
    });

    const assistantMessage = response.message.content[0].text;

    // Check if this should trigger orchestration
    let orchestrationResult = null;
    const triggeredOrchestration = shouldTriggerOrchestrator(message);

    if (triggeredOrchestration) {
      try {
        orchestrationResult = await orchestrate(message);
        logger.info('Orchestration triggered', {
          conversationId,
          taskCount: orchestrationResult?.tasks?.length,
        });
      } catch (orchError) {
        logger.error('Orchestration error:', orchError);
        // Don't fail the chat response if orchestration fails
        orchestrationResult = null;
      }
    }

    // Store message in database if conversationId provided
    if (conversationId) {
      try {
        await conversationService.addMessage(conversationId, null, {
          role: 'user',
          content: message,
          metadata: { triggeredOrchestration },
        });

        await conversationService.addMessage(conversationId, null, {
          role: 'assistant',
          content: assistantMessage,
          metadata: { model: 'command-r-plus' },
        });
      } catch (dbError) {
        logger.warn('Failed to store conversation', { error: dbError.message });
      }
    }

    return Response.json({
      message: assistantMessage,
      success: true,
      orchestration: orchestrationResult,
      triggeredOrchestration,
    });
  } catch (error) {
    return handleError(error, Response);
  }
});

export async function GET() {
  return Response.json({
    message: 'Cohere Chat API endpoint with Orchestrator integration',
    method: 'POST',
    required: ['message'],
    optional: ['conversationHistory'],
    features: [
      'Cohere AI chat responses',
      'Automatic task decomposition on action keywords',
      'Agent assignment and execution',
    ],
  });
}

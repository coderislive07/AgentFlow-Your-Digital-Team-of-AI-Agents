import { CohereClientV2 } from 'cohere-ai';
import { orchestrate } from '@/lib/orchestrator';
import { addConversation, updateConversation } from '@/lib/storage';

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

export async function POST(request) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message) {
      return Response.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.COHERE_API_KEY) {
      return Response.json(
        { error: 'Cohere API key is not configured' },
        { status: 500 }
      );
    }

    // Build conversation history for context
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
    if (shouldTriggerOrchestrator(message)) {
      orchestrationResult = await orchestrate(message);
    }

    return Response.json({
      message: assistantMessage,
      success: true,
      orchestration: orchestrationResult,
      triggeredOrchestration: orchestrationResult?.success || false,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      {
        error: 'Failed to process chat message',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

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

import { CohereClientV2 } from 'cohere-ai';

const client = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

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

    const response = await client.chat({
      model: 'command-r-plus',
      messages: messages,
      maxTokens: 1024,
    });

    const assistantMessage = response.message.content[0].text;

    return Response.json({
      message: assistantMessage,
      success: true,
    });
  } catch (error) {
    console.error('Cohere API error:', error);
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
    message: 'Cohere Chat API endpoint',
    method: 'POST',
    required: ['message'],
    optional: ['conversationHistory'],
  });
}

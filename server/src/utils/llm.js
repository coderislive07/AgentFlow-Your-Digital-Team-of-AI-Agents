import axios from 'axios';

export async function llm(prompt, model = 'gpt-3.5-turbo') {
  // This is a placeholder for LLM integration
  // In production, integrate with OpenAI, Gemini, or your preferred LLM service
  
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.warn('OPENAI_API_KEY not set. Using mock response.');
      return getMockResponse(prompt);
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1500,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('LLM Error:', error.message);
    return getMockResponse(prompt);
  }
}

function getMockResponse(prompt) {
  // Mock responses for demonstration
  if (prompt.includes('Break this task')) {
    return 'Step 1: Analyze requirements\nStep 2: Design architecture\nStep 3: Implement features';
  }
  return 'Mock LLM response - configure OPENAI_API_KEY for real responses';
}

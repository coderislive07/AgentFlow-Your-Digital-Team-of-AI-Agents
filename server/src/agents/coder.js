import { llm } from '../utils/geminiLLM.js';
import { memoryStore } from '../memory/memoryStore.js';

export class Coder {
  constructor(taskId) {
    this.taskId = taskId;
    this.name = 'CodeWizard';
    this.role = 'Code Generation Specialist';
  }

  async run(plan, research) {
    memoryStore.addLog(this.taskId, `${this.name} started code generation`, this.name);
    memoryStore.updateAgentStatus(this.taskId, 'coder', 'running');

    try {
      const code = await this.generateCode(plan, research);
      
      memoryStore.updateAgentStatus(this.taskId, 'coder', 'done', code);
      memoryStore.saveAgentOutput(this.taskId, 'code', code);
      memoryStore.addLog(this.taskId, `${this.name} generated ${Object.keys(code.files).length} files`, this.name);
      
      return code;
    } catch (error) {
      memoryStore.updateAgentStatus(this.taskId, 'coder', 'failed');
      memoryStore.addLog(this.taskId, `${this.name} failed: ${error.message}`, this.name);
      throw error;
    }
  }

  async generateCode(plan, research) {
    memoryStore.addLog(this.taskId, `${this.name} generating project structure based on tech stack`, this.name);

    const planContext = JSON.stringify(plan, null, 2);
    const techStackContext = JSON.stringify(research.techStack, null, 2);

    const prompt = `You are CodeWizard, an expert full-stack developer.

Generate production-ready starter code based on this plan and tech stack:

PLAN:
${planContext}

TECH STACK:
${techStackContext}

REQUIREMENTS:
1. Generate key project files with actual code
2. Include proper error handling and logging
3. Use environment variables for config
4. Follow best practices for the chosen stack
5. Include database schema if needed
6. Generate 5-8 key files that form the foundation

Return ONLY valid JSON with NO markdown:
{
  "projectStructure": "string describing folder structure",
  "files": {
    "path/to/file.ext": "actual file contents"
  },
  "dependencies": {
    "production": ["string"],
    "development": ["string"]
  },
  "setupInstructions": ["string"],
  "notes": "string"
}`;

    try {
      memoryStore.addLog(this.taskId, `${this.name} generating backend structure`, this.name);
      
      const result = await llm.generate({
        system: 'You are CodeWizard, an expert coder. Generate clean, production-ready code following best practices.',
        prompt,
        temperature: 0.7,
        maxTokens: 4000,
      });

      const code = typeof result === 'string' ? JSON.parse(result) : result;
      
      memoryStore.addLog(this.taskId, `${this.name} generated ${code.setupInstructions.length} setup steps`, this.name);
      
      return code;
    } catch (error) {
      memoryStore.addLog(this.taskId, `${this.name} LLM error, generating minimal starter`, this.name);
      
      // Fallback code generation
      return {
        projectStructure: `
server/
  src/
    index.js
    config.js
    middleware.js
    routes/
      auth.js
  package.json
client/
  app/
    page.tsx
    layout.tsx
  components/
    Header.tsx
  package.json
  tailwind.config.js
        `,
        files: {
          'server/src/index.js': `import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`,
          'client/app/page.tsx': `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome</h1>
      <p className="text-xl text-gray-600">Your project is ready</p>
    </main>
  );
}`,
          '.env.example': `GEMINI_API_KEY=your_key_here
DATABASE_URL=your_db_url
NODE_ENV=development
PORT=3001`,
        },
        dependencies: {
          production: ['express', 'cors', 'dotenv', 'next', 'react'],
          development: ['nodemon', 'typescript']
        },
        setupInstructions: [
          'Install dependencies: npm install',
          'Setup environment variables from .env.example',
          'Start backend: npm run dev --workspace=server',
          'Start frontend: npm run dev --workspace=client'
        ],
        notes: 'Fallback starter code generated'
      };
    }
  }
}

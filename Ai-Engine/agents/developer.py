import cohere
import os
from dotenv import load_dotenv
from tools.file_writer import FileWriter

load_dotenv()

class DeveloperAgent:
    def __init__(self):
        self.co = cohere.Client(os.getenv("COHERE_API_KEY"))
        self.file_writer = FileWriter()

    def generate_code(self, task_id, research_steps):
        print("Developer Agent received:", research_steps)

        prompt = f"""
        You are a senior full-stack developer.

        Based on the following steps, generate code or implementation:

        {research_steps}

        Provide clean and production-ready code.
        """

        response = self.co.chat(
            model="command-xlarge-nightly",
            message=prompt,
            max_tokens=3000,
            temperature=0.2,
        )

        generated_code = response.text.strip()

        file_path = self.file_writer.write_file(
            task_id,
            "app.js",
            generated_code
        )

        return {
            "code": generated_code,
            "file_path": file_path
        }
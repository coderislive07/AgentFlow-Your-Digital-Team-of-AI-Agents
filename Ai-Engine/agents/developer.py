import cohere
import os
from dotenv import load_dotenv

load_dotenv()

class DeveloperAgent:
    def __init__(self):
        self.co = cohere.Client(os.getenv("COHERE_API_KEY"))

    def generate_code(self, task_id, research_steps, tool_manager):
        print("Developer Agent received:", research_steps)

        prompt = f"""
        You are a senior full-stack developer.

        Based on the following steps, generate code:

        {research_steps}

        Provide clean production-ready code.
        """

        
        response = self.co.chat(
            model="command-xlarge-nightly",
            message=prompt,
            max_tokens=3000,
            temperature=0.2,
        )

        generated_code = response.text.strip()

        # too manager is used here to write the generated code to a file using the FileWriter tool. The developer agent doesn't need to know how the file writing is implemented, it just calls the tool manager with the necessary arguments and gets back the file path where the code is saved. This separation of concerns allows the developer agent to focus on code generation while delegating file management to the tool manager.
        file_path = tool_manager.execute(
            "file_writer",
            task_id=task_id,
            filename="app.js",
            content=generated_code
        )

        return {
            "code": generated_code,
            "file_path": file_path
        }
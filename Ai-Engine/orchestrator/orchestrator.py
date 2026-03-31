from agents.planner import PlannerAgent
from agents.researcher import ResearchAgent
from agents.developer import DeveloperAgent
from agents.reporter import ReporterAgent
from memory.memory_store import MemoryStore
from agents.tester import TesterAgent
from tools.tool_manager import ToolManager
from tools.file_writer import FileWriter

import cohere
import os
from dotenv import load_dotenv


class Orchestrator:
    def __init__(self):
        self.planner = PlannerAgent()
        self.researcher = ResearchAgent()
        self.developer = DeveloperAgent()
        self.reporter = ReporterAgent()
        self.tester = TesterAgent()
        self.tool_manager = ToolManager()
        self.tool_manager.register_tool("file_writer", FileWriter())

        load_dotenv()
        self.co = cohere.Client(os.getenv("COHERE_API_KEY"))

    # this is decision engine that decides which agent to run next based on the current state of the task in memory
    def decide_next_agent(self, memory):
        state = {
            "plan": memory.load("plan"),
            "research": memory.load("research"),
            "code": memory.load("code"),
            "test": memory.load("test"),
            "report": memory.load("report")

        }

        prompt = f"""
        You are an AI orchestrator managing a software team.

        Current state:
        {state}

        Decide which agent should run next.

        Rules:
        - If no plan → planner
        - If plan exists but no research → researcher
        - If research exists but no code → developer
        - If code exists but no test → tester
        - If test exists but no report → reporter
        - If everything done → done

        Return only one word.
        """

        response = self.co.chat(
            model="command-xlarge-nightly",
            message=prompt,
            max_tokens=3000,
            temperature=0.2,
        )

        return response.text.strip().lower()

    # 🔥 AUTONOMOUS LOOP
    def process_task(self, task):
        print("Orchestrator received task:", task)
        memory = MemoryStore(task["id"])  # create a new memory store for this task as dictionary with task id as key and value as another dictionary that will store the plan, research, code, test and report for this task
        while True:
            next_agent = self.decide_next_agent(memory)
            print("Next Agent:", next_agent)

            if next_agent == "planner":
                plan = self.planner.create_plan(task)
                memory.save("plan", plan)

            elif next_agent == "researcher":
                plan = memory.load("plan")
                research = self.researcher.research(plan)
                memory.save("research", research)

            elif next_agent == "developer":
                research = memory.load("research")
                dev_output = self.developer.generate_code(task["id"], research , self.tool_manager)
                memory.save("code", dev_output["code"])
                memory.save("file_path", dev_output["file_path"])
            elif next_agent == "tester":
                code = memory.load("code")
                test = self.tester.test_code(code)
                memory.save("test", test)

            elif next_agent == "reporter":
                plan = memory.load("plan")
                research = memory.load("research")
                code = memory.load("code")
                test = memory.load("test")

                report = self.reporter.generate_report(plan, research, code, test)
                memory.save("report", report)

            elif next_agent == "done":
                break

        return {
            "plan": memory.load("plan"),
            "research": memory.load("research"),
            "code": memory.load("code"),
            "test": memory.load("test"),
            "report": memory.load("report")
        }
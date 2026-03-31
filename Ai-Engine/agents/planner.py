class PlannerAgent:
    def __init__(self):
        pass
    def create_plan(self, task):
        user_input = task.get("input")

        print("Planner received:", user_input)
        plan = [
            f"Understand the task: {user_input}",
            "Break into smaller features",
            "Design system architecture",
            "Implement features",
            "Test and deploy"
        ]
        return plan


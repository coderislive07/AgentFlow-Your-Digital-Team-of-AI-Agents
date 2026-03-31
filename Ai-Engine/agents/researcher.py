class ResearchAgent:
    def __init__(self):
        pass

    def research(self, plan):
        print("Research Agent received plan:", plan)

        detailed_steps = []

        for step in plan:
            detailed_steps.append(f"{step} with proper tools, libraries, and best practices")

        return detailed_steps
class ToolManager:
    def __init__(self):
        self.tools = {}

    def register_tool(self, name, tool):
        print(f"[ToolManager] Registered tool: {name}")
        self.tools[name] = tool

    def execute(self, tool_name, **kwargs):
        if tool_name not in self.tools:
            raise Exception(f"Tool '{tool_name}' not found")

        print(f"[ToolManager] Executing: {tool_name}")

        tool = self.tools[tool_name]
        return tool(**kwargs)
                # how this whole manager is working ? 
        # this manager is working as a central hub for all the tools that the agents will use.
        # the agents will call the execute method of the tool manager and pass the name of the tool they want to use along with the necessary arguments.
        # the tool manager will then look up the tool in its registry and execute it with the provided arguments, returning the result back to the agent. This way, the agents don't need to know the implementation details of the tools, they just need
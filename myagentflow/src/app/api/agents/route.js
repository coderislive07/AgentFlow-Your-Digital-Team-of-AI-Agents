// Agents API - Get, Create, Update, Delete agents
// This is a mock implementation. Replace with database calls as needed.

const mockAgents = [
  {
    id: 1,
    name: "Planzilla",
    role: "Planner",
    status: "active",
    tasks: 12,
    efficiency: "90%",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    name: "QueryLyn",
    role: "Researcher",
    status: "active",
    tasks: 8,
    efficiency: "91%",
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    name: "CodeWizard",
    role: "Developer",
    status: "active",
    tasks: 15,
    efficiency: "89%",
    createdAt: "2024-01-10",
  },
  {
    id: 4,
    name: "BugBuster",
    role: "Tester",
    status: "idle",
    tasks: 5,
    efficiency: "92%",
    createdAt: "2024-01-10",
  },
  {
    id: 5,
    name: "DataBard",
    role: "Reporter",
    status: "active",
    tasks: 10,
    efficiency: "88%",
    createdAt: "2024-01-10",
  },
]

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      const agent = mockAgents.find((a) => a.id === parseInt(id))
      if (!agent) {
        return Response.json(
          { error: "Agent not found" },
          { status: 404 }
        )
      }
      return Response.json(agent)
    }

    return Response.json({
      agents: mockAgents,
      total: mockAgents.length,
    })
  } catch (error) {
    console.error("API error:", error)
    return Response.json(
      { error: "Failed to fetch agents" },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, role } = body

    if (!name || !role) {
      return Response.json(
        { error: "Name and role are required" },
        { status: 400 }
      )
    }

    const newAgent = {
      id: mockAgents.length + 1,
      name,
      role,
      status: "active",
      tasks: 0,
      efficiency: "0%",
      createdAt: new Date().toISOString().split("T")[0],
    }

    mockAgents.push(newAgent)

    return Response.json(
      {
        message: "Agent created successfully",
        agent: newAgent,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("API error:", error)
    return Response.json(
      { error: "Failed to create agent" },
      { status: 500 }
    )
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return Response.json(
        { error: "Agent ID is required" },
        { status: 400 }
      )
    }

    const agentIndex = mockAgents.findIndex((a) => a.id === id)
    if (agentIndex === -1) {
      return Response.json(
        { error: "Agent not found" },
        { status: 404 }
      )
    }

    mockAgents[agentIndex] = { ...mockAgents[agentIndex], ...updates }

    return Response.json({
      message: "Agent updated successfully",
      agent: mockAgents[agentIndex],
    })
  } catch (error) {
    console.error("API error:", error)
    return Response.json(
      { error: "Failed to update agent" },
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return Response.json(
        { error: "Agent ID is required" },
        { status: 400 }
      )
    }

    const agentIndex = mockAgents.findIndex((a) => a.id === parseInt(id))
    if (agentIndex === -1) {
      return Response.json(
        { error: "Agent not found" },
        { status: 404 }
      )
    }

    const deletedAgent = mockAgents.splice(agentIndex, 1)

    return Response.json({
      message: "Agent deleted successfully",
      agent: deletedAgent[0],
    })
  } catch (error) {
    console.error("API error:", error)
    return Response.json(
      { error: "Failed to delete agent" },
      { status: 500 }
    )
  }
}

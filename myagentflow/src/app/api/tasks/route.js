// Tasks API - Get, Create, Update, Delete tasks
// This is a mock implementation. Replace with database calls as needed.

const mockTasks = [
  {
    id: 1,
    title: "Create a Product Requirement Document (PRD) for a basic RGB color picker",
    description: "Outline features, UI, and UX including hex color code display",
    status: "completed",
    priority: "high",
    assignedTo: "CodeWizard",
    dueDate: "2024-01-15",
    progress: 100,
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    title: "Design the software architecture for the RGB color picker",
    description: "Focus on GUI interactions and RGB slider integration",
    status: "in-progress",
    priority: "high",
    assignedTo: "DataBard",
    dueDate: "2024-01-20",
    progress: 65,
    createdAt: "2024-01-11",
  },
  {
    id: 3,
    title: "Implement the design of the RGB color picker",
    description: "Build GUI, sliders, and hex color display using HTML, CSS, JavaScript",
    status: "in-progress",
    priority: "high",
    assignedTo: "CodeWizard",
    dueDate: "2024-01-25",
    progress: 45,
    createdAt: "2024-01-12",
  },
  {
    id: 4,
    title: "Break down the architecture into manageable tasks",
    description: "Identify task dependencies and prepare detailed task list",
    status: "todo",
    priority: "medium",
    assignedTo: "Planzilla",
    dueDate: "2024-01-18",
    progress: 0,
    createdAt: "2024-01-13",
  },
  {
    id: 5,
    title: "Test RGB color picker functionality",
    description: "Verify slider accuracy and color conversion",
    status: "todo",
    priority: "medium",
    assignedTo: "BugBuster",
    dueDate: "2024-01-28",
    progress: 0,
    createdAt: "2024-01-14",
  },
]

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const status = searchParams.get("status")
    const agent = searchParams.get("agent")

    let results = [...mockTasks]

    if (id) {
      results = results.filter((t) => t.id === parseInt(id))
    }
    if (status) {
      results = results.filter((t) => t.status === status)
    }
    if (agent) {
      results = results.filter((t) => t.assignedTo === agent)
    }

    return Response.json({
      tasks: results,
      total: results.length,
    })
  } catch (error) {
    console.error("API error:", error)
    return Response.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { title, description, priority, assignedTo, dueDate } = body

    if (!title || !priority || !assignedTo || !dueDate) {
      return Response.json(
        { error: "Title, priority, assignedTo, and dueDate are required" },
        { status: 400 }
      )
    }

    const newTask = {
      id: mockTasks.length + 1,
      title,
      description: description || "",
      status: "todo",
      priority,
      assignedTo,
      dueDate,
      progress: 0,
      createdAt: new Date().toISOString().split("T")[0],
    }

    mockTasks.push(newTask)

    return Response.json(
      {
        message: "Task created successfully",
        task: newTask,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("API error:", error)
    return Response.json(
      { error: "Failed to create task" },
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
        { error: "Task ID is required" },
        { status: 400 }
      )
    }

    const taskIndex = mockTasks.findIndex((t) => t.id === id)
    if (taskIndex === -1) {
      return Response.json(
        { error: "Task not found" },
        { status: 404 }
      )
    }

    mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...updates }

    return Response.json({
      message: "Task updated successfully",
      task: mockTasks[taskIndex],
    })
  } catch (error) {
    console.error("API error:", error)
    return Response.json(
      { error: "Failed to update task" },
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
        { error: "Task ID is required" },
        { status: 400 }
      )
    }

    const taskIndex = mockTasks.findIndex((t) => t.id === parseInt(id))
    if (taskIndex === -1) {
      return Response.json(
        { error: "Task not found" },
        { status: 404 }
      )
    }

    const deletedTask = mockTasks.splice(taskIndex, 1)

    return Response.json({
      message: "Task deleted successfully",
      task: deletedTask[0],
    })
  } catch (error) {
    console.error("API error:", error)
    return Response.json(
      { error: "Failed to delete task" },
      { status: 500 }
    )
  }
}

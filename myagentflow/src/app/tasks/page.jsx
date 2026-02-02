"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Filter, Plus, Search, CheckCircle, Clock, AlertCircle, Zap, RefreshCw } from "lucide-react"

const statusIcons = {
  completed: <CheckCircle className="w-5 h-5 text-green-400" />,
  "in-progress": <Clock className="w-5 h-5 text-cyan-400" />,
  todo: <AlertCircle className="w-5 h-5 text-yellow-400" />,
}

const statusColors = {
  completed: "bg-green-900/40 border-green-500/30",
  "in-progress": "bg-cyan-900/40 border-cyan-500/30",
  todo: "bg-yellow-900/40 border-yellow-500/30",
}

const priorityColors = {
  high: "bg-red-500/20 text-red-300",
  medium: "bg-yellow-500/20 text-yellow-300",
  low: "bg-green-500/20 text-green-300",
}

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/tasks')
        const data = await response.json()
        if (data.success) {
          setTasks(data.tasks)
        }
      } catch (error) {
        console.error('Error fetching tasks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
    const interval = setInterval(fetchTasks, 3000)
    return () => clearInterval(interval)
  }, [])

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <Navbar />
      
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, 0.05) 25%, rgba(59, 130, 246, 0.05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.05) 75%, rgba(59, 130, 246, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, 0.05) 25%, rgba(59, 130, 246, 0.05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.05) 75%, rgba(59, 130, 246, 0.05) 76%, transparent 77%, transparent)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Tasks Management</h1>
            <p className="text-blue-300">Track and manage all agent tasks</p>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
              <input
                type="text"
                placeholder="Search tasks by name or agent..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-blue-900/40 border border-blue-500/30 text-white placeholder-blue-300 focus:outline-none focus:border-blue-500/60"
              />
            </div>

            <button className="px-6 py-3 rounded-xl bg-blue-500/30 border border-blue-500/50 text-blue-200 hover:bg-blue-500/50 font-medium flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" /> New Task
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {["all", "todo", "in-progress", "completed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  filter === status
                    ? "bg-blue-500/50 border-blue-500/60 text-white"
                    : "bg-blue-900/40 border-blue-500/30 text-blue-300 hover:bg-blue-900/60"
                } border`}
              >
                {status === "all" ? "All Tasks" : getStatusLabel(status)}
              </button>
            ))}
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`p-6 rounded-xl border transition-all hover:border-opacity-60 ${statusColors[task.status]}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="pt-1">{statusIcons[task.status]}</div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-1">{task.title}</h3>
                      <p className="text-blue-300 text-sm">{task.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-blue-300 mb-2">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <div className="w-full bg-blue-900/40 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-blue-300">
                      Assigned to: <span className="text-white font-medium">{task.assignedTo}</span>
                    </span>
                    <span className="text-blue-300">
                      Due: <span className="text-white font-medium">{task.dueDate}</span>
                    </span>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-blue-500/30 text-blue-200 hover:bg-blue-500/50 text-sm font-medium flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Execute
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

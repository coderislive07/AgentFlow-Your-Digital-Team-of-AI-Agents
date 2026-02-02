"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Planner from '../../../public/Workers/Planner.png'
import Developer from '../../../public/Workers/Developer.png'
import Researcher from '../../../public/Workers/Researcher.png'
import Tester from '../../../public/Workers/Tester.png'
import Reporter from '../../../public/Workers/Reporter.png'
import { Plus, MessageCircle, Sparkles, RefreshCw } from "lucide-react"
import logo from '../../../public/logo.png'
import {useRouter} from 'next/navigation'
import Chatbot from '@/components/Chatbot'

const agentImages = {
  "Planzilla": Planner,
  "QueryLyn": Researcher,
  "CodeWizard": Developer,
  "BugBuster": Tester,
  "DataBard": Reporter,
}

export default function OpsRoom() {
  const [agents, setAgents] = useState([])
  const [tasks, setTasks] = useState([])
  const [selectedAgents, setSelectedAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Fetch agents and tasks on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [agentsRes, tasksRes] = await Promise.all([
          fetch('/api/agents'),
          fetch('/api/tasks'),
        ])

        const agentsData = await agentsRes.json()
        const tasksData = await tasksRes.json()

        if (agentsData.success) {
          setAgents(agentsData.agents)
        }
        if (tasksData.success) {
          setTasks(tasksData.tasks)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // Poll for updates every 3 seconds
    const interval = setInterval(fetchData, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      const [agentsRes, tasksRes] = await Promise.all([
        fetch('/api/agents'),
        fetch('/api/tasks'),
      ])

      const agentsData = await agentsRes.json()
      const tasksData = await tasksRes.json()

      if (agentsData.success) {
        setAgents(agentsData.agents)
      }
      if (tasksData.success) {
        setTasks(tasksData.tasks)
      }
    } catch (error) {
      console.error('Error refreshing data:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const toggleAgent = (agentName) => {
    setSelectedAgents((prev) =>
      prev.includes(agentName)
        ? prev.filter((name) => name !== agentName)
        : [...prev, agentName]
    )
  }

  // Filter tasks by status
  const todoTasks = tasks.filter((t) => t.status === "todo")
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress")
  const completedTasks = tasks.filter((t) => t.status === "completed")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, 0.05) 25%, rgba(59, 130, 246, 0.05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.05) 75%, rgba(59, 130, 246, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, 0.05) 25%, rgba(59, 130, 246, 0.05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.05) 75%, rgba(59, 130, 246, 0.05) 76%, transparent 77%, transparent)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

      <div className="relative z-10 flex h-screen flex-col">
        {/* Header */}
        <div className="border-b border-blue-500/20 bg-white/5 backdrop-blur-xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => window.location.href='/'}>
                <div className="flex items-center justify-center h-8 w-8 bg-white/10 rounded-full">
              <Image src = {logo} alt="AgentFlow Logo" className="h-6 w-6"/>
              </div>
              <span className="text-white font-semibold">AgentFlow OpsRoom</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex cursor-pointer px-3 py-2 text-sm font-semibold text-white
               bg-blue-500/20 backdrop-blur-lg backdrop-saturate-150
               border border-white/20
               shadow-[0_0_20px_rgba(56,189,248,0.3)]
               hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]
               transition-all duration-200
               rounded-lg disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Team Panel */}
     

          {/* Chat and Kanban Split */}
          <div className="flex-1 overflow-hidden flex ">
            {/* Left Panel - Chatbot */}
<div className="w-1/4 border-r border-blue-500/20 bg-white/5 backdrop-blur-xl flex flex-col p-4">
  <Chatbot />
</div>

            
            {/* Main Content Panel - Tasks */}
            <div className="flex-1 overflow-hidden flex flex-col">
                {/* top bar with agents */}
                 <div className="border-b border-blue-500/20 bg-white/5 backdrop-blur-xl px-8 py-4 overflow-x-auto">
            <div className="flex items-center gap-4">
              <span className="text-sm text-blue-300 font-medium">Active Agents ({agents.length})</span>
              <div className="flex gap-4 pb-2">
                {loading ? (
                  <p className="text-gray-400">Loading agents...</p>
                ) : agents.length > 0 ? (
                  agents.map((agent) => (
                    <div
                      key={agent.id}
                      className={`flex-shrink-0 w-52 h-16 rounded-xl flex flex-row items-center justify-center cursor-pointer transition-all transform hover:scale-105 px-2 border ${
                        selectedAgents.includes(agent.name)
                          ? "bg-blue-500/40 border-blue-400 ring-2 ring-blue-400"
                          : "bg-transparent/50 border-blue-500/20 backdrop-blur-md"
                      }`}
                      onClick={() => toggleAgent(agent.name)}
                    >
                      <div className="w-16 h-16 p-1 overflow-hidden flex-shrink-0">
                        <Image
                          src={agentImages[agent.name] || "/placeholder.svg"}
                          alt={agent.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div className="ml-3 flex flex-col gap-y-1 flex-1">
                        <p className="font-medium text-white text-sm">{agent.name}</p>
                        <p className="text-xs text-gray-300">{agent.role}</p>
                        <p className="text-xs text-blue-300">{agent.totalTasks || 0} tasks</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No agents available</p>
                )}
              </div>
            </div>
          </div>
              <div className="p-8 overflow-y-auto h-full">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400">Loading tasks...</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-8">
                    {/* To Do Column */}
                    <div className="w-full">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-blue-400">📋</span> To Do
                        </h3>
                        <p className="text-sm text-blue-300">{todoTasks.length} Tasks</p>
                      </div>
                      <div className="space-y-3">
                        {todoTasks.length > 0 ? (
                          todoTasks.map((task) => (
                            <div
                              key={task.id}
                              className="p-4 rounded-lg bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/30 hover:border-blue-500/60 transition-all cursor-move"
                            >
                              <p className="text-sm font-medium text-white mb-2">{task.title}</p>
                              <p className="text-xs text-blue-300 mb-3">{task.description}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-blue-400">{new Date(task.createdAt).toLocaleString()}</span>
                                <span className="text-xs bg-blue-600/50 text-blue-100 px-2 py-1 rounded">
                                  {task.assignedTo}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">No tasks to do</p>
                        )}
                      </div>
                    </div>

                    {/* In Progress Column */}
                    <div className="w-full">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-cyan-400">📊</span> In Progress
                        </h3>
                        <p className="text-sm text-cyan-300">{inProgressTasks.length} Tasks</p>
                      </div>
                      <div className="space-y-3">
                        {inProgressTasks.length > 0 ? (
                          inProgressTasks.map((task) => (
                            <div
                              key={task.id}
                              className="p-4 rounded-lg bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 hover:border-cyan-500/60 transition-all cursor-move"
                            >
                              <p className="text-sm font-medium text-white mb-2">{task.title}</p>
                              <p className="text-xs text-cyan-300 mb-3">{task.description}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-cyan-400">{new Date(task.createdAt).toLocaleString()}</span>
                                <span className="text-xs bg-cyan-600/50 text-cyan-100 px-2 py-1 rounded">
                                  {task.assignedTo}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">No tasks in progress</p>
                        )}
                      </div>
                    </div>

                    {/* Completed Column */}
                    <div className="w-full">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-green-400">✓</span> Completed
                        </h3>
                        <p className="text-sm text-green-300">{completedTasks.length} Tasks</p>
                      </div>
                      <div className="space-y-3">
                        {completedTasks.length > 0 ? (
                          completedTasks.map((task) => (
                            <div
                              key={task.id}
                              className="p-4 rounded-lg bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-500/30 hover:border-green-500/60 transition-all cursor-move"
                            >
                              <p className="text-sm font-medium text-white mb-2 line-through">{task.title}</p>
                              <p className="text-xs text-green-300 mb-3">{task.description}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-green-400">{new Date(task.createdAt).toLocaleString()}</span>
                                <span className="text-xs bg-green-600/50 text-green-100 px-2 py-1 rounded">
                                  {task.assignedTo}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">No completed tasks</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

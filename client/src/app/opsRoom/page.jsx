"use client"

import { useState } from "react"
import Image from "next/image"
import Planner from '../../../public/Workers/Planner.png'
import Developer from '../../../public/Workers/Developer.png'
import Researcher from '../../../public/Workers/Researcher.png'
import Tester from '../../../public/Workers/Tester.png'
import Reporter from '../../../public/Workers/Reporter.png'
import { Plus, MessageCircle, Sparkles } from "lucide-react"
import logo from '../../../public/logo.png'
import {useRouter} from 'next/navigation'

const agents = [
  { id: 1, name: "Planzilla", role: "Planner", image: Planner, color: "from-orange-500 to-red-500" },
    { id: 2, name: "QueryLyn", role: "Researcher", image: Researcher, color: "from-purple-500 to-pink-500" },
  { id: 3, name: "CodeWizard", role: "Developer", image: Developer, color: "from-blue-500 to-cyan-500" },
  { id: 4, name: "BugBuster", role: "Tester", image: Tester, color: "from-green-500 to-emerald-500" },
  { id: 5, name: "DataBard", role: "Reporter", image: Reporter, color: "from-yellow-500 to-orange-500" },
]

const mockMessages = [
  {
    id: 1,
    agent: "Planzilla",
    role: "Planner",
    message:
      "I have assigned the tasks to the team members. CodeWizard will create the PRD, DataBard will design the software architecture, and QueryLyn will implement the design. The team will work on the project accordingly.",
    timestamp: "00:14",
    status: "OK",
  },
  {
    id: 2,
    agent: "CodeWizard",
    role: "Developer",
    message:
      "Create a Product Requirement Document (PRD) for a basic RGB color picker and slider with a GUI. The PRD should outline the features, user interface, and user experience, including the display of the equivalent hex color code. Use HTML, CSS, and JavaScript for the implementation.",
    timestamp: "00:13",
  },
  {
    id: 3,
    agent: "DataBard",
    role: "Reporter",
    message:
      "Design the software architecture for the RGB color picker, focusing on the GUI and the interaction between the RGB sliders and the display of the hex color code. Use HTML, CSS, and JavaScript for the implementation.",
    timestamp: "00:12",
  },
]

const mockTasks = [
  {
    id: 1,
    title: "Create a Product Requirement Document (PRD) for a basic RGB color picker and slider with a GUI",
    description:
      "The PRD should outline the features, user interface, and user experience, including the display of the equivalent hex color code. Use HTML, CSS, and JavaScript for the implementation.",
    status: "in-progress",
    assignedTo: "CodeWizard",
    timestamp: "00:14",
  },
  {
    id: 2,
    title: "Design the software architecture for the RGB color picker",
    description:
      "Focusing on the GUI and the interaction between the RGB sliders and the display of the hex color code. Use HTML, CSS, and JavaScript for the implementation.",
    status: "in-progress",
    timestamp: "00:13",
    assignedTo: "DataBard",
  },
  {
    id: 3,
    title: "Break down the architecture into manageable tasks",
    description: "Identify task dependencies, and prepare a detailed task list for implementation.",
    status: "todo",
    timestamp: "00:12",
    assignedTo: "Planzilla",
  },
  {
    id: 4,
    title: "Implement the design of the RGB color picker",
    description:
      "Including the GUI, FGB sliders, and the display of the hex color code. Use HTML, CSS and JavaScript for the implementation.",
    status: "completed",
    timestamp: "00:12",
    assignedTo: "CodeWizard",
  },
]

export default function OpsRoom() {
  const [selectedAgents, setSelectedAgents] = useState([])

  const toggleAgent = (id) => {
    setSelectedAgents((prev) => (prev.includes(id) ? prev.filter((aid) => aid !== id) : [...prev, id]))
  }

  const todoTasks = mockTasks.filter((t) => t.status === "todo")
  const inProgressTasks = mockTasks.filter((t) => t.status === "in-progress")
  const completedTasks = mockTasks.filter((t) => t.status === "completed")

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
              <span className="text-white font-semibold">AgentFlow</span>
            </div>
         
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Team Panel */}
     

          {/* Chat and Kanban Split */}
          <div className="flex-1 overflow-hidden flex ">
            {/* Chat Messages */}
           {/* Left Panel */}
           <div className="w-1/3 border-r border-blue-500/20 bg-white/5 backdrop-blur-xl flex flex-col relative">
  {/* New Chat Button (fixed at top-right) */}
  <button className="absolute top-4 right-4 flex cursor-pointer px-3 py-1 text-sm font-semibold text-white
         bg-blue-500/20 backdrop-blur-lg backdrop-saturate-150
         border border-white/20
         transition ease-in-out duration-200
         rounded-lg z-20">
    <Plus className="w-4 h-4 pt-1" />
    New Chat
  </button>

  {/* Chat Messages (scrollable) */}
  <div className="flex-1 overflow-y-auto p-6 space-y-6 mt-14">
    {mockMessages.map((msg) => {
      const agent = agents.find((a) => a.name === msg.agent)
      return (
        <div key={msg.id} className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-blue-400 flex-shrink-0">
              <Image
                src={agent?.image || "/placeholder.svg"}
                alt={msg.agent}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-x-2">
              <p className="text-sm font-semibold text-white">{msg.agent}</p>
              <p className="text-xs text-blue-300 mt-1">| {msg.role}</p>
            </div>
            {msg.status && (
              <span className="text-xs text-green-400 font-medium bg-green-500/20 px-2 py-1 rounded">
                {msg.status}
              </span>
            )}
          </div>
          <p className="text-sm text-blue-200 leading-relaxed ml-13">{msg.message}</p>
          <p className="text-xs text-blue-400 ml-13">{msg.timestamp}</p>
        </div>
      )
    })}
  </div>

  {/* Input Box */}
  <div className="p-4">
    <input
      type="text"
      placeholder="Ask a follow-up..."
      className="w-full px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md text-white placeholder-white-300 border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    />
  </div>
</div>


            
            {/* outer  */}
            <div className="flex-1   overflow-hidden flex flex-col">
                {/* top bar with agents */}
                 <div className="border-b b border-blue-500/20 bg-white/5 backdrop-blur-xl px-8 py-4 ">
            <div className="flex items-center gap-4">
              <span className="text-sm text-blue-300 font-medium"></span>
              <div className="flex gap-7 ">
              {/* all agents are not coming fit going out do something  */}
                {agents.map((agent) => (
                 <div
      key={agent.id}
      className="flex-shrink-0  w-42   h-16 bg-transparent/50 backdrop-blur-md rounded-xl flex flex-row items-center justify-center cursor-pointer transition-transform transform hover:scale-105 px-2"
      onClick={() => toggleAgent(agent.id - 1)}
    >
                    <div
                      className={`flex w-16 h-16   p-1  group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all ${selectedAgents.includes(agent.id - 1) ? "ring-2 ring-blue-400" : ""}`}
                    >
                      <div className="w-full h-full  p-1 overflow-hidden">
                        <Image
                          src={agent.image || "/placeholder.svg"}
                          alt={agent.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                    <div className="ml-3 mt-2 flex flex-col gap-y-1">
                    <p className=" font-medium text-white  text-center">{agent.name}</p>
                    <p className="text-xs text-gray-300 text-center">{agent.role}</p>
                  </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
              <div className="p-8  overflow-y-auto h-full">
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
                      {todoTasks.map((task) => (
                        <div
                          key={task.id}
                          className="p-4 rounded-lg bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/30 hover:border-blue-500/60 transition-all cursor-move"
                        >
                          <p className="text-sm font-medium text-white mb-2">{task.title}</p>
                          <p className="text-xs text-blue-300 mb-3">{task.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-blue-400">{task.timestamp}</span>
                            <span className="text-xs bg-blue-600/50 text-blue-100 px-2 py-1 rounded">
                              {task.assignedTo}
                            </span>
                          </div>
                        </div>
                      ))}
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
                      {inProgressTasks.map((task) => (
                        <div
                          key={task.id}
                          className="p-4 rounded-lg bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 hover:border-cyan-500/60 transition-all cursor-move"
                        >
                          <p className="text-sm font-medium text-white mb-2">{task.title}</p>
                          <p className="text-xs text-cyan-300 mb-3">{task.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-cyan-400">{task.timestamp}</span>
                            <span className="text-xs bg-cyan-600/50 text-cyan-100 px-2 py-1 rounded">
                              {task.assignedTo}
                            </span>
                          </div>
                        </div>
                      ))}
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
                      {completedTasks.map((task) => (
                        <div
                          key={task.id}
                          className="p-4 rounded-lg bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-500/30 hover:border-green-500/60 transition-all cursor-move"
                        >
                          <p className="text-sm font-medium text-white mb-2 line-through">{task.title}</p>
                          <p className="text-xs text-green-300 mb-3">{task.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-green-400">{task.timestamp}</span>
                            <span className="text-xs bg-green-600/50 text-green-100 px-2 py-1 rounded">
                              {task.assignedTo}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

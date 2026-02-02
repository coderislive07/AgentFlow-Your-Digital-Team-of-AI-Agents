"use client"

import { useState } from "react"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Planner from '../../../public/Workers/Planner.png'
import Developer from '../../../public/Workers/Developer.png'
import Researcher from '../../../public/Workers/Researcher.png'
import Tester from '../../../public/Workers/Tester.png'
import Reporter from '../../../public/Workers/Reporter.png'
import { Plus, Edit, Trash2, Settings, Zap } from "lucide-react"

const agents = [
  { id: 1, name: "Planzilla", role: "Planner", image: Planner, color: "from-orange-500 to-red-500", status: "active", tasks: 12 },
  { id: 2, name: "QueryLyn", role: "Researcher", image: Researcher, color: "from-purple-500 to-pink-500", status: "active", tasks: 8 },
  { id: 3, name: "CodeWizard", role: "Developer", image: Developer, color: "from-blue-500 to-cyan-500", status: "active", tasks: 15 },
  { id: 4, name: "BugBuster", role: "Tester", image: Tester, color: "from-green-500 to-emerald-500", status: "idle", tasks: 5 },
  { id: 5, name: "DataBard", role: "Reporter", image: Reporter, color: "from-yellow-500 to-orange-500", status: "active", tasks: 10 },
]

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [showNew, setShowNew] = useState(false)

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
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">Your AI Agents</h1>
            <p className="text-blue-300">Manage and monitor your team of intelligent agents</p>
          </div>

          {/* Agent Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* New Agent Card */}
            <div
              onClick={() => setShowNew(true)}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/30 hover:border-blue-500/60 cursor-pointer transition-all hover:scale-105 flex items-center justify-center min-h-64"
            >
              <div className="text-center">
                <Plus className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <p className="text-white font-semibold">Create New Agent</p>
                <p className="text-blue-300 text-sm">Add another AI agent</p>
              </div>
            </div>

            {/* Agent Cards */}
            {agents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/30 hover:border-blue-500/60 transition-all cursor-pointer hover:scale-105 group"
              >
                <div className="relative mb-4">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-blue-400">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute top-0 right-0 px-3 py-1 rounded-full text-xs font-medium ${
                    agent.status === "active" 
                      ? "bg-green-500/20 text-green-300" 
                      : "bg-yellow-500/20 text-yellow-300"
                  }`}>
                    {agent.status}
                  </div>
                </div>

                <h3 className="text-white font-semibold text-lg text-center mb-1">{agent.name}</h3>
                <p className="text-blue-300 text-sm text-center mb-4">{agent.role}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-300">Tasks Assigned</span>
                    <span className="text-white font-semibold">{agent.tasks}</span>
                  </div>
                  <div className="w-full bg-blue-900/30 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${agent.color} h-2 rounded-full`}
                      style={{ width: `${(agent.tasks / 20) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex-1 px-3 py-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/40 text-xs font-medium flex items-center justify-center gap-1">
                    <Edit className="w-3 h-3" /> Edit
                  </button>
                  <button className="flex-1 px-3 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/40 text-xs font-medium flex items-center justify-center gap-1">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Agent Details Panel */}
          {selectedAgent && (
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/30">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedAgent.name}</h2>
                  <p className="text-blue-300">{selectedAgent.role}</p>
                </div>
                <button 
                  onClick={() => setSelectedAgent(null)}
                  className="text-blue-300 hover:text-blue-100"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-blue-300 text-sm mb-2">Status</p>
                  <p className="text-white font-semibold">{selectedAgent.status}</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-blue-300 text-sm mb-2">Tasks</p>
                  <p className="text-white font-semibold">{selectedAgent.tasks}</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-blue-300 text-sm mb-2">Completion Rate</p>
                  <p className="text-white font-semibold">87%</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-blue-300 text-sm mb-2">Avg Response Time</p>
                  <p className="text-white font-semibold">2.3s</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="px-6 py-2 rounded-lg bg-blue-500/30 text-blue-200 hover:bg-blue-500/50 font-medium flex items-center gap-2">
                  <Settings className="w-4 h-4" /> Configure
                </button>
                <button className="px-6 py-2 rounded-lg bg-cyan-500/30 text-cyan-200 hover:bg-cyan-500/50 font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Run Task
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

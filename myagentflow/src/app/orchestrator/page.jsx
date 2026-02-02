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
import { Play, Pause, RotateCcw, TrendingUp, Zap } from "lucide-react"

const workflows = [
  {
    id: 1,
    name: "Color Picker Development",
    description: "Complete workflow for RGB color picker project",
    status: "running",
    progress: 65,
    agents: ["Planzilla", "CodeWizard", "DataBard", "BugBuster"],
    startTime: "2024-01-15 10:30",
    estimatedTime: "4 hours",
  },
  {
    id: 2,
    name: "API Documentation",
    description: "Generate and update API documentation",
    status: "pending",
    progress: 0,
    agents: ["QueryLyn", "DataBard"],
    startTime: "2024-01-15 14:00",
    estimatedTime: "2 hours",
  },
  {
    id: 3,
    name: "Bug Fix Sprint",
    description: "Review and fix identified bugs",
    status: "completed",
    progress: 100,
    agents: ["BugBuster", "CodeWizard"],
    startTime: "2024-01-10 09:00",
    estimatedTime: "3 hours",
  },
]

const agentImages = {
  Planzilla: Planner,
  QueryLyn: Researcher,
  CodeWizard: Developer,
  BugBuster: Tester,
  DataBard: Reporter,
}

const statusStyles = {
  running: "bg-cyan-900/40 border-cyan-500/30",
  pending: "bg-yellow-900/40 border-yellow-500/30",
  completed: "bg-green-900/40 border-green-500/30",
}

const statusBadges = {
  running: "bg-cyan-500/20 text-cyan-300",
  pending: "bg-yellow-500/20 text-yellow-300",
  completed: "bg-green-500/20 text-green-300",
}

export default function OrchestratorPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(workflows[0])

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
            <h1 className="text-4xl font-bold text-white mb-2">Workflow Orchestration</h1>
            <p className="text-blue-300">Manage and monitor agent workflows and task orchestration</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Workflows List */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">Active Workflows</h2>
                {workflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    onClick={() => setSelectedWorkflow(workflow)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all hover:border-opacity-60 ${
                      selectedWorkflow?.id === workflow.id
                        ? "bg-blue-900/60 border-blue-500/60"
                        : statusStyles[workflow.status]
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-semibold">{workflow.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${statusBadges[workflow.status]}`}>
                        {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-blue-300 text-sm mb-3">{workflow.description}</p>
                    <div className="w-full bg-blue-900/40 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${workflow.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-blue-300 mt-2">{workflow.progress}% complete</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Workflow Details */}
            {selectedWorkflow && (
              <div className="lg:col-span-2">
                <div className={`p-8 rounded-2xl border ${statusStyles[selectedWorkflow.status]}`}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">{selectedWorkflow.name}</h2>
                      <p className="text-blue-300">{selectedWorkflow.description}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusBadges[selectedWorkflow.status]}`}>
                      {selectedWorkflow.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="mb-8">
                    <div className="flex justify-between text-sm text-blue-300 mb-2">
                      <span>Overall Progress</span>
                      <span className="text-white font-semibold">{selectedWorkflow.progress}%</span>
                    </div>
                    <div className="w-full bg-blue-900/40 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all"
                        style={{ width: `${selectedWorkflow.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-lg bg-white/5">
                      <p className="text-blue-300 text-sm mb-1">Started</p>
                      <p className="text-white font-semibold">{selectedWorkflow.startTime}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <p className="text-blue-300 text-sm mb-1">Est. Duration</p>
                      <p className="text-white font-semibold">{selectedWorkflow.estimatedTime}</p>
                    </div>
                  </div>

                  {/* Agents */}
                  <div className="mb-8">
                    <h3 className="text-white font-semibold mb-4">Assigned Agents</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {selectedWorkflow.agents.map((agentName) => (
                        <div
                          key={agentName}
                          className="p-3 rounded-lg bg-white/5 border border-blue-500/30 flex flex-col items-center"
                        >
                          <div className="w-12 h-12 rounded-full overflow-hidden border border-blue-400 mb-2">
                            <Image
                              src={agentImages[agentName] || "/placeholder.svg"}
                              alt={agentName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-white text-sm font-semibold text-center">{agentName}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex gap-3">
                    {selectedWorkflow.status === "running" && (
                      <>
                        <button className="flex-1 px-4 py-3 rounded-lg bg-yellow-500/30 text-yellow-200 hover:bg-yellow-500/50 font-medium flex items-center justify-center gap-2">
                          <Pause className="w-5 h-5" /> Pause
                        </button>
                        <button className="flex-1 px-4 py-3 rounded-lg bg-red-500/30 text-red-200 hover:bg-red-500/50 font-medium flex items-center justify-center gap-2">
                          <RotateCcw className="w-5 h-5" /> Stop
                        </button>
                      </>
                    )}
                    {(selectedWorkflow.status === "pending" || selectedWorkflow.status === "completed") && (
                      <button className="flex-1 px-4 py-3 rounded-lg bg-cyan-500/30 text-cyan-200 hover:bg-cyan-500/50 font-medium flex items-center justify-center gap-2">
                        <Play className="w-5 h-5" /> Start
                      </button>
                    )}
                    <button className="px-6 py-3 rounded-lg bg-blue-500/30 text-blue-200 hover:bg-blue-500/50 font-medium flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" /> Analytics
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

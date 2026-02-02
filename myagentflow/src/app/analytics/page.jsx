"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { TrendingUp, Users, Zap, BarChart3, Calendar, Download } from "lucide-react"

const chartData = [
  { name: "Mon", tasks: 40, completed: 32, inProgress: 8 },
  { name: "Tue", tasks: 55, completed: 45, inProgress: 10 },
  { name: "Wed", tasks: 48, completed: 38, inProgress: 10 },
  { name: "Thu", tasks: 65, completed: 52, inProgress: 13 },
  { name: "Fri", tasks: 72, completed: 58, inProgress: 14 },
  { name: "Sat", tasks: 38, completed: 30, inProgress: 8 },
  { name: "Sun", tasks: 32, completed: 25, inProgress: 7 },
]

const agentStats = [
  { name: "CodeWizard", tasks: 42, completed: 38, efficiency: "90%", activeTime: "6.5h" },
  { name: "Planzilla", tasks: 35, completed: 32, efficiency: "91%", activeTime: "5.8h" },
  { name: "DataBard", tasks: 28, completed: 25, efficiency: "89%", activeTime: "4.2h" },
  { name: "QueryLyn", tasks: 32, completed: 29, efficiency: "91%", activeTime: "5.1h" },
  { name: "BugBuster", tasks: 25, completed: 23, efficiency: "92%", activeTime: "3.9h" },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("week")

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
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Analytics & Metrics</h1>
              <p className="text-blue-300">Monitor agent performance and team productivity</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-blue-500/30 text-blue-200 hover:bg-blue-500/50 font-medium text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Select Date
              </button>
              <button className="px-4 py-2 rounded-lg bg-cyan-500/30 text-cyan-200 hover:bg-cyan-500/50 font-medium text-sm flex items-center gap-2">
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-blue-300 font-semibold">Total Tasks</h3>
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-4xl font-bold text-white mb-2">312</p>
              <p className="text-sm text-green-400">↑ 12% from last week</p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-cyan-300 font-semibold">Completion Rate</h3>
                <TrendingUp className="w-5 h-5 text-cyan-400" />
              </div>
              <p className="text-4xl font-bold text-white mb-2">89.7%</p>
              <p className="text-sm text-green-400">↑ 2.3% from last week</p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-purple-300 font-semibold">Active Agents</h3>
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-4xl font-bold text-white mb-2">5</p>
              <p className="text-sm text-blue-400">All agents online</p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-green-900/40 to-cyan-900/40 border border-green-500/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-green-300 font-semibold">Avg Response</h3>
                <BarChart3 className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-4xl font-bold text-white mb-2">2.1s</p>
              <p className="text-sm text-green-400">↓ 0.3s faster</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Tasks Chart */}
            <div className="lg:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Weekly Task Performance</h2>
                <div className="flex gap-2">
                  {["day", "week", "month"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        timeRange === range
                          ? "bg-blue-500/50 text-white"
                          : "bg-white/5 text-blue-300 hover:bg-white/10"
                      }`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {chartData.map((data) => (
                  <div key={data.name}>
                    <div className="flex justify-between text-sm text-blue-300 mb-2">
                      <span>{data.name}</span>
                      <span>{data.tasks} tasks</span>
                    </div>
                    <div className="flex gap-2 h-8">
                      <div className="flex-1 bg-green-500/40 rounded-lg flex items-center justify-center text-xs text-green-200 font-medium relative group hover:bg-green-500/60 transition-all">
                        <span>{data.completed}</span>
                        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-green-900 text-green-100 text-xs px-2 py-1 rounded whitespace-nowrap">
                          Completed
                        </div>
                      </div>
                      <div className="flex-1 bg-blue-500/40 rounded-lg flex items-center justify-center text-xs text-blue-200 font-medium relative group hover:bg-blue-500/60 transition-all">
                        <span>{data.inProgress}</span>
                        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-blue-900 text-blue-100 text-xs px-2 py-1 rounded whitespace-nowrap">
                          In Progress
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Gauge */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30">
              <h2 className="text-2xl font-bold text-white mb-6">Team Efficiency</h2>
              
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="8" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeDasharray={`${(89.7 / 100) * 282.7} 282.7`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-white">89.7%</p>
                      <p className="text-xs text-blue-300">Efficiency</p>
                    </div>
                  </div>
                </div>

                <div className="w-full space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-300">Target:</span>
                    <span className="text-white font-semibold">90%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Status:</span>
                    <span className="text-green-400 font-semibold">On Track</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agent Performance Table */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/30">
            <h2 className="text-2xl font-bold text-white mb-6">Agent Performance</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-blue-500/30">
                    <th className="px-6 py-3 text-left text-blue-300 font-semibold">Agent</th>
                    <th className="px-6 py-3 text-left text-blue-300 font-semibold">Tasks</th>
                    <th className="px-6 py-3 text-left text-blue-300 font-semibold">Completed</th>
                    <th className="px-6 py-3 text-left text-blue-300 font-semibold">Efficiency</th>
                    <th className="px-6 py-3 text-left text-blue-300 font-semibold">Active Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-500/20">
                  {agentStats.map((agent) => (
                    <tr key={agent.name} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white font-semibold">{agent.name}</td>
                      <td className="px-6 py-4 text-blue-300">{agent.tasks}</td>
                      <td className="px-6 py-4 text-green-400">{agent.completed}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-blue-900/40 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                              style={{ width: agent.efficiency }}
                            />
                          </div>
                          <span className="text-white font-semibold">{agent.efficiency}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-blue-300">{agent.activeTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Search, Plus, Trash2, Edit, Brain, Database, Lock } from "lucide-react"

const memoryItems = [
  {
    id: 1,
    type: "knowledge",
    title: "RGB Color Picker Algorithm",
    description: "Advanced algorithm for color conversion between RGB and HEX formats",
    category: "Technical",
    lastModified: "2024-01-15",
    size: "2.3 MB",
    access: "shared",
  },
  {
    id: 2,
    type: "context",
    title: "Project Requirements & Specifications",
    description: "Complete project scope, requirements, and technical specifications",
    category: "Documentation",
    lastModified: "2024-01-14",
    size: "1.8 MB",
    access: "private",
  },
  {
    id: 3,
    type: "knowledge",
    title: "Best Practices for Web Development",
    description: "Industry standards and best practices for modern web development",
    category: "Learning",
    lastModified: "2024-01-13",
    size: "3.5 MB",
    access: "shared",
  },
  {
    id: 4,
    type: "context",
    title: "Team Communication Logs",
    description: "Archive of team discussions and decision logs",
    category: "Communication",
    lastModified: "2024-01-12",
    size: "0.9 MB",
    access: "private",
  },
  {
    id: 5,
    type: "knowledge",
    title: "Database Schema Patterns",
    description: "Common database design patterns and optimization techniques",
    category: "Technical",
    lastModified: "2024-01-11",
    size: "2.1 MB",
    access: "shared",
  },
]

const typeColors = {
  knowledge: "bg-blue-900/40 border-blue-500/30",
  context: "bg-purple-900/40 border-purple-500/30",
}

const typeIcons = {
  knowledge: <Brain className="w-5 h-5 text-blue-400" />,
  context: <Database className="w-5 h-5 text-purple-400" />,
}

export default function MemoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredMemory = memoryItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || item.type === filterType
    return matchesSearch && matchesType
  })

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
            <h1 className="text-4xl font-bold text-white mb-2">Agent Memory</h1>
            <p className="text-blue-300">Store, retrieve, and manage collective agent knowledge and context</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="p-6 rounded-xl bg-blue-900/40 border border-blue-500/30">
              <p className="text-blue-300 text-sm mb-2">Total Items</p>
              <p className="text-3xl font-bold text-white">{memoryItems.length}</p>
            </div>
            <div className="p-6 rounded-xl bg-cyan-900/40 border border-cyan-500/30">
              <p className="text-cyan-300 text-sm mb-2">Knowledge Base</p>
              <p className="text-3xl font-bold text-white">{memoryItems.filter(m => m.type === 'knowledge').length}</p>
            </div>
            <div className="p-6 rounded-xl bg-purple-900/40 border border-purple-500/30">
              <p className="text-purple-300 text-sm mb-2">Context Logs</p>
              <p className="text-3xl font-bold text-white">{memoryItems.filter(m => m.type === 'context').length}</p>
            </div>
            <div className="p-6 rounded-xl bg-green-900/40 border border-green-500/30">
              <p className="text-green-300 text-sm mb-2">Total Size</p>
              <p className="text-3xl font-bold text-white">10.6 MB</p>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
              <input
                type="text"
                placeholder="Search memory items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-blue-900/40 border border-blue-500/30 text-white placeholder-blue-300 focus:outline-none focus:border-blue-500/60"
              />
            </div>

            <button className="px-6 py-3 rounded-xl bg-blue-500/30 border border-blue-500/50 text-blue-200 hover:bg-blue-500/50 font-medium flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" /> New Memory
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {["all", "knowledge", "context"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  filterType === type
                    ? "bg-blue-500/50 border-blue-500/60 text-white"
                    : "bg-blue-900/40 border-blue-500/30 text-blue-300 hover:bg-blue-900/60"
                } border`}
              >
                {type === "all" ? "All Items" : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Memory Items */}
          <div className="space-y-4">
            {filteredMemory.map((item) => (
              <div
                key={item.id}
                className={`p-6 rounded-xl border transition-all hover:border-opacity-60 ${typeColors[item.type]}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="pt-1">{typeIcons[item.type]}</div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-blue-300 text-sm mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium">
                          {item.category}
                        </span>
                        {item.access === "private" && (
                          <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-medium flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Private
                          </span>
                        )}
                        {item.access === "shared" && (
                          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-medium">
                            Shared
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-300 text-sm mb-2">Size: {item.size}</p>
                    <p className="text-blue-300 text-xs mb-3">Modified: {item.lastModified}</p>
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <button className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/40 text-sm font-medium flex items-center gap-2">
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/40 text-sm font-medium flex items-center gap-2">
                    <Trash2 className="w-4 h-4" /> Delete
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

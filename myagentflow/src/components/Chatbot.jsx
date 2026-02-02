"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Loader, Sparkles, CheckCircle } from "lucide-react"

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm the AgentFlow assistant. How can I help you manage your AI agents today? Try asking me to build something!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [orchestrationActive, setOrchestrationActive] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      // Prepare conversation history for the API
      const conversationHistory = messages.map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.content,
      }))

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          conversationHistory: conversationHistory,
        }),
      })

      const data = await response.json()

      if (data.success) {
        const botMessage = {
          id: messages.length + 2,
          type: "bot",
          content: data.message,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])

        // Show orchestration status if triggered
        if (data.triggeredOrchestration && data.orchestration?.success) {
          setOrchestrationActive(true)
          const orchestrationMsg = {
            id: messages.length + 3,
            type: "system",
            content: `Created ${data.orchestration.tasks?.length || 0} tasks assigned to ${data.orchestration.agents?.length || 0} agents`,
            timestamp: new Date(),
            orchestration: data.orchestration,
          }
          setMessages((prev) => [...prev, orchestrationMsg])
        }
      } else {
        const errorMessage = {
          id: messages.length + 2,
          type: "bot",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage = {
        id: messages.length + 2,
        type: "bot",
        content: "Sorry, I'm having trouble connecting. Please try again later.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl border border-blue-500/30 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-blue-500/30 bg-blue-900/30">
        <h3 className="text-white font-semibold">AgentFlow Assistant</h3>
        <p className="text-xs text-blue-300">Powered by Cohere AI</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.type === "system" ? (
              <div className="flex justify-center py-2">
                <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/30 to-emerald-500/30 px-4 py-2 rounded-lg border border-green-500/50">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <p className="text-sm text-green-200">{msg.content}</p>
                </div>
              </div>
            ) : (
              <div
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.type === "user"
                      ? "bg-blue-500/60 text-white rounded-br-none"
                      : "bg-white/10 text-blue-100 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.type === "user" ? "text-blue-100" : "text-blue-300"}`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/10 text-blue-100 px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              <p className="text-sm">Thinking...</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-blue-500/30 bg-blue-900/30">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-lg bg-blue-900/40 border border-blue-500/30 text-white placeholder-blue-300 focus:outline-none focus:border-blue-500/60 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2 rounded-lg bg-blue-500/60 text-white hover:bg-blue-500/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}

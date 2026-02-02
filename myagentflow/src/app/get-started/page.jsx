"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CheckCircle, ArrowRight, Zap, Users, Rocket } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    number: 1,
    title: "Define Your Project",
    description: "Describe what you want your agents to accomplish. Be as specific as possible about your goals and requirements.",
    action: "Start Project",
  },
  {
    number: 2,
    title: "Configure Your Agents",
    description: "Select which agents you need (Planner, Developer, Researcher, Tester, Reporter) and customize their roles and capabilities.",
    action: "Setup Agents",
  },
  {
    number: 3,
    title: "Set Up Workflows",
    description: "Create workflows that orchestrate your agents to work together efficiently towards your project goals.",
    action: "Create Workflow",
  },
  {
    number: 4,
    title: "Monitor & Optimize",
    description: "Track agent performance, task completion rates, and optimize your workflows based on real-time analytics.",
    action: "View Analytics",
  },
]

const features = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "AI Agent Team",
    description: "Build a team of specialized AI agents that work together seamlessly",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Smart Orchestration",
    description: "Automatically coordinate tasks between agents for optimal efficiency",
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Fast Execution",
    description: "Execute complex projects with unprecedented speed and accuracy",
  },
]

const faqs = [
  {
    question: "What agents are available?",
    answer: "AgentFlow provides 5 specialized agents: Planzilla (Planner), QueryLyn (Researcher), CodeWizard (Developer), BugBuster (Tester), and DataBard (Reporter). Each has unique capabilities tailored for specific tasks.",
  },
  {
    question: "Can I customize agent behavior?",
    answer: "Yes! Each agent can be configured with custom instructions, knowledge bases, and behavioral parameters to match your specific needs.",
  },
  {
    question: "How do I monitor agent progress?",
    answer: "Use the Analytics dashboard and OpsRoom to monitor real-time task execution, agent performance metrics, and workflow progress.",
  },
  {
    question: "What's the maximum team size?",
    answer: "You can use all 5 agents in a single workflow, or select specific agents for your project based on your requirements.",
  },
  {
    question: "Can agents collaborate with each other?",
    answer: "Absolutely! Agents can communicate, share context, and coordinate tasks through our intelligent workflow orchestration system.",
  },
  {
    question: "How are costs calculated?",
    answer: "AgentFlow uses a flexible pricing model based on agent hours and API calls used. Start with our free tier and scale as needed.",
  },
]

export default function GetStartedPage() {
  const [openFaq, setOpenFaq] = useState(null)

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
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Get Started with AgentFlow</h1>
            <p className="text-xl text-blue-300 mb-8 max-w-3xl mx-auto">
              Deploy a team of AI agents to automate your entire workflow. From planning and development to testing and reporting, AgentFlow orchestrates your digital team.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/opsRoom" className="px-8 py-4 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                Launch OpsRoom <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-8 py-4 rounded-lg bg-blue-900/40 border border-blue-500/50 text-blue-200 font-semibold hover:bg-blue-900/60 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/30 text-center"
              >
                <div className="flex justify-center mb-4 text-cyan-400">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-blue-300">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Steps Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Getting Started in 4 Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, idx) => (
                <div
                  key={step.number}
                  className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/30"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-blue-300 text-sm mb-4">{step.description}</p>
                    <button className="w-full px-4 py-2 rounded-lg bg-blue-500/30 text-blue-200 hover:bg-blue-500/50 font-medium text-sm transition-colors">
                      {step.action}
                    </button>
                  </div>

                  {/* Arrow */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 transform -translate-y-1/2 text-blue-400">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-blue-500/30 rounded-xl overflow-hidden bg-blue-900/20 hover:bg-blue-900/40 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-blue-900/30 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-white text-left">{faq.question}</h3>
                    <span className={`text-blue-400 text-2xl transition-transform ${openFaq === idx ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 py-4 border-t border-blue-500/30 bg-blue-900/20">
                      <p className="text-blue-300">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="p-12 rounded-2xl bg-gradient-to-r from-blue-900/60 to-cyan-900/60 border border-blue-500/30 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Build Your AI Team?</h2>
            <p className="text-blue-300 mb-8 max-w-2xl mx-auto">
              Start automating your workflows with AgentFlow today. No credit card required to get started.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="px-8 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors">
                Start Free Trial
              </button>
              <button className="px-8 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

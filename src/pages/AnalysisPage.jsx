"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import {
  FileText,
  ArrowLeft,
  Download,
  Share2,
  Copy,
  Check,
  Mic,
  Send,
  Briefcase,
  FileSpreadsheet,
} from "lucide-react"
import { Link, useLocation, useParams } from "react-router-dom"

// Mock detailed data
const mockAnalysis = {
  summary:
    "This document outlines the latest maintenance activities carried out at Depot A, including inspection results, spare part usage, and contractor performance notes.",
  entities: [
    { type: "Date", value: "2025-01-15" },
    { type: "Location", value: "Depot A" },
    { type: "Contractor", value: "ABC Engineering Ltd." },
    { type: "Supervisor", value: "Ramesh Kumar" },
  ],
  departments: ["Engineering", "Procurement"],
  insights: [
    "Engineering team needs to schedule follow-up inspection within 2 weeks.",
    "Spare parts consumption has exceeded last month’s allocation by 15%.",
    "Procurement should verify vendor invoice against delivery receipts.",
    "Supervisor recommendations highlight need for additional contractor training.",
  ],
  comparisons: [
    {
      id: "2",
      name: "Vendor Invoice - SpareParts.xlsx",
      summary:
        "Invoice detailing costs for spare parts supplied to Depot A during maintenance operations.",
    },
  ],
}

export default function AnalysisPage() {
  const { id } = useParams()
  const location = useLocation()
  const file = location.state?.file

  const [copied, setCopied] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { role: "system", content: "Ask me anything about this document." },
  ])
  const [input, setInput] = useState("")

  const handleCopy = () => {
    navigator.clipboard.writeText(mockAnalysis.summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleChat = () => {
    if (!input.trim()) return
    setChatMessages((prev) => [...prev, { role: "user", content: input }])
    // Mock AI response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: `AI: Based on the document, "${input}" relates to Engineering & Procurement.` },
      ])
    }, 800)
    setInput("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
            <span className="text-slate-700">Back to Dashboard</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Document Info */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{file?.name}</h1>
              <p className="text-slate-600 text-sm">
                Uploaded on {new Date(file?.uploadDate).toLocaleDateString()} • {file?.size}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="entities">Key Details</TabsTrigger>
                <TabsTrigger value="departments">Departments</TabsTrigger>
                <TabsTrigger value="compare">Compare</TabsTrigger>
              </TabsList>

              {/* Summary Tab with Quick Insights */}
              <TabsContent value="summary">
                <Card>
                  <CardHeader>
                    <CardTitle>Summary</CardTitle>
                    <CardDescription>Auto-generated overview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 mb-4">{mockAnalysis.summary}</p>
                    <div className="flex space-x-2 mb-6">
                      <Button onClick={handleCopy} size="sm" variant="outline">
                        {copied ? (
                          <Check className="w-4 h-4 mr-2 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 mr-2" />
                        )}
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                    </div>

                    {/* Quick Insights Section */}
                    <h3 className="font-semibold text-slate-800 mb-3">Quick Insights</h3>
                    <div className="space-y-3">
                      {mockAnalysis.insights.map((insight, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 p-3 border rounded-lg bg-blue-50"
                        >
                          <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                          <span className="text-slate-700">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Entities Tab */}
              <TabsContent value="entities">
                <Card>
                  <CardHeader>
                    <CardTitle>Extracted Key Details</CardTitle>
                    <CardDescription>Important information detected in document</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockAnalysis.entities.map((entity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 border rounded-lg bg-slate-50"
                      >
                        <span className="font-medium text-slate-700">{entity.type}</span>
                        <span className="text-slate-600">{entity.value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Departments Tab */}
              <TabsContent value="departments">
                <Card>
                  <CardHeader>
                    <CardTitle>Departments</CardTitle>
                    <CardDescription>Metro departments related to this document</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockAnalysis.departments.map((dept, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 border rounded-lg bg-purple-50"
                      >
                        <Briefcase className="w-4 h-4 text-purple-600 mr-2" />
                        <span className="font-medium text-slate-700">{dept}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Compare Tab */}
              <TabsContent value="compare">
                <Card>
                  <CardHeader>
                    <CardTitle>Compare with Other Documents</CardTitle>
                    <CardDescription>Find related or similar documents</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockAnalysis.comparisons.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3 border rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <Link to={`/analysis/${doc.id}`} state={{ file: doc }}>
                          <h3 className="font-medium text-blue-600">{doc.name}</h3>
                          <p className="text-sm text-slate-600">{doc.summary}</p>
                        </Link>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar: Chatbot & Actions */}
          <div className="space-y-6">
            {/* Chatbot */}
            <Card>
              <CardHeader>
                <CardTitle>Ask about this Document</CardTitle>
                <CardDescription>Chat with AI to clarify details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 overflow-y-auto border rounded-lg p-3 mb-3 bg-slate-50">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`mb-2 p-2 rounded-lg ${
                        msg.role === "user"
                          ? "bg-blue-100 text-blue-800 ml-auto w-fit"
                          : msg.role === "assistant"
                          ? "bg-green-100 text-green-800 mr-auto w-fit"
                          : "text-slate-500 text-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 border rounded-lg px-3 py-2 text-sm"
                  />
                  <Button size="sm" onClick={handleChat}>
                    <Send className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Document Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Document Actions</CardTitle>
                <CardDescription>Quick tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Original
                </Button>
                <Button className="w-full" variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share with Team
                </Button>
                <Button onClick={handleCopy} className="w-full" variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? "Copied!" : "Copy Summary"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

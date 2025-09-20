"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

import {
  FileText,
  Upload,
  Search,
  Filter,
  Clock,
  Calendar,
  Briefcase,
  Database,
  X,
  FileX,
  GitCompare,
} from "lucide-react"
import { Link } from "react-router-dom"

// Mock data
const mockDocuments = [
  {
    id: "1",
    name: "Maintenance Report - Depot A.pdf",
    type: "Maintenance Report",
    status: "analyzed",
    uploadDate: "2025-01-15",
    size: "2.4 MB",
    source: "Email",
    department: "Engineering",
  },
  {
    id: "2",
    name: "Vendor Invoice - SpareParts.xlsx",
    type: "Invoice",
    status: "processing",
    uploadDate: "2025-01-14",
    size: "1.2 MB",
    source: "SharePoint",
    department: "Procurement",
  },
  {
    id: "3",
    name: "HR Policy - Leave Guidelines.pdf",
    type: "Policy",
    status: "analyzed",
    uploadDate: "2025-01-13",
    size: "3.1 MB",
    source: "WhatsApp",
    department: "HR",
  },
]

export default function DashboardPage() {
  const [documents, setDocuments] = useState([])
  const [stats, setStats] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const [typeCounts, setTypeCounts] = useState({})
  const [sourceCounts, setSourceCounts] = useState({})
  const [departmentCounts, setDepartmentCounts] = useState({})

  useEffect(() => {
    const storedDocs = JSON.parse(localStorage.getItem("documents")) || mockDocuments
    setDocuments(storedDocs)

    const totalDocuments = storedDocs.length
    const documentsThisMonth = storedDocs.filter((doc) => {
      const completedDate = new Date(doc.uploadDate)
      const now = new Date()
      return (
        completedDate.getFullYear() === now.getFullYear() &&
        completedDate.getMonth() === now.getMonth()
      )
    }).length

    const departments = storedDocs.reduce((acc, doc) => {
      acc[doc.department] = (acc[doc.department] || 0) + 1
      return acc
    }, {})

    const sources = storedDocs.reduce((acc, doc) => {
      acc[doc.source] = (acc[doc.source] || 0) + 1
      return acc
    }, {})

    const types = storedDocs.reduce((acc, doc) => {
      acc[doc.type] = (acc[doc.type] || 0) + 1
      return acc
    }, {})

    setStats({
      totalDocuments,
      documentsThisMonth,
    })
    setDepartmentCounts(departments)
    setSourceCounts(sources)
    setTypeCounts(types)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "analyzed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType =
      filterType === "all" || doc.type.toLowerCase().includes(filterType.toLowerCase())

    const matchesStatus = statusFilter === "all" || doc.status === statusFilter

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" &&
        new Date(doc.uploadDate).toDateString() === new Date().toDateString()) ||
      (dateFilter === "week" &&
        new Date(doc.uploadDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (dateFilter === "month" &&
        new Date(doc.uploadDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))

    return matchesSearch && matchesType && matchesStatus && matchesDate
  })

  const clearFilters = () => {
    setFilterType("all")
    setStatusFilter("all")
    setDateFilter("all")
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">KMRL Docs</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/upload">
              <Button className="h-10">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
          <p className="text-slate-600">
            Manage and track Kochi Metro documents across departments and sources.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Documents",
              value: stats.totalDocuments,
              icon: FileText,
              color: "text-blue-600",
            },
            {
              label: "This Month",
              value: stats.documentsThisMonth,
              icon: Calendar,
              color: "text-green-600",
            },
            {
              label: "Departments",
              value: Object.keys(departmentCounts).length,
              icon: Briefcase,
              color: "text-purple-600",
            },
            {
              label: "Sources",
              value: Object.keys(sourceCounts).length,
              icon: Database,
              color: "text-orange-600",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                        className="h-12 px-4"
                      >
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                      </Button>
                      {(filterType !== "all" || statusFilter !== "all" || dateFilter !== "all") && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                          className="h-12 px-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Clear
                        </Button>
                      )}
                    </div>
                  </div>

                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg border"
                    >
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Document Type
                        </label>
                        <select
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="w-full h-10 px-3 border border-slate-300 rounded-md text-sm bg-white"
                        >
                          <option value="all">All Types</option>
                          <option value="invoice">Invoice</option>
                          <option value="report">Maintenance Report</option>
                          <option value="policy">Policy</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Status
                        </label>
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-full h-10 px-3 border border-slate-300 rounded-md text-sm bg-white"
                        >
                          <option value="all">All Status</option>
                          <option value="analyzed">Analyzed</option>
                          <option value="processing">Processing</option>
                          <option value="error">Error</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Upload Date
                        </label>
                        <select
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value)}
                          className="w-full h-10 px-3 border border-slate-300 rounded-md text-sm bg-white"
                        >
                          <option value="all">All Dates</option>
                          <option value="today">Today</option>
                          <option value="week">This Week</option>
                          <option value="month">This Month</option>
                        </select>
                      </div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Documents List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Documents</CardTitle>
                    <CardDescription>
                      Your uploaded Kochi Metro documents ({filteredDocuments.length} of{" "}
                      {documents.length})
                    </CardDescription>
                  </div>
                  {filteredDocuments.length !== documents.length && (
                    <Badge variant="secondary">
                      Filtered: {filteredDocuments.length}/{documents.length}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredDocuments.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-slate-800 truncate">{file.name}</h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {file.type}
                            </Badge>
                            <Badge className={`text-xs ${getStatusColor(file.status)}`}>
                              {file.status}
                            </Badge>
                            <span className="text-xs text-slate-500">
                              {file.size} • {new Date(file.uploadDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {file.status === "analyzed" ? (
                          <>
                            <Link to={`/analysis/${file.id}`} state={{ file }}>
                              <Button size="sm" className="h-8">
                                View Details
                              </Button>
                            </Link>
                            <Link to={`/comparison?original=${file.id}`}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8"
                              >
                                <GitCompare className="w-4 h-4 mr-2" />
                                Compare
                              </Button>
                            </Link>

                          </>
                        ) : (
                          <Button size="sm" variant="outline" disabled className="h-8">
                            <Clock className="w-4 h-4 mr-2" />
                            Processing
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}

                  {filteredDocuments.length === 0 && (
                    <div className="text-center py-12">
                      <FileX className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                      <h3 className="text-lg font-medium text-slate-800 mb-2">No documents found</h3>
                      <p className="text-slate-600 mb-4">
                        {documents.length === 0
                          ? "Upload your first document to get started"
                          : "Try adjusting your search or filter criteria"}
                      </p>
                      {documents.length > 0 && (
                        <Button onClick={clearFilters} variant="outline">
                          Clear Filters
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>KMRL Document Templates</CardTitle>
                <CardDescription>Standardized templates for metro operations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Template library coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Overview</CardTitle>
                <CardDescription>Documents grouped by source and department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Source Breakdown */}
                  <div className="space-y-4">
                    <h4 className="text-slate-700 font-medium">By Source</h4>
                    {Object.entries(sourceCounts).map(([src, count]) => (
                      <div key={src} className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">{src}</span>
                        <span className="text-sm font-medium">{count}</span>
                      </div>
                    ))}
                  </div>

                  {/* Department Breakdown */}
                  <div className="space-y-4">
                    <h4 className="text-slate-700 font-medium">By Department</h4>
                    {Object.entries(departmentCounts).map(([dept, count]) => (
                      <div key={dept} className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">{dept}</span>
                        <span className="text-sm font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account and preferences.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64">
                  <p className="text-slate-600">Settings features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

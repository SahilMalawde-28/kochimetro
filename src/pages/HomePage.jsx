"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "../components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import {
  Upload,
  MessageSquare,
  Globe,
  Mic,
  Calendar,
  FileText,
  Brain,
  Zap,
  ArrowRight,
  Play,
  ChevronDown,
  Users,
  Building,
  Star,
  Folder,
  Layers,
} from "lucide-react"
import { Link } from "react-router-dom"
import { AnimatedCounter } from "../components/AnimatedCounter"
import { HeroBackground } from "../components/HeroBackground"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

const features = [
  {
    icon: Brain,
    title: "AI-Powered Summaries",
    description: "Get instant, accurate summaries of engineering drawings, HR policies, invoices, and reports.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Folder,
    title: "Smart Document Search",
    description: "Search across thousands of documents instantly with keyword and context-based results.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Layers,
    title: "Department-wise Organization",
    description: "Easily filter and group documents by Engineering, Procurement, HR, or Operations.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Globe,
    title: "Bilingual Support",
    description: "Access documents in both English and Malayalam with side-by-side translations.",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: Mic,
    title: "Voice Q&A",
    description: "Ask questions about policies or reports using voice and get quick, accurate answers.",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: Calendar,
    title: "Schedule & Deadlines",
    description: "Extract maintenance schedules and sync deadlines with team calendars automatically.",
    color: "bg-pink-50 text-pink-600",
  },
]

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.02 }}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">Kochi Metro Docs</span>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: "Features", href: "/features" },
              { name: "Departments", href: "/departments" },
              { name: "Upload", href: "/upload" },
              { name: "About", href: "/about" },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className="text-slate-600 hover:text-blue-600 transition-colors relative group font-medium"
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/signin">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
              </Link>
            </motion.div>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <HeroBackground />
        <motion.div className="container mx-auto text-center max-w-5xl relative z-10" style={{ y: y1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Metro Document Hub
            </Badge>

            <motion.h1
              className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Manage Kochi Metro Documents with{" "}
              <span className="text-blue-600">Speed & Clarity</span>
            </motion.h1>

            <motion.p
              className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Simplify thousands of engineering, HR, procurement, and safety documents into
              quick, actionable insights for every metro department.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/signin">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Documents
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </Link>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="px-8 py-3 border-slate-300">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Powerful Tools for Kochi Metro Staff
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From AI summaries to bilingual support, streamline document workflows across departments.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={{ y: -5 }} className="group">
                <Card className="border-slate-200 hover:shadow-lg transition-all duration-300 h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-slate-800 text-xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Trusted by Metro Staff</h2>
            <p className="text-xl text-slate-600">Already simplifying work across Kochi Metro departments</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { number: 20000, suffix: "+", label: "Documents Processed", icon: FileText },
              { number: 12, suffix: "+", label: "Departments Covered", icon: Layers },
              { number: 80, suffix: "%", label: "Time Saved", icon: Zap },
              { number: 1500, suffix: "+", label: "Active Users", icon: Users },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-sm"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-2">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-slate-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">What Staff Members Say</h2>
            <p className="text-xl text-slate-600">Real feedback from Kochi Metro officials</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              {
                name: "Arun Menon",
                role: "Station Manager",
                company: "Kochi Metro",
                content:
                  "Earlier I had to search through dozens of reports. Now I can instantly get a summary and share it with my team.",
                rating: 5,
              },
              {
                name: "Divya Nair",
                role: "Procurement Officer",
                company: "KMRL",
                content:
                  "Managing invoices and purchase orders is so much easier. The AI categorizes and highlights the important details.",
                rating: 5,
              },
              {
                name: "Ravi Krishnan",
                role: "Rolling Stock Engineer",
                company: "KMRL",
                content:
                  "The bilingual feature is a game changer. Malayalam documents are finally easy to process side-by-side with English ones.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="border-slate-200 h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <CardDescription className="text-slate-700 mb-6 text-base leading-relaxed">
                      "{testimonial.content}"
                    </CardDescription>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                        <span className="text-slate-600 font-semibold">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{testimonial.name}</p>
                        <p className="text-sm text-slate-600">
                          {testimonial.role} • {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Simplify Metro Document Management?</h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Join Kochi Metro staff who are already using AI to manage thousands of documents across departments.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/signin">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  Start Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-800">Kochi Metro Docs</span>
              </div>
              <p className="text-slate-600 mb-4">
                AI-powered document hub to keep Kochi Metro running smoothly.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Building className="w-4 h-4 text-slate-600" />
                </div>
              </div>
            </div>

            {[
              {
                title: "Product",
                links: [
                  { name: "Features", href: "/features" },
                  { name: "Upload", href: "/upload" },
                  { name: "Departments", href: "/departments" },
                  { name: "Integrations", href: "/integrations" },
                ],
              },
              {
                title: "Resources",
                links: [
                  { name: "Documentation", href: "/docs" },
                  { name: "Support", href: "/support" },
                  { name: "Community", href: "/community" },
                ],
              },
              {
                title: "Company",
                links: [
                  { name: "About", href: "/about" },
                  { name: "Careers", href: "/careers" },
                  { name: "Privacy", href: "/privacy" },
                  { name: "Terms", href: "/terms" },
                ],
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-slate-800 mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link to={link.href} className="text-slate-600 hover:text-blue-600 transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t mt-12 pt-8 text-center text-slate-600">
            <p>&copy; 2025 Kochi Metro Docs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, Code, Database, Globe, Layers, ChevronDown, Menu, X, Linkedin, Wrench, Brain } from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visible, setVisible] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    
    window.open(`mailto:tanyalasrivatsava@gmail.com?subject=${subject}&body=${body}`, "_blank")
    
    setFormStatus("success")
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setFormStatus("idle"), 5000)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const sections = ["hero", "about", "skills", "projects", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 }
    )
    const targets = document.querySelectorAll("[data-animate]")
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  const skills = [
    {
      category: "Languages",
      icon: <Code className="w-6 h-6" />,
      items: ["C", "C++", "Python"],
    },
    {
      category: "Web Technologies",
      icon: <Globe className="w-6 h-6" />,
      items: ["HTML", "CSS", "JavaScript", "Node.js", "Express"],
    },
    {
      category: "Database Management",
      icon: <Database className="w-6 h-6" />,
      items: ["SQL", "MongoDB"],
    },
    {
      category: "Frameworks",
      icon: <Layers className="w-6 h-6" />,
      items: ["ReactJS", "Tailwind CSS"],
    },
    {
      category: "Data Science & ML",
      icon: <Brain className="w-6 h-6" />,
      items: ["Machine Learning", "Deep Learning", "Natural Language Processing"],
    },
    {
      category: "Tools",
      icon: <Wrench className="w-6 h-6" />,
      items: ["VS Code", "GitHub", "Jupyter Notebook"],
    },
  ]

  const projects = [
    {
      title: "Library Book Reservation System",
      description: "A full-stack library management system to digitize book search, reservation, and inventory management.",
      tools: ["React", "Node.js", "Express", "MongoDB"],
      highlights: [
        "Built a full-stack library management system with React, Node.js, Express, and MongoDB for book search, reservation, and inventory management.",
        "Implemented secure authentication with role-based access for students and librarians.",
        "Developed RESTful APIs and a responsive UI for real-time book availability and reservation workflows.",
        "Designed a MongoDB schema to maintain records of users, books, reservations, and issued items.",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden w-full">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("hero")
            }}
            className={`text-base sm:text-xl font-bold transition-colors truncate max-w-45 sm:max-w-none ${isScrolled ? "text-emerald-600 hover:text-emerald-700" : "text-emerald-400 hover:text-emerald-300"}`}
          >
            Tanyala Srivatsava
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-emerald-400 ${
                  activeSection === item.id
                    ? "text-emerald-400"
                    : isScrolled ? "text-slate-900" : "text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-emerald-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white border-t border-slate-100 py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-6 py-3 text-sm font-medium transition-colors hover:bg-slate-50 ${
                  activeSection === item.id ? "text-emerald-600" : "text-slate-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 w-full max-w-full">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold tracking-widest uppercase mb-6">
              Crafting Code. Exploring Data.
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-6 text-balance wrap-break-word">
            Tanyala <span className="text-emerald-400">Srivatsava</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-slate-300 mb-4 max-w-2xl mx-auto">
            Full Stack Developer | Data Science Enthusiast
          </p>
          <p className="text-sm sm:text-lg text-slate-400 mb-10 max-w-2xl mx-auto text-pretty">
            Building intelligent web solutions and exploring the frontiers of data-driven applications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-4 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-all hover:shadow-lg hover:shadow-emerald-500/25"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
            >
              Get In Touch
            </button>
          </div>
        </div>

        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div
            id="about-heading"
            data-animate
            className={`text-center mb-16 transition-all duration-700 ${visible.has("about-heading") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <span className="text-emerald-600 font-medium text-sm uppercase tracking-wider">About Me</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mt-3">
              Passionate Developer
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div
              id="about-image"
              data-animate
              className={`relative transition-all duration-700 delay-150 ${visible.has("about-image") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <div className="aspect-square rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt="Tanyala Srivatsava"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div
              id="about-text"
              data-animate
              className={`transition-all duration-700 delay-300 ${visible.has("about-text") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                I am a dedicated full-stack developer with a passion for creating efficient, scalable, and user-friendly applications. With expertise in modern web technologies and database management, I bring ideas to life through clean code and thoughtful design.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                My journey in software development has equipped me with strong problem-solving skills and a deep understanding of both frontend and backend technologies. I thrive on learning new technologies and applying them to solve real-world problems.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-5 h-5 text-emerald-500" />
                  <span>Open for opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div
            id="skills-heading"
            data-animate
            className={`text-center mb-16 transition-all duration-700 ${visible.has("skills-heading") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <span className="text-emerald-400 font-medium text-sm uppercase tracking-wider">My Expertise</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
              Technical Skills
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {skills.map((skill, index) => (
              <div
                id={`skill-${index}`}
                data-animate
                key={index}
                style={{ transitionDelay: `${index * 80}ms` }}
                className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all duration-600 hover:shadow-lg hover:shadow-emerald-500/10 group ${visible.has(`skill-${index}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                <div className="w-14 h-14 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 mb-5 group-hover:bg-emerald-500/30 transition-colors">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-4">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div
            id="projects-heading"
            data-animate
            className={`text-center mb-16 transition-all duration-700 ${visible.has("projects-heading") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <span className="text-emerald-600 font-medium text-sm uppercase tracking-wider">My Work</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mt-3">
              Featured Projects
            </h2>
          </div>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <div
                id={`project-${index}`}
                data-animate
                key={index}
                className={`bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-700 ${visible.has(`project-${index}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                <div className="bg-linear-to-r from-emerald-500 to-teal-500 p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{project.title}</h3>
                  <p className="text-emerald-100 mt-2">{project.description}</p>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                      Tools & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-emerald-50 text-emerald-700 font-medium text-sm rounded-lg"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                      Project Overview
                    </h4>
                    <ul className="space-y-3">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></span>
                          <span className="text-slate-600 leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div
            id="contact-heading"
            data-animate
            className={`text-center mb-16 transition-all duration-700 ${visible.has("contact-heading") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <span className="text-emerald-400 font-medium text-sm uppercase tracking-wider">Get In Touch</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
              Let&apos;s Work Together
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </div>

          <div
            id="contact-cards"
            data-animate
            className={`grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 transition-all duration-700 delay-150 ${visible.has("contact-cards") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <a 
              href="mailto:tanyalasrivatsava@gmail.com"
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-700 hover:border-emerald-500/50 transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-4 group-hover:bg-emerald-500/30 transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-white mb-2">Email</h3>
              <p className="text-slate-400 text-sm break-all">tanyalasrivatsava@gmail.com</p>
            </a>

            <a 
              href="tel:+918919610507"
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-700 hover:border-emerald-500/50 transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-4 group-hover:bg-emerald-500/30 transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-white mb-2">Phone</h3>
              <p className="text-slate-400 text-sm">+91 89196 10507</p>
            </a>

            <a 
              href="https://www.linkedin.com/in/tanyala-srivatsava-380935341"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-700 hover:border-emerald-500/50 transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-4 group-hover:bg-emerald-500/30 transition-colors">
                <Linkedin className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-white mb-2">LinkedIn</h3>
              <p className="text-slate-400 text-sm">Connect with me</p>
            </a>

          </div>

          <div
            id="contact-form"
            data-animate
            className={`transition-all duration-700 delay-300 ${visible.has("contact-form") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
          <form onSubmit={handleSubmit} className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-slate-700">
            {formStatus === "success" && (
              <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-400 text-center">
                Your email client has been opened. Please send the email to complete your message.
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-all hover:shadow-lg hover:shadow-emerald-500/25"
            >
              Send Message
            </button>
          </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Tanyala Srivatsava. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

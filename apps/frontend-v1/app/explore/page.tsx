"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, Clock, DollarSign, Users, MapPin, Filter, TrendingUp, Code, TestTube, Globe } from 'lucide-react'
import Link from "next/link"
import "@/lib/amplify-config"
import * as Auth from 'aws-amplify/auth';

export default function ExploreProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [budgetFilter, setBudgetFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  // Mock projects data - expanded for public view

  const [projects, setProjects] = useState<Array<{
    id: string;
    name: string;
    description: string;
    updatedAt: string;
    dueDate: string;
    createdAt: string;
    ownerId: string;
    state: number;
    category: string;
    skills: string[];
    applicants: number;
  }>>([])

  const [isAuth, setIsAuth ] = useState(false)


  useEffect(() => {
    const doFetch = async () => {


      const session = await Auth.fetchAuthSession();



      if (session.tokens?.idToken) {
        setIsAuth(true)
      }
      console.log(session)

      const req = await fetch("https://w7it92figc.execute-api.eu-west-3.amazonaws.com/prod/projects", { headers: {
        "Authorization" : `Bearer ${session.tokens?.idToken?.toString()}`
      }})

      if (!req.ok) return;

      const data = await req.json()


      setProjects(data.data)

    }

    doFetch()
  }, [])

  // const projects = [
  //   {
  //     id: "1",
  //     title: "E-commerce Mobile App Testing",
  //     description: "Looking for experienced testers to validate our new mobile shopping app. Focus on user experience, payment flow, and cross-platform compatibility. The app includes features like product browsing, cart management, secure checkout, and user account management.",
  //     category: "mobile-app",
  //     budget: 750,
  //     deadline: "2024-01-20",
  //     client: {
  //       name: "TechCorp Inc.",
  //       avatar: "/placeholder.svg?height=40&width=40",
  //       rating: 4.8,
  //       location: "San Francisco, CA",
  //       completedProjects: 12,
  //       memberSince: "2022"
  //     },
  //     testingTypes: ["Manual Testing", "Mobile Testing", "Usability Testing", "Performance Testing"],
  //     skills: ["React Native", "iOS", "Android", "Payment Integration"],
  //     applicants: 12,
  //     postedDate: "2024-01-05",
  //     featured: true,
  //     urgent: false
  //   },
  //   {
  //     id: "2",
  //     title: "Web Dashboard Performance Testing",
  //     description: "Need comprehensive performance testing for our analytics dashboard. Looking for testers with experience in load testing and performance optimization. The dashboard handles large datasets and needs to perform well under heavy usage.",
  //     category: "web-app",
  //     budget: 500,
  //     deadline: "2024-01-25",
  //     client: {
  //       name: "DataViz Solutions",
  //       avatar: "/placeholder.svg?height=40&width=40",
  //       rating: 4.6,
  //       location: "New York, NY",
  //       completedProjects: 8,
  //       memberSince: "2023"
  //     },
  //     testingTypes: ["Performance Testing", "Automated Testing", "Load Testing"],
  //     skills: ["React", "Node.js", "Performance Testing", "Database Optimization"],
  //     applicants: 8,
  //     postedDate: "2024-01-03",
  //     featured: false,
  //     urgent: true
  //   },
  //   {
  //     id: "3",
  //     title: "API Security Testing",
  //     description: "Security-focused testing for our REST API. Need testers with experience in penetration testing and security vulnerabilities. The API handles sensitive user data and financial transactions, so security is paramount.",
  //     category: "api",
  //     budget: 1200,
  //     deadline: "2024-02-01",
  //     client: {
  //       name: "SecureAPI Ltd.",
  //       avatar: "/placeholder.svg?height=40&width=40",
  //       rating: 4.9,
  //       location: "London, UK",
  //       completedProjects: 25,
  //       memberSince: "2021"
  //     },
  //     testingTypes: ["Security Testing", "API Testing", "Penetration Testing"],
  //     skills: ["API Testing", "Security", "Python", "OWASP"],
  //     applicants: 15,
  //     postedDate: "2024-01-01",
  //     featured: true,
  //     urgent: false
  //   },
  //   {
  //     id: "4",
  //     title: "Cross-browser Compatibility Testing",
  //     description: "Need thorough testing across different browsers and devices for our new web application. Focus on UI consistency and functionality across Chrome, Firefox, Safari, and Edge.",
  //     category: "web-app",
  //     budget: 400,
  //     deadline: "2024-01-18",
  //     client: {
  //       name: "WebFlow Agency",
  //       avatar: "/placeholder.svg?height=40&width=40",
  //       rating: 4.7,
  //       location: "Austin, TX",
  //       completedProjects: 15,
  //       memberSince: "2022"
  //     },
  //     testingTypes: ["Cross-browser Testing", "Manual Testing", "UI Testing"],
  //     skills: ["Web Development", "CSS", "JavaScript", "Browser Testing"],
  //     applicants: 6,
  //     postedDate: "2024-01-04",
  //     featured: false,
  //     urgent: false
  //   },
  //   {
  //     id: "5",
  //     title: "Gaming App Beta Testing",
  //     description: "Seeking beta testers for our new mobile puzzle game. Looking for feedback on gameplay mechanics, user interface, and overall user experience. The game features multiple levels and social features.",
  //     category: "mobile-app",
  //     budget: 600,
  //     deadline: "2024-01-30",
  //     client: {
  //       name: "GameStudio Pro",
  //       avatar: "/placeholder.svg?height=40&width=40",
  //       rating: 4.5,
  //       location: "Los Angeles, CA",
  //       completedProjects: 6,
  //       memberSince: "2023"
  //     },
  //     testingTypes: ["Beta Testing", "Usability Testing", "Mobile Testing"],
  //     skills: ["Mobile Gaming", "iOS", "Android", "User Experience"],
  //     applicants: 20,
  //     postedDate: "2024-01-02",
  //     featured: false,
  //     urgent: false
  //   },
  //   {
  //     id: "6",
  //     title: "Healthcare Platform Accessibility Testing",
  //     description: "Need accessibility testing for our healthcare management platform. Must ensure compliance with WCAG 2.1 guidelines and test with screen readers and other assistive technologies.",
  //     category: "web-app",
  //     budget: 900,
  //     deadline: "2024-02-15",
  //     client: {
  //       name: "HealthTech Solutions",
  //       avatar: "/placeholder.svg?height=40&width=40",
  //       rating: 4.8,
  //       location: "Boston, MA",
  //       completedProjects: 18,
  //       memberSince: "2021"
  //     },
  //     testingTypes: ["Accessibility Testing", "Manual Testing", "Compliance Testing"],
  //     skills: ["WCAG", "Screen Readers", "Accessibility", "Healthcare"],
  //     applicants: 4,
  //     postedDate: "2024-01-06",
  //     featured: true,
  //     urgent: false
  //   }
  // ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) 
      // project.client.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter
    
    // const matchesBudget = 
    //   budgetFilter === "all" ||
    //   (budgetFilter === "low" && project.budget < 500) ||
    //   (budgetFilter === "medium" && project.budget >= 500 && project.budget < 1000) ||
    //   (budgetFilter === "high" && project.budget >= 1000)

    return matchesSearch && matchesCategory
  })

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      // case "budget-high":
      //   return b.budget - a.budget
      // case "budget-low":
      //   return a.budget - b.budget
      case "deadline":
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      default:
        return 0
    }
    return 0
  })

  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "web-app":
        return <Globe className="w-4 h-4" />
      case "mobile-app":
        return <TestTube className="w-4 h-4" />
      case "api":
        return <Code className="w-4 h-4" />
      default:
        return <Code className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TestConnect</span>
            </Link>
            
            
            {!isAuth &&
            
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/login" className="text-gray-600 hover:text-gray-900">
                  Sign In
                </Link>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/auth?mode=register">Get Started</Link>
                </Button>
              </nav>
            }

            {isAuth &&
              <nav className="hidden md:flex items-center space-x-6">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </nav>
            }
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Testing Opportunities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse projects from developers worldwide and find the perfect testing opportunities that match your skills and interests.
          </p>
        </div>

        {/* Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
              <div className="text-sm text-gray-600">Active Projects</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {formatBudget(projects.reduce((sum, p) => sum + p.budget, 0))}
              </div>
              <div className="text-sm text-gray-600">Total Budget</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {projects.reduce((sum, p) => sum + p.applicants, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Applications</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.7</div>
              <div className="text-sm text-gray-600">Avg Client Rating</div>
            </CardContent>
          </Card>
        </div> */}

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search projects, companies, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="web-app">Web Application</SelectItem>
                  <SelectItem value="mobile-app">Mobile Application</SelectItem>
                  <SelectItem value="api">API/Backend</SelectItem>
                  <SelectItem value="desktop">Desktop Application</SelectItem>
                </SelectContent>
              </Select>

              {/* <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Budget Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Budgets</SelectItem>
                  <SelectItem value="low">Under $500</SelectItem>
                  <SelectItem value="medium">$500 - $1000</SelectItem>
                  <SelectItem value="high">$1000+</SelectItem>
                </SelectContent>
              </Select> */}

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  {/* <SelectItem value="budget-high">Highest Budget</SelectItem>
                  <SelectItem value="budget-low">Lowest Budget</SelectItem> */}
                  <SelectItem value="deadline">Deadline Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            {sortedProjects.length} project{sortedProjects.length !== 1 ? "s" : ""} found
          </p>
          {/* <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {projects.filter(p => p.featured).length} featured, {projects.filter(p => p.urgent).length} urgent
            </span>
          </div> */}
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          {sortedProjects.map((project) => (
            <Card key={project.id} className={`hover:shadow-lg transition-shadow ${
              /*project.featured ? "ring-2 ring-blue-200 bg-blue-50/30" :*/ ""
            }`}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                          {/* {project.featured && (
                            <Badge className="bg-blue-600 text-white">Featured</Badge>
                          )}
                          {project.urgent && (
                            <Badge className="bg-red-600 text-white">Urgent</Badge>
                          )} */}
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center space-x-1">
                            {getCategoryIcon(project.category)}
                            <Badge variant="secondary" className="capitalize">
                              {project.category.replace("-", " ")}
                            </Badge>
                          </div>
                          {/* <div className="flex items-center text-green-600">
                            <DollarSign className="w-4 h-4 mr-1" />
                            <span className="font-semibold">{formatBudget(project.budget)}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">{getDaysUntilDeadline(project.deadline)} days left</span>
                          </div> */}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>

                    <div className="space-y-3">
                      {/* <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Testing Types:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.testingTypes.map((type) => (
                            <Badge key={type} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div> */}

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Required Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="lg:w-80">
                    <Card className="bg-gray-50">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <Avatar>
                            <AvatarImage src={project.client.avatar || "/placeholder.svg"} alt={project.client.name} />
                            <AvatarFallback>
                              {project.client.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{project.client.name}</h4>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600 ml-1">{project.client.rating}</span>
                              </div>
                              <div className="flex items-center text-gray-500">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span className="text-xs">{project.client.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Projects completed:</span>
                            <span className="font-medium">{project.client.completedProjects}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Member since:</span>
                            <span className="font-medium">{project.client.memberSince}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Applicants:</span>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 text-gray-400 mr-1" />
                              <span className="font-medium">{project.applicants}</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Posted:</span>
                            <span className="font-medium">{new Date(project.postedDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                            <Link href="/login">Apply Now</Link>
                          </Button>
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedProjects.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or check back later for new opportunities.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}

      {!isAuth &&
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Start Testing?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join thousands of testers who are already earning money by helping developers improve their applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                  <Link href="/auth?mode=register&type=tester">Sign Up as Tester</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white text-blue-600" asChild>
                  <Link href="/auth?mode=register&type=developer">Post a Project</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        }
      </div>

    </div>
  )
}

'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {} from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Clock, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import '@/lib/amplify-config';
import * as Auth from 'aws-amplify/auth';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');

  // Mock projects data
  // const projects = [
  //   {
  //     id: "1",
  //     title: "E-commerce Mobile App Testing",
  //     description:
  //       "Looking for experienced testers to validate our new mobile shopping app. Focus on user experience, payment flow, and cross-platform compatibility.",
  //     category: "mobile-app",
  //     budget: 750,
  //     deadline: "2024-01-20",
  //     client: {
  //       name: "TechCorp Inc.",
  //       avatar: "/placeholder.svg?height=40&width=40",
  //       rating: 4.8,
  //       location: "San Francisco, CA",
  //     },
  //     testingTypes: ["Manual Testing", "Mobile Testing", "Usability Testing"],
  //     skills: ["React Native", "iOS", "Android"],
  //     applicants: 12,
  //     postedDate: "2024-01-05",
  //   },
  //   {
  //     id: "2",
  //     title: "Web Dashboard Performance Testing",
  //     description:
  //       "Need comprehensive performance testing for our analytics dashboard. Looking for testers with experience in load testing and performance optimization.",
  //     category: "web-app",
  //     budget: 500,
  //     deadline: "2024-01-25",
  //     client: {
  //       name: "DataViz Solutions",
  //       avatar: "/placeholder.svg?height=40&width=40",
  //       rating: 4.6,
  //       location: "New York, NY",
  //     },
  //     testingTypes: ["Performance Testing", "Automated Testing"],
  //     skills: ["React", "Node.js", "Performance Testing"],
  //     applicants: 8,
  //     postedDate: "2024-01-03",
  //   },
  //   {
  //     id: "3",
  //     title: "API Security Testing",
  //     description:
  //       "Security-focused testing for our REST API. Need testers with experience in penetration testing and security vulnerabilities.",
  //     category: "api",
  //     budget: 1200,
  //     deadline: "2024-02-01",
  //     client: {
  //       name: "SecureAPI Ltd.",
  //       avatar: "/placeholder.svg?height=40&width=40",
  //       rating: 4.9,
  //       location: "London, UK",
  //     },
  //     testingTypes: ["Security Testing", "API Testing"],
  //     skills: ["API Testing", "Security", "Python"],
  //     applicants: 15,
  //     postedDate: "2024-01-01",
  //   },
  //   {
  //     id: "4",
  //     title: "Cross-browser Compatibility Testing",
  //     description:
  //       "Need thorough testing across different browsers and devices for our new web application. Focus on UI consistency and functionality.",
  //     category: "web-app",
  //     budget: 400,
  //     deadline: "2024-01-18",
  //     client: {
  //       name: "WebFlow Agency",
  //       avatar: "/placeholder.svg?height=40&width=40",
  //       rating: 4.7,
  //       location: "Austin, TX",
  //     },
  //     testingTypes: ["Cross-browser Testing", "Manual Testing"],
  //     skills: ["Web Development", "CSS", "JavaScript"],
  //     applicants: 6,
  //     postedDate: "2024-01-04",
  //   },
  // ]

  const [projects, setProjects] = useState<
    Array<{
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
    }>
  >([]);

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const doFetch = async () => {
      const session = await Auth.fetchAuthSession();

      if (session.tokens?.idToken) {
        setIsAuth(true);
      }
      console.log(session);

      const req = await fetch('https://w7it92figc.execute-api.eu-west-3.amazonaws.com/prod/projects', {
        headers: {
          Authorization: `Bearer ${session.tokens?.idToken?.toString()}`,
        },
      });

      if (!req.ok) return;

      const data = await req.json();

      setProjects(data.data);
    };

    doFetch();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
    // const matchesBudget =
    //   budgetFilter === "all" ||
    //   (budgetFilter === "low" && project.budget < 500) ||
    //   (budgetFilter === "medium" && project.budget >= 500 && project.budget < 1000) ||
    //   (budgetFilter === "high" && project.budget >= 1000)

    return matchesSearch && matchesCategory;
  });

  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Projects</h1>
          <p className="text-gray-600">Find testing opportunities that match your skills and interests</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
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

              <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Budget Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Budgets</SelectItem>
                  <SelectItem value="low">Under $500</SelectItem>
                  <SelectItem value="medium">$500 - $1000</SelectItem>
                  <SelectItem value="high">$1000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
                        <div className="flex items-center space-x-4 mb-3">
                          <Badge variant="secondary" className="capitalize">
                            {project.category.replace('-', ' ')}
                          </Badge>
                          {/* <div className="flex items-center text-green-600">
                            <DollarSign className="w-4 h-4 mr-1" />
                            <span className="font-semibold">{formatBudget(project.budget)}</span>
                          </div> */}
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">{getDaysUntilDeadline(project.dueDate)} days left</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">{project.description}</p>

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

                  <div className="lg:w-80">
                    <Card className="bg-gray-50">
                      <CardContent className="p-4">
                        {/* <div className="flex items-center space-x-3 mb-4">
                          <Avatar>
                            <AvatarImage src={project.client.avatar || "/placeholder.svg"} alt={project.client.name} />
                            <AvatarFallback>
                              {project.client.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
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
                        </div> */}

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Applicants:</span>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 text-gray-400 mr-1" />
                              <span className="font-medium">{project.applicants}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Posted:</span>
                            <span className="font-medium">{new Date(project.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Deadline:</span>
                            <span className="font-medium">{new Date(project.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">Apply Now</Button>
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
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
      </div>
    </div>
  );
}

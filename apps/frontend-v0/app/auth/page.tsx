"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Users, Code, TestTube, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [mode, setMode] = useState<"login" | "register">("login")
  const [userType, setUserType] = useState<"developer" | "tester" | null>(null)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    company: "",
    experience: "",
    skills: [] as string[],
    bio: "",
    portfolio: "",
    hourlyRate: "",
    availability: "",
    testingTypes: [] as string[],
  })

  useEffect(() => {
    const modeParam = searchParams.get("mode")
    const typeParam = searchParams.get("type")

    if (modeParam === "register") {
      setMode("register")
    }
    if (typeParam === "developer" || typeParam === "tester") {
      setUserType(typeParam)
    }
  }, [searchParams])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const handleTestingTypeToggle = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      testingTypes: prev.testingTypes.includes(type)
        ? prev.testingTypes.filter((t) => t !== type)
        : [...prev.testingTypes, type],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with your authentication system
    console.log("Form submitted:", { mode, userType, formData })

    // Simulate successful registration/login
    router.push("/dashboard")
  }

  const developerSkills = [
    "React",
    "Next.js",
    "Vue.js",
    "Angular",
    "Node.js",
    "Python",
    "Java",
    "C#",
    "Mobile Development",
    "Web Development",
    "API Development",
    "Database Design",
  ]

  const testingTypes = [
    "Manual Testing",
    "Automated Testing",
    "Performance Testing",
    "Security Testing",
    "Usability Testing",
    "Mobile Testing",
    "API Testing",
    "Cross-browser Testing",
  ]

  if (mode === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TestConnect</span>
            </div>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Sign In
              </Button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button onClick={() => setMode("register")} className="text-blue-600 hover:underline">
                  Sign up
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TestConnect</span>
            </div>
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>
              {!userType && "Choose your role to get started"}
              {userType === "developer" && "Set up your developer profile"}
              {userType === "tester" && "Set up your tester profile"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!userType ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-500"
                    onClick={() => setUserType("developer")}
                  >
                    <CardContent className="p-6 text-center">
                      <Code className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-semibold text-lg mb-2">I'm a Developer</h3>
                      <p className="text-gray-600 text-sm">I need testers for my applications and projects</p>
                    </CardContent>
                  </Card>
                  <Card
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-purple-500"
                    onClick={() => setUserType("tester")}
                  >
                    <CardContent className="p-6 text-center">
                      <TestTube className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                      <h3 className="font-semibold text-lg mb-2">I'm a Tester</h3>
                      <p className="text-gray-600 text-sm">I want to help test applications and provide feedback</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <button onClick={() => setMode("login")} className="text-blue-600 hover:underline">
                      Sign in
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center mb-4">
                      <Badge variant="secondary">
                        {userType === "developer" ? (
                          <>
                            <Code className="w-4 h-4 mr-2" />
                            Developer Registration
                          </>
                        ) : (
                          <>
                            <TestTube className="w-4 h-4 mr-2" />
                            Tester Registration
                          </>
                        )}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {userType === "developer" && (
                      <div>
                        <Label htmlFor="company">Company (Optional)</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          placeholder="Your company name"
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="experience">Experience Level</Label>
                      <Select onValueChange={(value) => handleInputChange("experience", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                          <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                          <SelectItem value="advanced">Advanced (5+ years)</SelectItem>
                          <SelectItem value="expert">Expert (10+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="button" onClick={() => setStep(2)} className="w-full bg-blue-600 hover:bg-blue-700">
                      Continue
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <Label>{userType === "developer" ? "Technical Skills" : "Testing Specializations"}</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {(userType === "developer" ? developerSkills : testingTypes).map((skill) => (
                          <div key={skill} className="flex items-center space-x-2">
                            <Checkbox
                              id={skill}
                              checked={
                                userType === "developer"
                                  ? formData.skills.includes(skill)
                                  : formData.testingTypes.includes(skill)
                              }
                              onCheckedChange={() =>
                                userType === "developer" ? handleSkillToggle(skill) : handleTestingTypeToggle(skill)
                              }
                            />
                            <Label htmlFor={skill} className="text-sm">
                              {skill}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        placeholder={
                          userType === "developer"
                            ? "Tell us about your development experience and the types of projects you work on..."
                            : "Tell us about your testing experience and what makes you a great tester..."
                        }
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="portfolio">
                        {userType === "developer" ? "Portfolio/GitHub URL" : "Portfolio/LinkedIn URL"}
                      </Label>
                      <Input
                        id="portfolio"
                        value={formData.portfolio}
                        onChange={(e) => handleInputChange("portfolio", e.target.value)}
                        placeholder={
                          userType === "developer"
                            ? "https://github.com/yourusername"
                            : "https://linkedin.com/in/yourusername"
                        }
                      />
                    </div>

                    {userType === "tester" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                          <Input
                            id="hourlyRate"
                            type="number"
                            value={formData.hourlyRate}
                            onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                            placeholder="25"
                          />
                        </div>
                        <div>
                          <Label htmlFor="availability">Availability</Label>
                          <Select onValueChange={(value) => handleInputChange("availability", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select availability" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="full-time">Full-time</SelectItem>
                              <SelectItem value="part-time">Part-time</SelectItem>
                              <SelectItem value="weekends">Weekends only</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Create Account
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

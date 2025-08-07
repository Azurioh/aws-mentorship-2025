"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, ArrowLeft, MoreVertical, Phone, Video, Paperclip, Image, File } from 'lucide-react'
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: string
  timestamp: string
  isOwn: boolean
  type: "text" | "image" | "file"
  attachments?: {
    name: string
    url: string
    type: string
  }[]
}

export default function MessageHistoryPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.userId as string
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Mock user data - in real app, fetch based on userId
  const otherUser = {
    id: userId,
    name: userId === "1" ? "Alice Johnson" : "Bob Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    role: userId === "1" ? "Tester" : "Developer",
    project: "E-commerce Mobile App Testing"
  }

  // Mock message history
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I've started working on your project. The app looks great so far!",
      sender: otherUser.name,
      timestamp: "2024-01-08 09:00",
      isOwn: false,
      type: "text"
    },
    {
      id: "2",
      content: "That's wonderful to hear! Have you had a chance to test the main user flows?",
      sender: "You",
      timestamp: "2024-01-08 09:15",
      isOwn: true,
      type: "text"
    },
    {
      id: "3",
      content: "Yes, I've tested the registration and login flows. Found a few minor UI issues that I've documented.",
      sender: otherUser.name,
      timestamp: "2024-01-08 09:30",
      isOwn: false,
      type: "text"
    },
    {
      id: "4",
      content: "I've attached screenshots of the issues I found. The payment flow needs some attention.",
      sender: otherUser.name,
      timestamp: "2024-01-08 10:00",
      isOwn: false,
      type: "text",
      attachments: [
        { name: "payment-issue-1.png", url: "#", type: "image" },
        { name: "ui-bug-report.pdf", url: "#", type: "file" }
      ]
    },
    {
      id: "5",
      content: "Thank you for the detailed report! I'll work on fixing these issues today.",
      sender: "You",
      timestamp: "2024-01-08 10:30",
      isOwn: true,
      type: "text"
    },
    {
      id: "6",
      content: "Perfect! I'll continue testing the other features and will update you with any additional findings.",
      sender: otherUser.name,
      timestamp: "2024-01-08 11:00",
      isOwn: false,
      type: "text"
    },
    {
      id: "7",
      content: "I found a critical bug in the checkout process. The payment gateway is not responding properly when using Safari.",
      sender: otherUser.name,
      timestamp: "2024-01-08 14:30",
      isOwn: false,
      type: "text"
    }
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isLoading) return

    setIsLoading(true)
    
    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "You",
      timestamp: new Date().toLocaleString(),
      isOwn: true,
      type: "text"
    }

    setMessages(prev => [...prev, message])
    setNewMessage("")
    
    // Simulate response delay
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={otherUser.avatar || "/placeholder.svg"} alt={otherUser.name} />
                  <AvatarFallback>
                    {otherUser.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-semibold text-gray-900">{otherUser.name}</h1>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {otherUser.role}
                    </Badge>
                    <span className={`text-xs ${otherUser.status === 'online' ? 'text-green-600' : 'text-gray-500'}`}>
                      {otherUser.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="mt-2">
            <p className="text-sm text-gray-600">Project: {otherUser.project}</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="h-[calc(100vh-200px)] flex flex-col">
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div key={message.id}>
                {/* Date separator */}
                {index === 0 || new Date(message.timestamp).toDateString() !== new Date(messages[index - 1].timestamp).toDateString() && (
                  <div className="flex items-center justify-center my-4">
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-600">
                      {new Date(message.timestamp).toLocaleDateString([], { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                )}

                <div className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                  <div className={`flex items-start space-x-2 max-w-2xl ${message.isOwn ? "flex-row-reverse space-x-reverse" : ""}`}>
                    {!message.isOwn && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={otherUser.avatar || "/placeholder.svg"} alt={otherUser.name} />
                        <AvatarFallback>
                          {otherUser.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className={`px-4 py-2 rounded-lg ${
                      message.isOwn 
                        ? "bg-blue-600 text-white" 
                        : "bg-white border text-gray-900"
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      
                      {message.attachments && (
                        <div className="mt-2 space-y-2">
                          {message.attachments.map((attachment, idx) => (
                            <div key={idx} className={`flex items-center space-x-2 p-2 rounded ${
                              message.isOwn ? "bg-blue-500" : "bg-gray-50"
                            }`}>
                              {attachment.type === "image" ? (
                                <Image className="w-4 h-4" />
                              ) : (
                                <File className="w-4 h-4" />
                              )}
                              <span className="text-xs">{attachment.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <p className={`text-xs mt-1 ${
                        message.isOwn ? "text-blue-100" : "text-gray-500"
                      }`}>
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Message Input */}
          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <Button type="button" variant="ghost" size="sm">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isLoading || !newMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}

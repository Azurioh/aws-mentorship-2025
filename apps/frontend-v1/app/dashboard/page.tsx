"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
    Users,
    Star,
    Plus,
    Search,
    Filter,
    Code,
    TestTube,
    DollarSign,
    TrendingUp,
    Bell,
} from "lucide-react";
import Link from "next/link";

import "@/lib/amplify-config"
import * as Auth from 'aws-amplify/auth';


// Mock user data - in real app, this would come from authentication
const mockUser = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    type: "developer", // or 'tester'
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    completedProjects: 12,
};

export default function Dashboard() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("projects");

    const isDeveloper = mockUser.type === "developer";

    // Mock data

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

            const req = await fetch("http://localhost:3008/projects/me", {
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
    // const recentProjects = [
    //     {
    //         id: "1",
    //         title: "E-commerce Mobile App Testing",
    //         status: "active",
    //         type: isDeveloper ? "seeking_testers" : "testing",
    //         budget: "$500",
    //         deadline: "2024-01-15",
    //         applicants: isDeveloper ? 8 : null,
    //         client: isDeveloper ? null : "TechCorp Inc.",
    //     },
    //     {
    //         id: "2",
    //         title: "Web Dashboard UI Testing",
    //         status: "completed",
    //         type: isDeveloper ? "completed" : "completed",
    //         budget: "$300",
    //         deadline: "2023-12-20",
    //         rating: 5,
    //         client: isDeveloper ? null : "StartupXYZ",
    //     },
    // ];

    const messages = [
        {
            id: "1",
            sender: "Alice Johnson",
            preview: "I found a critical bug in the checkout process...",
            time: "2 hours ago",
            unread: true,
        },
        {
            id: "2",
            sender: "Bob Smith",
            preview: "The testing is complete. Here's my report...",
            time: "1 day ago",
            unread: false,
        },
    ];

    const stats = isDeveloper
        ? [
              {
                  label: "Active Projects",
                  value: "3",
                  icon: Code,
                  color: "text-blue-600",
              },
              {
                  label: "Total Testers",
                  value: "24",
                  icon: Users,
                  color: "text-green-600",
              },
              {
                  label: "Avg Rating",
                  value: "4.8",
                  icon: Star,
                  color: "text-yellow-600",
              },
              {
                  label: "This Month",
                  value: "$1,200",
                  icon: DollarSign,
                  color: "text-purple-600",
              },
          ]
        : [
              {
                  label: "Active Tests",
                  value: "2",
                  icon: TestTube,
                  color: "text-blue-600",
              },
              {
                  label: "Completed",
                  value: "18",
                  icon: TrendingUp,
                  color: "text-green-600",
              },
              {
                  label: "Rating",
                  value: "4.9",
                  icon: Star,
                  color: "text-yellow-600",
              },
              {
                  label: "Earnings",
                  value: "$850",
                  icon: DollarSign,
                  color: "text-purple-600",
              },
          ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/explore"
                                className="flex items-center space-x-2"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-gray-900">
                                    TestConnect
                                </span>
                            </Link>
                            <nav className="hidden md:flex space-x-6">
                                {/* <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "overview" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Overview
                </button> */}
                                <button
                                    onClick={() => setActiveTab("projects")}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                                        activeTab === "projects"
                                            ? "bg-blue-100 text-blue-700"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    {isDeveloper
                                        ? "My Projects"
                                        : "Available Projects"}
                                </button>
                                {/* <button
                  onClick={() => setActiveTab("messages")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "messages" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Messages
                </button> */}
                            </nav>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm">
                                <Bell className="w-4 h-4" />
                            </Button>
                            <Avatar>
                                <AvatarImage
                                    src={mockUser.avatar || "/placeholder.svg"}
                                    alt={mockUser.name}
                                />
                                <AvatarFallback>
                                    {mockUser.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {activeTab === "overview" && (
                    <div className="space-y-8">
                        {/* Welcome Section */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Welcome back, {mockUser.name}!
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    {isDeveloper
                                        ? "Manage your projects and connect with testers"
                                        : "Find new testing opportunities and manage your work"}
                                </p>
                            </div>
                            <Button
                                asChild
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                <Link
                                    href={
                                        isDeveloper
                                            ? "/projects/create"
                                            : "/projects"
                                    }
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    {isDeveloper
                                        ? "New Project"
                                        : "Browse Projects"}
                                </Link>
                            </Button>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <Card key={index}>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">
                                                    {stat.label}
                                                </p>
                                                <p className="text-2xl font-bold text-gray-900">
                                                    {stat.value}
                                                </p>
                                            </div>
                                            <stat.icon
                                                className={`w-8 h-8 ${stat.color}`}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Recent Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Projects</CardTitle>
                                    <CardDescription>
                                        {isDeveloper
                                            ? "Your latest project activities"
                                            : "Your recent testing work"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {projects.map((project) => (
                                            <div
                                                key={project.id}
                                                className="flex items-center justify-between p-4 border rounded-lg"
                                            >
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900">
                                                        {project.name}
                                                    </h4>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        {/* <Badge
                                                            variant={
                                                                project.state !==
                                                                3
                                                                    ? "default"
                                                                    : "secondary"
                                                            }
                                                            className={
                                                                project.state !== 3
                                                                
                                                                    ? "bg-green-100 text-green-800"
                                                                    : ""
                                                            }
                                                        >
                                                            {project.state ===}
                                                        </Badge> */}
                                                        {/* <span className="text-sm text-gray-500">
                                                            {project.budget}
                                                        </span> */}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    {/* <p className="text-sm font-medium text-gray-900">
                                                        {isDeveloper &&
                                                            project.applicants &&
                                                            `${project.applicants} applicants`}
                                                        {!isDeveloper &&
                                                            project.client}
                                                    </p> */}
                                                    <p className="text-sm text-gray-500">
                                                        Due: {new Date(project.dueDate).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Messages</CardTitle>
                                    <CardDescription>
                                        Latest conversations
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                                            >
                                                <Avatar className="w-8 h-8">
                                                    <AvatarFallback>
                                                        {message.sender
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {message.sender}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {message.time}
                                                        </p>
                                                    </div>
                                                    <p className="text-sm text-gray-600 truncate">
                                                        {message.preview}
                                                    </p>
                                                </div>
                                                {message.unread && (
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {activeTab === "projects" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {isDeveloper
                                    ? "My Projects"
                                    : "Available Projects"}
                            </h2>
                            {isDeveloper && (
                                <Button
                                    asChild
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    <Link href="/projects/create">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create Project
                                    </Link>
                                </Button>
                            )}
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search projects..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </div>
                            <Button variant="outline">
                                <Filter className="w-4 h-4 mr-2" />
                                Filter
                            </Button>
                        </div>

                        <div className="grid gap-6">
                            {projects.map((project) => (
                                <Card
                                    key={project.id}
                                    className="hover:shadow-lg transition-shadow"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                    {project.name}
                                                </h3>
                                                <div className="flex items-center space-x-4 mb-4">
                                                    {/* <Badge
                                                        variant={
                                                            project.status ===
                                                            "active"
                                                                ? "default"
                                                                : "secondary"
                                                        }
                                                        className={
                                                            project.status ===
                                                            "active"
                                                                ? "bg-green-100 text-green-800"
                                                                : ""
                                                        }
                                                    >
                                                        {project.status}
                                                    </Badge> */}
                                                    {/* <span className="text-sm text-gray-600">
                                                        Budget: {project.budget}
                                                    </span> */}
                                                    <span className="text-sm text-gray-600">
                                                        Due: {new Date(project.dueDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mb-4">
                                                    {project.description}
                                                </p>
                                                {/* <div className="flex items-center space-x-4">
                                                    {isDeveloper &&
                                                        project.applicants && (
                                                            <span className="text-sm text-gray-600">
                                                                {
                                                                    project.applicants
                                                                }{" "}
                                                                applicants
                                                            </span>
                                                        )}
                                                    {!isDeveloper &&
                                                        project.client && (
                                                            <span className="text-sm text-gray-600">
                                                                Client:{" "}
                                                                {project.client}
                                                            </span>
                                                        )}
                                                </div> */}
                                            </div>
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    View Details
                                                </Button>
                                                {/* {!isDeveloper &&
                                                    project.status ===
                                                        "active" && (
                                                        <Button
                                                            size="sm"
                                                            className="bg-blue-600 hover:bg-blue-700"
                                                        >
                                                            Apply
                                                        </Button>
                                                    )} */}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "messages" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Messages
                            </h2>
                            <Button asChild variant="outline">
                                <Link href="/messages">View All Messages</Link>
                            </Button>
                        </div>

                        <div className="grid gap-4">
                            {messages.map((message) => (
                                <Card
                                    key={message.id}
                                    className="hover:shadow-md transition-shadow cursor-pointer"
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-start space-x-4">
                                            <Avatar>
                                                <AvatarFallback>
                                                    {message.sender
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-medium text-gray-900">
                                                        {message.sender}
                                                    </h4>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-sm text-gray-500">
                                                            {message.time}
                                                        </span>
                                                        {message.unread && (
                                                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 text-sm mb-2">
                                                    {message.preview}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        Project Discussion
                                                    </Badge>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/messages?conversation=${message.id}`}
                                                        >
                                                            Reply
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

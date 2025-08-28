'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Search, ArrowLeft, MoreVertical, Paperclip, Phone, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = [
    {
      id: '1',
      participant: {
        name: 'Alice Johnson',
        avatar: '/placeholder.svg?height=40&width=40',
        status: 'online',
        role: 'Tester',
      },
      lastMessage: {
        text: 'I found a critical bug in the checkout process. The payment gateway is not responding properly when using Safari.',
        timestamp: '2 hours ago',
        sender: 'Alice Johnson',
      },
      unreadCount: 2,
      project: 'E-commerce Mobile App Testing',
    },
    {
      id: '2',
      participant: {
        name: 'Bob Smith',
        avatar: '/placeholder.svg?height=40&width=40',
        status: 'offline',
        role: 'Developer',
      },
      lastMessage: {
        text: "Thanks for the detailed report! I've fixed the issues you mentioned. Could you test the new build?",
        timestamp: '1 day ago',
        sender: 'You',
      },
      unreadCount: 0,
      project: 'Web Dashboard Performance Testing',
    },
    {
      id: '3',
      participant: {
        name: 'Carol Davis',
        avatar: '/placeholder.svg?height=40&width=40',
        status: 'online',
        role: 'Tester',
      },
      lastMessage: {
        text: "The API security testing is complete. I'll send you the full report by tomorrow.",
        timestamp: '2 days ago',
        sender: 'Carol Davis',
      },
      unreadCount: 1,
      project: 'API Security Testing',
    },
  ];

  const messages = [
    {
      id: '1',
      sender: 'Alice Johnson',
      text: "Hi! I've started testing your e-commerce app. The overall user experience is great!",
      timestamp: '10:30 AM',
      isOwn: false,
    },
    {
      id: '2',
      sender: 'You',
      text: "That's great to hear! Have you had a chance to test the payment flow yet?",
      timestamp: '10:35 AM',
      isOwn: true,
    },
    {
      id: '3',
      sender: 'Alice Johnson',
      text: 'Yes, I found a few issues there. The payment gateway seems to timeout on Safari, and the error handling could be improved.',
      timestamp: '10:40 AM',
      isOwn: false,
    },
    {
      id: '4',
      sender: 'Alice Johnson',
      text: "I've documented everything with screenshots. Should I send them here or upload to the project dashboard?",
      timestamp: '10:42 AM',
      isOwn: false,
    },
    {
      id: '5',
      sender: 'You',
      text: 'Please upload them to the project dashboard. That way we can track them properly. Thanks for the detailed testing!',
      timestamp: '11:15 AM',
      isOwn: true,
    },
    {
      id: '6',
      sender: 'Alice Johnson',
      text: 'I found a critical bug in the checkout process. The payment gateway is not responding properly when using Safari.',
      timestamp: '2:30 PM',
      isOwn: false,
    },
  ];

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.project.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectedConv = conversations.find((conv) => conv.id === selectedConversation);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Here you would send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
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

      <div className="flex h-[calc(100vh-80px)]">
        {/* Conversations Sidebar */}
        <div className="w-80 bg-white border-r flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedConversation === conversation.id ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''
                }`}>
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage
                        src={conversation.participant.avatar || '/placeholder.svg'}
                        alt={conversation.participant.name}
                      />
                      <AvatarFallback>
                        {conversation.participant.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        conversation.participant.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900 truncate">{conversation.participant.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{conversation.lastMessage.timestamp}</span>
                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-blue-600 text-white text-xs px-2 py-1">{conversation.unreadCount}</Badge>
                        )}
                      </div>
                    </div>

                    <Badge variant="outline" className="text-xs mb-2">
                      {conversation.participant.role}
                    </Badge>

                    <p className="text-sm text-gray-600 truncate mb-1">{conversation.project}</p>

                    <p className="text-sm text-gray-500 truncate">
                      {conversation.lastMessage.sender === 'You' ? 'You: ' : ''}
                      {conversation.lastMessage.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src={selectedConv.participant.avatar || '/placeholder.svg'}
                        alt={selectedConv.participant.name}
                      />
                      <AvatarFallback>
                        {selectedConv.participant.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedConv.participant.name}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {selectedConv.participant.role}
                        </Badge>
                        <span
                          className={`text-xs ${
                            selectedConv.participant.status === 'online' ? 'text-green-600' : 'text-gray-500'
                          }`}>
                          {selectedConv.participant.status}
                        </span>
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
                  <p className="text-sm text-gray-600">Project: {selectedConv.project}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isOwn ? 'bg-blue-600 text-white' : 'bg-white border text-gray-900'
                      }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-white border-t p-4">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <Button type="button" variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="text-gray-400 mb-4">
                  <Send className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

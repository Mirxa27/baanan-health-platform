'use client';
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

interface Message {
  id: string;
  content: string;
  isFromUser: boolean;
  createdAt: string;
}

interface Chat {
  id: string;
  subject: string;
  status: string;
  createdAt: string;
  agent?: {
    name: string;
    type: string;
  };
  messages: Message[];
}

export default function CustomerService() {
  const { data: session } = useSession();
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [newChatSubject, setNewChatSubject] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session) {
      fetchChats();
    }
  }, [session]);

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchChats = async () => {
    try {
      const response = await fetch('/api/customer-service');
      if (response.ok) {
        const data = await response.json();
        setChats(data);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const createChat = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/customer-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject: newChatSubject }),
      });

      if (response.ok) {
        const newChat = await response.json();
        setChats([newChat, ...chats]);
        setActiveChat(newChat);
        setShowCreateForm(false);
        setNewChatSubject('');
      } else {
        alert('Failed to create chat');
      }
    } catch (error) {
      console.error('Error creating chat:', error);
      alert('An error occurred');
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activeChat || !newMessage.trim()) return;

    try {
      const response = await fetch(`/api/customer-service/${activeChat.id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newMessage }),
      });

      if (response.ok) {
        const message = await response.json();
        setActiveChat({
          ...activeChat,
          messages: [...activeChat.messages, message],
        });
        setNewMessage('');
        
        // Simulate AI response after a delay
        setTimeout(() => {
          simulateAIResponse();
        }, 1000);
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred');
    }
  };

  const simulateAIResponse = async () => {
    if (!activeChat) return;

    const aiResponses = [
      "Thank you for contacting Halol support. I'm here to help you with your medical device needs.",
      "I understand your concern. Let me check our records and provide you with the best solution.",
      "Based on your inquiry, I recommend checking our maintenance guidelines. Would you like me to send you the documentation?",
      "I've noted your request. Our technical team will review this and get back to you within 24 hours.",
      "Is there anything else I can help you with regarding your medical devices?",
    ];

    const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

    try {
      const response = await fetch(`/api/customer-service/${activeChat.id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          content: randomResponse,
          isFromUser: false 
        }),
      });

      if (response.ok) {
        const message = await response.json();
        setActiveChat({
          ...activeChat,
          messages: [...activeChat.messages, message],
        });
      }
    } catch (error) {
      console.error('Error sending AI response:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'bg-green-100 text-green-800';
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800';
      case 'RESOLVED':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Customer Service</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Start New Chat
        </button>
      </div>

      {/* Create Chat Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Start New Chat</h3>
            <form onSubmit={createChat} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={newChatSubject}
                  onChange={(e) => setNewChatSubject(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What can we help you with?"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Start Chat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
        {/* Chat List */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Your Chats</h3>
          </div>
          <div className="overflow-y-auto h-full">
            {chats.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No chats yet. Start a new conversation!
              </div>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    activeChat?.id === chat.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900 truncate">{chat.subject}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(chat.status)}`}>
                      {chat.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(chat.createdAt).toLocaleDateString()}
                  </p>
                  {chat.agent && (
                    <p className="text-xs text-gray-400 mt-1">
                      Agent: {chat.agent.name} ({chat.agent.type})
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg flex flex-col">
          {activeChat ? (
            <>
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">{activeChat.subject}</h3>
                <p className="text-sm text-gray-500">
                  {activeChat.agent ? `Agent: ${activeChat.agent.name}` : 'Waiting for agent...'}
                </p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isFromUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isFromUser ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Send
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <p>Select a chat to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
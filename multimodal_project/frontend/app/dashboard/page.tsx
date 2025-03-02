'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useDropzone } from 'react-dropzone';

// Import icons
import { 
  FiUpload, FiMic, FiType, FiImage, FiFileText, 
  FiMusic, FiVideo, FiSearch, FiSend, FiX, FiMenu 
} from 'react-icons/fi';

export default function Dashboard() {
  // State for the active tab
  const [activeTab, setActiveTab] = useState('multimodal');
  
  // State for the chat messages
  const [messages, setMessages] = useState<Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    media?: { type: string; url: string; } | null;
  }>>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your multimodal AI assistant. How can I help you today?',
      timestamp: new Date(),
      media: null
    }
  ]);
  
  // State for the input
  const [input, setInput] = useState('');
  
  // State for file uploads
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    id: string;
    file: File;
    preview: string;
    type: string;
  }>>([]);
  
  // State for loading
  const [isLoading, setIsLoading] = useState(false);
  
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Ref for the message container
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Dropzone for file uploads
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'audio/*': ['.mp3', '.wav', '.ogg'],
      'video/*': ['.mp4', '.webm', '.mov']
    },
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map(file => ({
        id: Math.random().toString(36).substring(7),
        file,
        preview: URL.createObjectURL(file),
        type: file.type.split('/')[0]
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  });
  
  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim() && uploadedFiles.length === 0) return;
    
    // Create a new message
    const newMessage = {
      id: Math.random().toString(36).substring(7),
      role: 'user' as const,
      content: input,
      timestamp: new Date(),
      media: uploadedFiles.length > 0 ? {
        type: uploadedFiles[0].type,
        url: uploadedFiles[0].preview
      } : null
    };
    
    // Add the message to the chat
    setMessages([...messages, newMessage]);
    
    // Clear the input and uploaded files
    setInput('');
    setUploadedFiles([]);
    
    // Set loading state
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create a response message
      const responseMessage = {
        id: Math.random().toString(36).substring(7),
        role: 'assistant' as const,
        content: `I've processed your ${newMessage.media ? newMessage.media.type + ' and ' : ''}message: "${newMessage.content}". Here's a simulated response that would normally come from our AI models.`,
        timestamp: new Date(),
        media: null
      };
      
      // Add the response to the chat
      setMessages(prev => [...prev, responseMessage]);
      
      // Clear loading state
      setIsLoading(false);
      
      // Scroll to the bottom
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
  };
  
  // Function to handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Function to remove an uploaded file
  const removeFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
  };
  
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="responsive-container py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-display font-bold gradient-text">
            NextGen Multimodal AI
          </Link>
          
          <div className="hidden md:flex space-x-6 items-center">
            <nav className="flex space-x-6">
              <Link href="/dashboard" className="text-gray-900 dark:text-white font-medium">
                Dashboard
              </Link>
              <Link href="/features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Features
              </Link>
              <Link href="/docs" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Documentation
              </Link>
            </nav>
            
            <button className="btn btn-primary">
              Upgrade
            </button>
          </div>
          
          <button 
            className="md:hidden text-gray-600 dark:text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FiMenu size={24} />
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="responsive-container py-4 flex flex-col space-y-4">
              <Link href="/dashboard" className="text-gray-900 dark:text-white font-medium">
                Dashboard
              </Link>
              <Link href="/features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Features
              </Link>
              <Link href="/docs" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Documentation
              </Link>
              <button className="btn btn-primary">
                Upgrade
              </button>
            </div>
          </motion.div>
        )}
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white dark:bg-gray-900 shadow-sm md:shadow-none">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Modalities</h2>
            
            <nav className="space-y-2">
              <button 
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${activeTab === 'multimodal' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                onClick={() => setActiveTab('multimodal')}
              >
                <FiSearch size={18} />
                <span>Multimodal</span>
              </button>
              
              <button 
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${activeTab === 'text' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                onClick={() => setActiveTab('text')}
              >
                <FiType size={18} />
                <span>Text</span>
              </button>
              
              <button 
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${activeTab === 'image' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                onClick={() => setActiveTab('image')}
              >
                <FiImage size={18} />
                <span>Image</span>
              </button>
              
              <button 
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${activeTab === 'audio' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                onClick={() => setActiveTab('audio')}
              >
                <FiMusic size={18} />
                <span>Audio</span>
              </button>
              
              <button 
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${activeTab === 'video' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                onClick={() => setActiveTab('video')}
              >
                <FiVideo size={18} />
                <span>Video</span>
              </button>
              
              <button 
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${activeTab === 'document' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                onClick={() => setActiveTab('document')}
              >
                <FiFileText size={18} />
                <span>Document</span>
              </button>
            </nav>
            
            <h2 className="text-lg font-semibold mt-8 mb-4">Recent Chats</h2>
            
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="font-medium">Image Analysis</div>
                <div className="text-sm text-gray-500 truncate">Yesterday at 2:30 PM</div>
              </button>
              
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="font-medium">Audio Transcription</div>
                <div className="text-sm text-gray-500 truncate">Nov 12, 2023</div>
              </button>
              
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="font-medium">Text Generation</div>
                <div className="text-sm text-gray-500 truncate">Nov 10, 2023</div>
              </button>
            </div>
          </div>
        </aside>
        
        {/* Chat area */}
        <div className="flex-1 flex flex-col max-h-[calc(100vh-64px)] md:max-h-screen">
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message) => (
                <motion.div 
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`max-w-[80%] ${message.role === 'user' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800'} rounded-xl p-4 shadow-sm`}>
                    {message.media && (
                      <div className="mb-3">
                        {message.media.type === 'image' && (
                          <img 
                            src={message.media.url} 
                            alt="Uploaded image" 
                            className="rounded-lg max-h-60 w-auto"
                          />
                        )}
                        {message.media.type === 'audio' && (
                          <audio 
                            src={message.media.url} 
                            controls 
                            className="w-full"
                          />
                        )}
                        {message.media.type === 'video' && (
                          <video 
                            src={message.media.url} 
                            controls 
                            className="rounded-lg max-h-60 w-auto"
                          />
                        )}
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Uploaded files preview */}
          {uploadedFiles.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="max-w-3xl mx-auto flex flex-wrap gap-4">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="relative">
                    {file.type === 'image' && (
                      <img 
                        src={file.preview} 
                        alt="Preview" 
                        className="h-20 w-auto rounded-lg border border-gray-300 dark:border-gray-600"
                      />
                    )}
                    {file.type === 'audio' && (
                      <div className="h-20 w-40 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                        <FiMusic size={24} className="text-gray-500" />
                      </div>
                    )}
                    {file.type === 'video' && (
                      <div className="h-20 w-40 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                        <FiVideo size={24} className="text-gray-500" />
                      </div>
                    )}
                    <button 
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      onClick={() => removeFile(file.id)}
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Input area */}
          <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <div 
                    {...getRootProps()} 
                    className={`border-2 border-dashed rounded-lg mb-2 transition-colors ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'}`}
                  >
                    <input {...getInputProps()} />
                    <div className="py-2 px-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      <FiUpload className="inline-block mr-2" />
                      <span>Drop files here, or click to select files</span>
                    </div>
                  </div>
                  <textarea
                    className="input resize-none"
                    placeholder="Type your message..."
                    rows={3}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                </div>
                <button 
                  className="btn btn-primary h-12 w-12 flex items-center justify-center"
                  onClick={handleSendMessage}
                  disabled={!input.trim() && uploadedFiles.length === 0}
                >
                  <FiSend size={18} />
                </button>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <div>
                  <button className="hover:text-gray-700 dark:hover:text-gray-300 mr-4">
                    <FiMic className="inline-block mr-1" />
                    Record Audio
                  </button>
                  <button className="hover:text-gray-700 dark:hover:text-gray-300">
                    <FiImage className="inline-block mr-1" />
                    Take Photo
                  </button>
                </div>
                <div>
                  Powered by Llama
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiCheck, FiExternalLink } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';

interface MessageProps {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  media?: {
    type: string;
    url: string;
  } | null;
  isLoading?: boolean;
}

const Message: React.FC<MessageProps> = ({
  id,
  role,
  content,
  timestamp,
  media,
  isLoading = false,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  
  // Function to copy message content to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  // Determine if the message is from the user or the assistant
  const isUser = role === 'user';
  const isSystem = role === 'system';
  
  // Format the timestamp
  const formattedTime = timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  // Determine the background color based on the role
  const bgColor = isUser 
    ? 'bg-primary text-white' 
    : isSystem 
      ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200' 
      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200';
  
  // Determine the alignment based on the role
  const alignment = isUser ? 'justify-end' : 'justify-start';
  
  // Determine the text color for the timestamp
  const timeColor = isUser ? 'text-white/70' : 'text-gray-500';
  
  return (
    <motion.div 
      className={`flex ${alignment}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`max-w-[80%] ${bgColor} rounded-xl p-4 shadow-sm`}>
        {/* Media content */}
        {media && (
          <div className="mb-3">
            {media.type === 'image' && (
              <img 
                src={media.url} 
                alt="Uploaded image" 
                className="rounded-lg max-h-60 w-auto"
              />
            )}
            {media.type === 'audio' && (
              <audio 
                src={media.url} 
                controls 
                className="w-full"
              />
            )}
            {media.type === 'video' && (
              <video 
                src={media.url} 
                controls 
                className="rounded-lg max-h-60 w-auto"
              />
            )}
          </div>
        )}
        
        {/* Message content */}
        <div className="whitespace-pre-wrap">
          {isLoading ? (
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
            </div>
          ) : (
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        
        {/* Message footer */}
        <div className="flex justify-between items-center mt-2">
          <div className={`text-xs ${timeColor}`}>
            {formattedTime}
          </div>
          
          {!isUser && !isLoading && (
            <div className="flex space-x-2">
              <button 
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={copyToClipboard}
                title="Copy to clipboard"
              >
                {isCopied ? <FiCheck size={14} /> : <FiCopy size={14} />}
              </button>
              
              {content.includes('http') && (
                <button 
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  title="Open links"
                >
                  <FiExternalLink size={14} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Message; 
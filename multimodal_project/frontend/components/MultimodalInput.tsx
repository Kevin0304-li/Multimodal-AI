'use client';

import { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiMic, FiImage, FiX, FiSend, FiPaperclip, FiMusic, FiVideo } from 'react-icons/fi';

interface MultimodalInputProps {
  onSubmit: (text: string, files: File[]) => void;
  placeholder?: string;
  isLoading?: boolean;
  showAudioRecording?: boolean;
  showImageCapture?: boolean;
  maxFiles?: number;
}

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  type: string;
}

const MultimodalInput: React.FC<MultimodalInputProps> = ({
  onSubmit,
  placeholder = 'Type your message...',
  isLoading = false,
  showAudioRecording = true,
  showImageCapture = true,
  maxFiles = 5,
}) => {
  // State for the input text
  const [text, setText] = useState('');
  
  // State for uploaded files
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  
  // State for recording audio
  const [isRecording, setIsRecording] = useState(false);
  
  // Ref for the textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Dropzone for file uploads
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'audio/*': ['.mp3', '.wav', '.ogg', '.m4a'],
      'video/*': ['.mp4', '.webm', '.mov', '.avi'],
    },
    maxFiles,
    onDrop: (acceptedFiles) => {
      // Check if we've reached the maximum number of files
      if (uploadedFiles.length + acceptedFiles.length > maxFiles) {
        alert(`You can only upload up to ${maxFiles} files at once.`);
        return;
      }
      
      const newFiles = acceptedFiles.map(file => ({
        id: Math.random().toString(36).substring(7),
        file,
        preview: URL.createObjectURL(file),
        type: file.type.split('/')[0],
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
    },
  });
  
  // Function to remove a file
  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(file => file.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(file => file.id !== id);
    });
  };
  
  // Function to handle form submission
  const handleSubmit = () => {
    if (isLoading) return;
    
    if (!text.trim() && uploadedFiles.length === 0) return;
    
    onSubmit(text, uploadedFiles.map(f => f.file));
    
    // Clear the input
    setText('');
    
    // Clear the uploaded files
    uploadedFiles.forEach(file => {
      URL.revokeObjectURL(file.preview);
    });
    setUploadedFiles([]);
    
    // Focus the textarea
    textareaRef.current?.focus();
  };
  
  // Function to handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  // Function to auto-resize the textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    
    // Auto-resize
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  
  // Function to start recording audio
  const startRecording = () => {
    setIsRecording(true);
    // TODO: Implement actual audio recording
  };
  
  // Function to stop recording audio
  const stopRecording = () => {
    setIsRecording(false);
    // TODO: Implement actual audio recording
  };
  
  // Function to capture an image
  const captureImage = () => {
    // TODO: Implement image capture
  };
  
  return (
    <div className="w-full">
      {/* File upload dropzone */}
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg mb-2 transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
        }`}
      >
        <input {...getInputProps()} />
        <div className="py-2 px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <FiUpload className="inline-block mr-2" />
          <span>Drop files here, or click to select files</span>
        </div>
      </div>
      
      {/* Uploaded files preview */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div 
            className="mb-2 flex flex-wrap gap-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {uploadedFiles.map((file) => (
              <motion.div 
                key={file.id} 
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                {file.type === 'image' && (
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
                    <img 
                      src={file.preview} 
                      alt="Preview" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                {file.type === 'audio' && (
                  <div className="h-20 w-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
                    <FiMusic size={24} className="text-gray-500" />
                  </div>
                )}
                {file.type === 'video' && (
                  <div className="h-20 w-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
                    <FiVideo size={24} className="text-gray-500" />
                  </div>
                )}
                <button 
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
                  onClick={() => removeFile(file.id)}
                >
                  <FiX size={14} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Input area */}
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none min-h-[60px] max-h-[200px]"
            placeholder={placeholder}
            value={text}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyPress}
            rows={1}
          />
          <button 
            className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={() => getRootProps().onClick?.({} as React.MouseEvent)}
          >
            <FiPaperclip size={18} />
          </button>
        </div>
        <button 
          className={`h-12 w-12 rounded-full flex items-center justify-center shadow-md transition-colors ${
            isLoading 
              ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' 
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <FiSend size={18} />
          )}
        </button>
      </div>
      
      {/* Additional controls */}
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <div>
          {showAudioRecording && (
            <button 
              className={`hover:text-gray-700 dark:hover:text-gray-300 mr-4 ${isRecording ? 'text-red-500' : ''}`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              <FiMic className="inline-block mr-1" />
              {isRecording ? 'Stop Recording' : 'Record Audio'}
            </button>
          )}
          {showImageCapture && (
            <button 
              className="hover:text-gray-700 dark:hover:text-gray-300"
              onClick={captureImage}
            >
              <FiImage className="inline-block mr-1" />
              Take Photo
            </button>
          )}
        </div>
        <div className="text-xs opacity-70">
          {uploadedFiles.length > 0 && `${uploadedFiles.length} file${uploadedFiles.length > 1 ? 's' : ''} attached`}
        </div>
      </div>
    </div>
  );
};

export default MultimodalInput; 
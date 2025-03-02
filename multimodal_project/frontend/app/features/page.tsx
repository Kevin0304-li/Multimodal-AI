'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

// Feature component
const Feature = ({ 
  title, 
  description, 
  icon, 
  index, 
  demo 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  index: number;
  demo: React.ReactNode;
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="flex flex-col lg:flex-row gap-8 items-center py-16 border-b border-gray-200 dark:border-gray-800"
    >
      <div className={`w-full lg:w-1/2 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
            {icon}
          </div>
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          {description}
        </p>
        <Link href="/dashboard" className="btn btn-primary">
          Try it now
        </Link>
      </div>
      <div className={`w-full lg:w-1/2 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {demo}
        </div>
      </div>
    </motion.div>
  );
};

export default function Features() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="responsive-container py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-display font-bold gradient-text">
            NextGen Multimodal AI
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Dashboard
            </Link>
            <Link href="/features" className="text-gray-900 dark:text-white font-medium">
              Features
            </Link>
            <Link href="/docs" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Documentation
            </Link>
          </nav>
        </div>
      </header>
      
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="responsive-container text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Powerful Multimodal Features
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore the cutting-edge capabilities of our AI platform that seamlessly integrates text, image, and audio processing
          </motion.p>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-12">
        <div className="responsive-container">
          <Feature
            title="Advanced Question Answering"
            description="Get accurate answers to your questions with our state-of-the-art language models. Our system understands context, can reference external knowledge, and provides detailed explanations with sources."
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                <path d="M8 9H16M8 13H14M8 17H12M10 2H14M5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            index={0}
            demo={
              <div className="p-6">
                <div className="mb-4 text-gray-600 dark:text-gray-400">
                  <span className="font-bold">Question:</span> What are the main advantages of multimodal AI systems?
                </div>
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <p className="mb-2 font-bold">Answer:</p>
                  <p className="mb-2">Multimodal AI systems offer several key advantages:</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Enhanced understanding through multiple data types (text, images, audio)</li>
                    <li>More natural human-computer interaction</li>
                    <li>Improved accuracy through cross-modal validation</li>
                    <li>Ability to process information in ways similar to human cognition</li>
                    <li>Greater accessibility for users with different needs</li>
                  </ol>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Sources: AI Journal (2023), Multimodal Learning Review (2022)
                  </div>
                </div>
              </div>
            }
          />
          
          <Feature
            title="Multitask Learning"
            description="Perform multiple AI tasks simultaneously with efficient resource utilization. Our platform can analyze content across modalities, identify patterns, and generate insights all at once."
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                <path d="M15 10L19 6M19 6L15 2M19 6H13C10.7909 6 9 7.79086 9 10V21M9 18L5 22M5 22L9 26M5 22H11C13.2091 22 15 20.2091 15 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            index={1}
            demo={
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <img 
                      src="https://via.placeholder.com/600x300?text=Sample+Image" 
                      alt="Sample" 
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <h4 className="font-bold mb-1">Image Analysis</h4>
                    <p className="text-sm">Beach scene with palm trees and ocean waves</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <h4 className="font-bold mb-1">Object Detection</h4>
                    <p className="text-sm">Palm trees (3), Ocean, Beach, People (2)</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <h4 className="font-bold mb-1">Sentiment Analysis</h4>
                    <p className="text-sm">Positive (98% confidence)</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <h4 className="font-bold mb-1">Weather Prediction</h4>
                    <p className="text-sm">Sunny, clear skies, approx. 85°F</p>
                  </div>
                </div>
              </div>
            }
          />
          
          <Feature
            title="Image & Video Captioning"
            description="Generate descriptive text for visual content with high accuracy and detail. Our system can identify objects, scenes, actions, and even emotional context in images and videos."
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                <path d="M2 6H4M4 6H20M4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6M20 6H22M12 10V16M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            index={2}
            demo={
              <div className="p-6">
                <div className="flex flex-col space-y-4">
                  <img 
                    src="https://via.placeholder.com/600x400?text=Mountain+Landscape" 
                    alt="Mountain landscape" 
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Generated Caption:</h4>
                    <p>A breathtaking mountain landscape at sunset, with snow-capped peaks reflecting the golden light. In the foreground, a serene alpine lake mirrors the mountains, surrounded by a dense pine forest. The sky is painted with vibrant hues of orange and purple as the sun dips below the horizon.</p>
                    <div className="mt-3 flex space-x-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">Mountains</span>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">Sunset</span>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">Lake</span>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">Forest</span>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          
          <Feature
            title="Interactive Multimodal Dialogue"
            description="Engage in natural conversations with visual and audio feedback. Our dialogue system can understand context, remember previous interactions, and respond with text, images, or audio as appropriate."
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.4183 16.9706 20 12 20C10.4607 20 9.01172 19.6565 7.74467 19.0511L3 20L4.39499 16.28C3.51156 15.0423 3 13.5743 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            index={3}
            demo={
              <div className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
                      <p className="font-bold">User:</p>
                      <p>Can you explain how photosynthesis works?</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary text-white rounded-lg p-3 max-w-[80%]">
                      <p className="font-bold">AI Assistant:</p>
                      <p>Photosynthesis is the process plants use to convert light energy into chemical energy. Would you like me to explain with a diagram?</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
                      <p className="font-bold">User:</p>
                      <p>Yes, please show me a diagram.</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary text-white rounded-lg p-3 max-w-[80%]">
                      <p className="font-bold">AI Assistant:</p>
                      <p>Here's a diagram showing the photosynthesis process:</p>
                      <img 
                        src="https://via.placeholder.com/400x300?text=Photosynthesis+Diagram" 
                        alt="Photosynthesis diagram" 
                        className="mt-2 rounded-lg"
                      />
                      <p className="mt-2">As you can see, plants take in carbon dioxide, water, and sunlight, then produce glucose and oxygen. Would you like me to explain each step in more detail?</p>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          
          <Feature
            title="Cross-modal Translation"
            description="Convert between text, speech, and visual information with high fidelity and accuracy. Our system can transcribe speech to text, generate images from descriptions, convert text to speech, and more."
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                <path d="M7 8L3 12L7 16M17 8L21 12L17 16M14 4L10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            index={4}
            demo={
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-3 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Original Text:</h4>
                    <p>"A futuristic city with flying cars and tall glass buildings."</p>
                  </div>
                  <div className="col-span-3">
                    <div className="flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                        <path d="M19 14L12 21M12 21L5 14M12 21V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div className="mx-2 text-sm font-medium">Text to Image Translation</div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                        <path d="M19 14L12 21M12 21L5 14M12 21V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <img 
                      src="https://via.placeholder.com/600x300?text=Futuristic+City+Generated+Image" 
                      alt="Generated futuristic city" 
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  <div className="col-span-3 flex justify-center space-x-4">
                    <button className="btn btn-outline btn-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M12 18.5V19.5M8.2 22H15.8C16.9201 22 17.4802 22 17.908 21.782C18.2843 21.5903 18.5903 21.2843 18.782 20.908C19 20.4802 19 19.9201 19 18.8V5.2C19 4.0799 19 3.51984 18.782 3.09202C18.5903 2.71569 18.2843 2.40973 17.908 2.21799C17.4802 2 16.9201 2 15.8 2H8.2C7.0799 2 6.51984 2 6.09202 2.21799C5.71569 2.40973 5.40973 2.71569 5.21799 3.09202C5 3.51984 5 4.07989 5 5.2V18.8C5 19.9201 5 20.4802 5.21799 20.908C5.40973 21.2843 5.71569 21.5903 6.09202 21.782C6.51984 22 7.07989 22 8.2 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Text to Speech
                    </button>
                    <button className="btn btn-outline btn-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M12 4L12 20M12 4L8 8M12 4L16 8M17 20H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Image to Text
                    </button>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="responsive-container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to Experience the Power of Multimodal AI?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Start using our platform today and transform how you interact with AI technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="btn btn-primary px-8 py-3 text-lg">
              Try It Now
            </Link>
            <Link href="/docs" className="btn btn-outline px-8 py-3 text-lg">
              Read Documentation
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="responsive-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">NextGen Multimodal AI</h3>
              <p className="text-gray-400">
                A cutting-edge multimodal web application that seamlessly integrates text, image, and audio processing.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Question Answering</li>
                <li>Multitask Learning</li>
                <li>Image & Video Captioning</li>
                <li>Website Referrals</li>
                <li>Interactive Dialogue</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Examples</li>
                <li>Tutorials</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@example.com</li>
                <li>Twitter: @nextgenai</li>
                <li>GitHub: github.com/nextgenai</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>© {new Date().getFullYear()} NextGen Multimodal AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 
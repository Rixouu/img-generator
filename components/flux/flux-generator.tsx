"use client";  // Add this line at the top of the file

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiImage, FiInfo, FiDownload, FiShare2 } from 'react-icons/fi';

function FluxGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) {
        throw new Error('Failed to generate image');
      }
      const data = await response.json();
      setGeneratedImageUrl(data.imageUrl);
    } catch (err) {
      setError('An error occurred while generating the image. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Flux Image Generator</h1>
      
      <div className="mb-4">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
          Enter your prompt
        </label>
        <div className="relative">
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe the image you want to generate..."
          />
          <button
            onClick={generateImage}
            disabled={isLoading}
            className="absolute right-2 top-2 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition duration-200 flex items-center"
          >
            {isLoading ? 'Generating...' : <><FiSend className="mr-2" /> Generate</>}
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-blue-50 p-4 rounded-md mb-6"
      >
        <h2 className="flex items-center text-lg font-semibold mb-2">
          <FiInfo className="mr-2" /> How to use
        </h2>
        <ol className="list-decimal list-inside text-sm">
          <li>Enter a detailed description of the image you want to generate.</li>
          <li>Click the "Generate" button and wait for the AI to create your image.</li>
          <li>Once generated, you can download or share your image.</li>
        </ol>
      </motion.div>

      {isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center h-64"
        >
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </motion.div>
      )}

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </motion.div>
      )}

      {generatedImageUrl && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <FiImage className="mr-2" /> Generated Image
          </h2>
          <div className="relative group">
            <img
              src={generatedImageUrl}
              alt="Generated image"
              className="w-full rounded-lg shadow-md transition duration-300 group-hover:shadow-xl"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
              <a
                href={generatedImageUrl}
                download="generated-image.png"
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200 mr-4 flex items-center"
              >
                <FiDownload className="mr-2" /> Download
              </a>
              <button
                onClick={() => {/* Implement share functionality */}}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 flex items-center"
              >
                <FiShare2 className="mr-2" /> Share
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default FluxGenerator;
import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Text API endpoints
export const textApi = {
  query: async (query: string, context?: string, maxLength?: number) => {
    const response = await api.post('/text/query', {
      query,
      context,
      max_length: maxLength,
    });
    return response.data;
  },
  
  generate: async (prompt: string, maxLength?: number, temperature?: number, topP?: number) => {
    const response = await api.post('/text/generate', {
      prompt,
      max_length: maxLength,
      temperature,
      top_p: topP,
    });
    return response.data;
  },
  
  webSearch: async (query: string, numResults?: number) => {
    const response = await api.post('/text/web_search', {
      query,
      num_results: numResults,
    });
    return response.data;
  },
};

// Image API endpoints
export const imageApi = {
  caption: async (file?: File, imageUrl?: string, maxLength?: number, numCaptions?: number) => {
    const formData = new FormData();
    
    if (file) {
      formData.append('file', file);
    }
    
    if (imageUrl || maxLength || numCaptions) {
      const requestData: any = {};
      if (imageUrl) requestData.image_url = imageUrl;
      if (maxLength) requestData.max_length = maxLength;
      if (numCaptions) requestData.num_captions = numCaptions;
      
      formData.append('request', JSON.stringify(requestData));
    }
    
    const response = await api.post('/image/caption', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  analyze: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/image/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  ocr: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/image/ocr', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  generate: async (prompt: string, width?: number, height?: number) => {
    const formData = new FormData();
    formData.append('prompt', prompt);
    if (width) formData.append('width', width.toString());
    if (height) formData.append('height', height.toString());
    
    const response = await api.post('/image/generate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Audio API endpoints
export const audioApi = {
  transcribe: async (file: File, language?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    if (language) formData.append('language', language);
    
    const response = await api.post('/audio/transcribe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  textToSpeech: async (text: string, voice?: string, speed?: number, pitch?: number) => {
    const response = await api.post('/audio/text-to-speech', {
      text,
      voice,
      speed,
      pitch,
    });
    return response.data;
  },
  
  analyze: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/audio/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  identifyVoice: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/audio/voice-identification', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Multimodal API endpoints
export const multimodalApi = {
  query: async (params: {
    text?: string;
    image?: File;
    audio?: File;
    imageUrl?: string;
    audioUrl?: string;
    context?: any;
  }) => {
    const { text, image, audio, imageUrl, audioUrl, context } = params;
    
    if (image || audio) {
      // Use form data for file uploads
      const formData = new FormData();
      if (text) formData.append('text', text);
      if (image) formData.append('image', image);
      if (audio) formData.append('audio', audio);
      
      const response = await api.post('/multimodal/query', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      // Use JSON for text-only or URL-based queries
      const response = await api.post('/multimodal/query', {
        text,
        image_url: imageUrl,
        audio_url: audioUrl,
        context,
      });
      return response.data;
    }
  },
  
  dialogue: async (userMessage: string, chatHistory?: any[], imageUrl?: string, audioUrl?: string) => {
    const response = await api.post('/multimodal/dialogue', {
      user_message: userMessage,
      chat_history: chatHistory,
      image_url: imageUrl,
      audio_url: audioUrl,
    });
    return response.data;
  },
  
  translate: async (params: {
    sourceModality: 'text' | 'image' | 'audio';
    targetModality: 'text' | 'image' | 'audio';
    textContent?: string;
    file?: File;
  }) => {
    const { sourceModality, targetModality, textContent, file } = params;
    
    const formData = new FormData();
    formData.append('source_modality', sourceModality);
    formData.append('target_modality', targetModality);
    
    if (textContent) formData.append('text_content', textContent);
    if (file) formData.append('file', file);
    
    const response = await api.post('/multimodal/translate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  captionWithAudio: async (image: File, generateAudio: boolean = true) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('generate_audio', generateAudio.toString());
    
    const response = await api.post('/multimodal/caption_with_audio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Export all APIs
export default {
  text: textApi,
  image: imageApi,
  audio: audioApi,
  multimodal: multimodalApi,
}; 
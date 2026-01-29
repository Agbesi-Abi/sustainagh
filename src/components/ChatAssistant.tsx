
import React, { useState, useRef, useEffect } from 'react';
import { getSustainaAdvice } from '../services/gemini';
import { ChatMessage } from '../types';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Sustaina AI. I can help you find eco-friendly products or answer your sustainability questions. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const advice = await getSustainaAdvice(userMessage, messages);
    
    setMessages(prev => [...prev, { role: 'model', text: advice }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-100 flex flex-col h-[500px] animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-4 bg-emerald-600 rounded-t-2xl flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-robot"></i>
              </div>
              <div>
                <h3 className="font-bold text-sm">Sustaina AI</h3>
                <p className="text-[10px] opacity-80">Eco-Expert Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-70">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                  msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-stone-100 text-stone-800 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-stone-100 px-4 py-2 rounded-2xl rounded-tl-none flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-stone-100 flex space-x-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about our eco-impact..."
              className="flex-1 bg-stone-50 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 disabled:opacity-50 transition-all"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-200 hover:scale-110 transition-transform group"
        >
          <i className="fa-solid fa-comment-dots text-2xl"></i>
          <span className="absolute -top-12 right-0 bg-stone-900 text-white text-[10px] py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ask Sustaina AI
          </span>
        </button>
      )}
    </div>
  );
};

export default ChatAssistant;

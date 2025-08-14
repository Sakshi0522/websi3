import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, Send, X, Loader2 } from 'lucide-react';

// Message interface
interface Message {
  text?: string;
  sender?: 'user' | 'bot';
  type?: 'faq_suggestions';
  suggestions?: string[];
}

// Props for ChatInput
interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isSubmitting: boolean;
}

// ChatInput Component
const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isSubmitting }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white"
          placeholder="Type your message..."
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting || !inputValue.trim()}
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

// small mapping for common cities -> IANA timezones
const cityTimeZones: Record<string, string> = {
  kolkata: 'Asia/Kolkata',
  india: 'Asia/Kolkata',
  mumbai: 'Asia/Kolkata',
  delhi: 'Asia/Kolkata',
  bangalore: 'Asia/Kolkata',
  london: 'Europe/London',
  'new york': 'America/New_York',
  nyc: 'America/New_York',
  'los angeles': 'America/Los_Angeles',
  la: 'America/Los_Angeles',
  chicago: 'America/Chicago',
  tokyo: 'Asia/Tokyo',
  sydney: 'Australia/Sydney',
};

// try to extract a timezone (IANA) or a city from the user's text
const extractTimezoneFromMessage = (text: string): string | undefined => {
  // check "in {place}" patterns
  const inMatch = text.match(/in\s+([A-Za-z\/_\s]+)/i);
  if (inMatch) {
    const place = inMatch[1].trim().toLowerCase();
    for (const key of Object.keys(cityTimeZones)) {
      if (place.includes(key)) return cityTimeZones[key];
    }
  }

  // check for IANA timezone-like token (e.g., "Asia/Kolkata")
  const ianaMatch = text.match(/\b([A-Za-z]+\/[A-Za-z_]+)\b/);
  if (ianaMatch) {
    return ianaMatch[1];
  }

  // common abbreviations
  const abbrMatch = text.match(/\b(UTC|GMT|IST|PST|EST|CET|EET|BST)\b/i);
  if (abbrMatch) {
    const a = abbrMatch[1].toUpperCase();
    if (a === 'IST') return 'Asia/Kolkata';
    if (a === 'PST') return 'America/Los_Angeles';
    if (a === 'EST') return 'America/New_York';
    if (a === 'GMT' || a === 'UTC') return 'UTC';
    if (a === 'CET') return 'Europe/Paris';
    if (a === 'BST') return 'Europe/London';
  }

  return undefined;
};

// format time string (safe fallback included)
const formatTime = (timeZone?: string): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };

  try {
    if (timeZone) {
      // may throw if the timezone string is invalid in some environments
      return new Intl.DateTimeFormat('en-GB', { ...options, timeZone }).format(now);
    }
    return new Intl.DateTimeFormat('en-GB', options).format(now);
  } catch (e) {
    // fallback to browser's locale/time
    return now.toLocaleString();
  }
};

// Main Chatbot Component
const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I assist you today? Here are some things I can help with:", sender: 'bot' },
    {
      type: 'faq_suggestions',
      suggestions: [
        "What services do you offer?",
        "What are your business hours?",
        "How do I contact support?",
        "How can I book a meeting?"
      ]
    }
  ]);
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(async (text: string) => {
    const messageToSend = text.trim();
    if (!messageToSend || status === 'submitting') return;

    // create user message (we'll append either with a quick bot reply or before backend call)
    const userMessage: Message = { text: messageToSend, sender: 'user' };

    // --- Time query detection & immediate reply (no backend call) ---
    const timeQueryRegex = /\b(what(?:'s| is)? the time|what time is it|current time|time now|time in)\b/i;
    if (timeQueryRegex.test(messageToSend)) {
      const tz = extractTimezoneFromMessage(messageToSend);
      // Default timezone: Asia/Kolkata. Change below if you want browser timezone instead:
      // const defaultTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const defaultTz = 'Asia/Kolkata';
      const usedTz = tz ?? defaultTz;
      const timeStr = formatTime(usedTz);
      const botReply = tz
        ? `The current time in ${usedTz} is ${timeStr}.`
        : `The current time (Asia/Kolkata) is ${timeStr}.`;

      const botResponse: Message = { text: botReply, sender: 'bot' };
      // append both messages together to keep ordering correct
      setMessages(prev => [...prev, userMessage, botResponse]);
      return;
    }

    // --- Normal flow: add user message and call backend ---
    setMessages(prev => [...prev, userMessage]);
    setStatus('submitting');

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSend })
      });

      if (!response.ok) throw new Error('Failed to fetch response from backend.');

      const data = await response.json();
      const botResponse: Message = { text: data.reply, sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Chatbot API error:", error);

      let botReply = "Sorry, I'm having trouble connecting right now. Please try again later.";
      const lowerMessage = messageToSend.toLowerCase();
      if (lowerMessage.includes('service') || lowerMessage.includes('what do you offer')) {
        botReply = "We offer web development, mobile app development, AI solutions, and digital transformation services. Would you like to know more about any specific service?";
      } else if (lowerMessage.includes('hours') || lowerMessage.includes('time')) {
        botReply = "Our business hours are Monday to Sunday, 9:00 AM - 8:00 PM. We're available to help you during these times!";
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('support')) {
        botReply = "You can reach us at info@digitalindian.co.in or call us at +91 7908735132. We're here to help!";
      } else if (lowerMessage.includes('meeting') || lowerMessage.includes('book')) {
        botReply = "To book a meeting, please contact us directly at info@digitalindian.co.in or call +91 7908735132. We'll be happy to schedule a consultation!";
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        botReply = "Hello! I'm here to help you with any questions about our services. What would you like to know?";
      }

      const botResponse: Message = { text: botReply, sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    } finally {
      setStatus('idle');
    }
  }, [status]);

  const ChatbotButton: React.FC = () => (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="Open chatbot"
    >
      <MessageCircle className="h-7 w-7" />
    </button>
  );

  const ChatWindow: React.FC = () => (
    <div className="fixed bottom-0 right-0 w-full sm:bottom-6 sm:right-6 sm:w-96 max-h-[70vh] sm:max-h-[80vh] flex flex-col bg-white dark:bg-gray-800 rounded-t-lg sm:rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
      <div className="flex justify-between items-center p-4 bg-blue-600 text-white rounded-t-lg">
        <h3 className="font-semibold text-lg">Digital Indian Assistant</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 rounded-full hover:bg-blue-700 transition-colors"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[calc(70vh-140px)] sm:max-h-96">
        {messages.map((msg, index) => (
          msg.type === 'faq_suggestions' ? (
            <div key={index} className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-xl shadow-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none">
                <div className="space-y-2">
                  {msg.suggestions?.map((suggestion, suggestionIndex) => (
                    <button
                      key={suggestionIndex}
                      onClick={() => handleSendMessage(suggestion)}
                      className="block w-full text-left px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors text-sm"
                      disabled={status === 'submitting'}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-xl shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          )
        ))}
        {status === 'submitting' && (
          <div className="flex justify-start">
            <div className="max-w-[70%] p-3 rounded-xl shadow-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} isSubmitting={status === 'submitting'} />
    </div>
  );

  return (
    <>
      {isOpen ? <ChatWindow /> : <ChatbotButton />}
    </>
  );
};

export default Chatbot;
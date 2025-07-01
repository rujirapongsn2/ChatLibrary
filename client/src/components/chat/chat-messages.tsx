import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import BookCard from "./book-card";
import TypingIndicator from "./typing-indicator";
import type { ChatMessage, Book } from "@shared/schema";

interface ChatMessagesProps {
  messages: Array<ChatMessage & { books?: Book[] }>;
  isTyping: boolean;
  onBorrowClick: (book: Book) => void;
  language: 'en' | 'th';
}

export default function ChatMessages({ messages, isTyping, onBorrowClick, language }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const formatTime = (date: Date | undefined) => {
    if (!date) return language === 'en' ? 'Just now' : 'เมื่อสักครู่';
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return language === 'en' ? 'Just now' : 'เมื่อสักครู่';
    if (diffMins < 60) return language === 'en' ? `${diffMins} minutes ago` : `${diffMins} นาทีที่แล้ว`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return language === 'en' ? `${diffHours} hours ago` : `${diffHours} ชั่วโมงที่แล้ว`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {/* Welcome Message */}
      <div className="flex items-start space-x-3 animate-fade-in">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm">🤖</span>
        </div>
        <div className="flex-1 max-w-md">
          <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border">
            <p className="text-gray-800">
              {language === 'en' 
                ? "Welcome to AI Library! I'm here to help you find, borrow, and manage your books. What can I help you with today?"
                : "ยินดีต้อนรับสู่ห้องสมุดอัจฉริยะ! ฉันพร้อมช่วยคุณค้นหา ยืม และจัดการหนังสือ วันนี้ฉันช่วยอะไรคุณได้บ้าง?"
              }
            </p>
          </div>
          <p className="text-xs text-gray-400 mt-1 ml-4">
            {language === 'en' ? 'Just now' : 'เมื่อสักครู่'}
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`flex items-start space-x-3 ${
            message.isUser ? 'justify-end' : ''
          } animate-slide-up`}
        >
          {!message.isUser && (
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">🤖</span>
            </div>
          )}
          
          <div className={`flex-1 ${message.isUser ? 'max-w-md' : ''}`}>
            <div className={`${
              message.isUser 
                ? 'bg-muted-blue rounded-2xl rounded-tr-md px-4 py-3 text-white ml-auto' 
                : 'bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border max-w-2xl'
            }`}>
              <div className={message.isUser ? 'text-white' : 'text-gray-800'}>
                <ReactMarkdown>{message.message}</ReactMarkdown>
              </div>
              
              {/* Book Results */}
              {message.books && message.books.length > 0 && (
                <div className="mt-3 space-y-3">
                  {message.books.map((book) => (
                    <BookCard 
                      key={book.id} 
                      book={book} 
                      onBorrowClick={onBorrowClick}
                      language={language}
                    />
                  ))}
                </div>
              )}
            </div>
            <p className={`text-xs text-gray-400 mt-1 ${
              message.isUser ? 'mr-4 text-right' : 'ml-4'
            }`}>
              {formatTime(message.createdAt)}
            </p>
          </div>
        </div>
      ))}

      {/* Typing Indicator */}
      {isTyping && <TypingIndicator />}
      
      <div ref={messagesEndRef} />
    </div>
  );
}

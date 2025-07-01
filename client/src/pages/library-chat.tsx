import { useState } from "react";
import ChatSidebar from "@/components/chat/chat-sidebar";
import ChatMessages from "@/components/chat/chat-messages";
import ChatInput from "@/components/chat/chat-input";
import BorrowModal from "@/components/chat/borrow-modal";
import { useChat } from "@/hooks/use-chat";
import type { Book } from "@shared/schema";

export default function LibraryChat() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentView, setCurrentView] = useState<'search' | 'my-books' | 'recommendations'>('search');
  const [language, setLanguage] = useState<'en' | 'th'>('en');
  
  const {
    messages,
    isTyping,
    sendMessage,
    borrowBook,
    returnBook,
    searchBooks,
    getUserBorrowings
  } = useChat();

  const handleBorrowClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleConfirmBorrow = async () => {
    if (selectedBook) {
      await borrowBook(selectedBook.id);
      setSelectedBook(null);
    }
  };

  const handleViewChange = (view: 'search' | 'my-books' | 'recommendations') => {
    setCurrentView(view);
    
    // Send appropriate message based on view
    switch (view) {
      case 'search':
        sendMessage(language === 'en' ? 
          "I'd like to search for books. What can you help me find?" : 
          "ฉันต้องการค้นหาหนังสือ คุณช่วยฉันได้อย่างไร?"
        );
        break;
      case 'my-books':
        sendMessage(language === 'en' ? 
          "Can you show me my currently borrowed books?" : 
          "ช่วยแสดงหนังสือที่ฉันยืมอยู่ในปัจจุบันได้ไหม?"
        );
        getUserBorrowings();
        break;
      case 'recommendations':
        sendMessage(language === 'en' ? 
          "What new books would you recommend for me?" : 
          "คุณแนะนำหนังสือใหม่อะไรให้ฉันบ้าง?"
        );
        break;
    }
  };

  return (
    <div className="flex h-screen max-h-screen overflow-hidden bg-warm-gray">
      <ChatSidebar 
        currentView={currentView}
        language={language}
        onViewChange={handleViewChange}
        onLanguageChange={setLanguage}
      />
      
      <div className="flex-1 flex flex-col bg-off-white">
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🤖</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {language === 'en' ? 'Library Assistant' : 'ผู้ช่วยห้องสมุด'}
                </h2>
                <p className="text-sm text-sage-green">
                  {language === 'en' ? 'Online • Ready to help' : 'ออนไลน์ • พร้อมช่วยเหลือ'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <ChatMessages 
          messages={messages}
          isTyping={isTyping}
          onBorrowClick={handleBorrowClick}
          language={language}
        />
        
        <ChatInput 
          onSendMessage={sendMessage}
          language={language}
        />
      </div>

      <BorrowModal
        book={selectedBook}
        isOpen={selectedBook !== null}
        onClose={() => setSelectedBook(null)}
        onConfirm={handleConfirmBorrow}
        language={language}
      />
    </div>
  );
}

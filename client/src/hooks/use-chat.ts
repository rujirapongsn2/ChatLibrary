import { useState, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { generateAIResponse, searchBooksLocal } from "@/lib/chat-utils";
import { mockBooks } from "@/lib/mock-data";
import type { ChatMessage, Book } from "@shared/schema";

interface ExtendedChatMessage extends ChatMessage {
  books?: Book[];
}

export function useChat() {
  const [messages, setMessages] = useState<ExtendedChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const queryClient = useQueryClient();

  const { data: books = [] } = useQuery<Book[]>({
    queryKey: ['/api/books/search'],
    initialData: mockBooks
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (data: { message: string; isUser: boolean }) => {
      const response = await apiRequest('POST', '/api/chat/messages', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chat/messages'] });
    }
  });

  const borrowBookMutation = useMutation({
    mutationFn: async (bookId: number) => {
      const response = await apiRequest('POST', '/api/borrowings', { bookId });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/borrowings'] });
      queryClient.invalidateQueries({ queryKey: ['/api/books/search'] });
    }
  });

  const returnBookMutation = useMutation({
    mutationFn: async (borrowingId: number) => {
      const response = await apiRequest('PATCH', `/api/borrowings/${borrowingId}/return`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/borrowings'] });
      queryClient.invalidateQueries({ queryKey: ['/api/books/search'] });
    }
  });

  const sendMessage = useCallback(async (messageText: string, language: 'en' | 'th' = 'en') => {
    // Add user message immediately
    const userMessage: ExtendedChatMessage = {
      id: Date.now(),
      userId: 1,
      message: messageText,
      isUser: true,
      createdAt: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Search for relevant books
    const relevantBooks = searchBooksLocal(messageText, books);
    
    // Generate AI response
    setTimeout(() => {
      const aiResponseText = generateAIResponse(messageText, language, relevantBooks);
      
      const aiMessage: ExtendedChatMessage = {
        id: Date.now() + 1,
        userId: 1,
        message: aiResponseText,
        isUser: false,
        createdAt: new Date(),
        books: relevantBooks.length > 0 ? relevantBooks.slice(0, 5) : undefined
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);

    // Persist to backend (optional)
    try {
      await sendMessageMutation.mutateAsync({ message: messageText, isUser: true });
      await sendMessageMutation.mutateAsync({ message: generateAIResponse(messageText, language, relevantBooks), isUser: false });
    } catch (error) {
      console.error('Failed to persist messages:', error);
    }
  }, [books, sendMessageMutation]);

  const borrowBook = useCallback(async (bookId: number) => {
    try {
      await borrowBookMutation.mutateAsync(bookId);
      
      const book = books.find(b => b.id === bookId);
      if (book) {
        const successMessage: ExtendedChatMessage = {
          id: Date.now(),
          userId: 1,
          message: `Great! I've successfully borrowed "${book.title}" for you. The book is due in 14 days. You can pick it up from the circulation desk with your student ID.`,
          isUser: false,
          createdAt: new Date()
        };
        
        setMessages(prev => [...prev, successMessage]);
      }
    } catch (error) {
      console.error('Failed to borrow book:', error);
    }
  }, [books, borrowBookMutation]);

  const returnBook = useCallback(async (borrowingId: number) => {
    try {
      await returnBookMutation.mutateAsync(borrowingId);
    } catch (error) {
      console.error('Failed to return book:', error);
    }
  }, [returnBookMutation]);

  const searchBooks = useCallback(async (query: string) => {
    const results = searchBooksLocal(query, books);
    return results;
  }, [books]);

  const getUserBorrowings = useCallback(async () => {
    try {
      const response = await apiRequest('GET', '/api/borrowings');
      const borrowings = await response.json();
      
      if (borrowings.length > 0) {
        const borrowingMessage: ExtendedChatMessage = {
          id: Date.now(),
          userId: 1,
          message: "Here are your currently borrowed books:",
          isUser: false,
          createdAt: new Date(),
          books: borrowings.map((b: any) => b.book)
        };
        
        setMessages(prev => [...prev, borrowingMessage]);
      } else {
        const noBooksMessage: ExtendedChatMessage = {
          id: Date.now(),
          userId: 1,
          message: "You don't have any books borrowed at the moment. Would you like to search for some books to borrow?",
          isUser: false,
          createdAt: new Date()
        };
        
        setMessages(prev => [...prev, noBooksMessage]);
      }
    } catch (error) {
      console.error('Failed to get borrowings:', error);
    }
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    borrowBook,
    returnBook,
    searchBooks,
    getUserBorrowings
  };
}

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock } from "lucide-react";
import type { Book } from "@shared/schema";

interface BookCardProps {
  book: Book;
  onBorrowClick: (book: Book) => void;
  language: 'en' | 'th';
  showBorrowButton?: boolean;
  borrowing?: {
    dueAt: Date;
    isReturned: boolean;
  };
}

export default function BookCard({ 
  book, 
  onBorrowClick, 
  language, 
  showBorrowButton = true,
  borrowing 
}: BookCardProps) {
  const isAvailable = book.availableCopies > 0;
  const isBorrowed = borrowing && !borrowing.isReturned;

  const labels = {
    en: {
      available: 'Available',
      borrowed: 'Borrowed',
      due: 'Due',
      borrow: 'Borrow',
      notAvailable: 'Not Available',
      by: 'by'
    },
    th: {
      available: 'ว่าง',
      borrowed: 'ยืมแล้ว',
      due: 'ครบกำหนด',
      borrow: 'ยืม',
      notAvailable: 'ไม่ว่าง',
      by: 'โดย'
    }
  };

  const formatDueDate = (date: Date) => {
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'th-TH', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="border rounded-xl p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex space-x-4">
        <img 
          src={book.imageUrl || "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=100"} 
          alt={`${book.title} cover`}
          className="w-16 h-20 object-cover rounded-lg flex-shrink-0" 
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 mb-1">{book.title}</h4>
          <p className="text-sm text-gray-600 mb-1">
            {labels[language].by} {book.author}
          </p>
          <p className="text-xs text-gray-500 mb-2">ISBN: {book.isbn}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isBorrowed ? (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  <Clock className="w-3 h-3 mr-1" />
                  {labels[language].due}: {formatDueDate(borrowing.dueAt)}
                </Badge>
              ) : isAvailable ? (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {labels[language].available}
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                  {labels[language].notAvailable}
                </Badge>
              )}
            </div>
            
            {showBorrowButton && (
              <Button
                size="sm"
                disabled={!isAvailable || isBorrowed}
                onClick={() => onBorrowClick(book)}
                className={`transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  !isAvailable || isBorrowed 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-muted-blue hover:bg-blue-600'
                }`}
              >
                {isBorrowed ? labels[language].borrowed : labels[language].borrow}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import type { Book } from "@shared/schema";

interface BorrowModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  language: 'en' | 'th';
}

export default function BorrowModal({ 
  book, 
  isOpen, 
  onClose, 
  onConfirm, 
  language 
}: BorrowModalProps) {
  if (!book) return null;

  const labels = {
    en: {
      title: 'Confirm Book Borrowing',
      message: 'Are you sure you want to borrow this book?',
      dueDate: 'Due date',
      cancel: 'Cancel',
      confirm: 'Confirm',
      by: 'by'
    },
    th: {
      title: 'ยืนยันการยืมหนังสือ',
      message: 'คุณแน่ใจหรือไม่ว่าต้องการยืมหนังสือเล่มนี้?',
      dueDate: 'วันครบกำหนด',
      cancel: 'ยกเลิก',
      confirm: 'ยืนยัน',
      by: 'โดย'
    }
  };

  const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  const formattedDueDate = dueDate.toLocaleDateString(
    language === 'en' ? 'en-US' : 'th-TH', 
    { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-blue-600 w-6 h-6" />
            </div>
            <DialogTitle className="text-lg font-semibold text-gray-900 mb-2">
              {labels[language].title}
            </DialogTitle>
            <p className="text-gray-600 mb-4">
              {labels[language].message}
            </p>
          </div>
        </DialogHeader>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900">{book.title}</h4>
          <p className="text-sm text-gray-600">
            {labels[language].by} {book.author}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {labels[language].dueDate}: {formattedDueDate}
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            {labels[language].cancel}
          </Button>
          <Button
            className="flex-1 bg-sage-green hover:bg-green-600 transition-colors transform hover:scale-105"
            onClick={onConfirm}
          >
            {labels[language].confirm}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

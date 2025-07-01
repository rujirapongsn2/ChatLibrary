import type { Book } from "@shared/schema";

export function generateAIResponse(message: string, language: 'en' | 'th', books?: Book[]) {
  const lowerMessage = message.toLowerCase();
  
  const responses = {
    en: {
      search: "I found several books matching your search. Here are the results:",
      status: "Here are your currently borrowed books:",
      recommend: "Based on your reading history, I recommend these new arrivals:",
      pythonSearch: "I found several Python programming books for you!",
      javascriptSearch: "Here are some great JavaScript books available:",
      dataScience: "I found some excellent data science books for you:",
      borrowSuccess: (title: string) => `Great! I've successfully borrowed "${title}" for you. The book is due in 14 days. You can pick it up from the circulation desk with your student ID.`,
      returnSuccess: (title: string) => `Perfect! "${title}" has been returned successfully. Thank you for using our library services!`,
      noResults: "I couldn't find any books matching your search. Would you like to try a different search term?",
      default: "I understand you're looking for library assistance. How can I help you today? You can ask me to search for books, check your borrowing status, or get recommendations."
    },
    th: {
      search: "ฉันพบหนังสือที่ตรงกับการค้นหาของคุณ นี่คือผลลัพธ์:",
      status: "นี่คือหนังสือที่คุณยืมอยู่ในปัจจุบัน:",
      recommend: "จากประวัติการอ่านของคุณ ฉันแนะนำหนังสือใหม่เหล่านี้:",
      pythonSearch: "ฉันพบหนังสือเขียนโปรแกรม Python หลายเล่มให้คุณ!",
      javascriptSearch: "นี่คือหนังสือ JavaScript ที่ดีที่มีให้:",
      dataScience: "ฉันพบหนังสือวิทยาการข้อมูลที่ยอดเยี่ยมให้คุณ:",
      borrowSuccess: (title: string) => `ยอดเยี่ยม! ฉันยืมหนังสือ "${title}" ให้คุณเรียบร้อยแล้ว หนังสือครบกำหนดใน 14 วัน คุณสามารถไปรับที่เคาน์เตอร์ด้วยบัตรนักศึกษา`,
      returnSuccess: (title: string) => `สมบูรณ์แบบ! "${title}" ได้ถูกคืนเรียบร้อยแล้ว ขอบคุณที่ใช้บริการห้องสมุดของเรา!`,
      noResults: "ฉันไม่พบหนังสือที่ตรงกับการค้นหาของคุณ คุณต้องการลองคำค้นหาอื่นไหม?",
      default: "ฉันเข้าใจว่าคุณต้องการความช่วยเหลือเกี่ยวกับห้องสมุด วันนี้ฉันช่วยอะไรคุณได้บ้าง? คุณสามารถขอให้ฉันค้นหาหนังสือ ตรวจสอบสถานะการยืม หรือขอคำแนะนำได้"
    }
  };

  const r = responses[language];

  // Search queries
  if (lowerMessage.includes('python') || lowerMessage.includes('ไพธอน')) {
    return r.pythonSearch;
  }
  
  if (lowerMessage.includes('javascript') || lowerMessage.includes('จาวาสคริปต์')) {
    return r.javascriptSearch;
  }
  
  if (lowerMessage.includes('data science') || lowerMessage.includes('วิทยาการข้อมูล')) {
    return r.dataScience;
  }
  
  if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('ค้นหา') || lowerMessage.includes('หา')) {
    return books && books.length > 0 ? r.search : r.noResults;
  }
  
  // Status queries
  if (lowerMessage.includes('status') || lowerMessage.includes('borrowed') || lowerMessage.includes('my books') || lowerMessage.includes('สถานะ') || lowerMessage.includes('ยืม') || lowerMessage.includes('หนังสือของฉัน')) {
    return r.status;
  }
  
  // Recommendation queries
  if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('แนะนำ')) {
    return r.recommend;
  }
  
  return r.default;
}

export function getBooksByCategory(category: string, allBooks: Book[]): Book[] {
  return allBooks.filter(book => 
    book.category?.toLowerCase().includes(category.toLowerCase())
  );
}

export function searchBooksLocal(query: string, allBooks: Book[]): Book[] {
  const lowerQuery = query.toLowerCase();
  return allBooks.filter(book => 
    book.title.toLowerCase().includes(lowerQuery) ||
    book.author.toLowerCase().includes(lowerQuery) ||
    book.category?.toLowerCase().includes(lowerQuery) ||
    book.description?.toLowerCase().includes(lowerQuery)
  );
}

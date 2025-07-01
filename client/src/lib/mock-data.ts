import type { Book } from "@shared/schema";

export const mockBooks: Book[] = [
  {
    id: 1,
    title: "Python Crash Course",
    author: "Eric Matthes",
    isbn: "978-1593279288",
    description: "A hands-on, project-based introduction to programming",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=100",
    totalCopies: 5,
    availableCopies: 3,
    createdAt: new Date()
  },
  {
    id: 2,
    title: "Automate the Boring Stuff with Python",
    author: "Al Sweigart",
    isbn: "978-1593275990",
    description: "Practical programming for total beginners",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=100",
    totalCopies: 3,
    availableCopies: 0,
    createdAt: new Date()
  },
  {
    id: 3,
    title: "Learning Python",
    author: "Mark Lutz",
    isbn: "978-1449355739",
    description: "Powerful object-oriented programming",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=100",
    totalCopies: 4,
    availableCopies: 2,
    createdAt: new Date()
  }
];

export const mockResponses = {
  en: {
    search: "I found several books matching your search. Here are the results:",
    status: "Here are your currently borrowed books:",
    recommend: "Based on your reading history, I recommend these new arrivals:",
    pythonSearch: "I found several Python programming books for you!",
    javascriptSearch: "Here are some great JavaScript books available:",
    borrowSuccess: "Great! I've successfully borrowed the book for you. You can pick it up from the circulation desk with your student ID.",
    default: "I understand you're looking for library assistance. How can I help you today?"
  },
  th: {
    search: "ฉันพบหนังสือที่ตรงกับการค้นหาของคุณ นี่คือผลลัพธ์:",
    status: "นี่คือหนังสือที่คุณยืมอยู่ในปัจจุบัน:",
    recommend: "จากประวัติการอ่านของคุณ ฉันแนะนำหนังสือใหม่เหล่านี้:",
    pythonSearch: "ฉันพบหนังสือเขียนโปรแกรม Python หลายเล่มให้คุณ!",
    javascriptSearch: "นี่คือหนังสือ JavaScript ที่ดีที่มีให้:",
    borrowSuccess: "ยอดเยี่ยม! ฉันยืมหนังสือให้คุณเรียบร้อยแล้ว คุณสามารถไปรับที่เคาน์เตอร์หนังสือด้วยบัตรนักศึกษาของคุณ",
    default: "ฉันเข้าใจว่าคุณต้องการความช่วยเหลือเกี่ยวกับห้องสมุด วันนี้ฉันช่วยอะไรคุณได้บ้าง?"
  }
};

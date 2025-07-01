import { users, books, borrowings, chatMessages, type User, type InsertUser, type Book, type InsertBook, type Borrowing, type InsertBorrowing, type ChatMessage, type InsertChatMessage } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getBooks(): Promise<Book[]>;
  getBook(id: number): Promise<Book | undefined>;
  searchBooks(query: string): Promise<Book[]>;
  createBook(book: InsertBook): Promise<Book>;
  updateBookCopies(id: number, availableCopies: number): Promise<void>;
  
  getUserBorrowings(userId: number): Promise<(Borrowing & { book: Book })[]>;
  createBorrowing(borrowing: InsertBorrowing): Promise<Borrowing>;
  returnBook(borrowingId: number): Promise<void>;
  
  getChatMessages(userId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private books: Map<number, Book>;
  private borrowings: Map<number, Borrowing>;
  private chatMessages: Map<number, ChatMessage>;
  private currentUserId: number;
  private currentBookId: number;
  private currentBorrowingId: number;
  private currentChatId: number;

  constructor() {
    this.users = new Map();
    this.books = new Map();
    this.borrowings = new Map();
    this.chatMessages = new Map();
    this.currentUserId = 1;
    this.currentBookId = 1;
    this.currentBorrowingId = 1;
    this.currentChatId = 1;
    this.seedData();
  }

  private seedData() {
    // Create default user
    const user: User = {
      id: 1,
      username: "siriporn",
      password: "password123",
      name: "Siriporn Tanaka",
      studentId: "6234567890",
      email: "siriporn.t@student.chula.ac.th"
    };
    this.users.set(1, user);
    this.currentUserId = 2;

    // Create sample books
    const sampleBooks: Book[] = [
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
      },
      {
        id: 4,
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        isbn: "978-0596517748",
        description: "Unearthing the excellence in JavaScript",
        category: "Programming",
        imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=100",
        totalCopies: 6,
        availableCopies: 4,
        createdAt: new Date()
      },
      {
        id: 5,
        title: "Data Science from Scratch",
        author: "Joel Grus",
        isbn: "978-1492041139",
        description: "First principles with Python",
        category: "Data Science",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=100",
        totalCopies: 3,
        availableCopies: 1,
        createdAt: new Date()
      }
    ];

    sampleBooks.forEach(book => this.books.set(book.id, book));
    this.currentBookId = 6;

    // Create sample borrowed book
    const borrowing: Borrowing = {
      id: 1,
      userId: 1,
      bookId: 2,
      borrowedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      dueAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      returnedAt: null,
      isReturned: false
    };
    this.borrowings.set(1, borrowing);
    this.currentBorrowingId = 2;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  async getBook(id: number): Promise<Book | undefined> {
    return this.books.get(id);
  }

  async searchBooks(query: string): Promise<Book[]> {
    const books = Array.from(this.books.values());
    const lowerQuery = query.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery) ||
      book.category?.toLowerCase().includes(lowerQuery) ||
      book.description?.toLowerCase().includes(lowerQuery)
    );
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = this.currentBookId++;
    const book: Book = { ...insertBook, id, createdAt: new Date() };
    this.books.set(id, book);
    return book;
  }

  async updateBookCopies(id: number, availableCopies: number): Promise<void> {
    const book = this.books.get(id);
    if (book) {
      book.availableCopies = availableCopies;
      this.books.set(id, book);
    }
  }

  async getUserBorrowings(userId: number): Promise<(Borrowing & { book: Book })[]> {
    const userBorrowings = Array.from(this.borrowings.values())
      .filter(borrowing => borrowing.userId === userId && !borrowing.isReturned);
    
    return userBorrowings.map(borrowing => {
      const book = this.books.get(borrowing.bookId);
      return { ...borrowing, book: book! };
    }).filter(item => item.book);
  }

  async createBorrowing(insertBorrowing: InsertBorrowing): Promise<Borrowing> {
    const id = this.currentBorrowingId++;
    const borrowing: Borrowing = { 
      ...insertBorrowing, 
      id, 
      borrowedAt: new Date(),
      returnedAt: null,
      isReturned: false
    };
    this.borrowings.set(id, borrowing);
    
    // Update book availability
    const book = this.books.get(insertBorrowing.bookId);
    if (book && book.availableCopies > 0) {
      await this.updateBookCopies(insertBorrowing.bookId, book.availableCopies - 1);
    }
    
    return borrowing;
  }

  async returnBook(borrowingId: number): Promise<void> {
    const borrowing = this.borrowings.get(borrowingId);
    if (borrowing) {
      borrowing.isReturned = true;
      borrowing.returnedAt = new Date();
      this.borrowings.set(borrowingId, borrowing);
      
      // Update book availability
      const book = this.books.get(borrowing.bookId);
      if (book) {
        await this.updateBookCopies(borrowing.bookId, book.availableCopies + 1);
      }
    }
  }

  async getChatMessages(userId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(message => message.userId === userId)
      .sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0));
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatId++;
    const message: ChatMessage = { ...insertMessage, id, createdAt: new Date() };
    this.chatMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();

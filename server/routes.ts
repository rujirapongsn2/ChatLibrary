import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBorrowingSchema, insertChatMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get current user (mock - always return user 1)
  app.get("/api/user", async (req, res) => {
    try {
      const user = await storage.getUser(1);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // Search books
  app.get("/api/books/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        const books = await storage.getBooks();
        return res.json(books);
      }
      const books = await storage.searchBooks(query);
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Failed to search books" });
    }
  });

  // Get user borrowings
  app.get("/api/borrowings", async (req, res) => {
    try {
      const borrowings = await storage.getUserBorrowings(1);
      res.json(borrowings);
    } catch (error) {
      res.status(500).json({ message: "Failed to get borrowings" });
    }
  });

  // Borrow a book
  app.post("/api/borrowings", async (req, res) => {
    try {
      const data = insertBorrowingSchema.parse({
        ...req.body,
        userId: 1, // Mock current user
        dueAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
      });
      
      const book = await storage.getBook(data.bookId);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      
      if (book.availableCopies <= 0) {
        return res.status(400).json({ message: "Book not available" });
      }
      
      const borrowing = await storage.createBorrowing(data);
      res.json(borrowing);
    } catch (error) {
      res.status(500).json({ message: "Failed to borrow book" });
    }
  });

  // Return a book
  app.patch("/api/borrowings/:id/return", async (req, res) => {
    try {
      const borrowingId = parseInt(req.params.id);
      await storage.returnBook(borrowingId);
      res.json({ message: "Book returned successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to return book" });
    }
  });

  // Get chat messages
  app.get("/api/chat/messages", async (req, res) => {
    try {
      const messages = await storage.getChatMessages(1);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to get chat messages" });
    }
  });

  // Send chat message
  app.post("/api/chat/messages", async (req, res) => {
    try {
      const data = insertChatMessageSchema.parse({
        ...req.body,
        userId: 1 // Mock current user
      });
      
      const message = await storage.createChatMessage(data);
      res.json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

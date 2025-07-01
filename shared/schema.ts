import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  studentId: text("student_id").notNull().unique(),
  email: text("email"),
});

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  isbn: text("isbn").notNull().unique(),
  description: text("description"),
  category: text("category"),
  imageUrl: text("image_url"),
  totalCopies: integer("total_copies").notNull().default(1),
  availableCopies: integer("available_copies").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

export const borrowings = pgTable("borrowings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  bookId: integer("book_id").references(() => books.id).notNull(),
  borrowedAt: timestamp("borrowed_at").defaultNow(),
  dueAt: timestamp("due_at").notNull(),
  returnedAt: timestamp("returned_at"),
  isReturned: boolean("is_returned").default(false),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  message: text("message").notNull(),
  isUser: boolean("is_user").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  studentId: true,
  email: true,
});

export const insertBookSchema = createInsertSchema(books).pick({
  title: true,
  author: true,
  isbn: true,
  description: true,
  category: true,
  imageUrl: true,
  totalCopies: true,
  availableCopies: true,
});

export const insertBorrowingSchema = createInsertSchema(borrowings).pick({
  userId: true,
  bookId: true,
  dueAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  userId: true,
  message: true,
  isUser: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBook = z.infer<typeof insertBookSchema>;
export type Book = typeof books.$inferSelect;
export type InsertBorrowing = z.infer<typeof insertBorrowingSchema>;
export type Borrowing = typeof borrowings.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

import { type User, type InsertUser, type UrinalysisTest, type InsertUrinalysisTest } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createTest(test: InsertUrinalysisTest): Promise<UrinalysisTest>;
  getTest(id: string): Promise<UrinalysisTest | undefined>;
  getAllTests(): Promise<UrinalysisTest[]>;
  getRecentTests(limit: number): Promise<UrinalysisTest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private tests: Map<string, UrinalysisTest>;

  constructor() {
    this.users = new Map();
    this.tests = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createTest(insertTest: InsertUrinalysisTest): Promise<UrinalysisTest> {
    const id = randomUUID();
    const test: UrinalysisTest = {
      id,
      imageUrl: insertTest.imageUrl ?? null,
      results: insertTest.results,
      summary: insertTest.summary,
      testDate: new Date(),
    };
    this.tests.set(id, test);
    return test;
  }

  async getTest(id: string): Promise<UrinalysisTest | undefined> {
    return this.tests.get(id);
  }

  async getAllTests(): Promise<UrinalysisTest[]> {
    return Array.from(this.tests.values()).sort(
      (a, b) => b.testDate.getTime() - a.testDate.getTime()
    );
  }

  async getRecentTests(limit: number): Promise<UrinalysisTest[]> {
    const allTests = await this.getAllTests();
    return allTests.slice(0, limit);
  }
}

export const storage = new MemStorage();

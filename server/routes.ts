import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { insertUrinalysisTestSchema, type TestParameter } from "@shared/schema";
import { fromError } from "zod-validation-error";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/tests", upload.single("image"), async (req, res) => {
    try {
      const { results, summary } = req.body;
      
      let parsedResults: TestParameter[];
      try {
        parsedResults = JSON.parse(results);
      } catch {
        return res.status(400).json({ error: "Invalid results format" });
      }

      let imageUrl: string | undefined;
      if (req.file) {
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        imageUrl = base64Image;
      }

      const validationResult = insertUrinalysisTestSchema.safeParse({
        results: parsedResults,
        summary,
        imageUrl,
      });

      if (!validationResult.success) {
        return res.status(400).json({ 
          error: fromError(validationResult.error).toString() 
        });
      }

      const test = await storage.createTest(validationResult.data);
      res.json(test);
    } catch (error) {
      console.error("Error creating test:", error);
      res.status(500).json({ error: "Failed to create test" });
    }
  });

  app.get("/api/tests", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const tests = limit 
        ? await storage.getRecentTests(limit)
        : await storage.getAllTests();
      res.json(tests);
    } catch (error) {
      console.error("Error fetching tests:", error);
      res.status(500).json({ error: "Failed to fetch tests" });
    }
  });

  app.get("/api/tests/:id", async (req, res) => {
    try {
      const test = await storage.getTest(req.params.id);
      if (!test) {
        return res.status(404).json({ error: "Test not found" });
      }
      res.json(test);
    } catch (error) {
      console.error("Error fetching test:", error);
      res.status(500).json({ error: "Failed to fetch test" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

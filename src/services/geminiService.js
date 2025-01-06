import { GoogleGenerativeAI } from '@google/generative-ai';
import { PromptManager } from './promptManager.js';

export class GeminiService {
  constructor() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    this.promptManager = new PromptManager();
  }

  async init() {
    await this.promptManager.loadPrompts();
  }

  async generateContent(topic, promptName = 'default') {
    try {
      const promptTemplate = this.promptManager.getPrompt(promptName);
      const prompt = promptTemplate.replace('{topic}', topic);
      const result = await this.model.generateContent(prompt);
      const text = result.response.text();
      return text.trim();
    } catch (error) {
      throw new Error(`Gemini API error: ${error.message}`);
    }
  }

  async addCustomPrompt(name, prompt) {
    return await this.promptManager.addCustomPrompt(name, prompt);
  }

  listPrompts() {
    return this.promptManager.listPrompts();
  }
}
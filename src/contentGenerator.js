import { topics } from './config.js';
import { GeminiService } from './services/geminiService.js';
import { ContentFormatter } from './services/contentFormatter.js';

export class ContentGenerator {
  constructor() {
    this.geminiService = new GeminiService();
    this.formatter = new ContentFormatter();
    this.usedTopics = new Set();
  }

  async init() {
    await this.geminiService.init();
  }

  async generatePost(promptName = 'default') {
    const topic = this.getRandomTopic();
    const content = await this.geminiService.generateContent(topic, promptName);
    const formattedPost = this.formatter.formatPost(content);
    
    if (!this.formatter.validateLength(formattedPost)) {
      throw new Error('Generated content exceeds character limit');
    }
    
    return formattedPost;
  }

  getRandomTopic() {
    if (this.usedTopics.size === topics.length) {
      this.usedTopics.clear();
    }

    let availableTopics = topics.filter(topic => !this.usedTopics.has(topic));
    const topic = availableTopics[Math.floor(Math.random() * availableTopics.length)];
    this.usedTopics.add(topic);
    return topic;
  }

  async addCustomPrompt(name, prompt) {
    return await this.geminiService.addCustomPrompt(name, prompt);
  }

  listPrompts() {
    return this.geminiService.listPrompts();
  }
}
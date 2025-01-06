import dotenv from 'dotenv';
import { ContentGenerator } from './contentGenerator.js';
import { TwitterClient } from './twitterClient.js';
import { config } from './config.js';
import { logger } from './logger.js';
import { showBanner } from './utils/banner.js';

dotenv.config();

class PostingSystem {
  constructor() {
    this.contentGenerator = new ContentGenerator();
    this.twitterClient = new TwitterClient();
  }

  async start() {
    // Show the banner
    showBanner();
    
    logger.info('Starting posting system');
    
    // Initialize content generator
    await this.contentGenerator.init();
    
    // Post immediately
    await this.makePost();
    
    // Then schedule next posts
    this.scheduleNextPost();
  }

  scheduleNextPost() {
    const interval = this.getRandomInterval();
    
    setTimeout(async () => {
      await this.makePost();
      this.scheduleNextPost();
    }, interval);

    logger.info(`Next post scheduled in ${interval / 1000 / 60} minutes`);
  }

  async makePost() {
    try {
      const content = await this.contentGenerator.generatePost();
      if (!content) {
        logger.error('Failed to generate content');
        return;
      }
      
      const result = await this.twitterClient.post(content);
      if (result) {
        logger.info('Post successful');
      }
    } catch (error) {
      logger.error('Error making post:', error);
    }
  }

  getRandomInterval() {
    const { min, max } = config.postingIntervals;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

// Start the system
const system = new PostingSystem();
system.start().catch(error => {
  logger.error('System error', { error: error.message });
});
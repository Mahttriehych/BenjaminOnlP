import { TwitterApi } from 'twitter-api-v2';
import { config } from './config.js';
import { logger } from './logger.js';

export class TwitterClient {
  constructor() {
    this.client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });
    
    this.postCount = 0;
    this.lastPostTime = null;
  }

  async post(content) {
    try {
      if (!this.canPost()) {
        logger.warn('Daily post limit reached or too soon since last post');
        return false;
      }

      if (content.length > config.characterLimit) {
        logger.error('Content exceeds character limit');
        return false;
      }

      await this.client.v2.tweet(content);
      this.updatePostMetrics();
      
      logger.info('Successfully posted tweet', { content });
      return true;
    } catch (error) {
      logger.error('Error posting tweet', { error: error.message, content });
      return false;
    }
  }

  canPost() {
    const now = Date.now();
    
    // Check daily limit
    if (this.postCount >= config.maxDailyPosts) {
      return false;
    }

    // Check minimum interval
    if (this.lastPostTime && 
        (now - this.lastPostTime) < config.postingIntervals.min) {
      return false;
    }

    return true;
  }

  updatePostMetrics() {
    this.postCount++;
    this.lastPostTime = Date.now();

    // Reset post count at midnight
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight - new Date();
    
    setTimeout(() => {
      this.postCount = 0;
    }, timeUntilMidnight);
  }
}
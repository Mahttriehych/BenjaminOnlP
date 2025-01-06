import dotenv from 'dotenv';
import { ContentGenerator } from './contentGenerator.js';
import { TwitterClient } from './twitterClient.js';

dotenv.config();

async function makeTestPost() {
  try {
    const generator = new ContentGenerator();
    const twitterClient = new TwitterClient();
    
    await generator.init();
    const content = await generator.generatePost();
    
    console.log('Generated content:', content);
    console.log('Attempting to post...');
    
    const result = await twitterClient.post(content);
    
    if (result) {
      console.log('Successfully posted to Twitter!');
    } else {
      console.log('Failed to post to Twitter. Check error logs for details.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

makeTestPost();
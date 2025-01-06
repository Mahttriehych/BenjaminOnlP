import { config } from '../config.js';

export class ContentFormatter {
  formatPost(content) {
    const { required, optional } = config.tags;
    
    // Always include required tags
    let tags = [...required];
    
    // Add 1-2 random optional tags
    const randomOptional = optional
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    
    tags = [...tags, ...randomOptional];
    
    return `${content} ${tags.join(' ')}`.trim();
  }

  validateLength(content) {
    return content.length <= config.characterLimit;
  }
}
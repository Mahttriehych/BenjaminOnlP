import { test } from 'node:test';
import assert from 'node:assert';
import { ContentGenerator } from './contentGenerator.js';
import { config } from './config.js';

test('ContentGenerator', async (t) => {
  await t.test('generates valid posts', () => {
    const generator = new ContentGenerator();
    const post = generator.generatePost();
    
    assert.ok(post.length <= config.characterLimit, 'Post should not exceed character limit');
    assert.ok(post.includes('@BenjaminonIP'), 'Post should include the required tag');
  });

  await t.test('varies content across multiple generations', () => {
    const generator = new ContentGenerator();
    const posts = new Set();
    
    for (let i = 0; i < 10; i++) {
      posts.add(generator.generatePost());
    }
    
    assert.ok(posts.size > 1, 'Should generate varied content');
  });
});
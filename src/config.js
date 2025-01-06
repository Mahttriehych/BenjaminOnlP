export const config = {
  postingIntervals: {
    min: 2 * 60 * 60 * 1000, // 2 hours
    max: 5 * 60 * 60 * 1000  // 5 hours
  },
  maxDailyPosts: 25,
  tags: {
    required: ['@BenjaminonIP'],
    optional: ['#IPTech', '#AI', '#STORY']
  },
  characterLimit: 280
};

export const topics = [
  'IP technology trends',
  'AI advancement in IP',
  'STORY platform features',
  'IP innovation',
  'Digital IP management'
];

export const geminiPrompt = `
Create a short, engaging tweet about {topic}. The tweet should:
- Be informative and professional
- Focus on IP technology and innovation
- Mention STORY platform when relevant
- Be under 200 characters (to leave room for tags)
- Not include any hashtags or handles (these will be added separately)
`;
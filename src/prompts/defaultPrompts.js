export const defaultPrompts = {
  default: `
Create a short, engaging tweet about {topic}. The tweet should:
- Be informative and professional
- Focus on IP technology and innovation
- Mention STORY platform when relevant
- Be under 200 characters (to leave room for tags)
- Not include any hashtags or handles (these will be added separately)
`,
  technical: `
Write a technical tweet about {topic} that:
- Highlights specific technological aspects
- Includes concrete examples or statistics
- Maintains professional tone
- Stays under 200 characters
`,
  news: `
Create a news-style tweet about {topic} that:
- Emphasizes recent developments
- Uses journalistic tone
- Highlights impact on IP industry
- Stays under 200 characters
`
};
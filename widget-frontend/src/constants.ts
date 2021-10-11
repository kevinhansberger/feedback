export const APP_NAME = 'Feedback';
export const APP_DESCRIPTION = 'Find out what customers are thinking about your site';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:300';
export const REACTIONS: string[] = [ 'BAD', 'DECENT', 'GOOD', 'AMAZING' ];
export const REACTION_EMOJIS = { BAD: '&#128546;', DECENT: '&#128528;', GOOD: '&#128578;', AMAZING: '&#128525;' };

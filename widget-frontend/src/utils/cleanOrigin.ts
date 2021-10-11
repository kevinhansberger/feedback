export const cleanOrigin = (origin: string) : string => {
  return origin.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
}

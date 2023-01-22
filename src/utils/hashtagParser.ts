export const hashtagsParser = {
  serialize: (tags: string[]): string => {
    return JSON.stringify(tags);
  },

  deserialize: (tags: string): string[] => {
    return JSON.parse(tags);
  },
};

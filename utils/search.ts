// Levenshtein distance algorithm
const getEditDistance = (a: string, b: string): number => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  // increment along the first column of each row
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          )
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

export const fuzzySearch = <T>(
  query: string,
  items: T[],
  keys: (keyof T)[],
  threshold: number = 2
): T[] => {
  if (!query) return items;
  const lowerQuery = query.toLowerCase().trim();

  // If query is very short, strict match is safer to avoid noise
  if (lowerQuery.length < 3) {
    return items.filter(item => 
      keys.some(key => String(item[key]).toLowerCase().includes(lowerQuery))
    );
  }

  return items.filter(item => {
    return keys.some(key => {
      const value = String(item[key]).toLowerCase();
      
      // 1. Direct match (highest priority)
      if (value.includes(lowerQuery)) return true;

      // 2. Word-based fuzzy match
      const words = value.split(/\s+/);
      return words.some(word => {
        // Allow higher threshold for longer words
        const dynamicThreshold = word.length > 5 ? threshold + 1 : threshold;
        return getEditDistance(word, lowerQuery) <= dynamicThreshold;
      });
    });
  });
};
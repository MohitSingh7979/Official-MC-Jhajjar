// Optimized Levenshtein distance algorithm (O(min(a,b)) space)
const getEditDistance = (a: string, b: string): number => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  // Swap to ensure we use the smaller string for column space
  if (a.length > b.length) {
    [a, b] = [b, a];
  }

  const row = new Array(a.length + 1);
  for (let i = 0; i <= a.length; i++) {
    row[i] = i;
  }

  for (let i = 1; i <= b.length; i++) {
    let prev = i;
    for (let j = 1; j <= a.length; j++) {
      let val;
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        val = row[j - 1];
      } else {
        val = Math.min(row[j - 1], prev, row[j]) + 1;
      }
      row[j - 1] = prev;
      prev = val;
    }
    row[a.length] = prev;
  }

  return row[a.length];
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
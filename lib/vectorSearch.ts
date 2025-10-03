export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error("Vectors must have the same length");
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magnitudeA += vecA[i] * vecA[i];
    magnitudeB += vecB[i] * vecB[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Search interface for FAQ entries
 */
export interface SearchResult<T> {
  document: T;
  similarity: number;
}

export function findTopKSimilar<T extends { embedding: number[] }>(
  queryEmbedding: number[],
  documents: T[],
  k: number = 3,
  threshold: number = 0.5
): SearchResult<T>[] {
  const results: SearchResult<T>[] = documents
    .map((doc) => ({
      document: doc,
      similarity: cosineSimilarity(queryEmbedding, doc.embedding),
    }))
    .filter((result) => result.similarity >= threshold)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, k);

  return results;
}

export function hasRelevantResults<T>(
  results: SearchResult<T>[],
  threshold: number = 0.7
): boolean {
  return results.length > 0 && results[0].similarity >= threshold;
}

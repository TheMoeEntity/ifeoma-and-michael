interface BlessingValidationResult {
  valid: boolean;
  reason?: string;
  score: number;
}

const COMMON_WORDS = new Set([
  "congratulations",
  "congrats",
  "happy",
  "wishing",
  "wish",
  "love",
  "joy",
  "peace",
  "blessing",
  "blessings",
  "marriage",
  "home",
  "family",
  "forever",
  "beautiful",
  "union",
  "god",
  "amen",
  "pray",
  "praying",
  "grace",
  "success",
  "happiness",
  "together",
  "couple",
]);

export function validateBlessing(input: string): BlessingValidationResult {
  const text = input.trim();

  let score = 100;

  const lettersOnly = text.replace(/[^a-zA-Z]/g, "");
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);

  // Too few actual words
  if (words.length < 3) score -= 35;

  // Detect keyboard smash: jgsjktjekjgggdglgd
  const vowelCount = (lettersOnly.match(/[aeiou]/gi) || []).length;
  const vowelRatio = lettersOnly.length ? vowelCount / lettersOnly.length : 0;

  if (lettersOnly.length > 12 && vowelRatio < 0.18) {
    score -= 45;
  }

  // Too many repeated characters: hellooooooo, kkkkkkk
  if (/(.)\1{4,}/i.test(text)) {
    score -= 35;
  }

  // One giant nonsense word
  const longestWord = words.reduce(
    (max, word) => Math.max(max, word.length),
    0,
  );

  if (longestWord > 18 && words.length <= 3) {
    score -= 45;
  }

  // Low word quality
  const meaningfulWords = words.filter((word) =>
    COMMON_WORDS.has(word.replace(/[^a-z]/g, "")),
  );

  if (words.length >= 4 && meaningfulWords.length === 0) {
    score -= 25;
  }

  // Too many symbols
  const symbolCount = (text.match(/[^a-zA-Z0-9\s.,!?'"-]/g) || []).length;
  const symbolRatio = symbolCount / text.length;

  if (symbolRatio > 0.2) {
    score -= 30;
  }

  // Looks like mostly random characters
  const hasSentenceLikeStructure = /\b[a-zA-Z]{2,}\b\s+\b[a-zA-Z]{2,}\b/.test(
    text,
  );

  if (!hasSentenceLikeStructure) {
    score -= 25;
  }

  return {
    valid: score >= 60,
    reason:
      score >= 60 ? undefined : "Message appears to be spam or nonsensical.",
    score,
  };
}

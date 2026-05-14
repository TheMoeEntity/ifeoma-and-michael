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

// Matches pictographic emoji (hearts, faces, celebration symbols, etc.)
const EMOJI_RE = /\p{Extended_Pictographic}/gu;

export function validateBlessing(input: string): BlessingValidationResult {
  const text = input.trim();
  let score = 100;

  // Count emojis and strip them before all text-based analysis
  const emojiCount = (text.match(EMOJI_RE) ?? []).length;
  const textNoEmoji = text.replace(EMOJI_RE, " ").replace(/\s+/g, " ").trim();

  // Pure emoji blessing (e.g. "❤️🙏🎉") — accept as genuine
  if (emojiCount > 0 && textNoEmoji.length === 0) {
    return { valid: true, score: 80 };
  }

  // Small bonus for emotional expressiveness
  if (emojiCount > 0) score += 10;

  const lettersOnly = textNoEmoji.replace(/[^a-zA-Z]/g, "");
  const words = textNoEmoji.toLowerCase().split(/\s+/).filter(Boolean);

  // Too few actual words
  if (words.length < 3) score -= 35;

  // Detect keyboard smash: jgsjktjekjgggdglgd
  const vowelCount = (lettersOnly.match(/[aeiou]/gi) ?? []).length;
  const vowelRatio = lettersOnly.length ? vowelCount / lettersOnly.length : 0;
  if (lettersOnly.length > 12 && vowelRatio < 0.18) score -= 45;

  // Too many repeated characters: hellooooooo, kkkkkkk
  if (/(.)\1{4,}/i.test(textNoEmoji)) score -= 35;

  // One giant nonsense word
  const longestWord = words.reduce((max, w) => Math.max(max, w.length), 0);
  if (longestWord > 18 && words.length <= 3) score -= 45;

  // Low word quality — emojis already removed so this only tests real words
  const meaningfulWords = words.filter((w) =>
    COMMON_WORDS.has(w.replace(/[^a-z]/g, "")),
  );
  if (words.length >= 4 && meaningfulWords.length === 0) score -= 25;

  // Too many non-emoji symbols (emojis already stripped)
  const symbolCount = (textNoEmoji.match(/[^a-zA-Z0-9\s.,!?'"–—-]/g) ?? []).length;
  const symbolRatio = textNoEmoji.length ? symbolCount / textNoEmoji.length : 0;
  if (symbolRatio > 0.2) score -= 30;

  // Looks like mostly random characters (tested on emoji-free text)
  const hasSentenceLikeStructure = /\b[a-zA-Z]{2,}\b\s+\b[a-zA-Z]{2,}\b/.test(textNoEmoji);
  if (!hasSentenceLikeStructure) score -= 25;

  return {
    valid: score >= 60,
    reason: score >= 60 ? undefined : "Message appears to be spam.",
    score,
  };
}

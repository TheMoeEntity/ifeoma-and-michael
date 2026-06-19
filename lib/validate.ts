interface BlessingValidationResult {
  valid: boolean;
  reason?: string;
  score: number;
}

const COMMON_WORDS = new Set([
  "congratulations", "congrats", "happy", "wishing", "wish", "love", "joy",
  "peace", "blessing", "blessings", "marriage", "home", "family", "forever",
  "beautiful", "union", "god", "amen", "pray", "praying", "grace", "success",
  "happiness", "together", "couple",
]);

const EMOJI_RE = /\p{Extended_Pictographic}/gu;

export function validateBlessing(input: string): BlessingValidationResult {
  const text = input.trim();
  let score = 100;

  const emojiCount = (text.match(EMOJI_RE) ?? []).length;
  const textNoEmoji = text.replace(EMOJI_RE, " ").replace(/\s+/g, " ").trim();

  // Pure emoji blessing — accept fully, give it a perfect score
  if (emojiCount > 0 && textNoEmoji.length === 0) {
    return { valid: true, score: 100 };
  }

  // Emojis alongside text — generous bonus
  if (emojiCount > 0) score += 20;

  // Emoji-heavy messages (more emojis than words) — skip text analysis entirely
  const words = textNoEmoji.toLowerCase().split(/\s+/).filter(Boolean);
  if (emojiCount > 0 && emojiCount >= words.length) {
    return { valid: true, score: Math.min(score, 100) };
  }

  const lettersOnly = textNoEmoji.replace(/[^a-zA-Z]/g, "");

  // Too few actual words (only penalise if there are no emojis at all)
  if (words.length < 3 && emojiCount === 0) score -= 35;

  // Keyboard smash detection
  const vowelCount = (lettersOnly.match(/[aeiou]/gi) ?? []).length;
  const vowelRatio = lettersOnly.length ? vowelCount / lettersOnly.length : 0;
  if (lettersOnly.length > 12 && vowelRatio < 0.18) score -= 45;

  // Excessive repeated characters: kkkkkk, hellooooooo
  if (/(.)\1{4,}/i.test(textNoEmoji)) score -= 20; // softened from 35

  // One giant nonsense word
  const longestWord = words.reduce((max, w) => Math.max(max, w.length), 0);
  if (longestWord > 18 && words.length <= 3) score -= 45;

  // Low meaningful word ratio — only penalise on longer messages
  const meaningfulWords = words.filter((w) => COMMON_WORDS.has(w.replace(/[^a-z]/g, "")));
  if (words.length >= 6 && meaningfulWords.length === 0) score -= 25; // raised threshold from 4 → 6

  // Excessive non-emoji symbols
  const symbolCount = (textNoEmoji.match(/[^a-zA-Z0-9\s.,!?'"–—-]/g) ?? []).length;
  const symbolRatio = textNoEmoji.length ? symbolCount / textNoEmoji.length : 0;
  if (symbolRatio > 0.2) score -= 30;

  // Sentence-like structure check — skip if emojis are present
  if (emojiCount === 0) {
    const hasSentenceLikeStructure = /\b[a-zA-Z]{2,}\b\s+\b[a-zA-Z]{2,}\b/.test(textNoEmoji);
    if (!hasSentenceLikeStructure) score -= 25;
  }

  return {
    valid: score >= 60,
    reason: score >= 60 ? undefined : "Message appears to be spam.",
    score,
  };
}

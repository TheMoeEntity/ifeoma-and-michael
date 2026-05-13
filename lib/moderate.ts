import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function isGenuineBlessing(
  name: string,
  message: string,
): Promise<boolean> {
  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 10,
      messages: [
        {
          role: "user",
          content: `You are a content moderator for a Nigerian-Russian wedding website. Is this submission a genuine wedding blessing or congratulations message?

Name: ${name}
Message: ${message}

Reply with exactly one word: "genuine" or "spam".
Genuine = heartfelt wishes, congratulations, blessings, prayers — even short ones.
Spam = random characters, gibberish, ads, unrelated content, offensive content.`,
        },
      ],
    });

    const text =
      response.content[0].type === "text"
        ? response.content[0].text.toLowerCase().trim()
        : "";
    return text.startsWith("genuine");
  } catch {
    // On API error, be permissive — don't block real guests
    return true;
  }
}

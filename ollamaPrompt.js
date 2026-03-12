// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: robot;
const OLLAMA_BASE_URL = 'http://127.0.0.1:11434';
const MODEL = 'qwen3.5';

/**
 * Send a prompt to the local Ollama API and return the generated text.
 * @function
 *
 * @param {string} input user-supplied prompt string
 * @returns {Promise<string>} markdown-formatted response from the model
 */
const queryOllama = async input => {
  const req = new Request(`${OLLAMA_BASE_URL}/api/generate`);

  req.method = 'POST';
  req.headers = { 'Content-Type': 'application/json' };
  req.body = JSON.stringify({ model: MODEL, prompt: input, stream: false });

  const data = await req.loadJSON();

  if (!data.response) {
    throw new Error(
      `Ollama returned no response. Raw: ${JSON.stringify(data)}`,
    );
  }

  return data.response.trim();
};

const prompt = args.shortcutParameter;

if (!prompt) {
  console.error('No prompt received from Shortcuts.');
  Script.setShortcutOutput('');
  Script.complete();
} else {
  try {
    const result = await queryOllama(String(prompt));

    Script.setShortcutOutput(result);
  } catch (err) {
    console.error(`ollamaPrompt error: ${err.message}`);
    Script.setShortcutOutput(`Error: ${err.message}`);
  }

  Script.complete();
}

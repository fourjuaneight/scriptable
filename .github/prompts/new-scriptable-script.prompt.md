---
description: "Create a new Scriptable iOS script. Scaffolds the file with header metadata, handles widget/shortcut/in-app contexts, and follows repo code style."
argument-hint: "Describe what the script should do (e.g. 'show daily weather as a medium widget')"
agent: "agent"
---
Create a new Scriptable JavaScript script based on the description below.

**Script description**: $input

## Requirements

1. **File header** — include the required Scriptable comment block at the very top:
   ```
   // Variables used by Scriptable.
   // These must be at the very top of the file. Do not edit.
   // icon-color: <appropriate color>; icon-glyph: <appropriate fa glyph>;
   ```
   Choose a color and Font Awesome 5 glyph that match the script's purpose.

2. **Context handling** — detect where the script is running and handle each case:
   - `config.runsInWidget` → build with `ListWidget`, call `Script.setWidget(widget)`
   - In-app fallback → present a preview with `widget.presentMedium()` (or appropriate size)
   - Shortcut/Siri → read `args.shortcutParameter`, call `Script.setShortcutOutput(result)`
   - Only implement the contexts that are relevant to the described purpose

3. **Always call `Script.complete()`** at the end

4. **Code style** (matches repo's Prettier + ESLint config):
   - Single quotes, 2-space indent, trailing commas
   - `const` by default; `let` only when reassignment is needed
   - Arrow functions; omit braces for single-expression bodies
   - `async/await` for all async work
   - JSDoc on every named function (`@function`, `@param`, `@returns`)
   - No `console.log`; use `console.warn`/`console.error` only

5. **Networking** — use `Request` for HTTP. Call `.loadJSON()`, `.loadImage()`, or `.loadString()` as appropriate.

6. **No browser APIs** — `window`, `document`, `localStorage`, etc. do not exist in Scriptable.

7. **Output** — write the complete script to a new `.js` file in the workspace root. Pick a concise camelCase filename that describes the script's function.

## Reference

- Scriptable API docs: https://docs.scriptable.app
- Follow the patterns in existing scripts in this repo (e.g. `dailyPokemon.js`, `xkcd.js`, `weatherReport.js`)

---
description: "Use when writing, editing, or reviewing Scriptable iOS automation scripts. Covers file header format, Scriptable API globals, widget patterns, shortcut integration, and code style conventions."
applyTo: "**/*.js"
---
# Scriptable Script Guidelines

Scriptable runs JavaScript via Apple's JavaScriptCore (ES6+). There is no DOM, no `window`, no `document`, and no browser APIs. All iOS automation is done through Scriptable's built-in globals.

## File Header

Every script must start with exactly this block (do not edit the first two lines):

```js
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: <color>; icon-glyph: <fa-glyph>;
```

Valid `icon-color` values: `red`, `deep-gray`, `light-gray`, `white`, `yellow`, `orange`, `green`, `teal-blue`, `cyan`, `blue`, `deep-blue`, `indigo`, `purple`, `pink`, `light-brown`, `brown`. 
`icon-glyph` is any [Font Awesome 5](https://fontawesome.com/icons) icon name (kebab-case).

## Code Style

- **Single quotes** for strings, **2-space indentation**, **trailing commas** (Prettier config)
- **Arrow functions** preferred; omit braces when body is a single expression
- **`const`** by default; `let` only when reassignment is needed; never `var`
- **`async/await`** for all asynchronous operations; avoid `.then()` chains
- **JSDoc comments** on every named function: `@function`, `@param`, `@returns`
- No `console.log` — use `console.warn` or `console.error` for diagnostics

## Formatting & Linting

After writing or modifying any script, always run both tools:

```sh
pnpm format   # Prettier — auto-formats all *.js files
pnpm lint     # ESLint --fix — fixes violations and reports remaining errors
```

- **Formatter** (`pnpm format`) must always be run — it enforces single quotes, trailing commas, print width, etc.
- **Linter** (`pnpm lint`) must always be run and must produce **zero errors** before the script is considered complete. Warnings are acceptable; errors are not.
- Fix any ESLint errors reported after `pnpm lint` before finishing.

## Key Scriptable Globals

### Script lifecycle
```js
Script.setWidget(widget);       // set widget to display
Script.setShortcutOutput(value); // return value to Shortcuts app
Script.complete();              // signal script is done (required for Shortcuts/Siri)
```

### Context detection
```js
config.runsInWidget          // true when running as Home/Lock Screen widget
config.runsInAccessoryWidget // true for Lock Screen accessory widgets (iOS 16+)
config.runsInApp             // true when running inside Scriptable app
config.runsWithSiri          // true when triggered by Siri
config.widgetFamily          // "small" | "medium" | "large" | "extraLarge" | "accessoryRectangular" | "accessoryInline" | "accessoryCircular" | null
```

### Arguments
```js
args.widgetParameter    // string set in widget edit screen
args.shortcutParameter  // value passed in from Shortcuts action
args.plainTexts         // [string] from share sheet
args.urls               // [string] from share sheet
args.images             // [Image] from share sheet
```

### Networking
```js
const req = new Request('https://example.com/api');
req.method = 'POST';                    // default: GET
req.headers = { 'Content-Type': 'application/json' };
req.body = JSON.stringify({ key: val });
const json = await req.loadJSON();      // parse response as JSON
const img  = await req.loadImage();     // load as Image object
const str  = await req.loadString();    // load as plain text
```

### Widgets (ListWidget)
```js
const widget = new ListWidget();
widget.backgroundColor = new Color('#1a1a2e');
widget.backgroundGradient = gradient;   // LinearGradient instance
widget.backgroundImage = img;           // Image instance
widget.spacing = 4;
widget.setPadding(12, 12, 12, 12);
widget.url = 'https://...';            // tap action URL
widget.refreshAfterDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

const txt = widget.addText('Hello');
txt.font = new Font('Helvetica', 14);
txt.textColor = Color.white();
txt.textOpacity = 0.8;
txt.leftAlignText();                    // or centerAlignText() / rightAlignText()

const img = widget.addImage(imageObj);
img.centerAlignImage();
img.imageSize = new Size(60, 60);
img.cornerRadius = 8;

widget.addSpacer(null);                 // flexible spacer

const stack = widget.addStack();
stack.layoutHorizontally();            // or layoutVertically()
stack.centerAlignContent();
stack.spacing = 6;
```

### Gradient
```js
const gradient = new LinearGradient();
gradient.locations = [0, 1];
gradient.colors = [new Color('#0f0c29'), new Color('#302b63')];
```

### Colors & Fonts
```js
Color.white()  Color.black()  Color.red()  // static named colors
new Color('#rrggbb')                        // hex string
new Color('#rrggbbaa')                      // with alpha
Font.systemFont(size)
Font.boldSystemFont(size)
new Font('Courier', 14)
```

### Dark mode detection
Prefer `WebView` for reliable dark mode detection (Device.isUsingDarkAppearance() can be unreliable):
```js
const view = new WebView();
const isDark = await view.evaluateJavaScript(
  "(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)"
);
```

### FileManager / Keychain
```js
const fm = FileManager.iCloud();        // or FileManager.local()
const path = fm.joinPath(fm.documentsDirectory(), 'data.json');
fm.writeString(path, JSON.stringify(data));
const raw = fm.readString(path);

Keychain.set('myKey', 'secret');
const secret = Keychain.get('myKey');
```

### Alerts & UI
```js
const alert = new Alert();
alert.title = 'Confirm';
alert.message = 'Are you sure?';
alert.addAction('Yes');
alert.addCancelAction('No');
const idx = await alert.presentAlert();  // returns index of tapped action
```

## Widget Script Pattern

Always handle both widget and in-app execution contexts:

```js
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: chart-bar;

const data = await fetchData();

if (config.runsInWidget) {
  const widget = buildWidget(data);
  Script.setWidget(widget);
} else {
  // Preview or run in-app fallback
  const widget = buildWidget(data);
  await widget.presentMedium();
}

Script.complete();
```

## Shortcut Script Pattern

```js
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: bolt;

const input = args.shortcutParameter;
const result = processInput(input);

Script.setShortcutOutput(result);
Script.complete();
```

## Module Pattern (importModule)

For shared utilities, export via `module.exports`:

```js
// myHelper.js
const helper = value => value.toUpperCase();
module.exports = { helper };

// consumer.js
const { helper } = importModule('myHelper');
```

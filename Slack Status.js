// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: user;
// In order to use the script, you must create a Slack app and install it on your workspace. Go here to create your app: api.slack.com/apps
// There's two important configurations you must make to the app:
// 1. Add the users.profile:write scope to the app. This scope is necessary to set a Slack status.
// 2. Add the following redirect URL, so Slack will redirect to Scriptable after authorizing.
// https://open.scriptable.app

// Run the script to grant your newly created app authorization to access your Slack account. After you've done this, you can use the script in Shortcuts.

// Prefix used for items in the keychain. The script could be updated to take this as input and differentiate between client IDs, client secrets and access tokens stored in the keychain.
const KEYCHAIN_PREFIX = 'status_helper';

// Input paramters that are used to choose the action to perform when running the script.
const { code } = args.queryParameters;
const action = args.shortcutParameter;

// Helpers
const getRedirectURI = () => {
  const scriptName = encodeURIComponent(Script.name());

  return `https://open.scriptable.app/run?scriptName=${scriptName}`;
};

const authorize = clientID => {
  const url =
    `${'https://slack.com/oauth/authorize' +
      '?client_id='}${clientID}&scope=users.profile:write` +
    `&redirect_uri=${getRedirectURI()}`;

  Safari.open(url);
};

const swapCodeForAccessToken = async (clientID, clientSecret) => {
  const url = `${'https://slack.com/api/oauth.access' +
    '?client_id='}${clientID}&client_secret=${clientSecret}&code=${code}&redirect_uri=${getRedirectURI()}`;
  const req = new Request(url);
  const json = await req.loadJSON();

  return json.access_token;
};

const storeAccessToken = (prefix, accessToken) => {
  const key = `${prefix}.access_token`;

  Keychain.set(key, accessToken);
};

// Menu
const getAccessToken = prefix => {
  const key = `${prefix}.access_token`;

  if (Keychain.contains(key)) {
    return Keychain.get(key);
  }

  return null;
};

const getFromKeychainOrPrompt = async (key, title, message, placeholder) => {
  if (Keychain.contains(key)) {
    return Keychain.get(key);
  }
  const alert = new Alert();

  alert.title = title;
  alert.message = message;
  alert.addTextField(placeholder);
  alert.addCancelAction('Cancel');
  alert.addAction('Save');
  await alert.present();

  const value = alert.textFieldValue(0);

  if (value != null && value.length > 0) {
    Keychain.set(key, value);
    return value;
  }
  return null;
};

const getSlackClientID = async prefix => {
  const key = `${prefix}.client_id`;
  const title = 'Enter Slack Client ID';
  const message = 'You can obtain your client ID from api.slack.com/apps';
  const placeholder = 'Client ID';

  return getFromKeychainOrPrompt(key, title, message, placeholder);
};

const getSlackClientSecret = async prefix => {
  const key = `${prefix}.client_secret`;
  const title = 'Enter Slack Client Secret';
  const message = 'You can obtain your client secret from api.slack.com/apps';
  const placeholder = 'Client Secret';

  return getFromKeychainOrPrompt(key, title, message, placeholder);
};

const getSlackClientIDAndClientSecret = async () => {
  const clientID = await getSlackClientID(KEYCHAIN_PREFIX);

  if (clientID != null) {
    const clientSecret = await getSlackClientSecret(KEYCHAIN_PREFIX);

    if (clientSecret != null) {
      log(clientID);
      log(clientSecret);
      return { client_id: clientID, client_secret: clientSecret };
    }
    return null;
  }
  return null;
};

const clearClientIDAndClientSecret = prefix => {
  const clientIDKey = `${prefix}.client_id`;
  const clientSecretKey = `${prefix}.client_secret`;

  if (Keychain.contains(clientIDKey)) {
    Keychain.remove(clientIDKey);
  }
  if (Keychain.contains(clientSecretKey)) {
    Keychain.remove(clientSecretKey);
  }
};

const clearAccessToken = prefix => {
  const key = `${prefix}.access_token`;
  if (Keychain.contains(key)) {
    Keychain.remove(key);
  }
};

const presentMenu = async () => {
  const accessToken = getAccessToken(KEYCHAIN_PREFIX);
  const alert = new Alert();

  alert.title = Script.name();

  if (accessToken != null) {
    alert.title = "You're authorized and can use the script in Shortcuts.";
  } else {
    alert.message = 'You must authorize to use the script.';
  }
  alert.addAction('Authorize');
  alert.addDestructiveAction('Clear Client ID and Client Secret');
  alert.addDestructiveAction('Clear Access Token');
  alert.addCancelAction('Cancel');

  const idx = await alert.presentAlert();

  if (idx === 0) {
    const clientInfo = await getSlackClientIDAndClientSecret(KEYCHAIN_PREFIX);
    if (clientInfo != null) {
      authorize(clientInfo.client_id);
    }
  } else if (idx === 1) {
    clearClientIDAndClientSecret(KEYCHAIN_PREFIX);
  } else if (idx === 2) {
    clearAccessToken(KEYCHAIN_PREFIX);
  }
};

// Shortcuts
const setStatus = async (accessToken, emoji, text) => {
  const url = 'https://slack.com/api/users.profile.set';
  const req = new Request(url);

  req.method = 'POST';
  req.headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  req.body = JSON.stringify({
    profile: {
      status_emoji: emoji,
      status_text: text,
      status_expiration: 0,
    },
  });

  return req.loadJSON();
};

if (code != null) {
  // Swapping an OAuth code for an access token.
  const clientID = getSlackClientID(KEYCHAIN_PREFIX);
  const clientSecret = getSlackClientSecret(KEYCHAIN_PREFIX);
  const accessToken = swapCodeForAccessToken(clientID, clientSecret);

  storeAccessToken(KEYCHAIN_PREFIX, accessToken);
  presentMenu();
} else if (action != null) {
  const { type } = action;

  if (type === 'set_status') {
    const accessToken = getAccessToken(KEYCHAIN_PREFIX);

    setStatus(accessToken, action.emoji, action.text);
    Script.complete();
  } else if (type === 'clear_status') {
    const accessToken = getAccessToken(KEYCHAIN_PREFIX);

    setStatus(accessToken, '', '');
    Script.complete();
  } else {
    const result = { error: `Unsupported action: ${action.type}` };

    Script.setShortcutOutput(result);
    Script.complete();
  }
} else {
  presentMenu();
}

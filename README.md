# bharatcode

OpenCode plugin for the BharatCode A100 coding model endpoint.

This configures OpenCode to use:

- endpoint: `https://bharatcode.kaabil.me/v1`
- model: `bharatcode:qwen36-35b-q6-256k-vision`
- context window: `256K`
- image input: enabled
- reasoning: enabled
- provider adapter: `@ai-sdk/openai-compatible`

You need a BharatCode API key from Shrey. Do not commit or share the key.

## Install

Install OpenCode:

```bash
npm install -g opencode-ai
opencode --version
```

Configure the plugin in `~/.config/opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["bharatcode"]
}
```

Set your API key:

```bash
export BHARATCODE_API_KEY="PASTE_YOUR_KEY_HERE"
```

To persist it, add that line to your shell profile, such as `~/.bashrc` or
`~/.zshrc`.

On Windows PowerShell:

```powershell
setx BHARATCODE_API_KEY "PASTE_YOUR_KEY_HERE"
```

Open a new terminal after running `setx`.

## Smoke Test

```bash
opencode run "Return only the integer result of 23*19."
```

Expected output:

```text
437
```

Then use it inside a repository:

```bash
cd /path/to/your/repo
opencode
```

## Local Plugin Fallback

If the npm package install path is not working on your machine, install the
plugin file directly.

Linux/macOS:

```bash
mkdir -p ~/.config/opencode/plugins
curl -L https://raw.githubusercontent.com/shrey16/bharatcode/main/index.js \
  -o ~/.config/opencode/plugins/bharatcode-plugin.js
```

Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.config\opencode\plugins"
Invoke-WebRequest `
  -Uri "https://raw.githubusercontent.com/shrey16/bharatcode/main/index.js" `
  -OutFile "$env:USERPROFILE\.config\opencode\plugins\bharatcode-plugin.js"
```

When using the local plugin fallback, you do not need the `"plugin"` entry in
`opencode.json`; OpenCode auto-loads local plugin files from the plugins
directory.

## Optional Plugin Options

You can pass options from `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    [
      "bharatcode",
      {
        "apiKey": "{env:BHARATCODE_API_KEY}",
        "steps": 16,
        "smallSteps": 3,
        "output": 32768
      }
    ]
  ]
}
```

The plugin also reads these environment variables:

- `BHARATCODE_API_KEY`
- `OPENCODE_BHARATCODE_API_KEY`

## Usage Notes

- The shared server currently runs one active inference slot.
- If someone else is using it, your request may queue.
- The older `bharatcode:qwen36-35b-q8-256k` model id remains accepted for
  compatibility with earlier plugin installs.
- First response on a large repository can be slow because the prompt has to be
  prefetched.
- Follow-up turns in the same session are faster because prompt/KV caching is
  enabled.
- Do not paste secrets, private keys, production credentials, or customer data
  into the model.

## Development

Run a local plugin smoke test:

```bash
tmp="$(mktemp -d)"
mkdir -p "$tmp/.config/opencode/plugins"
cp index.js "$tmp/.config/opencode/plugins/bharatcode-plugin.js"
HOME="$tmp" BHARATCODE_API_KEY="$BHARATCODE_API_KEY" \
  opencode run "Return only the integer result of 23*19."
```

Package check:

```bash
npm pack --dry-run
```

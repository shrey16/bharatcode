# BharatCode OpenCode Setup

## Windows Setup

1. Install Node.js LTS from https://nodejs.org/

2. Open PowerShell.

3. Install OpenCode:

```powershell
npm install -g opencode-ai
```

4. Create the OpenCode config:

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.config\opencode" | Out-Null
@'
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["bharatcode"]
}
'@ | Set-Content -Encoding UTF8 "$env:USERPROFILE\.config\opencode\opencode.json"
```

5. Start OpenCode:

```powershell
opencode
```

6. Inside OpenCode, type:

```text
/connect
```

7. Choose `Other`.

8. When it asks for provider id, type:

```text
bharatcode
```

9. Paste your BharatCode API key.

10. Test it:

```text
Return only the integer result of 23*19.
```

The answer should be:

```text
437
```

11. To use it in a project:

```powershell
cd path\to\your\repo
opencode
```

## Linux/macOS Setup

1. Install Node.js LTS from https://nodejs.org/

2. Install OpenCode:

```bash
npm install -g opencode-ai
```

3. Create the OpenCode config:

```bash
mkdir -p ~/.config/opencode
cat > ~/.config/opencode/opencode.json <<'JSON'
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["bharatcode"]
}
JSON
```

4. Start OpenCode:

```bash
opencode
```

5. Inside OpenCode, run `/connect`, choose `Other`, enter provider id
   `bharatcode`, and paste your BharatCode API key.

6. Test it:

```text
Return only the integer result of 23*19.
```

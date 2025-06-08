# VSCode File Context Writer

Just a small unpublished extension I use to configure some terminal aliases.

This VS Code extension writes the directory path of the currently active file to `~/.vscode-fcw-active-patch`.

## How It Works

- Tracks the active text editor in VS Code
- When the active editor changes:
  - Gets the file path of the current document
  - Extracts the directory path
  - Writes the directory path to `~/.vscode-fcw-active-patch`
- Skips untitled (unsaved) files

## Installation

```sh
(rm -rf *.vsix || true) && yarn build && code --install-extension file-context-writer-*.vsix
```

VS Code needs to be restarted for the changes to take effect.

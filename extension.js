const fs = require('fs');
const os = require('os');
const path = require('path');
const vscode = require('vscode');

/**
 * @param {vscode.TextEditor} editor
 */
function writeContext(editor) {
  if (!editor?.document || editor.document.isUntitled) return;

  const filePath = editor.document.uri.fsPath;
  const dirPath = path.dirname(filePath);
  const targetFile = path.join(os.homedir(), '.vscode-fcw-active-patch');

  fs.writeFileSync(targetFile, dirPath);
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate() {
  vscode.window.onDidChangeActiveTextEditor(writeContext);

  writeContext(vscode.window.activeTextEditor);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
  writeContext // for tests
};

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const sinon = require('sinon');
const vscode = require('vscode');

const extension = require('../extension');

suite('Extension Test Suite', () => {
  const tempFilePath = path.join(os.homedir(), '.vscode-fcw-active-patch');
  let writeFileSyncStub;

  setup(() => {
    writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
  });

  teardown(() => {
    sinon.restore();
  });

  test('writeContext should not run for untitled document', () => {
    const fakeEditor = {
      document: {
        isUntitled: true,
      },
    };

    extension.activate({
      subscriptions: [],
    });

    extension.writeContext?.(fakeEditor);

    assert.strictEqual(writeFileSyncStub.called, false);
  });

  test('writeContext should not run for null editor', () => {
    extension.writeContext?.(null);
    assert.strictEqual(writeFileSyncStub.called, false);
  });

  test('writeContext should write file path to temp file', () => {
    const fakePath = '/user/project/file.js';
    const fakeEditor = {
      document: {
        isUntitled: false,
        uri: { fsPath: fakePath },
      },
    };

    extension.writeContext?.(fakeEditor);

    assert(writeFileSyncStub.calledOnce);
    assert.strictEqual(writeFileSyncStub.firstCall.args[0], tempFilePath);
    assert.strictEqual(writeFileSyncStub.firstCall.args[1], path.dirname(fakePath));
  });

  test('activate should call writeContext on activation', () => {
    const fakePath = '/user/project/file.js';
    const fakeEditor = {
      document: {
        isUntitled: false,
        uri: { fsPath: fakePath },
      },
    };

    sinon.stub(vscode.window, 'activeTextEditor').value(fakeEditor);

    extension.activate({
      subscriptions: [],
    });

    assert(writeFileSyncStub.calledOnce);
  });
});

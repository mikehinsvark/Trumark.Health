const copyButton = document.querySelector('#quantum-copy-passcode');
const passcode = document.querySelector('#quantum-replay-passcode');
const status = document.querySelector('#quantum-copy-status');

if (copyButton && passcode && status) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(passcode.textContent.trim());
      copyButton.querySelector('span').textContent = 'Copied!';
      status.textContent = 'Passcode copied. You’re ready to open the replay.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(passcode);
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Select and copy the passcode above, then open the replay.';
    }
  });
}

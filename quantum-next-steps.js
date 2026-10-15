const storageKey = 'trumark-health-agent-id';
const defaultId = 'AA0233';
const form = document.querySelector('#quantum-agent-form');
const input = document.querySelector('#quantum-agent-id');
const status = document.querySelector('#quantum-agent-status');
const preview = document.querySelector('#quantum-personal-url');
const openLink = document.querySelector('#quantum-client-link');
const copy = document.querySelector('#quantum-copy-link');
const clear = document.querySelector('#quantum-clear-id');

export function normalizeAgentId(value) {
  const id = String(value ?? '').trim().toUpperCase();
  if (/^\d{4}$/.test(id)) return `AA${id}`;
  return /^AA\d{4}$/.test(id) ? id : null;
}

if (form && input && status && preview && openLink && copy && clear) {
  let activeId = defaultId;
  let copyRequest = 0;
  function showLink(id, message) {
    activeId = id;
    copyRequest++;
    const url = new URL('https://trumarkhealth.com/');
    url.searchParams.set('refid', id);
    preview.value = url.href;
    openLink.href = url.href;
    copy.querySelector('span').textContent = 'Copy my link';
    input.removeAttribute('aria-invalid');
    status.textContent = message;
    status.classList.remove('is-error');
  }
  try {
    const saved = normalizeAgentId(localStorage.getItem(storageKey));
    if (saved) {
      input.value = saved;
      showLink(saved, `Using your saved ${saved} link on this device.`);
    }
  } catch { /* The default link works even when device storage is unavailable. */ }
  form.hidden = false;
  copy.hidden = false;
  clear.hidden = false;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const id = normalizeAgentId(input.value);
    if (!id) {
      copyRequest++;
      input.setAttribute('aria-invalid', 'true');
      status.classList.add('is-error');
      status.textContent = `Enter AA and four digits (for example, AA1234), or just four digits. Your link still uses ${activeId}.`;
      input.focus();
      return;
    }
    input.value = id;
    let message = `Saved ${id} on this device. Your link is ready to share.`;
    try { localStorage.setItem(storageKey, id); }
    catch { message = `Your ${id} link is ready for this visit. This browser couldn’t save it for next time.`; }
    showLink(id, message);
  });

  clear.addEventListener('click', () => {
    let message = 'Saved ID cleared. Using the default AA0233 link.';
    try { localStorage.removeItem(storageKey); }
    catch { message = 'Using the default AA0233 link for this visit. This browser couldn’t clear device storage.'; }
    input.value = '';
    showLink(defaultId, message);
  });

  copy.addEventListener('click', async () => {
    const request = ++copyRequest;
    const url = preview.value;
    try {
      await navigator.clipboard.writeText(url);
      if (request !== copyRequest) return;
      copy.querySelector('span').textContent = 'Copied!';
      status.classList.remove('is-error');
      status.textContent = `Your ${activeId} link is copied and ready to share.`;
    } catch {
      if (request !== copyRequest) return;
      preview.focus();
      preview.select();
      status.classList.remove('is-error');
      status.textContent = 'Your link is selected. Use your device’s Copy command to copy it.';
    }
  });
}

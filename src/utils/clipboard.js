/**
 * Returns the primary email address used by the Hero "Copy Email" button.
 * Explicitly prioritizes the researcher's personal email per user preference.
 */
export function getPrimaryCopyEmail(profileInfo) {
  return profileInfo?.emails?.personal || profileInfo?.emails?.academic || '';
}

/**
 * Copies text to clipboard using the modern async Clipboard API with a
 * resilient execCommand fallback for restricted iframe contexts.
 */
export async function copyTextToClipboard(text) {
  if (!text) return false;

  if (
    typeof navigator !== 'undefined' &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function'
  ) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to legacy textarea copy fallback
    }
  }

  if (typeof document !== 'undefined' && document.body) {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      textarea.style.pointerEvents = 'none';
      document.body.appendChild(textarea);
      textarea.select();
      const succeeded = document.execCommand?.('copy') ?? false;
      document.body.removeChild(textarea);
      return Boolean(succeeded);
    } catch {
      return false;
    }
  }

  return false;
}

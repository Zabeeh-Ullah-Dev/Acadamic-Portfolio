/**
 * Returns the primary email address used by the Hero "Copy Email" button.
 * Explicitly prioritizes the researcher's personal email per user preference.
 */
export function getPrimaryCopyEmail(profileInfo) {
  return profileInfo?.emails?.personal || profileInfo?.emails?.academic || '';
}

/**
 * Checks whether the async Clipboard API is available and permitted by the
 * current browsing context / iframe Permissions-Policy, avoiding Chromium
 * console policy-violation errors before falling back to textarea copy.
 */
export function canUseAsyncClipboard(
  nav = typeof navigator !== 'undefined' ? navigator : undefined,
  win = typeof window !== 'undefined' ? window : undefined,
  doc = typeof document !== 'undefined' ? document : undefined
) {
  if (!nav?.clipboard || typeof nav.clipboard.writeText !== 'function') {
    return false;
  }

  if (win && win.isSecureContext === false) {
    return false;
  }

  const policy = doc?.permissionsPolicy || doc?.featurePolicy;
  if (policy && typeof policy.allowsFeature === 'function') {
    try {
      if (policy.allowsFeature('clipboard-write') === false) {
        return false;
      }
    } catch {
      // Ignore non-standard Permissions-Policy implementations
    }
  }

  return true;
}

/**
 * Copies text to clipboard using the modern async Clipboard API with a
 * resilient execCommand fallback for restricted iframe contexts.
 */
export async function copyTextToClipboard(text) {
  if (!text) return false;

  if (canUseAsyncClipboard()) {
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

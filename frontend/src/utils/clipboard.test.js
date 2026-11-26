import test from 'node:test';
import assert from 'node:assert/strict';
import { PROFILE_INFO } from '../data/profileInfo';
import {
  canUseAsyncClipboard,
  copyTextToClipboard,
  getPrimaryCopyEmail,
} from './clipboard';

test('getPrimaryCopyEmail returns the personal email rather than the academic email', () => {
  const email = getPrimaryCopyEmail(PROFILE_INFO);
  assert.equal(email, 'hajigul1993@gmail.com');
  assert.notEqual(email, PROFILE_INFO.emails.academic);
});

test('getPrimaryCopyEmail falls back gracefully when personal email is missing', () => {
  assert.equal(
    getPrimaryCopyEmail({ emails: { academic: 'user@uni.edu' } }),
    'user@uni.edu'
  );
  assert.equal(getPrimaryCopyEmail(null), '');
});

test('canUseAsyncClipboard returns false when blocked by Permissions-Policy or insecure context', () => {
  const mockNav = { clipboard: { writeText: async () => {} } };
  assert.equal(
    canUseAsyncClipboard(
      mockNav,
      { isSecureContext: true },
      { permissionsPolicy: { allowsFeature: (name) => name !== 'clipboard-write' } }
    ),
    false
  );
  assert.equal(
    canUseAsyncClipboard(
      mockNav,
      { isSecureContext: false },
      { permissionsPolicy: { allowsFeature: () => true } }
    ),
    false
  );
  assert.equal(
    canUseAsyncClipboard(
      mockNav,
      { isSecureContext: true },
      { permissionsPolicy: { allowsFeature: () => true } }
    ),
    true
  );
});

test('copyTextToClipboard writes the exact personal email via navigator.clipboard', async () => {
  let written = '';
  const originalNavigator = globalThis.navigator;
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: {
      clipboard: {
        writeText: async (text) => {
          written = text;
        },
      },
    },
  });

  try {
    const ok = await copyTextToClipboard(getPrimaryCopyEmail(PROFILE_INFO));
    assert.equal(ok, true);
    assert.equal(written, 'hajigul1993@gmail.com');
  } finally {
    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: originalNavigator,
    });
  }
});

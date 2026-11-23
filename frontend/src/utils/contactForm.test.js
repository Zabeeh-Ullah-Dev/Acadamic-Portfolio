import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildFormattedInquiry,
  buildInquirySubject,
  buildMailtoHref,
  buildWhatsAppHref,
  getInquiryOptionById,
  INITIAL_CONTACT_VALUES,
  INQUIRY_GROUPS,
  INQUIRY_OPTIONS,
  TIMELINE_OPTIONS,
  validateContactForm,
} from './contactForm.js';

test('inquiry options cover research opportunity, ai automation, and all three groups', () => {
  const ids = INQUIRY_OPTIONS.map((o) => o.id);
  assert.ok(ids.includes('research-opportunity'));
  assert.ok(ids.includes('ai-automation'));
  assert.ok(ids.includes('kg-llm'));
  assert.ok(ids.includes('gnn-complex-networks'));
  assert.ok(ids.includes('healthcare-biomedical-ai'));
  assert.ok(ids.length >= 10);

  for (const group of INQUIRY_GROUPS) {
    assert.ok(
      INQUIRY_OPTIONS.some((option) => option.group === group),
      `Expected at least one option in group ${group}`
    );
  }
  assert.ok(TIMELINE_OPTIONS.length >= 4);
});

test('validateContactForm catches missing or invalid required fields', () => {
  const errors = validateContactForm(INITIAL_CONTACT_VALUES);
  assert.ok(errors.name);
  assert.ok(errors.email);
  assert.ok(errors.inquiryType);
  assert.ok(errors.message);

  const badEmailErrors = validateContactForm({
    ...INITIAL_CONTACT_VALUES,
    name: 'Dr. Elena Rostova',
    email: 'not-an-email',
    inquiryType: 'research-opportunity',
    message: 'Interested in collaborating on knowledge graph completion.',
  });
  assert.equal(badEmailErrors.name, undefined);
  assert.ok(badEmailErrors.email);
  assert.equal(badEmailErrors.inquiryType, undefined);
  assert.equal(badEmailErrors.message, undefined);
});

test('validateContactForm passes for complete valid inquiry', () => {
  const errors = validateContactForm({
    name: 'Dr. Elena Rostova',
    email: 'elena.rostova@university.edu',
    organization: 'Leuphana University',
    inquiryType: 'ai-automation',
    timeline: 'immediate',
    subject: 'RAG Pipeline Integration',
    message:
      'We would like to discuss building an automated LangChain and Knowledge Graph retrieval workflow.',
    recipient: 'personal',
  });
  assert.deepEqual(errors, {});
});

test('smart default recipients align research and applied AI categories cleanly', () => {
  assert.equal(
    getInquiryOptionById('research-opportunity')?.defaultRecipient,
    'academic'
  );
  assert.equal(
    getInquiryOptionById('ai-automation')?.defaultRecipient,
    'personal'
  );
});

test('buildMailtoHref and buildWhatsAppHref encode structured inquiry details', () => {
  const values = {
    name: 'Alex Chen',
    email: 'alex@example.org',
    organization: 'OpenGraph Labs',
    inquiryType: 'ai-automation',
    timeline: 'deadline',
    subject: 'Agentic Document Workflow',
    message: 'Looking for architecture guidance on RAG and entity resolution.',
    recipient: 'personal',
  };

  const subject = buildInquirySubject(values);
  assert.ok(subject.includes('AI Automation & Agentic Workflows'));
  assert.ok(subject.includes('Agentic Document Workflow'));
  assert.ok(subject.includes('OpenGraph Labs'));

  const body = buildFormattedInquiry(values);
  assert.ok(body.includes('Alex Chen'));
  assert.ok(body.includes('Grant or Conference Deadline'));

  const mailto = buildMailtoHref(values, 'hajigul1993@gmail.com');
  assert.ok(mailto.startsWith('mailto:hajigul1993@gmail.com?subject='));
  assert.ok(mailto.includes('&body='));

  const whatsapp = buildWhatsAppHref(values, '+92-307-8297663');
  assert.ok(whatsapp.startsWith('https://wa.me/923078297663?text='));
});

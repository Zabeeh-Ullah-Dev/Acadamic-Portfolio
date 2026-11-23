export const INQUIRY_GROUPS = [
  'Research & Academic',
  'Applied AI & Engineering',
  'Teaching & Advisory',
];

export const INQUIRY_OPTIONS = [
  {
    id: 'research-opportunity',
    label: 'Research Opportunity & Fellowship',
    group: 'Research & Academic',
    defaultRecipient: 'academic',
    placeholderSubject: 'Joint Research Fellowship / Postdoc Collaboration',
    guidanceText:
      'Share details on the lab, grant call, research theme, or fellowship timeline.',
  },
  {
    id: 'ai-automation',
    label: 'AI Automation & Agentic Workflows',
    group: 'Applied AI & Engineering',
    defaultRecipient: 'personal',
    placeholderSubject: 'RAG Pipeline & LangChain Agent Automation',
    guidanceText:
      'Describe the workflow to automate, data sources, and target deployment stack.',
  },
  {
    id: 'kg-llm',
    label: 'Knowledge Graphs & LLM Engineering',
    group: 'Research & Academic',
    defaultRecipient: 'academic',
    placeholderSubject: 'Knowledge Graph Completion / Neuro-Symbolic NLP',
    guidanceText:
      'Outline your graph schema, reasoning task, or pre-trained transformer requirements.',
  },
  {
    id: 'gnn-complex-networks',
    label: 'Complex Networks & Graph Neural Networks',
    group: 'Research & Academic',
    defaultRecipient: 'academic',
    placeholderSubject: 'Link Prediction & Spectral Network Analysis',
    guidanceText:
      'Mention network topology characteristics, link prediction goals, or benchmarks.',
  },
  {
    id: 'healthcare-biomedical-ai',
    label: 'Healthcare & Biomedical AI',
    group: 'Research & Academic',
    defaultRecipient: 'academic',
    placeholderSubject: 'Drug-Target Prediction or Explainable Clinical AI',
    guidanceText:
      'Specify biomedical datasets (e.g., KEGG, PharmKG), interpretability needs, or clinical scope.',
  },
  {
    id: 'cyber-physical-security',
    label: 'Cyber-Physical & ICS Security',
    group: 'Research & Academic',
    defaultRecipient: 'academic',
    placeholderSubject: 'AI Anomaly Detection for Industrial Control Systems',
    guidanceText:
      'Share system telemetry scope, threat model, or sustainability constraints.',
  },
  {
    id: 'consulting-advisory',
    label: 'Technical Consulting & Architecture Review',
    group: 'Applied AI & Engineering',
    defaultRecipient: 'personal',
    placeholderSubject: 'AI Model Benchmarking & Architecture Advisory',
    guidanceText:
      'Summarize evaluation goals, system bottlenecks, or expected deliverables.',
  },
  {
    id: 'dataset-code-collaboration',
    label: 'Paper Code, Dataset & Reproducibility',
    group: 'Research & Academic',
    defaultRecipient: 'academic',
    placeholderSubject: 'Reproducing MuCo-KGC / KG-EDAS Implementation',
    guidanceText:
      'Include the publication title or repository name and specific questions.',
  },
  {
    id: 'keynote-lecture',
    label: 'Invited Talk, Workshop & Guest Lecture',
    group: 'Teaching & Advisory',
    defaultRecipient: 'academic',
    placeholderSubject: 'Guest Seminar on Knowledge Graphs & Transformers',
    guidanceText:
      'Share event dates, host institution, audience level, and proposed topic.',
  },
  {
    id: 'academic-supervision',
    label: 'Thesis Co-Supervision & Mentorship',
    group: 'Teaching & Advisory',
    defaultRecipient: 'academic',
    placeholderSubject: 'Graduate Research Mentorship / External Review',
    guidanceText:
      'Include degree level, university program, and research proposal summary.',
  },
  {
    id: 'general-inquiry',
    label: 'General Collaboration & Other',
    group: 'Teaching & Advisory',
    defaultRecipient: 'personal',
    placeholderSubject: 'Project Inquiry for Haji Gul',
    guidanceText:
      'Provide a brief overview of your request and preferred next steps.',
  },
];

export const TIMELINE_OPTIONS = [
  { id: 'flexible', label: 'Flexible / Exploratory' },
  { id: 'immediate', label: 'Immediate (Within 2 Weeks)' },
  { id: 'semester', label: 'Upcoming Academic Term / Quarter' },
  { id: 'deadline', label: 'Grant or Conference Deadline' },
];

export const INITIAL_CONTACT_VALUES = {
  name: '',
  email: '',
  organization: '',
  inquiryType: '',
  timeline: 'flexible',
  subject: '',
  message: '',
  recipient: 'academic',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getInquiryOptionById(id) {
  if (!id) {
    return undefined;
  }
  return INQUIRY_OPTIONS.find((option) => option.id === id);
}

export function getTimelineOptionById(id) {
  return (
    TIMELINE_OPTIONS.find((option) => option.id === id) ?? TIMELINE_OPTIONS[0]
  );
}

export function validateContactForm(values) {
  const errors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your full name (at least 2 characters).';
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.inquiryType) {
    errors.inquiryType = 'Please select a project or collaboration category.';
  }

  if (values.message.trim().length < 15) {
    errors.message =
      'Please share a brief overview of your inquiry (at least 15 characters).';
  }

  return errors;
}

export function buildInquirySubject(values) {
  const option = getInquiryOptionById(values.inquiryType);
  const categoryLabel = option?.label ?? 'Portfolio Inquiry';
  const customSubject = values.subject.trim();
  const orgSuffix = values.organization.trim()
    ? ` (${values.organization.trim()})`
    : '';

  if (customSubject) {
    return `[${categoryLabel}] ${customSubject}${orgSuffix}`;
  }

  return `[${categoryLabel}] Inquiry from ${values.name.trim() || 'Visitor'}${orgSuffix}`;
}

export function buildFormattedInquiry(values) {
  const option = getInquiryOptionById(values.inquiryType);
  const timeline = getTimelineOptionById(values.timeline);

  const lines = [
    `Inquiry Category: ${option?.label ?? 'General Inquiry'}`,
    `Timeline / Priority: ${timeline.label}`,
    `From: ${values.name.trim()} (${values.email.trim()})`,
  ];

  if (values.organization.trim()) {
    lines.push(`Organization / Institution: ${values.organization.trim()}`);
  }

  if (values.subject.trim()) {
    lines.push(`Subject: ${values.subject.trim()}`);
  }

  lines.push('', 'Message:', values.message.trim());

  return lines.join('\n');
}

export function buildMailtoHref(values, recipientEmail) {
  const subject = encodeURIComponent(buildInquirySubject(values));
  const body = encodeURIComponent(buildFormattedInquiry(values));
  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}

export function buildWhatsAppHref(values, phoneE164Digits) {
  const cleanDigits = phoneE164Digits.replace(/\D/g, '');
  const header = `Hello Sir Haji Gul,\n\n`;
  const text = encodeURIComponent(`${header}${buildFormattedInquiry(values)}`);
  return `https://wa.me/${cleanDigits}?text=${text}`;
}

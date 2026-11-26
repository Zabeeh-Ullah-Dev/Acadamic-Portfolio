import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RotateCcw,
  Send,
} from 'lucide-react';
import { ACADEMIC_REFERENCES, PROFILE_INFO as DEFAULT_PROFILE } from '../data/portfolioData';
import { usePortfolioData } from '../context/PortfolioContext';
import { copyTextToClipboard } from '../utils/clipboard';
import {
  buildFormattedInquiry,
  buildMailtoHref,
  buildWhatsAppHref,
  getInquiryOptionById,
  INITIAL_CONTACT_VALUES,
  INQUIRY_GROUPS,
  INQUIRY_OPTIONS,
  TIMELINE_OPTIONS,
  validateContactForm,
} from '../utils/contactForm';

export function ContactSection() {
  const portfolioData = usePortfolioData();
  const PROFILE_INFO = portfolioData?.profile || DEFAULT_PROFILE;

  const [copiedKey, setCopiedKey] = useState(null);
  const [formValues, setFormValues] = useState(INITIAL_CONTACT_VALUES);
  const [formErrors, setFormErrors] = useState({});
  const [hasManualRecipient, setHasManualRecipient] = useState(false);
  const [submittedValues, setSubmittedValues] = useState(null);
  const copyTimerRef = useRef(0);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopy = async (key, value) => {
    const ok = await copyTextToClipboard(value);
    if (copyTimerRef.current) {
      window.clearTimeout(copyTimerRef.current);
    }
    if (ok) {
      setCopiedKey(key);
      copyTimerRef.current = window.setTimeout(() => setCopiedKey(null), 2000);
    } else {
      setCopiedKey(null);
    }
  };

  const selectedOption = getInquiryOptionById(formValues.inquiryType);

  const handleInquiryTypeChange = (nextId) => {
    const matched = getInquiryOptionById(nextId);
    setFormValues((prev) => ({
      ...prev,
      inquiryType: nextId,
      recipient:
        !hasManualRecipient && matched
          ? matched.defaultRecipient
          : prev.recipient,
    }));
    if (formErrors.inquiryType) {
      setFormErrors((prev) => ({ ...prev, inquiryType: undefined }));
    }
  };

  const handleRecipientSelect = (recipient) => {
    setHasManualRecipient(true);
    setFormValues((prev) => ({ ...prev, recipient }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateContactForm(formValues);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setSubmittedValues({ ...formValues });
  };

  const handleResetForm = () => {
    setSubmittedValues(null);
    setFormValues(INITIAL_CONTACT_VALUES);
    setFormErrors({});
    setHasManualRecipient(false);
  };

  const activeRecipientEmail =
    (submittedValues?.recipient ?? formValues.recipient) === 'academic'
      ? PROFILE_INFO.emails.academic
      : PROFILE_INFO.emails.personal;

  const inputBaseClass =
    'w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-[#F3F5F8] placeholder:text-[#8B95A5] transition-colors focus:border-[#3B82F6] focus:bg-[#141922] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30';

  return (
      <section id="contact" className="section-defer bg-[#0C0F14] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#60A5FA]">
              Correspondence &amp; References
            </p>
            <h2 className="mt-2.5 text-3xl font-bold tracking-tight text-[#F3F5F8] sm:text-4xl">
              Contact &amp; References
            </h2>
            <p className="mt-3 text-base leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
              Open to research collaborations in Knowledge Graph Completion, AI automation workflows, Complex Networks, and invited academic lectures.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Project & Research Inquiry Form */}
            <div className="glass-panel rounded-2xl border border-white/10 p-5 sm:p-8 lg:col-span-7">
              {submittedValues ? (
                <div
                  data-testid="contact-confirmation"
                  className="flex h-full flex-col justify-between gap-6"
                >
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="inline-flex items-center gap-2 text-xs font-medium text-[#60A5FA]">
                          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                          <span>Brief Validated & Ready to Dispatch</span>
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-[#F3F5F8]">
                          Ready to Send Your Inquiry
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSubmittedValues(null)}
                          className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-[#C4CCD6] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap shrink-0"
                        >
                          Edit Brief
                        </button>
                        <button
                          type="button"
                          onClick={handleResetForm}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-[#C4CCD6] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap shrink-0"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>New Inquiry</span>
                        </button>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-[#C4CCD6]">
                      Your structured inquiry for{' '}
                      <span className="font-mono text-[#60A5FA]">
                        {activeRecipientEmail}
                      </span>{' '}
                      is formatted below. Launch your email client, send directly via WhatsApp, or copy the brief.
                    </p>

                    <pre className="mt-5 max-h-60 overflow-y-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-[#0A0D12] p-4 font-mono text-xs leading-relaxed text-[#E2E8F0]">
                      {buildFormattedInquiry(submittedValues)}
                    </pre>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 border-t border-white/10 pt-5">
                    <a
                      href={buildMailtoHref(
                        submittedValues,
                        activeRecipientEmail
                      )}
                      className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#3B82F6] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Open in Email App</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>

                    <a
                      href={buildWhatsAppHref(
                        submittedValues,
                        PROFILE_INFO.phone
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-[#F3F5F8] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-[#60A5FA]" />
                      <span>Send via WhatsApp</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          'formatted-brief',
                          buildFormattedInquiry(submittedValues)
                        )
                      }
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-[#F3F5F8] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                    >
                      {copiedKey === 'formatted-brief' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#60A5FA]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Brief</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex h-full flex-col justify-between gap-5"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-[#F3F5F8]">
                      Start a Collaboration or Project
                    </h3>
                    <p className="mt-1 text-sm text-[#8B95A5]">
                      Select your project focus to structure your brief and route it to the right inbox.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-medium text-[#C4CCD6]"
                        >
                          Full Name <span className="text-[#60A5FA]">*</span>
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          value={formValues.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormValues((prev) => ({ ...prev, name: val }));
                            if (formErrors.name) {
                              setFormErrors((prev) => ({
                                ...prev,
                                name: undefined,
                              }));
                            }
                          }}
                          aria-invalid={Boolean(formErrors.name)}
                          aria-describedby={
                            formErrors.name ? 'contact-name-error' : undefined
                          }
                          placeholder="Full Name"
                          className={`${inputBaseClass} mt-1.5 ${
                            formErrors.name ? 'border-red-400/70' : ''
                          }`}
                        />
                        {formErrors.name && (
                          <p
                            id="contact-name-error"
                            className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-red-300"
                          >
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                            <span>{formErrors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-medium text-[#C4CCD6]"
                        >
                          Email Address <span className="text-[#60A5FA]">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          value={formValues.email}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormValues((prev) => ({ ...prev, email: val }));
                            if (formErrors.email) {
                              setFormErrors((prev) => ({
                                ...prev,
                                email: undefined,
                              }));
                            }
                          }}
                          aria-invalid={Boolean(formErrors.email)}
                          aria-describedby={
                            formErrors.email ? 'contact-email-error' : undefined
                          }
                          placeholder="name@institution.edu"
                          className={`${inputBaseClass} mt-1.5 ${
                            formErrors.email ? 'border-red-400/70' : ''
                          }`}
                        />
                        {formErrors.email && (
                          <p
                            id="contact-email-error"
                            className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-red-300"
                          >
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                            <span>{formErrors.email}</span>
                          </p>
                        )}
                      </div>

                      {/* Inquiry Category Dropdown */}
                      <div>
                        <label
                          htmlFor="contact-inquiry-type"
                          className="block text-xs font-medium text-[#C4CCD6]"
                        >
                          Project / Inquiry Type{' '}
                          <span className="text-[#60A5FA]">*</span>
                        </label>
                        <div className="relative mt-1.5">
                          <select
                            id="contact-inquiry-type"
                            name="inquiryType"
                            required
                            value={formValues.inquiryType}
                            onChange={(e) =>
                              handleInquiryTypeChange(e.target.value)
                            }
                            aria-invalid={Boolean(formErrors.inquiryType)}
                            aria-describedby={
                              formErrors.inquiryType
                                ? 'contact-inquiry-error'
                                : 'contact-inquiry-hint'
                            }
                            className={`${inputBaseClass} appearance-none pr-10 ${
                              formValues.inquiryType === ''
                                ? 'text-[#8B95A5]'
                                : 'text-[#F3F5F8]'
                            } ${
                              formErrors.inquiryType ? 'border-red-400/70' : ''
                            }`}
                          >
                            <option
                              value=""
                              disabled
                              className="bg-[#141922] text-[#8B95A5]"
                            >
                              Select an inquiry focus...
                            </option>
                            {INQUIRY_GROUPS.map((group) => (
                              <optgroup
                                key={group}
                                label={group}
                                className="bg-[#0C0F14] text-[#60A5FA]"
                              >
                                {INQUIRY_OPTIONS.filter(
                                  (opt) => opt.group === group
                                ).map((opt) => (
                                  <option
                                    key={opt.id}
                                    value={opt.id}
                                    className="bg-[#141922] text-[#F3F5F8]"
                                  >
                                    {opt.label}
                                  </option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                          <ChevronDown
                            aria-hidden="true"
                            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3B82F6]"
                          />
                        </div>
                        {formErrors.inquiryType && (
                          <p
                            id="contact-inquiry-error"
                            className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-red-300"
                          >
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                            <span>{formErrors.inquiryType}</span>
                          </p>
                        )}
                      </div>

                      {/* Timeline Dropdown */}
                      <div>
                        <label
                          htmlFor="contact-timeline"
                          className="block text-xs font-medium text-[#C4CCD6]"
                        >
                          Target Timeline
                        </label>
                        <div className="relative mt-1.5">
                          <select
                            id="contact-timeline"
                            name="timeline"
                            value={formValues.timeline}
                            onChange={(e) =>
                              setFormValues((prev) => ({
                                ...prev,
                                timeline: e.target.value,
                              }))
                            }
                            className={`${inputBaseClass} appearance-none pr-10`}
                          >
                            {TIMELINE_OPTIONS.map((opt) => (
                              <option
                                key={opt.id}
                                value={opt.id}
                                className="bg-[#141922] text-[#F3F5F8]"
                              >
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            aria-hidden="true"
                            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B95A5]"
                          />
                        </div>
                      </div>
                    </div>

                    <p
                      id="contact-inquiry-hint"
                      className="mt-2.5 text-xs text-[#8B95A5]"
                    >
                      {selectedOption
                        ? selectedOption.guidanceText
                        : 'Options span Research Opportunities, AI Automation, Knowledge Graphs, GNNs, Healthcare AI, Consulting, and Guest Lectures.'}
                    </p>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Organization */}
                      <div>
                        <label
                          htmlFor="contact-organization"
                          className="block text-xs font-medium text-[#C4CCD6]"
                        >
                          Organization / Institution
                        </label>
                        <input
                          id="contact-organization"
                          name="organization"
                          type="text"
                          autoComplete="organization"
                          value={formValues.organization}
                          onChange={(e) =>
                            setFormValues((prev) => ({
                              ...prev,
                              organization: e.target.value,
                            }))
                          }
                          placeholder="University, Lab, or Company"
                          className={`${inputBaseClass} mt-1.5`}
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <label
                          htmlFor="contact-subject"
                          className="block text-xs font-medium text-[#C4CCD6]"
                        >
                          Project Subject
                        </label>
                        <input
                          id="contact-subject"
                          name="subject"
                          type="text"
                          value={formValues.subject}
                          onChange={(e) =>
                            setFormValues((prev) => ({
                              ...prev,
                              subject: e.target.value,
                            }))
                          }
                          placeholder={
                            selectedOption?.placeholderSubject ??
                            'Brief title for your inquiry'
                          }
                          className={`${inputBaseClass} mt-1.5`}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between gap-2">
                        <label
                          htmlFor="contact-message"
                          className="block text-xs font-medium text-[#C4CCD6]"
                        >
                          Project or Research Brief{' '}
                          <span className="text-[#60A5FA]">*</span>
                        </label>
                        <span className="font-mono text-xs tabular-nums text-[#8B95A5]">
                          {formValues.message.trim().length} chars
                        </span>
                      </div>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        required
                        value={formValues.message}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormValues((prev) => ({ ...prev, message: val }));
                          if (formErrors.message) {
                            setFormErrors((prev) => ({
                              ...prev,
                              message: undefined,
                            }));
                          }
                        }}
                        aria-invalid={Boolean(formErrors.message)}
                        aria-describedby={
                          formErrors.message
                            ? 'contact-message-error'
                            : undefined
                        }
                        placeholder="Share objectives, scope, datasets or tech stack, and preferred dates..."
                        className={`${inputBaseClass} mt-1.5 resize-y ${
                          formErrors.message ? 'border-red-400/70' : ''
                        }`}
                      />
                      {formErrors.message && (
                        <p
                          id="contact-message-error"
                          className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-red-300"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{formErrors.message}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Recipient Routing & Submit */}
                  <div className="flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-[#8B95A5]">
                        Route to:
                      </span>
                      <div
                        role="group"
                        aria-label="Target recipient inbox"
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#0A0D12] p-1"
                      >
                        <button
                          type="button"
                          onClick={() => handleRecipientSelect('academic')}
                          aria-pressed={formValues.recipient === 'academic'}
                          className={
                            formValues.recipient === 'academic'
                              ? 'rounded-full bg-[#2563EB] px-3 py-1 text-xs font-medium text-white transition-colors whitespace-nowrap shrink-0'
                              : 'rounded-full px-3 py-1 text-xs font-medium text-[#8B95A5] transition-colors hover:text-[#60A5FA] whitespace-nowrap shrink-0'
                          }
                        >
                          UBD Academic
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRecipientSelect('personal')}
                          aria-pressed={formValues.recipient === 'personal'}
                          className={
                            formValues.recipient === 'personal'
                              ? 'rounded-full bg-[#2563EB] px-3 py-1 text-xs font-medium text-white transition-colors whitespace-nowrap shrink-0'
                              : 'rounded-full px-3 py-1 text-xs font-medium text-[#8B95A5] transition-colors hover:text-[#60A5FA] whitespace-nowrap shrink-0'
                          }
                        >
                          Personal Direct
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="hover-sheen group inline-flex min-h-[44px] items-center justify-center gap-2.5 rounded-xl border border-[#3B82F6]/70 bg-gradient-to-br from-[#172554]/95 via-[#1E3A8A]/85 to-[#0F172A]/95 py-2 pl-2.5 pr-4 text-sm font-semibold text-[#F8FAFC] shadow-[inset_0_1px_0_rgba(147,197,253,0.28),0_8px_20px_-6px_rgba(37,99,235,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#93C5FD] hover:from-[#2563EB] hover:via-[#1D4ED8] hover:to-[#1E40AF] hover:text-white active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#60A5FA]/40 bg-[#2563EB]/30 text-[#93C5FD] transition-colors group-hover:border-white/30 group-hover:bg-white/15 group-hover:text-white">
                        <Send className="icon-send-launch h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span>Prepare &amp; Send Inquiry</span>
                      <ArrowUpRight className="icon-nudge-ne h-4 w-4 text-[#60A5FA] group-hover:text-white" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Direct Contact Channels */}
            <div className="glass-panel flex flex-col justify-between rounded-2xl border border-white/10 p-5 sm:p-8 lg:col-span-5">
              <div>
                <h3 className="text-lg font-semibold text-[#F3F5F8]">
                  Direct Contact Channels
                </h3>

                <div className="mt-6 space-y-5 text-sm">
                  <div>
                    <p className="text-xs font-medium text-[#8B95A5]">
                      Institutional Email (UBD)
                    </p>
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <a
                        href={`mailto:${PROFILE_INFO.emails.academic}`}
                        className="group inline-flex min-w-0 items-center gap-2 font-mono text-sm font-medium text-[#F3F5F8] transition-colors hover:text-[#60A5FA]"
                      >
                        <Mail className="icon-spring h-4 w-4 shrink-0 text-[#3B82F6]" />
                        <span className="truncate">{PROFILE_INFO.emails.academic}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy('academic-email', PROFILE_INFO.emails.academic)
                        }
                        aria-label={`Copy institutional email ${PROFILE_INFO.emails.academic}`}
                        className="group inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-medium text-[#F3F5F8] transition-all hover:-translate-y-0.5 hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap shrink-0"
                      >
                        {copiedKey === 'academic-email' ? (
                          <>
                            <Check className="animate-check-pop h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-emerald-300">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="icon-spring h-3.5 w-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div>
                    <p className="text-xs font-medium text-[#8B95A5]">
                      Personal Email
                    </p>
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <a
                        href={`mailto:${PROFILE_INFO.emails.personal}`}
                        className="group inline-flex min-w-0 items-center gap-2 font-mono text-sm font-medium text-[#F3F5F8] transition-colors hover:text-[#60A5FA]"
                      >
                        <Mail className="icon-spring h-4 w-4 shrink-0 text-[#3B82F6]" />
                        <span className="truncate">{PROFILE_INFO.emails.personal}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy('personal-email', PROFILE_INFO.emails.personal)
                        }
                        aria-label={`Copy personal email ${PROFILE_INFO.emails.personal}`}
                        className="group inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-medium text-[#F3F5F8] transition-all hover:-translate-y-0.5 hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap shrink-0"
                      >
                        {copiedKey === 'personal-email' ? (
                          <>
                            <Check className="animate-check-pop h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-emerald-300">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="icon-spring h-3.5 w-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div>
                    <p className="text-xs font-medium text-[#8B95A5]">
                      Phone / WhatsApp
                    </p>
                    <a
                      href={`tel:${PROFILE_INFO.phone}`}
                      className="group mt-1.5 inline-flex items-center gap-2 font-mono text-sm font-medium text-[#F3F5F8] transition-colors hover:text-[#60A5FA]"
                    >
                      <Phone className="icon-spring h-4 w-4 text-[#3B82F6]" />
                      <span>{PROFILE_INFO.phone}</span>
                    </a>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div>
                    <p className="text-xs font-medium text-[#8B95A5]">
                      Institutional Address
                    </p>
                    <div className="mt-1.5 flex items-start gap-2 text-sm leading-relaxed text-[#C4CCD6]">
                      <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#3B82F6]" />
                      <span>{PROFILE_INFO.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5 text-xs leading-relaxed text-[#8B95A5]">
                Selected inbox:{' '}
                <span className="font-mono text-[#C4CCD6]">
                  {activeRecipientEmail}
                </span>
              </div>
            </div>
          </div>

          {/* References (Clean 3-Column Editorial Band) */}
          <div id="references" className="mt-14 border-t border-white/10 pt-10">
            <h3 className="text-lg font-semibold text-[#F3F5F8]">
              References
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {ACADEMIC_REFERENCES.map((ref) => (
                <article
                  key={ref.id}
                  className="flex flex-col justify-between gap-4 border-t border-white/10 pt-4 md:border-t-0 md:border-r md:pr-6 md:pt-0 md:last:border-r-0 md:last:pr-0"
                >
                  <div>
                    <h4 className="text-base font-semibold text-[#F3F5F8]">
                      {ref.name}
                    </h4>
                    <p className="mt-1 text-sm text-[#C4CCD6]">
                      {ref.title} · {ref.department}
                    </p>
                    <p className="mt-1 text-xs text-[#8B95A5]">
                      {ref.institution}
                    </p>
                  </div>

                  <div>
                    <a
                      href={`mailto:${ref.email}`}
                      className="group inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-2 font-mono text-xs font-medium text-[#60A5FA] transition-all hover:-translate-y-0.5 hover:border-[#3B82F6] hover:bg-[#2563EB]/15 hover:text-[#93C5FD]"
                    >
                      <Mail className="icon-spring h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{ref.email}</span>
                      <ArrowUpRight className="icon-nudge-ne h-3.5 w-3.5 shrink-0" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}

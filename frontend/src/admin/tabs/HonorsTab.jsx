import { useState } from 'react';
import {
  Award,
  Check,
  Edit2,
  Image as ImageIcon,
  Loader2,
  Plus,
  RotateCcw,
  ShieldCheck,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  deleteCertification,
  deleteHonor,
  isSupabaseConfigured,
  uploadMediaFile,
  upsertCertification,
  upsertHonor,
} from '../../lib/supabase';
import { InstituteBadge } from '../../components/BrandIcons';

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read the selected image file.'));
    reader.readAsDataURL(file);
  });
}

async function uploadImageAsset(file, folder) {
  const dataUrl = await readFileAsDataUrl(file);
  let resolvedUrl = dataUrl;

  try {
    const res = await fetch('/api/upload-media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: file.name, dataUrl }),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.publicUrl) {
        resolvedUrl = json.publicUrl;
      }
    }
  } catch (err) {
    console.warn('Local /api/upload-media fallback to inline data URL:', err);
  }

  if (isSupabaseConfigured) {
    try {
      const cloudUrl = await uploadMediaFile(file, folder);
      if (cloudUrl) {
        resolvedUrl = cloudUrl;
      }
    } catch (err) {
      console.warn('Supabase storage upload skipped, using local asset URL:', err);
    }
  }

  return resolvedUrl;
}

export function HonorsTab({ honors, certifications, onRefresh }) {
  const [activeSubTab, setActiveSubTab] = useState('honors'); // 'honors' | 'certs'
  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState(null); // 'logo' | 'cert' | null
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3200);
  };

  const handleOpenNew = () => {
    setFormError('');
    if (activeSubTab === 'honors') {
      setEditingItem({
        id: `honor-${Date.now()}`,
        year: '2025',
        title: '',
        issuer: '',
        description: '',
        linkLabel: 'View Details',
        linkUrl: '',
        order_num: honors.length + 1,
      });
    } else {
      setEditingItem({
        id: `cert-${Date.now()}`,
        title: '',
        issuer: 'IBM',
        issuedDate: '2025',
        credentialId: '',
        verificationUrl: '',
        logoUrl: '',
        imageUrl: '',
        skills: ['Deep Learning', 'PyTorch'],
        order_num: certifications.length + 1,
      });
    }
    setIsNew(true);
  };

  const handleOpenEdit = (item) => {
    setFormError('');
    if (activeSubTab === 'certs') {
      setEditingItem({
        ...item,
        verificationUrl: item.verificationUrl || item.verifyUrl || item.credentialUrl || '',
        logoUrl: item.logoUrl || '',
        imageUrl: item.imageUrl || '',
        skills: Array.isArray(item.skills) ? item.skills : [],
      });
    } else {
      setEditingItem({ ...item });
    }
    setIsNew(false);
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid PNG, WebP, SVG, or JPEG image file.');
      return;
    }

    setFormError('');
    setUploadingField(field);
    try {
      const folder = field === 'logo' ? 'cert-logos' : 'cert-images';
      const uploadedUrl = await uploadImageAsset(file, folder);
      setEditingItem((prev) =>
        prev
          ? {
              ...prev,
              ...(field === 'logo' ? { logoUrl: uploadedUrl } : { imageUrl: uploadedUrl }),
            }
          : prev
      );
      showToast(field === 'logo' ? 'Company logo PNG uploaded.' : 'Certificate image uploaded.');
    } catch (err) {
      setFormError(err.message || 'Image upload failed.');
    } finally {
      setUploadingField(null);
      e.target.value = '';
    }
  };

  const persistLocalList = (key, nextList) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(nextList));
    } catch (err) {
      console.warn('Could not persist local admin changes:', err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    setFormError('');
    setSaving(true);

    try {
      if (activeSubTab === 'honors') {
        const cleanHonor = {
          ...editingItem,
          title: editingItem.title.trim(),
          issuer: editingItem.issuer.trim(),
          year: String(editingItem.year || '').trim(),
        };

        const nextHonors = isNew
          ? [...honors, cleanHonor]
          : honors.map((h) => (h.id === cleanHonor.id ? cleanHonor : h));

        if (isSupabaseConfigured) {
          await upsertHonor(cleanHonor);
        }
        persistLocalList('portfolio_honors_override', nextHonors);
      } else {
        const verifyHref = (editingItem.verificationUrl || editingItem.verifyUrl || '').trim();
        const cleanCert = {
          ...editingItem,
          title: editingItem.title.trim(),
          issuer: editingItem.issuer.trim(),
          issuedDate: String(editingItem.issuedDate || editingItem.year || '').trim(),
          credentialId: (editingItem.credentialId || '').trim(),
          verifyUrl: verifyHref,
          verificationUrl: verifyHref,
          credentialUrl: verifyHref || editingItem.credentialUrl || '',
          logoUrl: (editingItem.logoUrl || '').trim(),
          imageUrl: (editingItem.imageUrl || '').trim(),
          skills: Array.isArray(editingItem.skills)
            ? editingItem.skills.filter(Boolean)
            : String(editingItem.skills || '')
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean),
        };

        const nextCerts = isNew
          ? [...certifications, cleanCert]
          : certifications.map((c) => (c.id === cleanCert.id ? cleanCert : c));

        if (isSupabaseConfigured) {
          await upsertCertification({
            id: cleanCert.id,
            title: cleanCert.title,
            issuer: cleanCert.issuer,
            issuedDate: cleanCert.issuedDate,
            credentialId: cleanCert.credentialId,
            verificationUrl: cleanCert.verifyUrl,
            credentialUrl: cleanCert.credentialUrl,
            logoUrl: cleanCert.logoUrl,
            imageUrl: cleanCert.imageUrl,
            skills: cleanCert.skills,
            order_num: cleanCert.order_num,
          });
        }
        persistLocalList('portfolio_certifications_override', nextCerts);
      }

      showToast(
        activeSubTab === 'certs'
          ? 'Certification & company logo saved!'
          : 'Honor saved successfully!'
      );
      setEditingItem(null);
      if (onRefresh) await onRefresh();
    } catch (err) {
      console.error(err);
      setFormError(`Save failed: ${err.message || 'Please try again.'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    setConfirmDeleteId(null);
    try {
      if (activeSubTab === 'honors') {
        const nextHonors = honors.filter((h) => h.id !== id);
        persistLocalList('portfolio_honors_override', nextHonors);
        if (isSupabaseConfigured) {
          await deleteHonor(id);
        }
      } else {
        const nextCerts = certifications.filter((c) => c.id !== id);
        persistLocalList('portfolio_certifications_override', nextCerts);
        if (isSupabaseConfigured) {
          await deleteCertification(id);
        }
      }
      showToast('Item deleted.');
      if (onRefresh) await onRefresh();
    } catch (err) {
      console.error(err);
      setFormError(`Delete failed: ${err.message || 'Please try again.'}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Toast */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-emerald-400/35 bg-[#0D1A18]/95 px-4 py-3 font-mono text-xs text-emerald-200 shadow-2xl backdrop-blur-md"
        >
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Honors, Service &amp; Certifications
          </h2>
          <p className="mt-0.5 font-mono text-xs text-slate-400">
            Manage fellowships, reviewer appointments, and technical credentials with custom company PNG logos
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenNew}
          className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#3B82F6]/45 bg-gradient-to-b from-[#172554]/70 to-[#0E1627] px-4 py-2.5 font-mono text-xs font-medium tracking-wider text-[#F1F5F9] transition-all hover:border-[#60A5FA]/70 hover:text-white"
        >
          <Plus className="h-4 w-4 text-[#60A5FA]" />
          <span>Add {activeSubTab === 'honors' ? 'Honor / Award' : 'Certification'}</span>
        </button>
      </div>

      {/* Subtab Switcher */}
      <div className="flex w-fit gap-2 rounded-xl border border-slate-800 bg-[#0D121C] p-1">
        <button
          type="button"
          onClick={() => setActiveSubTab('honors')}
          className={`flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 font-mono text-xs transition-colors ${
            activeSubTab === 'honors'
              ? 'bg-[#172554] font-semibold text-[#93C5FD] ring-1 ring-[#3B82F6]/45'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Award className="h-3.5 w-3.5" />
          <span>Honors &amp; Fellowships ({honors.length})</span>
        </button>
        <button
          type="button"
          data-testid="admin-subtab-certs"
          onClick={() => setActiveSubTab('certs')}
          className={`flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 font-mono text-xs transition-colors ${
            activeSubTab === 'certs'
              ? 'bg-[#172554] font-semibold text-[#93C5FD] ring-1 ring-[#3B82F6]/45'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Technical Certifications ({certifications.length})</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {activeSubTab === 'honors'
          ? honors.map((h) => (
              <div
                key={h.id}
                className="flex flex-col justify-between gap-4 rounded-xl border border-slate-800 bg-[#0D121C]/80 p-4 hover:border-slate-700 md:flex-row md:items-center"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-slate-400">
                    <span className="font-semibold text-[#60A5FA]">{h.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{h.issuer}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">{h.title}</h4>
                  <p className="text-xs text-slate-400">{h.description}</p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(h)}
                    className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 font-mono text-xs text-slate-200 hover:bg-slate-700"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>
                  {confirmDeleteId === h.id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={deletingId === h.id}
                        onClick={() => handleDelete(h.id)}
                        className="rounded-lg bg-rose-600 px-3 py-1.5 font-mono text-xs text-white hover:bg-rose-500"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="rounded-lg bg-slate-800 px-2.5 py-1.5 font-mono text-xs text-slate-300"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={deletingId === h.id}
                      onClick={() => setConfirmDeleteId(h.id)}
                      className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-rose-500/10 px-3 py-1.5 font-mono text-xs text-rose-300 hover:bg-rose-500/20"
                    >
                      {deletingId === h.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          : certifications.map((c) => (
              <div
                key={c.id}
                data-testid={`admin-cert-row-${c.id}`}
                className="flex flex-col justify-between gap-4 rounded-xl border border-slate-800 bg-[#0D121C]/80 p-4 hover:border-slate-700 md:flex-row md:items-center"
              >
                <div className="flex items-start gap-3.5">
                  <InstituteBadge issuer={c.issuer} logoUrl={c.logoUrl} size="sm" />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-slate-400">
                      <span className="font-semibold text-[#93C5FD]">{c.issuer}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{c.issuedDate || c.year}</span>
                      {c.logoUrl && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-400">Custom PNG logo</span>
                        </>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-white">{c.title}</h4>
                    <p className="font-mono text-xs text-slate-500">{c.credentialId}</p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    data-testid={`admin-edit-cert-${c.id}`}
                    onClick={() => handleOpenEdit(c)}
                    className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 font-mono text-xs text-slate-200 hover:bg-slate-700"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>
                  {confirmDeleteId === c.id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={deletingId === c.id}
                        onClick={() => handleDelete(c.id)}
                        className="rounded-lg bg-rose-600 px-3 py-1.5 font-mono text-xs text-white hover:bg-rose-500"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="rounded-lg bg-slate-800 px-2.5 py-1.5 font-mono text-xs text-slate-300"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={deletingId === c.id}
                      onClick={() => setConfirmDeleteId(c.id)}
                      className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-rose-500/10 px-3 py-1.5 font-mono text-xs text-rose-300 hover:bg-rose-500/20"
                    >
                      {deletingId === c.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
      </div>

      {/* Modal */}
      {editingItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-700 bg-[#0D121C] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-mono text-sm font-bold text-white">
                {isNew ? 'Add' : 'Edit'} {activeSubTab === 'honors' ? 'Honor' : 'Certification'}
              </h3>
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {formError && (
              <div className="mt-4 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3.5 py-2.5 text-xs text-rose-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block font-mono text-xs text-slate-400">Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-[#080B10] px-3 py-2 text-xs text-white focus:border-[#3B82F6] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block font-mono text-xs text-slate-400">
                    Issuer / Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.issuer}
                    onChange={(e) => setEditingItem({ ...editingItem, issuer: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-[#080B10] px-3 py-2 text-xs text-white focus:border-[#3B82F6] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-xs text-slate-400">
                    Year / Issued Date
                  </label>
                  <input
                    type="text"
                    value={editingItem.issuedDate || editingItem.year || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        year: e.target.value,
                        issuedDate: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-[#080B10] px-3 py-2 font-mono text-xs text-white focus:border-[#3B82F6] focus:outline-none"
                  />
                </div>
              </div>

              {activeSubTab === 'honors' ? (
                <>
                  <div>
                    <label className="mb-1 block font-mono text-xs text-slate-400">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={editingItem.description || ''}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, description: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-[#080B10] px-3 py-2 text-xs leading-relaxed text-white focus:border-[#3B82F6] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block font-mono text-xs text-slate-400">
                      Link URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={editingItem.linkUrl || ''}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, linkUrl: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-[#080B10] px-3 py-2 font-mono text-xs text-white focus:border-[#3B82F6] focus:outline-none"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Company Logo PNG Uploader */}
                  <div
                    data-testid="cert-logo-upload-section"
                    className="rounded-xl border border-white/10 bg-[#080B10]/90 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-mono text-xs font-semibold text-white">
                          Company Logo (PNG)
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          Upload a transparent PNG logo so this credential displays the company mark just like IBM or Google.
                        </p>
                      </div>
                      <InstituteBadge
                        issuer={editingItem.issuer}
                        logoUrl={editingItem.logoUrl}
                        size="md"
                      />
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2.5">
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#3B82F6]/45 bg-[#172554]/55 px-3.5 py-2 font-mono text-xs font-medium text-[#E2E8F0] transition-colors hover:border-[#60A5FA]/70 hover:bg-[#1E3A8A]/60">
                        {uploadingField === 'logo' ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-[#60A5FA]" />
                        ) : (
                          <Upload className="h-3.5 w-3.5 text-[#60A5FA]" />
                        )}
                        <span>
                          {uploadingField === 'logo' ? 'Uploading PNG...' : 'Upload Company PNG'}
                        </span>
                        <input
                          type="file"
                          accept="image/png,image/webp,image/svg+xml,image/jpeg"
                          data-testid="cert-logo-file-input"
                          onChange={(e) => handleFileUpload(e, 'logo')}
                          className="sr-only"
                        />
                      </label>

                      {editingItem.logoUrl && (
                        <button
                          type="button"
                          onClick={() => setEditingItem({ ...editingItem, logoUrl: '' })}
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-xs text-slate-300 hover:border-rose-400/40 hover:text-rose-200"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>Reset to Default</span>
                        </button>
                      )}
                    </div>

                    <div className="mt-3">
                      <label className="mb-1 block font-mono text-[11px] text-slate-500">
                        Or paste Company Logo PNG path / URL
                      </label>
                      <input
                        type="text"
                        data-testid="cert-logo-url-input"
                        placeholder="/assets/portfolio/company-logo.png or https://..."
                        value={editingItem.logoUrl || ''}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, logoUrl: e.target.value })
                        }
                        className="w-full rounded-lg border border-slate-800 bg-[#0D121C] px-3 py-1.5 font-mono text-xs text-slate-200 focus:border-[#3B82F6] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Certificate Image Uploader (Optional) */}
                  <div className="rounded-xl border border-white/10 bg-[#080B10]/60 p-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                        <ImageIcon className="h-3.5 w-3.5 text-slate-400" />
                        <span>Certificate Image (Optional)</span>
                      </div>
                      <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-slate-200 hover:border-white/30">
                        {uploadingField === 'cert' ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Upload className="h-3 w-3" />
                        )}
                        <span>{uploadingField === 'cert' ? 'Uploading...' : 'Upload Image'}</span>
                        <input
                          type="file"
                          accept="image/png,image/webp,image/jpeg"
                          onChange={(e) => handleFileUpload(e, 'cert')}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="/assets/portfolio/certificate.png"
                      value={editingItem.imageUrl || ''}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, imageUrl: e.target.value })
                      }
                      className="mt-2.5 w-full rounded-lg border border-slate-800 bg-[#0D121C] px-3 py-1.5 font-mono text-xs text-slate-300 focus:border-[#3B82F6] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block font-mono text-xs text-slate-400">
                        Credential ID
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. IBM-2024-AI"
                        value={editingItem.credentialId || ''}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, credentialId: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-700 bg-[#080B10] px-3 py-2 font-mono text-xs text-white focus:border-[#3B82F6] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block font-mono text-xs text-slate-400">
                        Verification URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://coursera.org/verify/..."
                        value={editingItem.verificationUrl || ''}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, verificationUrl: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-700 bg-[#080B10] px-3 py-2 font-mono text-xs text-white focus:border-[#3B82F6] focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 border-t border-slate-800 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="cursor-pointer rounded-xl bg-slate-800 px-4 py-2 font-mono text-xs text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  data-testid="admin-save-cert-btn"
                  disabled={saving || Boolean(uploadingField)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#3B82F6]/50 bg-gradient-to-b from-[#1E3A8A]/80 to-[#111D38] px-5 py-2 font-mono text-xs font-medium tracking-wider text-white transition-all hover:border-[#60A5FA]/80 disabled:opacity-50"
                >
                  {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

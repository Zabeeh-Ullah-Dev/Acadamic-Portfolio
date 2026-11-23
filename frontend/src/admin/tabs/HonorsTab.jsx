import { useState } from 'react';
import { Award, Check, Edit2, Loader2, Plus, ShieldCheck, Trash2, X } from 'lucide-react';
import {
  deleteCertification,
  deleteHonor,
  upsertCertification,
  upsertHonor,
} from '../../lib/supabase';

export function HonorsTab({ honors, certifications, onRefresh }) {
  const [activeSubTab, setActiveSubTab] = useState('honors'); // 'honors' | 'certs'
  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState('');

  const handleOpenNew = () => {
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
        issuedDate: '2024',
        credentialId: '',
        verificationUrl: '',
        skills: ['Deep Learning', 'PyTorch'],
        order_num: certifications.length + 1,
      });
    }
    setIsNew(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (activeSubTab === 'honors') {
        await upsertHonor(editingItem);
      } else {
        await upsertCertification(editingItem);
      }
      setToast('Item saved successfully!');
      setEditingItem(null);
      if (onRefresh) onRefresh();
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      console.error(err);
      alert(`Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    setDeletingId(id);
    try {
      if (activeSubTab === 'honors') {
        await deleteHonor(id);
      } else {
        await deleteCertification(id);
      }
      setToast('Item deleted.');
      if (onRefresh) onRefresh();
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      console.error(err);
      alert(`Delete failed: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-500/90 text-white px-4 py-3 rounded-xl shadow-2xl font-mono text-xs animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Honors, Service &amp; Certifications</h2>
          <p className="text-xs text-slate-400 font-mono">Manage fellowships, reviewer appointments, and technical credentials</p>
        </div>
        <button
          onClick={handleOpenNew}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-medium text-xs font-mono uppercase tracking-wider shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add {activeSubTab === 'honors' ? 'Honor / Award' : 'Certification'}</span>
        </button>
      </div>

      {/* Subtab Switcher */}
      <div className="flex gap-2 p-1 bg-[#0D121C] border border-slate-800 rounded-xl w-fit">
        <button
          onClick={() => setActiveSubTab('honors')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
            activeSubTab === 'honors'
              ? 'bg-cyan-500 text-black font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Honors &amp; Fellowships ({honors.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab('certs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
            activeSubTab === 'certs'
              ? 'bg-cyan-500 text-black font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Technical Certifications ({certifications.length})</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {activeSubTab === 'honors'
          ? honors.map((h) => (
              <div
                key={h.id}
                className="bg-[#0D121C]/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {h.year}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {h.issuer}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">{h.title}</h4>
                  <p className="text-xs text-slate-400">{h.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setEditingItem(h);
                      setIsNew(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    disabled={deletingId === h.id}
                    onClick={() => handleDelete(h.id, h.title)}
                    className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-mono flex items-center gap-1.5"
                  >
                    {deletingId === h.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          : certifications.map((c) => (
              <div
                key={c.id}
                className="bg-[#0D121C]/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {c.issuer}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {c.issuedDate || c.year}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">{c.title}</h4>
                  <p className="text-xs text-slate-500 font-mono">{c.credentialId}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setEditingItem(c);
                      setIsNew(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    disabled={deletingId === c.id}
                    onClick={() => handleDelete(c.id, c.title)}
                    className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-mono flex items-center gap-1.5"
                  >
                    {deletingId === c.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
      </div>

      {/* Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D121C] border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white font-mono">
                {isNew ? 'Add' : 'Edit'} {activeSubTab === 'honors' ? 'Honor' : 'Credential'}
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Issuer / Awarder *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.issuer}
                    onChange={(e) => setEditingItem({ ...editingItem, issuer: e.target.value })}
                    className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Year / Period</label>
                  <input
                    type="text"
                    value={editingItem.year || editingItem.issuedDate || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        year: e.target.value,
                        issuedDate: e.target.value,
                      })
                    }
                    className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              {activeSubTab === 'honors' ? (
                <>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={editingItem.description || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Link URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={editingItem.linkUrl || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, linkUrl: e.target.value })}
                      className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Credential ID</label>
                    <input
                      type="text"
                      placeholder="e.g. IBM-2024-AI"
                      value={editingItem.credentialId || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, credentialId: e.target.value })}
                      className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Verification URL</label>
                    <input
                      type="url"
                      placeholder="https://coursera.org/verify/..."
                      value={editingItem.verificationUrl || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, verificationUrl: e.target.value })}
                      className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-xs font-mono uppercase tracking-wider"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

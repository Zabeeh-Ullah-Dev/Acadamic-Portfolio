import { useState } from 'react';
import { Check, Edit2, Loader2, Network, Plus, Trash2, X } from 'lucide-react';
import { deleteResearchPillar, upsertResearchPillar } from '../../lib/supabase';

export function ResearchTab({ pillars, onRefresh }) {
  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState('');

  const handleOpenNew = () => {
    setEditingItem({
      id: `pillar-${Date.now()}`,
      number: `0${pillars.length + 1}`,
      title: '',
      subtitle: '',
      description: '',
      focusModels: ['BERT Encoding', 'Graph Neural Networks'],
      filterCategory: 'kg-llm',
      order_num: pillars.length + 1,
    });
    setIsNew(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await upsertResearchPillar(editingItem);
      setToast('Research pillar saved!');
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
    if (!window.confirm(`Delete research pillar "${title}"?`)) return;
    setDeletingId(id);
    try {
      await deleteResearchPillar(id);
      setToast('Pillar removed.');
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
          <h2 className="text-xl font-bold text-white tracking-tight">Research Pillars &amp; Core Areas ({pillars.length})</h2>
          <p className="text-xs text-slate-400 font-mono">Manage research focus areas, subtitles, and key model paradigms</p>
        </div>
        <button
          onClick={handleOpenNew}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-medium text-xs font-mono uppercase tracking-wider shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Research Area</span>
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pillars.map((pillar) => (
          <div
            key={pillar.id}
            className="bg-[#0D121C]/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between gap-4 hover:border-slate-700 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  PILLAR {pillar.number || '01'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {pillar.filterCategory || 'kg-llm'}
                </span>
              </div>
              <h4 className="text-base font-bold text-white">{pillar.title}</h4>
              <p className="text-xs font-mono text-cyan-400">{pillar.subtitle}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{pillar.description}</p>
              {pillar.focusModels && pillar.focusModels.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {pillar.focusModels.map((m, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800/60">
              <button
                onClick={() => {
                  setEditingItem(pillar);
                  setIsNew(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                disabled={deletingId === pillar.id}
                onClick={() => handleDelete(pillar.id, pillar.title)}
                className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-mono flex items-center gap-1.5"
              >
                {deletingId === pillar.id ? (
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
                {isNew ? 'Add Research Pillar' : 'Edit Research Pillar'}
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Number (e.g. 01)</label>
                  <input
                    type="text"
                    required
                    value={editingItem.number}
                    onChange={(e) => setEditingItem({ ...editingItem, number: e.target.value })}
                    className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-mono text-slate-400 mb-1">Category Code</label>
                  <input
                    type="text"
                    value={editingItem.filterCategory || 'kg-llm'}
                    onChange={(e) => setEditingItem({ ...editingItem, filterCategory: e.target.value })}
                    className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Pillar Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Subtitle / Methods (e.g. MuCo-KGC · MuCoS)</label>
                <input
                  type="text"
                  value={editingItem.subtitle}
                  onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                  className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Key Focus Models (comma-separated)</label>
                <input
                  type="text"
                  placeholder="BERT Encoding, GNNs, Relational Paths"
                  value={Array.isArray(editingItem.focusModels) ? editingItem.focusModels.join(', ') : ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      focusModels: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

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

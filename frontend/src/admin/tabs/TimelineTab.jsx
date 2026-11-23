import { useState } from 'react';
import {
  Briefcase,
  Check,
  Edit2,
  GraduationCap,
  Loader2,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import {
  deleteEducation,
  deleteExperience,
  upsertEducation,
  upsertExperience,
} from '../../lib/supabase';

export function TimelineTab({ experience, education, onRefresh }) {
  const [activeSubTab, setActiveSubTab] = useState('experience'); // 'experience' | 'education'
  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState('');

  const handleOpenNew = () => {
    if (activeSubTab === 'experience') {
      setEditingItem({
        id: `exp-${Date.now()}`,
        role: '',
        institution: '',
        department: '',
        location: '',
        period: '',
        type: 'research',
        description: '',
        highlights: [],
        order_num: experience.length + 1,
      });
    } else {
      setEditingItem({
        id: `edu-${Date.now()}`,
        degree: '',
        field: '',
        institution: '',
        location: '',
        period: '',
        description: '',
        highlights: [],
        order_num: education.length + 1,
      });
    }
    setIsNew(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (activeSubTab === 'experience') {
        await upsertExperience(editingItem);
      } else {
        await upsertEducation(editingItem);
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
      if (activeSubTab === 'experience') {
        await deleteExperience(id);
      } else {
        await deleteEducation(id);
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
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-500/90 text-white px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md font-mono text-xs animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Employment &amp; Education Details</h2>
          <p className="text-xs text-slate-400 font-mono">Manage research appointments, academic employment, and formal degrees</p>
        </div>
        <button
          onClick={handleOpenNew}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-medium text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add {activeSubTab === 'experience' ? 'Position' : 'Degree'}</span>
        </button>
      </div>

      {/* Sub-tab Switcher */}
      <div className="flex gap-2 p-1 bg-[#0D121C] border border-slate-800 rounded-xl w-fit">
        <button
          onClick={() => setActiveSubTab('experience')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
            activeSubTab === 'experience'
              ? 'bg-cyan-500 text-black font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Employment &amp; Positions ({experience.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab('education')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
            activeSubTab === 'education'
              ? 'bg-cyan-500 text-black font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Degrees &amp; Education ({education.length})</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {activeSubTab === 'experience' ? (
          experience.map((exp) => (
            <div
              key={exp.id}
              className="bg-[#0D121C]/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {exp.period}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {exp.type || 'Appointment'}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white">{exp.role}</h4>
                <p className="text-xs text-slate-400 font-mono">
                  {exp.institution} {exp.department ? `· ${exp.department}` : ''}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setEditingItem(exp);
                    setIsNew(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  disabled={deletingId === exp.id}
                  onClick={() => handleDelete(exp.id, exp.role)}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-mono flex items-center gap-1.5"
                >
                  {deletingId === exp.id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          education.map((edu) => (
            <div
              key={edu.id}
              className="bg-[#0D121C]/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {edu.period}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white">
                  {edu.degree} in {edu.field}
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  {edu.institution} {edu.location ? `· ${edu.location}` : ''}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setEditingItem(edu);
                    setIsNew(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  disabled={deletingId === edu.id}
                  onClick={() => handleDelete(edu.id, `${edu.degree} in ${edu.field}`)}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-mono flex items-center gap-1.5"
                >
                  {deletingId === edu.id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D121C] border border-slate-700 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white font-mono">
                {isNew ? 'Add New' : 'Edit'}{' '}
                {activeSubTab === 'experience' ? 'Position' : 'Degree'}
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {activeSubTab === 'experience' ? (
                <>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Role / Position Title *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.role || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                      className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Institution / University *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.institution || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, institution: e.target.value })}
                      className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Period (e.g. 2023 – Present)</label>
                      <input
                        type="text"
                        value={editingItem.period || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                        className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Department / Lab</label>
                      <input
                        type="text"
                        value={editingItem.department || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, department: e.target.value })}
                        className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Degree (e.g. PhD, MS)</label>
                      <input
                        type="text"
                        required
                        value={editingItem.degree || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, degree: e.target.value })}
                        className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Field of Study</label>
                      <input
                        type="text"
                        required
                        value={editingItem.field || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, field: e.target.value })}
                        className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Institution</label>
                    <input
                      type="text"
                      required
                      value={editingItem.institution || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, institution: e.target.value })}
                      className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Period (e.g. 2023 – Present)</label>
                    <input
                      type="text"
                      value={editingItem.period || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                      className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
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

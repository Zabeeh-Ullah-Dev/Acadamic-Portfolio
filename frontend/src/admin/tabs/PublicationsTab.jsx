import { useState } from 'react';
import {
  Check,
  Edit2,
  FileText,
  Loader2,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  deletePublication,
  upsertPublication,
  uploadMediaFile,
} from '../../lib/supabase';

const EMPTY_PUB = {
  id: '',
  index_num: 1,
  title: '',
  authors: '',
  venue: '',
  publisher: '',
  year: new Date().getFullYear(),
  citations: 0,
  category: 'kg-llm',
  category_label: 'Knowledge Graphs & LLMs',
  status: '',
  badge: '',
  doi: '',
  paper_url: '',
  code_url: '',
  dataset_url: '',
  abstract: '',
  bibtex: '',
  has_schematic: false,
  schematic_image: '',
  schematic_caption: '',
  schematic_source_label: '',
  highlights: [],
};

const CATEGORIES = [
  { id: 'kg-llm', label: 'Knowledge Graphs & LLMs' },
  { id: 'complex-networks', label: 'Link Prediction & Complex Networks' },
  { id: 'healthcare-cps', label: 'Healthcare & Cyber-Physical Systems' },
];

export function PublicationsTab({ publications, onRefresh }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingPub, setEditingPub] = useState(null); // null when not modal, or pub object
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState('');

  const filtered = publications.filter((p) => {
    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      p.title?.toLowerCase().includes(q) ||
      p.venue?.toLowerCase().includes(q) ||
      p.authors?.toLowerCase().includes(q) ||
      String(p.year).includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleOpenNew = () => {
    const nextIndex = publications.length + 1;
    setEditingPub({
      ...EMPTY_PUB,
      id: `pub-${String(nextIndex).padStart(2, '0')}`,
      index_num: nextIndex,
    });
    setIsNew(true);
  };

  const handleOpenEdit = (pub) => {
    setEditingPub({
      id: pub.id,
      index_num: pub.index || pub.index_num || 1,
      title: pub.title || '',
      authors: pub.authors || '',
      venue: pub.venue || '',
      publisher: pub.publisher || '',
      year: pub.year || 2025,
      citations: pub.citations || 0,
      category: pub.category || 'kg-llm',
      category_label: pub.categoryLabel || pub.category_label || 'Research',
      status: pub.status || '',
      badge: pub.badge || '',
      doi: pub.doi || '',
      paper_url: pub.paperUrl || pub.paper_url || '',
      code_url: pub.codeUrl || pub.code_url || '',
      dataset_url: pub.datasetUrl || pub.dataset_url || '',
      abstract: pub.abstract || '',
      bibtex: pub.bibtex || '',
      has_schematic: Boolean(pub.hasSchematic || pub.has_schematic || pub.figureUrl),
      schematic_image: pub.figureUrl || pub.schematicImage || pub.schematic_image || '',
      schematic_caption: pub.figureCaption || pub.schematicCaption || pub.schematic_caption || '',
      schematic_source_label: pub.schematicSourceLabel || pub.schematic_source_label || '',
      highlights: pub.highlights || [],
    });
    setIsNew(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingPub.title || !editingPub.authors || !editingPub.venue) {
      alert('Please fill out the Title, Authors, and Venue fields.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...editingPub,
        figure_url: editingPub.schematic_image,
        figure_caption: editingPub.schematic_caption,
      };
      await upsertPublication(payload);
      setToast(isNew ? 'New publication added!' : 'Publication updated!');
      setEditingPub(null);
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
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeletingId(id);
    try {
      await deletePublication(id);
      setToast('Publication removed.');
      if (onRefresh) onRefresh();
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      console.error(err);
      alert(`Delete failed: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleSchematicUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadMediaFile(file, 'diagrams');
      setEditingPub((prev) => ({
        ...prev,
        schematic_image: url,
        has_schematic: true,
      }));
    } catch (err) {
      console.error(err);
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-500/90 text-white px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md font-mono text-xs animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Publications Archive ({publications.length})</h2>
          <p className="text-xs text-slate-400 font-mono">Add, edit, or remove peer-reviewed research papers and book chapters</p>
        </div>
        <button
          onClick={handleOpenNew}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Publication</span>
        </button>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search papers by title, venue, author, year..."
            className="w-full bg-[#0D121C] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#0D121C] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 font-mono focus:outline-none focus:border-cyan-500"
        >
          <option value="all">All Categories ({publications.length})</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Publications List */}
      <div className="space-y-3">
        {filtered.map((pub) => (
          <div
            key={pub.id}
            className="bg-[#0D121C]/80 border border-slate-800/80 hover:border-slate-700 rounded-xl p-4 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
          >
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  #{pub.index || pub.index_num}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {pub.year}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300">
                  {pub.venue}
                </span>
                {pub.citations > 0 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                    {pub.citations} Citations
                  </span>
                )}
                {pub.hasSchematic && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300">
                    Schematic
                  </span>
                )}
              </div>

              <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                {pub.title}
              </h4>
              <p className="text-xs text-slate-400 truncate font-mono">
                {pub.authors}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenEdit(pub)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                disabled={deletingId === pub.id}
                onClick={() => handleDelete(pub.id, pub.title)}
                className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                {deletingId === pub.id ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500 font-mono text-xs">
            No publications found matching your search.
          </div>
        )}
      </div>

      {/* Edit / Add Modal */}
      {editingPub && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0D121C] border border-slate-700 rounded-2xl w-full max-w-3xl my-8 p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  {isNew ? 'Add New Publication' : `Edit Publication (${editingPub.id})`}
                </h3>
              </div>
              <button
                onClick={() => setEditingPub(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-3">
                  <label className="block text-xs font-mono text-slate-400 mb-1">Paper Title *</label>
                  <input
                    type="text"
                    required
                    value={editingPub.title}
                    onChange={(e) => setEditingPub({ ...editingPub, title: e.target.value })}
                    className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Year *</label>
                  <input
                    type="number"
                    required
                    value={editingPub.year}
                    onChange={(e) => setEditingPub({ ...editingPub, year: Number(e.target.value) })}
                    className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Authors List *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Haji Gul, Ajaz Ahmad Bhat, Abdul Ghani Naim"
                  value={editingPub.authors}
                  onChange={(e) => setEditingPub({ ...editingPub, authors: e.target.value })}
                  className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Venue / Journal *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PAKDD 2025 or IEEE Access"
                    value={editingPub.venue}
                    onChange={(e) => setEditingPub({ ...editingPub, venue: e.target.value })}
                    className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Publisher</label>
                  <input
                    type="text"
                    placeholder="e.g. Springer, IEEE, Elsevier"
                    value={editingPub.publisher}
                    onChange={(e) => setEditingPub({ ...editingPub, publisher: e.target.value })}
                    className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Citations Count</label>
                  <input
                    type="number"
                    value={editingPub.citations}
                    onChange={(e) => setEditingPub({ ...editingPub, citations: Number(e.target.value) })}
                    className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
                  <select
                    value={editingPub.category}
                    onChange={(e) => {
                      const matched = CATEGORIES.find((c) => c.id === e.target.value);
                      setEditingPub({
                        ...editingPub,
                        category: e.target.value,
                        category_label: matched?.label || 'Research',
                      });
                    }}
                    className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">DOI / Paper Link</label>
                  <input
                    type="text"
                    placeholder="https://doi.org/..."
                    value={editingPub.doi}
                    onChange={(e) => setEditingPub({ ...editingPub, doi: e.target.value })}
                    className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">GitHub / Code URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={editingPub.code_url}
                    onChange={(e) => setEditingPub({ ...editingPub, code_url: e.target.value })}
                    className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Dataset URL</label>
                  <input
                    type="url"
                    placeholder="https://zenodo.org/... or GitHub"
                    value={editingPub.dataset_url}
                    onChange={(e) => setEditingPub({ ...editingPub, dataset_url: e.target.value })}
                    className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              {/* Schematic Diagram */}
              <div className="p-3 bg-[#080B10] border border-slate-800 rounded-xl space-y-2">
                <label className="block text-xs font-mono text-cyan-400">Architecture Diagram / Schematic</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Diagram image URL (/assets/diagrams/...)"
                    value={editingPub.schematic_image}
                    onChange={(e) =>
                      setEditingPub({
                        ...editingPub,
                        schematic_image: e.target.value,
                        has_schematic: Boolean(e.target.value),
                      })
                    }
                    className="flex-1 bg-[#0D121C] border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                  <label className="cursor-pointer px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={handleSchematicUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Caption for diagram..."
                  value={editingPub.schematic_caption}
                  onChange={(e) =>
                    setEditingPub({ ...editingPub, schematic_caption: e.target.value })
                  }
                  className="w-full bg-[#0D121C] border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Abstract</label>
                <textarea
                  rows={4}
                  value={editingPub.abstract}
                  onChange={(e) => setEditingPub({ ...editingPub, abstract: e.target.value })}
                  className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">BibTeX Citation</label>
                <textarea
                  rows={4}
                  value={editingPub.bibtex}
                  onChange={(e) => setEditingPub({ ...editingPub, bibtex: e.target.value })}
                  placeholder="@article{...}"
                  className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingPub(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-medium text-xs font-mono uppercase tracking-wider disabled:opacity-50"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{saving ? 'Saving...' : 'Save Publication'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

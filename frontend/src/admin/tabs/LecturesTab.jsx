import { useState } from 'react';
import { Check, Edit2, Image as ImageIcon, Loader2, Play, Plus, Trash2, Upload, Video, X } from 'lucide-react';
import { deleteLecture, isSupabaseConfigured, uploadMediaFile, upsertLecture } from '../../lib/supabase';

export function LecturesTab({ lectures, onRefresh }) {
  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState('');

  const handleOpenNew = () => {
    setEditingItem({
      id: `lec-${Date.now()}`,
      title: '',
      course_code: '',
      platform: 'YouTube',
      video_count: 0,
      duration: '',
      thumbnail_url: '',
      playlist_url: '',
      description: '',
      order_num: lectures.length + 1,
    });
    setIsNew(true);
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }

    setUploading(true);
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      let finalUrl = dataUrl;

      try {
        const devRes = await fetch('/api/upload-media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName: file.name, dataUrl }),
        });
        if (devRes.ok) {
          const devData = await devRes.json();
          if (devData.publicUrl) finalUrl = devData.publicUrl;
        }
      } catch {
        // Dev upload endpoint unavailable in production
      }

      if (isSupabaseConfigured) {
        const cloudUrl = await uploadMediaFile(file, 'lecture-thumbnails');
        if (cloudUrl) finalUrl = cloudUrl;
      }

      setEditingItem((prev) => (prev ? { ...prev, thumbnail_url: finalUrl } : prev));
      setToast('Thumbnail uploaded!');
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      console.error(err);
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await upsertLecture(editingItem);
      setToast('Lecture series saved!');
      setEditingItem(null);
      if (onRefresh) await onRefresh();
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
      await deleteLecture(id);
      setToast('Lecture series removed.');
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
          <h2 className="text-xl font-bold text-white tracking-tight">Open Pedagogy & Video Lectures</h2>
          <p className="text-xs text-slate-400 font-mono">Manage public YouTube playlist courses and lecture catalogs</p>
        </div>
        <button
          onClick={handleOpenNew}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-medium text-xs font-mono uppercase tracking-wider shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Course Series</span>
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lectures.map((lec) => (
          <div
            key={lec.id}
            className="bg-[#0D121C]/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1">
                  <Video className="w-3 h-3" />
                  <span>{lec.videoCount || 0} Lectures</span>
                </span>
                {lec.courseCode && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {lec.courseCode}
                  </span>
                )}
              </div>
              <h4 className="text-sm font-semibold text-white">{lec.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{lec.description}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
              <a
                href={lec.playlistUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <Play className="w-3 h-3" />
                <span>View Playlist</span>
              </a>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingItem({
                      id: lec.id,
                      title: lec.title || '',
                      course_code: lec.courseCode || '',
                      platform: lec.platform || 'YouTube',
                      video_count: lec.videoCount || 0,
                      duration: lec.duration || '',
                      thumbnail_url: lec.thumbnailUrl || '',
                      playlist_url: lec.playlistUrl || '',
                      description: lec.description || '',
                      order_num: lec.order_num ?? 0,
                    });
                    setIsNew(false);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  disabled={deletingId === lec.id}
                  onClick={() => handleDelete(lec.id, lec.title)}
                  className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
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
                {isNew ? 'Add Course Series' : 'Edit Series'}
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Course Title *</label>
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
                  <label className="block text-xs font-mono text-slate-400 mb-1">Course Code</label>
                  <input
                    type="text"
                    placeholder="e.g. CS-204"
                    value={editingItem.course_code}
                    onChange={(e) => setEditingItem({ ...editingItem, course_code: e.target.value })}
                    className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Video Count</label>
                  <input
                    type="number"
                    value={editingItem.video_count}
                    onChange={(e) => setEditingItem({ ...editingItem, video_count: Number(e.target.value) })}
                    className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">YouTube Playlist URL</label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/playlist?list=..."
                  value={editingItem.playlist_url}
                  onChange={(e) => setEditingItem({ ...editingItem, playlist_url: e.target.value })}
                  className="w-full bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-slate-400">Thumbnail Image (Upload or URL)</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="/assets/portfolio/... or https://..."
                    value={editingItem.thumbnail_url}
                    onChange={(e) => setEditingItem({ ...editingItem, thumbnail_url: e.target.value })}
                    className="flex-1 bg-[#080B10] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                  <label className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-cyan-500/40 bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-200 text-xs font-mono cursor-pointer shrink-0 transition-colors">
                    {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={handleThumbnailUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {editingItem.thumbnail_url ? (
                  <div className="relative aspect-video w-48 overflow-hidden rounded-xl border border-slate-700 bg-[#080B10]">
                    <img
                      src={editingItem.thumbnail_url}
                      alt="Thumbnail preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>No thumbnail selected</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingItem.description}
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

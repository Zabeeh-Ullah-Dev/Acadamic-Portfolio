import { useState } from 'react';
import { Check, Copy, FileText, Image as ImageIcon, Loader2, Upload } from 'lucide-react';
import { uploadMediaFile } from '../../lib/supabase';
import { copyTextToClipboard } from '../../utils/clipboard';

export function MediaTab() {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [copiedUrl, setCopiedUrl] = useState('');

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const results = [];
      for (const file of files) {
        const publicUrl = await uploadMediaFile(file, 'general');
        results.push({
          name: file.name,
          size: (file.size / 1024).toFixed(1) + ' KB',
          url: publicUrl,
          type: file.type,
        });
      }
      setUploadedFiles((prev) => [...results, ...prev]);
    } catch (err) {
      console.error(err);
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = async (url) => {
    await copyTextToClipboard(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(''), 2500);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="border-b border-slate-800 pb-5">
        <h2 className="text-xl font-bold text-white tracking-tight">Media &amp; File Storage</h2>
        <p className="text-xs text-slate-400 font-mono">
          Upload PDFs, paper schematics, photos, or documents to your public Supabase Storage bucket
        </p>
      </div>

      {/* Upload Box */}
      <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-2xl p-8 text-center bg-[#0D121C]/50 transition-colors">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
          <Upload className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-white mb-1">Upload New Media or Documents</h3>
        <p className="text-xs text-slate-400 font-mono mb-4">
          Supported formats: PNG, JPG, WebP, SVG, PDF (Up to 50MB)
        </p>

        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-medium text-xs font-mono uppercase tracking-wider cursor-pointer shadow-lg shadow-cyan-500/20">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          <span>{uploading ? 'Uploading to Bucket...' : 'Select Files to Upload'}</span>
          <input
            type="file"
            multiple
            disabled={uploading}
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Uploaded List */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
          Recently Uploaded ({uploadedFiles.length})
        </h4>

        {uploadedFiles.map((file, idx) => (
          <div
            key={idx}
            className="bg-[#0D121C] border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                {file.type.includes('image') ? (
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                ) : (
                  <FileText className="w-4 h-4 text-indigo-400" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-white truncate">{file.name}</p>
                <p className="text-[10px] text-slate-500 font-mono">{file.size}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <input
                type="text"
                readOnly
                value={file.url}
                className="hidden sm:block w-64 bg-[#080B10] border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] font-mono text-slate-400 truncate"
              />
              <button
                onClick={() => handleCopy(file.url)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5 cursor-pointer"
              >
                {copiedUrl === file.url ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}

        {uploadedFiles.length === 0 && (
          <div className="p-8 text-center text-slate-600 font-mono text-xs">
            No files uploaded in this session yet. Upload a file above to generate a public URL.
          </div>
        )}
      </div>
    </div>
  );
}

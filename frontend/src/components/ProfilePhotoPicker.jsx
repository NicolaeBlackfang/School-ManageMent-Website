import { useRef, useState } from 'react';
import { IconUpload, IconX } from './icons.jsx';

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_DATA_URL_CHARS = 700_000;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

const ProfilePhotoPicker = ({ value = '', onChange, name = '', size = 'large' }) => {
  const inputRef = useRef(null);
  const [error, setError] = useState('');
  const dimensions = size === 'small' ? 'h-16 w-16' : 'h-24 w-24';

  const handleChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!ALLOWED_TYPES.has(file.type)) {
      setError('Choose a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setError('Choose an image smaller than 5 MB.');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = () => {
      const source = new Image();
      source.onload = () => {
        const edge = 320;
        const scale = Math.min(1, edge / Math.max(source.width, source.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(source.width * scale));
        canvas.height = Math.max(1, Math.round(source.height * scale));
        const context = canvas.getContext('2d');
        if (!context) {
          setError('This image could not be prepared. Try another photo.');
          return;
        }
        context.drawImage(source, 0, 0, canvas.width, canvas.height);
        const resized = canvas.toDataURL('image/jpeg', 0.76);
        if (resized.length > MAX_DATA_URL_CHARS) {
          setError('This image is too detailed to upload. Choose a smaller photo.');
          return;
        }
        onChange(resized);
      };
      source.onerror = () => setError('This image could not be opened. Try another photo.');
      source.src = String(reader.result || '');
    };
    reader.onerror = () => setError('The photo could not be read. Try again.');
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-4">
      {value ? (
        <img src={value} alt={`${name || 'Profile'} photo preview`} className={`${dimensions} shrink-0 rounded-2xl border border-slate-200 bg-white object-cover shadow-sm`} />
      ) : (
        <div aria-label="No profile photo" className={`${dimensions} flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 font-display text-xl font-bold text-indigo-700`}>
          {(name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('') || '?').toUpperCase()}
        </div>
      )}
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
            <IconUpload className="h-4 w-4" /> {value ? 'Change photo' : 'Add photo'}
          </button>
          {value && <button type="button" onClick={() => { onChange(''); setError(''); }} className="inline-flex items-center gap-1 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-500 transition hover:bg-rose-50 hover:text-rose-700" aria-label="Remove profile photo">
            <IconX className="h-4 w-4" /> Remove
          </button>}
        </div>
        <p className="mt-1.5 text-xs text-slate-500">JPG, PNG, or WebP · up to 5 MB</p>
        {error && <p role="alert" className="mt-1 text-xs font-medium text-rose-700">{error}</p>}
      </div>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleChange} className="sr-only" aria-label="Choose profile photo" />
    </div>
  );
};

export default ProfilePhotoPicker;

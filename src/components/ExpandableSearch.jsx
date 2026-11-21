import { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';

export function ExpandableSearch({
  id,
  value,
  onChange,
  placeholder,
  ariaLabel,
  buttonLabel,
  testIdPrefix,
}) {
  const [isOpen, setIsOpen] = useState(() => Boolean(value && value.trim()));
  const inputRef = useRef(null);

  // Auto-open if an external action populates the search query (e.g., topic jump)
  useEffect(() => {
    if (value && value.trim()) {
      setIsOpen(true);
    }
  }, [value]);

  const handleOpen = () => {
    setIsOpen(true);
    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const handleCloseOrClear = () => {
    if (value) {
      onChange('');
      inputRef.current?.focus();
      return;
    }
    setIsOpen(false);
  };

  const handleBlur = (e) => {
    // Collapse smoothly when focus leaves the widget and no query is active
    if (e.currentTarget.contains(e.relatedTarget)) return;
    if (!value || !value.trim()) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      if (value) {
        onChange('');
      } else {
        setIsOpen(false);
      }
    }
  };

  return (
    <div
      data-testid={`${testIdPrefix}-container`}
      data-expanded={isOpen ? 'true' : 'false'}
      onBlur={handleBlur}
      className="relative flex items-center justify-end"
    >
      <div
        className={`flex items-center overflow-hidden rounded-full border transition-all duration-300 ease-out ${
          isOpen
            ? 'w-full sm:w-72 md:w-80 border-[#3B82F6]/70 bg-[#141922] shadow-[0_0_0_3px_rgba(37,99,235,0.16)]'
            : 'w-10 border-white/15 bg-white/[0.04] hover:border-[#3B82F6]/70 hover:bg-[#2563EB]/12'
        }`}
      >
        <button
          type="button"
          data-testid={`${testIdPrefix}-toggle`}
          aria-expanded={isOpen}
          aria-controls={id}
          aria-label={isOpen ? `Focus ${buttonLabel}` : buttonLabel}
          title={buttonLabel}
          onClick={handleOpen}
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#60A5FA] ${
            isOpen ? 'text-[#60A5FA]' : 'text-[#C4CCD6] hover:text-white'
          }`}
        >
          <Search className="h-4 w-4" aria-hidden="true" />
        </button>

        <label htmlFor={id} className="sr-only">
          {ariaLabel}
        </label>

        <input
          ref={inputRef}
          id={id}
          type="text"
          role="searchbox"
          autoComplete="off"
          tabIndex={isOpen ? 0 : -1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`h-10 min-w-0 bg-transparent text-xs sm:text-sm text-[#F3F5F8] placeholder:text-[#8B95A5] focus:outline-none transition-opacity duration-200 ${
            isOpen ? 'w-full pr-2 opacity-100' : 'w-0 p-0 opacity-0 pointer-events-none'
          }`}
        />

        {isOpen && (
          <button
            type="button"
            data-testid={`${testIdPrefix}-close`}
            onClick={handleCloseOrClear}
            aria-label={value ? 'Clear search query' : 'Collapse search bar'}
            className="mr-1.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#8B95A5] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[#60A5FA]"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

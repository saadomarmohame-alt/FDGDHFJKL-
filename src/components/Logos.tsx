import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 1. English: ENGLISHAWY Mahmoud Radwan
 * Grayscale neo-brutalist logo badge
 */
export const EnglishawyLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const dims = size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12';
  return (
    <div
      className={`relative inline-flex items-center justify-center bg-black text-white rounded-lg border-2 border-black font-black select-none shrink-0 shadow-neo-xs ${dims} ${className}`}
      title="ENGLISHAWY - Mahmoud Radwan"
    >
      <div className="flex flex-col items-center justify-center leading-none text-center px-1">
        <span className="font-mono text-[9px] tracking-tighter uppercase font-extrabold text-zinc-300">
          ENG
        </span>
        <span className="font-display font-black text-xs tracking-wider text-white">
          RADWAN
        </span>
        <div className="w-full h-[1.5px] bg-zinc-400 my-[1px]" />
        <span className="text-[7px] font-bold text-zinc-300 tracking-tight">
          ENGLISHAWY
        </span>
      </div>
    </div>
  );
};

/**
 * 2. Arabic: "بسطتهالك"
 * Iconic speech bubble / badge with bold Arabic lettering and smile mark
 */
export const BastaLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const dims = size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12';
  return (
    <div
      className={`relative inline-flex items-center justify-center bg-zinc-900 text-white rounded-xl border-2 border-black select-none shrink-0 shadow-neo-xs ${dims} ${className}`}
      title="بَسَّطْتَهَالَكْ"
    >
      <div className="flex flex-col items-center justify-center leading-none text-center px-1">
        <span className="text-[8px] font-bold tracking-tight text-zinc-300 font-body">
          منصة
        </span>
        <span className="font-heading font-black text-[13px] text-white">
          بَسَّطْتَهَا
        </span>
        <span className="text-[8px] font-extrabold text-zinc-300 font-body">
          لَكْ
        </span>
      </div>
    </div>
  );
};

/**
 * 3. History: "SA Smart Academy"
 * Shield / crest badge with SA monogram and laurel / academy laurels
 */
export const SmartAcademyLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const dims = size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12';
  return (
    <div
      className={`relative inline-flex items-center justify-center bg-white text-black rounded-lg border-2 border-black select-none shrink-0 shadow-neo-xs ${dims} ${className}`}
      title="SA Smart Academy"
    >
      <div className="flex flex-col items-center justify-center leading-none text-center px-1">
        <div className="flex items-center gap-0.5">
          <span className="font-display font-black text-sm text-black">SA</span>
        </div>
        <div className="w-full h-[1.5px] bg-black my-[1px]" />
        <span className="text-[7px] font-black tracking-tighter uppercase font-mono text-zinc-800">
          SMART ACADEMY
        </span>
      </div>
    </div>
  );
};

/**
 * 4. Programming (بكالوريا): Simple code window with </>
 * Neo-brutalist code terminal window
 */
export const CodeWindowLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const dims = size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12';
  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center bg-zinc-900 text-white rounded-lg border-2 border-black select-none shrink-0 shadow-neo-xs p-1 ${dims} ${className}`}
      title="البرمجة - كود وبكالوريا"
    >
      {/* Window Title Bar */}
      <div className="w-full flex items-center justify-between pb-0.5 border-b border-zinc-700 mb-0.5">
        <div className="flex items-center gap-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
        </div>
        <span className="text-[6px] font-mono text-zinc-400 font-bold">DEV</span>
      </div>
      {/* Code symbol */}
      <span className="font-mono font-black text-xs text-white tracking-widest">
        &lt;/&gt;
      </span>
    </div>
  );
};

export const SubjectLogoBadge: React.FC<{
  type: 'englishawy' | 'basta' | 'smart_academy' | 'code_window';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ type, size = 'md', className = '' }) => {
  switch (type) {
    case 'englishawy':
      return <EnglishawyLogo size={size} className={className} />;
    case 'basta':
      return <BastaLogo size={size} className={className} />;
    case 'smart_academy':
      return <SmartAcademyLogo size={size} className={className} />;
    case 'code_window':
      return <CodeWindowLogo size={size} className={className} />;
    default:
      return null;
  }
};

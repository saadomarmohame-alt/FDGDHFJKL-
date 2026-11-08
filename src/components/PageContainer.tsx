import React from 'react';

interface PageContainerProps {
  pageNumber: number;
  totalPages: number;
  subjectTitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  pageNumber,
  totalPages,
  subjectTitle,
  children,
  className = '',
}) => {
  return (
    <div
      className={`a4-page pattern-notebook border-2 border-black flex flex-col justify-between shadow-neo-lg relative ${className}`}
      data-page-number={pageNumber}
    >
      {/* Running Header (Top of each content page) */}
      <div className="border-b-2 border-black pb-1.5 mb-3 flex items-center justify-between text-[11px] font-bold text-zinc-700">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-black" />
          <span className="font-display font-black text-black">
            خُطَّةُ الْمُحَاضَرَاتِ وَالْمُذَاكَرَةِ وَالْوَاجِبَاتِ
          </span>
          {subjectTitle && (
            <>
              <span className="text-zinc-400">/</span>
              <span className="font-mono bg-zinc-200 px-1.5 py-0.2 rounded text-[10px] text-black">
                {subjectTitle}
              </span>
            </>
          )}
        </div>
        <div className="font-mono text-[10px] text-zinc-500 hidden sm:block">
          A4 PRINT EDITION • NEO-BRUTALIST
        </div>
      </div>

      {/* Page Body Content */}
      <div className="flex-1 flex flex-col justify-start">{children}</div>

      {/* Running Footer (Bottom of each page) */}
      <div className="border-t-2 border-black pt-2 mt-auto flex items-center justify-between text-[10px] font-mono font-bold text-zinc-600">
        <div className="flex items-center gap-2">
          <span>دفتر التخطيط والمتابعة الدراسية</span>
          <span className="text-zinc-400">•</span>
          <span className="text-zinc-500">طباعة أبيض وأسود</span>
        </div>
        <div className="bg-black text-white px-2.5 py-0.5 rounded shadow-neo-xs font-mono font-bold">
          صفحة {pageNumber} من {totalPages}
        </div>
      </div>
    </div>
  );
};

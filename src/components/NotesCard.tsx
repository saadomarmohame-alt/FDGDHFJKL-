import React from 'react';
import { PenTool } from 'lucide-react';

interface NotesCardProps {
  title?: string;
  linesCount?: number;
  className?: string;
}

export const NotesCard: React.FC<NotesCardProps> = ({
  title = 'ملاحظات وتكليفات هامة',
  linesCount = 5,
  className = '',
}) => {
  return (
    <div
      className={`bg-white border-2 border-black rounded-xl p-3.5 shadow-neo-sm avoid-break ${className}`}
    >
      <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="bg-black text-white p-1 rounded shadow-neo-xs">
            <PenTool className="w-3.5 h-3.5" />
          </span>
          <h4 className="font-display font-black text-sm text-black">{title}</h4>
        </div>
        <span className="text-[10px] font-mono font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-300">
          مساحة حرة للتدوين
        </span>
      </div>

      <div className="space-y-3.5">
        {Array.from({ length: linesCount }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-zinc-400 select-none">
              {String(i + 1).padStart(2, '0')}.
            </span>
            <div className="flex-1 border-b border-dashed border-zinc-400 h-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

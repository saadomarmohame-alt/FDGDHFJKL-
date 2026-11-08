import React from 'react';
import { LectureCardData } from '../utils/planner-data';
import { AlertTriangle, Check } from 'lucide-react';

interface LectureCardProps {
  lecture: LectureCardData;
  subjectId: string;
  checkedState: Set<string>;
  onToggleCheckbox: (id: string) => void;
  compact?: boolean;
}

export const LectureCard: React.FC<LectureCardProps> = ({
  lecture,
  subjectId,
  checkedState,
  onToggleCheckbox,
  compact = false,
}) => {
  const isNumbered = typeof lecture.lectureNumber === 'number';
  const badgeLabel = isNumbered
    ? `محاضرة ${String(lecture.lectureNumber).padStart(2, '0')}`
    : lecture.lectureNumber;

  const isEnglishOrCode =
    subjectId === 'english' || subjectId === 'programming';

  return (
    <div className="bg-white border-2 border-black rounded-xl p-3 shadow-neo-sm flex flex-col justify-between avoid-break relative transition-all">
      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between gap-1.5 border-b-2 border-black pb-2 mb-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span
              className="bg-black text-white px-2 py-0.5 rounded font-mono font-bold text-xs select-none shadow-neo-xs shrink-0"
              dir="ltr"
            >
              {badgeLabel}
            </span>
            <span
              className="font-display font-black text-xs sm:text-sm text-black truncate"
              dir={isEnglishOrCode ? 'ltr' : 'rtl'}
            >
              {lecture.title || badgeLabel}
            </span>
          </div>
          <div className="text-[10px] sm:text-[11px] font-mono font-bold text-zinc-700 whitespace-nowrap bg-zinc-100 px-2 py-0.5 rounded border border-zinc-400 shrink-0">
            التاريخ: ...........
          </div>
        </div>

        {/* Card Body: Structured Content Items (e.g. Arabic 4-8) */}
        {lecture.contentItems && lecture.contentItems.length > 0 && (
          <div className="space-y-1 mb-2">
            {lecture.contentItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-baseline gap-2 text-xs leading-snug bg-zinc-50 border border-zinc-300 rounded-md px-2 py-0.5"
              >
                <span className="bg-zinc-800 text-white text-[10px] font-bold px-1.5 py-0.2 rounded font-mono shrink-0">
                  {item.category}
                </span>
                <span className="font-semibold text-zinc-900 font-body truncate">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Card Body: Warning Box (Dashed box with warning icon) */}
        {lecture.warning && (
          <div className="border-2 border-dashed border-black bg-zinc-100 rounded-lg p-2 mb-2 flex items-start gap-1.5 text-[11px] leading-relaxed text-zinc-900">
            <AlertTriangle className="w-4 h-4 text-black shrink-0 mt-0.5" />
            <div className="font-medium">
              <strong className="font-bold underline decoration-zinc-400">تنبيه:</strong>{' '}
              {lecture.warning}
            </div>
          </div>
        )}

        {/* Card Body: Blank Ruled Lines for Writing (e.g. English, History, Programming, Arabic 1-3) */}
        {lecture.lines && lecture.lines.length > 0 && (
          <div className={`space-y-${compact ? '1' : '1.5'} mb-2`}>
            {lecture.lines.map((line, idx) => {
              const isLatinLabel = /^[A-Za-z]/.test(line.label);
              return (
                <div key={idx} className="flex items-center gap-1.5 text-xs">
                  <span
                    className="font-bold text-zinc-900 text-[11px] shrink-0 font-mono text-right"
                    dir={isLatinLabel ? 'ltr' : 'rtl'}
                  >
                    {isLatinLabel ? `${line.label}:` : `${line.label}:`}
                  </span>
                  <div className="flex-1 border-b border-dashed border-zinc-400 h-3" />
                </div>
              );
            })}
          </div>
        )}
      </div>


      {/* Card Footer: Checkboxes */}
      <div className="mt-1 pt-2 border-t-2 border-black/10 bg-zinc-50 -mx-3 -mb-3 p-2.5 rounded-b-[10px] flex items-center justify-between flex-wrap gap-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          {lecture.checkboxes.map((cb) => {
            const cbId = `${lecture.id}_${cb}`;
            const isChecked = checkedState.has(cbId);
            return (
              <label
                key={cb}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCheckbox(cbId);
                }}
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-xs cursor-pointer select-none transition-all ${
                  isChecked
                    ? 'bg-black text-white border-black font-bold'
                    : 'bg-white text-zinc-800 border-zinc-400 hover:border-black hover:bg-zinc-100'
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-sm border-2 flex items-center justify-center transition-all ${
                    isChecked
                      ? 'border-white bg-white text-black'
                      : 'border-black bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
                <span className="text-[11px] leading-none font-bold">{cb}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

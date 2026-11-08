import React from 'react';
import { BookOpen, Check } from 'lucide-react';

interface HistoryReviewCardProps {
  checkedState: Set<string>;
  onToggleCheckbox: (id: string) => void;
}

export const HistoryReviewCard: React.FC<HistoryReviewCardProps> = ({
  checkedState,
  onToggleCheckbox,
}) => {
  const reviews = [
    { num: 1, label: 'المراجعة 1 (بداية من آخر درس في الوحدة الأولى)' },
    { num: 2, label: 'المراجعة 2' },
    { num: 3, label: 'المراجعة 3' },
    { num: 4, label: 'المراجعة 4' },
    { num: 5, label: 'المراجعة 5 (حتى رابع درس في الوحدة الثانية)' },
  ];

  return (
    <div className="bg-white border-2 border-black rounded-xl p-3.5 shadow-neo-sm mb-3.5 avoid-break">
      <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="bg-black text-white p-1 rounded shadow-neo-xs">
            <BookOpen className="w-3.5 h-3.5" />
          </span>
          <h4 className="font-display font-black text-sm text-black">
            مراجعات التاريخ المكثفة (5 مراجعات)
          </h4>
        </div>
        <span className="text-[10px] font-mono font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-300">
          من آخر درس بالوحدة 1 إلى رابع درس بالوحدة 2
        </span>
      </div>

      <div className="space-y-2.5">
        {reviews.map((rev) => {
          const cbIdM = `hist_rev_${rev.num}_study`;
          const cbIdH = `hist_rev_${rev.num}_hw`;
          const isCheckM = checkedState.has(cbIdM);
          const isCheckH = checkedState.has(cbIdH);

          return (
            <div
              key={rev.num}
              className="border border-zinc-300 rounded-lg p-2 bg-zinc-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="bg-zinc-800 text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded">
                  #{rev.num}
                </span>
                <span className="font-bold text-xs text-zinc-900">{rev.label}</span>
                <div className="flex-1 border-b border-dashed border-zinc-400 h-2 hidden sm:block" />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <label
                  onClick={() => onToggleCheckbox(cbIdM)}
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[11px] cursor-pointer select-none transition-all ${
                    isCheckM
                      ? 'bg-black text-white border-black font-bold'
                      : 'bg-white text-zinc-800 border-zinc-300 hover:border-black'
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-sm border flex items-center justify-center ${
                      isCheckM ? 'border-white bg-white text-black' : 'border-black'
                    }`}
                  >
                    {isCheckM && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </span>
                  <span>مذاكرة وتلخيص</span>
                </label>

                <label
                  onClick={() => onToggleCheckbox(cbIdH)}
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[11px] cursor-pointer select-none transition-all ${
                    isCheckH
                      ? 'bg-black text-white border-black font-bold'
                      : 'bg-white text-zinc-800 border-zinc-300 hover:border-black'
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-sm border flex items-center justify-center ${
                      isCheckH ? 'border-white bg-white text-black' : 'border-black'
                    }`}
                  >
                    {isCheckH && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </span>
                  <span>حل بنك الأسئلة</span>
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

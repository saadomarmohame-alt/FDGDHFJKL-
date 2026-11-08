import React from 'react';
import { SubjectData } from '../utils/planner-data';
import { SubjectLogoBadge } from './Logos';
import { Check } from 'lucide-react';

interface SubjectHeaderProps {
  subject: SubjectData;
  completedLectures: Set<number | string>;
  onToggleLectureProgress: (num: number | string) => void;
  showStats?: boolean;
  overrideLecturesCount?: number;
  offsetIndex?: number;
}

export const SubjectHeader: React.FC<SubjectHeaderProps> = ({
  subject,
  completedLectures,
  onToggleLectureProgress,
  showStats = true,
  overrideLecturesCount,
  offsetIndex = 0,
}) => {
  const circlesCount = overrideLecturesCount || subject.totalLectures;

  return (
    <div className="mb-4 avoid-break">
      {/* Top Banner with Subject Pattern Stripe */}
      <div className="relative border-2 border-black bg-white rounded-xl p-3 shadow-neo overflow-hidden">
        {/* Pattern Background Top Strip */}
        <div
          className={`absolute top-0 left-0 right-0 h-2.5 border-b-2 border-black ${subject.patternClass}`}
        />

        <div className="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo + Subject Title + Sticker */}
          <div className="flex items-center gap-3">
            <SubjectLogoBadge type={subject.logoType} size="md" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display font-black text-xl text-black leading-tight">
                  {subject.name}
                </h2>
                <span className="font-mono text-xs font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-300">
                  {subject.englishName}
                </span>
                <span className="inline-block border-2 border-black bg-zinc-200 text-black px-2.5 py-0.5 rounded-full font-bold text-xs -rotate-2 shadow-neo-xs select-none">
                  {subject.sticker}
                </span>
              </div>
              <p className="text-[11px] font-semibold text-zinc-600 mt-0.5">
                متابعة المحاضرات والدروس وإنجاز التكليفات
              </p>
            </div>
          </div>

          {/* 3 Stat Boxes (e.g. for English: 20 محاضرة، 55 حصة، 148 واجب) */}
          {showStats && subject.stats && subject.stats.length > 0 && (
            <div className="flex items-center gap-2 self-start md:self-center">
              {subject.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="border-2 border-black bg-zinc-100 px-2.5 py-1 rounded-lg text-center shadow-neo-xs"
                >
                  <div className="font-mono font-black text-xs text-black">
                    {stat.value}
                  </div>
                  <div className="text-[9px] font-bold text-zinc-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subtitle Notice if any (e.g. History review notice) */}
        {subject.subtitleNotice && (
          <div className="mt-2.5 pt-2 border-t border-dashed border-zinc-400 text-xs font-bold text-zinc-800 bg-zinc-100 p-2 rounded-lg border">
            {subject.subtitleNotice}
          </div>
        )}
      </div>

      {/* Progress Tracker Bar: "تقدّمي" */}
      <div className="mt-2.5 border-2 border-black bg-white rounded-xl p-2.5 shadow-neo-xs flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="bg-black text-white px-2 py-0.5 rounded font-bold text-xs shadow-neo-xs">
            تَقَدُّمِي:
          </span>
          <span className="text-[10px] text-zinc-600 font-semibold hidden sm:inline">
            (لوّن الدائرة عند إنهاء المحاضرة)
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap justify-start">
          {Array.from({ length: circlesCount }).map((_, i) => {
            const lectureNum = i + 1 + offsetIndex;
            const isCompleted = completedLectures.has(lectureNum);
            return (
              <button
                type="button"
                key={i}
                onClick={() => onToggleLectureProgress(lectureNum)}
                title={`محاضرة ${lectureNum}`}
                className={`w-6 h-6 rounded-full border-2 border-black flex items-center justify-center font-mono text-[10px] font-black cursor-pointer transition-all ${
                  isCompleted
                    ? 'bg-black text-white shadow-neo-xs scale-105'
                    : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : lectureNum}
              </button>
            );
          })}
        </div>
      </div>
    </div>

  );
};

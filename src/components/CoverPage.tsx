import React from 'react';
import { SubjectData } from '../utils/planner-data';
import { SubjectLogoBadge } from './Logos';
import { Sparkles, Calendar, User, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface CoverPageProps {
  subjects: SubjectData[];
  studentName: string;
  month: string;
  onStudentNameChange: (val: string) => void;
  onMonthChange: (val: string) => void;
  pageNumber: number;
  totalPages: number;
}

export const CoverPage: React.FC<CoverPageProps> = ({
  subjects,
  studentName,
  month,
  onStudentNameChange,
  onMonthChange,
  pageNumber,
  totalPages,
}) => {
  // Page mapping for subjects:
  // English: Pages 2 - 5
  // Arabic: Pages 6 - 7
  // History: Pages 8 - 9
  // Programming: Pages 10 - 11
  const subjectPagesMap: Record<string, string> = {
    english: 'ص 02 - 05',
    arabic: 'ص 06 - 07',
    history: 'ص 08 - 09',
    programming: 'ص 10 - 11',
  };

  return (
    <div className="a4-page pattern-notebook border-2 border-black flex flex-col justify-between shadow-neo-lg relative">
      {/* Decorative Corner Stamps */}
      <div className="absolute top-4 left-4 border-2 border-black bg-white px-2.5 py-1 rounded-lg font-mono text-[11px] font-black -rotate-3 shadow-neo-xs select-none">
        ★ PLANNER • 2025 ★
      </div>

      <div className="absolute top-4 right-4 border-2 border-black bg-black text-white px-3 py-1 rounded-lg font-mono text-[11px] font-black rotate-2 shadow-neo-xs select-none">
        VERSION 1.0 / A4 PRINT
      </div>

      {/* Main Header / Title Section */}
      <div className="pt-10 pb-6 text-center">
        {/* Top Colloquial Sticker */}
        <div className="inline-block border-2 border-black bg-zinc-200 text-black px-4 py-1 rounded-full font-bold text-xs -rotate-1 mb-4 shadow-neo-xs">
          ⚡ دفتر الإنجاز والمتابعة اليومية المكثفة
        </div>

        {/* Big Neo-Brutalist Main Title */}
        <div className="relative inline-block my-2">
          <h1 className="font-display font-black text-3xl md:text-4xl text-black leading-tight border-4 border-black p-4 bg-white rounded-2xl shadow-neo-md">
            خُطَّةُ الْمُحَاضَرَاتِ
            <br />
            <span className="relative">
              وَالْمُذَاكَرَةِ وَالْوَاجِبَاتِ
              <span className="absolute -bottom-1 left-0 right-0 h-3 bg-zinc-300 -z-10 rounded" />
            </span>
          </h1>
        </div>

        <p className="font-heading text-xs font-semibold text-zinc-600 mt-3 max-w-md mx-auto">
          نظام متكامل لتتبع الدروس، الواجبات، الكلمات، الامتحانات والملاحظات الأسبوعية
        </p>

        {/* Student Meta Row */}
        <div className="mt-6 max-w-xl mx-auto border-2 border-black bg-white rounded-xl p-3.5 shadow-neo-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-1/2">
            <span className="bg-black text-white p-1 rounded">
              <User className="w-3.5 h-3.5" />
            </span>
            <span className="font-display font-bold text-xs text-black shrink-0">
              اسمي:
            </span>
            <input
              type="text"
              value={studentName}
              onChange={(e) => onStudentNameChange(e.target.value)}
              placeholder="............................................"
              className="w-full border-b-2 border-dashed border-zinc-700 font-bold text-xs bg-transparent px-1 focus:outline-none focus:border-black font-body placeholder:text-zinc-400"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-1/2">
            <span className="bg-black text-white p-1 rounded">
              <Calendar className="w-3.5 h-3.5" />
            </span>
            <span className="font-display font-bold text-xs text-black shrink-0">
              الشهر / الفصل:
            </span>
            <input
              type="text"
              value={month}
              onChange={(e) => onMonthChange(e.target.value)}
              placeholder="............................................"
              className="w-full border-b-2 border-dashed border-zinc-700 font-bold text-xs bg-transparent px-1 focus:outline-none focus:border-black font-body placeholder:text-zinc-400"
            />
          </div>
        </div>
      </div>

      {/* 4 Subject Cards: 2x2 Grid */}
      <div className="my-auto py-2">
        <div className="text-center mb-3">
          <span className="bg-black text-white px-3 py-1 rounded-md font-mono text-[11px] font-black tracking-wider uppercase shadow-neo-xs">
            فهرس المواد والمقررات (SUBJECTS DIRECTORY)
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3.5 max-w-xl mx-auto">
          {subjects.map((sub, idx) => (
            <div
              key={sub.id}
              className={`border-2 border-black bg-white rounded-xl p-3 shadow-neo relative overflow-hidden transition-all flex flex-col justify-between ${
                idx % 2 === 0 ? '-rotate-0.5' : 'rotate-0.5'
              }`}
            >
              {/* Distinct Pattern Accent Top Stripe */}
              <div
                className={`absolute top-0 left-0 right-0 h-2 border-b border-black ${sub.patternClass}`}
              />

              <div className="pt-2 flex items-start gap-2.5">
                <SubjectLogoBadge type={sub.logoType} size="md" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-black text-sm text-black leading-tight">
                    {sub.name}
                  </h3>
                  <p className="font-mono text-[10px] text-zinc-500 font-bold truncate">
                    {sub.englishName}
                  </p>
                  <div className="inline-block mt-1 bg-zinc-100 border border-zinc-400 px-1.5 py-0.2 rounded text-[10px] font-bold text-zinc-800">
                    {sub.totalLectures} {sub.id === 'programming' ? 'دروس' : 'محاضرات'}
                  </div>
                </div>
              </div>

              {/* Bottom Card Meta */}
              <div className="mt-3 pt-2 border-t-2 border-zinc-200 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-zinc-600 bg-zinc-100 px-1.5 py-0.5 rounded">
                  {sub.sticker}
                </span>
                <span className="font-mono font-black text-xs bg-black text-white px-2 py-0.5 rounded shadow-neo-xs flex items-center gap-1">
                  <span>{subjectPagesMap[sub.id]}</span>
                  <ArrowLeft className="w-3 h-3 stroke-[3]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cover Footer / Guidelines */}
      <div className="border-t-2 border-black pt-3 pb-1 text-center">
        <div className="inline-flex items-center gap-2 border-2 border-dashed border-zinc-800 bg-zinc-100 px-3 py-1 rounded-lg text-[10px] font-bold text-zinc-800 mb-2">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>جاهز للطباعة على ورق A4 أبيض وأسود | علّم على الخانات بالقلم بعد كل إنجاز</span>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-zinc-600 px-2">
          <span>خطة المحاضرات والمذاكرة والواجبات</span>
          <span className="bg-black text-white px-2 py-0.5 rounded font-mono">
            صفحة {pageNumber} من {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
};

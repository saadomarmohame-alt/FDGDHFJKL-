import React, { useState, useEffect } from 'react';
import {
  SUBJECTS_CONFIG,
  calculateProgress,
  getAllCheckboxesForSubject,
  getTotalCheckboxesCount,
} from './utils/planner-data';
import { PrintToolbar } from './components/PrintToolbar';
import { PageContainer } from './components/PageContainer';
import { CoverPage } from './components/CoverPage';
import { SubjectHeader } from './components/SubjectHeader';
import { LectureCard } from './components/LectureCard';
import { NotesCard } from './components/NotesCard';
import { HistoryReviewCard } from './components/HistoryReviewCard';
import { SubjectLogoBadge } from './components/Logos';

export default function App() {
  const [studentName, setStudentName] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [checkedState, setCheckedState] = useState<Set<string>>(new Set());
  const [completedLectures, setCompletedLectures] = useState<Set<number | string>>(
    new Set()
  );
  const [zoom, setZoom] = useState<number>(1.0);

  // Load saved state from localStorage if available
  useEffect(() => {
    try {
      const savedChecks = localStorage.getItem('planner_checks');
      if (savedChecks) {
        setCheckedState(new Set(JSON.parse(savedChecks)));
      }
      const savedLectures = localStorage.getItem('planner_completed_lectures');
      if (savedLectures) {
        setCompletedLectures(new Set(JSON.parse(savedLectures)));
      }
      const savedName = localStorage.getItem('planner_student_name');
      if (savedName) setStudentName(savedName);
      const savedMonth = localStorage.getItem('planner_month');
      if (savedMonth) setMonth(savedMonth);
    } catch {
      // Local storage fallback
    }
  }, []);

  const handleToggleCheckbox = (id: string) => {
    setCheckedState((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem('planner_checks', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  const handleToggleLectureProgress = (num: number | string) => {
    setCompletedLectures((prev) => {
      const next = new Set(prev);
      if (next.has(num)) {
        next.delete(num);
      } else {
        next.add(num);
      }
      try {
        localStorage.setItem(
          'planner_completed_lectures',
          JSON.stringify(Array.from(next))
        );
      } catch {}
      return next;
    });
  };

  const handleResetCheckboxes = () => {
    if (window.confirm('هل تريد تفريغ كل الخانات لتجهيز الملف للطباعة اليدوية؟')) {
      setCheckedState(new Set());
      setCompletedLectures(new Set());
      try {
        localStorage.removeItem('planner_checks');
        localStorage.removeItem('planner_completed_lectures');
      } catch {}
    }
  };

  const handleCheckAllCheckboxes = () => {
    const allIds = new Set<string>();
    SUBJECTS_CONFIG.forEach((sub) => {
      getAllCheckboxesForSubject(sub).forEach((cb) => allIds.add(cb.id));
    });
    setCheckedState(allIds);
    try {
      localStorage.setItem('planner_checks', JSON.stringify(Array.from(allIds)));
    } catch {}
  };

  const handleStudentNameChange = (val: string) => {
    setStudentName(val);
    try {
      localStorage.setItem('planner_student_name', val);
    } catch {}
  };

  const handleMonthChange = (val: string) => {
    setMonth(val);
    try {
      localStorage.setItem('planner_month', val);
    } catch {}
  };

  const handlePrint = () => {
    window.print();
  };

  const handleJumpToPage = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Download complete standalone self-contained HTML file
  const handleDownloadHtml = () => {
    const printableElement = document.getElementById('printable-document');
    if (!printableElement) return;

    const htmlContent = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>خطة المحاضرات والمذاكرة والواجبات</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Changa:wght@600;700;800;900&family=Lemonada:wght@600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: 'Cairo', system-ui, sans-serif;
      background-color: #f4f4f5;
      color: #111111;
      margin: 0;
      padding: 0;
    }
    .font-display { font-family: 'Changa', 'Cairo', sans-serif; }
    .font-heading { font-family: 'Lemonada', 'Changa', sans-serif; }
    .font-body { font-family: 'Cairo', system-ui, sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    .shadow-neo-xs { box-shadow: 1.5px 1.5px 0px #000; }
    .shadow-neo-sm { box-shadow: 2.5px 2.5px 0px #000; }
    .shadow-neo { box-shadow: 4px 4px 0px #000; }
    .shadow-neo-md { box-shadow: 5px 5px 0px #000; }
    .shadow-neo-lg { box-shadow: 7px 7px 0px #000; }
    .pattern-notebook {
      background-image: radial-gradient(#a1a1aa 1.2px, transparent 1.2px);
      background-size: 18px 18px;
    }
    .pattern-stripes {
      background: repeating-linear-gradient(-45deg, #ffffff, #ffffff 7px, #e4e4e7 7px, #e4e4e7 14px);
    }
    .pattern-dots {
      background-image: radial-gradient(#52525b 2px, transparent 2px);
      background-size: 12px 12px;
      background-color: #fafafa;
    }
    .pattern-grid {
      background-size: 16px 16px;
      background-image: linear-gradient(to right, #d4d4d8 1px, transparent 1px), linear-gradient(to bottom, #d4d4d8 1px, transparent 1px);
      background-color: #fafafa;
    }
    .pattern-checker {
      background-image: linear-gradient(45deg, #e4e4e7 25%, transparent 25%), linear-gradient(-45deg, #e4e4e7 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e4e4e7 75%), linear-gradient(-45deg, transparent 75%, #e4e4e7 75%);
      background-size: 16px 16px;
      background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
      background-color: #ffffff;
    }
    .a4-page {
      width: 210mm;
      min-height: 297mm;
      max-width: 210mm;
      padding: 10mm 12mm;
      margin: 0 auto 24px auto;
      background-color: #ffffff;
      box-sizing: border-box;
      position: relative;
    }
    @media print {
      @page {
        size: A4 portrait;
        margin: 8mm 8mm 10mm 8mm;
      }
      body {
        background-color: #ffffff !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .no-print { display: none !important; }
      .a4-page {
        width: 100% !important;
        max-width: 100% !important;
        min-height: auto !important;
        margin: 0 !important;
        padding: 2mm 0 4mm 0 !important;
        border: none !important;
        box-shadow: none !important;
        page-break-after: always !important;
        break-after: page !important;
      }
      .avoid-break {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
    }
  </style>
</head>
<body class="bg-zinc-100 text-zinc-900 py-6">
  <div style="text-align: center; margin-bottom: 20px;" class="no-print">
    <button onclick="window.print()" style="background:#000; color:#fff; border:2px solid #000; padding:10px 24px; font-weight:bold; border-radius:8px; cursor:pointer; font-size:14px; box-shadow:3px 3px 0 #666;">
      🖨️ اضغط هنا للطباعة أو الحفظ كـ PDF (تأكد من تفعيل Background graphics ومقاس A4)
    </button>
  </div>
  ${printableElement.innerHTML}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'خطة_المحاضرات_والمذاكرة_والواجبات_A4.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const englishSubject = SUBJECTS_CONFIG.find((s) => s.id === 'english')!;
  const arabicSubject = SUBJECTS_CONFIG.find((s) => s.id === 'arabic')!;
  const historySubject = SUBJECTS_CONFIG.find((s) => s.id === 'history')!;
  const progSubject = SUBJECTS_CONFIG.find((s) => s.id === 'programming')!;

  const progChapter1Lectures = progSubject.lectures.filter(
    (l) => l.chapter === 'Chapter 1'
  );
  const progChapter2Lectures = progSubject.lectures.filter(
    (l) => l.chapter === 'Chapter 2'
  );

  const totalCheckboxes = getTotalCheckboxesCount(SUBJECTS_CONFIG);
  const completedCount = checkedState.size;
  const overallPercentage =
    totalCheckboxes > 0 ? Math.round((completedCount / totalCheckboxes) * 100) : 0;

  const totalPages = 11;

  return (
    <div className="min-h-screen bg-zinc-200 text-zinc-900 flex flex-col">
      {/* Top Interactive Toolbar */}
      <PrintToolbar
        onPrint={handlePrint}
        onDownloadHtml={handleDownloadHtml}
        onResetCheckboxes={handleResetCheckboxes}
        onCheckAllCheckboxes={handleCheckAllCheckboxes}
        zoom={zoom}
        onZoomChange={setZoom}
        completedStats={{
          completed: completedCount,
          total: totalCheckboxes,
          percentage: overallPercentage,
        }}
        onJumpToPage={handleJumpToPage}
      />

      {/* Main Pages Canvas Container */}
      <main
        className="flex-1 py-8 px-2 sm:px-4 flex flex-col items-center overflow-x-auto"
        id="printable-document"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'top center',
          marginBottom: zoom !== 1.0 ? `${(zoom - 1) * 3000}px` : '0px',
        }}
      >
        {/* ========================================================================= */}
        {/* PAGE 1: COVER (الغلاف) */}
        {/* ========================================================================= */}
        <div id="page-cover" className="w-full flex justify-center">
          <CoverPage
            subjects={SUBJECTS_CONFIG}
            studentName={studentName}
            month={month}
            onStudentNameChange={handleStudentNameChange}
            onMonthChange={handleMonthChange}
            pageNumber={1}
            totalPages={totalPages}
          />
        </div>

        {/* ========================================================================= */}
        {/* PAGES 2 - 5: ENGLISH (اللغة الإنجليزية) */}
        {/* ========================================================================= */}
        {/* PAGE 2: English Banner + Stats + Progress + Lectures 1 to 4 */}
        <div id="subject-english" className="w-full flex justify-center">
          <PageContainer
            pageNumber={2}
            totalPages={totalPages}
            subjectTitle="اللغة الإنجليزية (1)"
          >
            <SubjectHeader
              subject={englishSubject}
              completedLectures={completedLectures}
              onToggleLectureProgress={handleToggleLectureProgress}
              showStats={true}
            />

            <div className="grid grid-cols-2 gap-3.5 my-auto">
              {englishSubject.lectures.slice(0, 4).map((lec) => (
                <LectureCard
                  key={lec.id}
                  lecture={lec}
                  subjectId="english"
                  checkedState={checkedState}
                  onToggleCheckbox={handleToggleCheckbox}
                  compact={true}
                />
              ))}
            </div>
          </PageContainer>
        </div>

        {/* PAGE 3: English Lectures 5 to 10 */}
        <div className="w-full flex justify-center">
          <PageContainer
            pageNumber={3}
            totalPages={totalPages}
            subjectTitle="اللغة الإنجليزية (2)"
          >
            <div className="flex items-center justify-between border-2 border-black bg-white rounded-lg px-3 py-1.5 mb-3 shadow-neo-xs">
              <div className="flex items-center gap-2">
                <SubjectLogoBadge type="englishawy" size="sm" />
                <span className="font-display font-black text-xs text-black">
                  اللغة الإنجليزية • المحاضرات (05 - 10)
                </span>
              </div>
              <span className="font-mono text-[10px] font-bold text-zinc-600">
                Novel / Grammar / Skills / Reading / Vocab
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3.5 my-auto">
              {englishSubject.lectures.slice(4, 10).map((lec) => (
                <LectureCard
                  key={lec.id}
                  lecture={lec}
                  subjectId="english"
                  checkedState={checkedState}
                  onToggleCheckbox={handleToggleCheckbox}
                  compact={true}
                />
              ))}
            </div>
          </PageContainer>
        </div>

        {/* PAGE 4: English Lectures 11 to 16 */}
        <div className="w-full flex justify-center">
          <PageContainer
            pageNumber={4}
            totalPages={totalPages}
            subjectTitle="اللغة الإنجليزية (3)"
          >
            <div className="flex items-center justify-between border-2 border-black bg-white rounded-lg px-3 py-1.5 mb-3 shadow-neo-xs">
              <div className="flex items-center gap-2">
                <SubjectLogoBadge type="englishawy" size="sm" />
                <span className="font-display font-black text-xs text-black">
                  اللغة الإنجليزية • المحاضرات (11 - 16)
                </span>
              </div>
              <span className="font-mono text-[10px] font-bold text-zinc-600">
                ENGLISHAWY Mahmoud Radwan
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3.5 my-auto">
              {englishSubject.lectures.slice(10, 16).map((lec) => (
                <LectureCard
                  key={lec.id}
                  lecture={lec}
                  subjectId="english"
                  checkedState={checkedState}
                  onToggleCheckbox={handleToggleCheckbox}
                  compact={true}
                />
              ))}
            </div>
          </PageContainer>
        </div>

        {/* PAGE 5: English Lectures 17 to 20 + Notes Card */}
        <div className="w-full flex justify-center">
          <PageContainer
            pageNumber={5}
            totalPages={totalPages}
            subjectTitle="اللغة الإنجليزية (4)"
          >
            <div className="flex items-center justify-between border-2 border-black bg-white rounded-lg px-3 py-1.5 mb-3 shadow-neo-xs">
              <div className="flex items-center gap-2">
                <SubjectLogoBadge type="englishawy" size="sm" />
                <span className="font-display font-black text-xs text-black">
                  اللغة الإنجليزية • المحاضرات (17 - 20) وخطة الملاحظات
                </span>
              </div>
              <span className="font-mono text-[10px] font-bold text-zinc-600">
                ختام مادة الإنجليزي
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3.5 mb-3.5">
              {englishSubject.lectures.slice(16, 20).map((lec) => (
                <LectureCard
                  key={lec.id}
                  lecture={lec}
                  subjectId="english"
                  checkedState={checkedState}
                  onToggleCheckbox={handleToggleCheckbox}
                  compact={true}
                />
              ))}
            </div>

            {/* Ruled Notes Card */}
            <NotesCard
              title={englishSubject.notesTitle}
              linesCount={5}
              className="mt-auto"
            />
          </PageContainer>
        </div>

        {/* ========================================================================= */}
        {/* PAGES 6 - 7: ARABIC (اللغة العربية - بسطتهالك) */}
        {/* Starts on a new page! */}
        {/* ========================================================================= */}
        {/* PAGE 6: Arabic Banner + Progress + Lectures 1, 2, 3, 4 */}
        <div id="subject-arabic" className="w-full flex justify-center">
          <PageContainer
            pageNumber={6}
            totalPages={totalPages}
            subjectTitle="اللغة العربية (1)"
          >
            <SubjectHeader
              subject={arabicSubject}
              completedLectures={completedLectures}
              onToggleLectureProgress={handleToggleLectureProgress}
              showStats={false}
            />

            <div className="grid grid-cols-2 gap-3.5 my-auto">
              {arabicSubject.lectures.slice(0, 4).map((lec) => (
                <LectureCard
                  key={lec.id}
                  lecture={lec}
                  subjectId="arabic"
                  checkedState={checkedState}
                  onToggleCheckbox={handleToggleCheckbox}
                />
              ))}
            </div>
          </PageContainer>
        </div>

        {/* PAGE 7: Arabic Lectures 5, 6, 7, 8 + Notes Card */}
        <div className="w-full flex justify-center">
          <PageContainer
            pageNumber={7}
            totalPages={totalPages}
            subjectTitle="اللغة العربية (2)"
          >
            <div className="flex items-center justify-between border-2 border-black bg-white rounded-lg px-3 py-1.5 mb-3 shadow-neo-xs">
              <div className="flex items-center gap-2">
                <SubjectLogoBadge type="basta" size="sm" />
                <span className="font-display font-black text-xs text-black">
                  اللغة العربية • المحاضرات (05 - 08)
                </span>
              </div>
              <span className="font-mono text-[10px] font-bold text-zinc-600">
                منصة بَسَّطْتَهَالَكْ
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3.5 mb-3.5">
              {arabicSubject.lectures.slice(4, 8).map((lec) => (
                <LectureCard
                  key={lec.id}
                  lecture={lec}
                  subjectId="arabic"
                  checkedState={checkedState}
                  onToggleCheckbox={handleToggleCheckbox}
                />
              ))}
            </div>

            {/* Ruled Notes Card for Arabic */}
            <NotesCard
              title={arabicSubject.notesTitle}
              linesCount={5}
              className="mt-auto"
            />
          </PageContainer>
        </div>

        {/* ========================================================================= */}
        {/* PAGES 8 - 9: HISTORY (التاريخ - SA Smart Academy) */}
        {/* Starts on a new page! */}
        {/* ========================================================================= */}
        {/* PAGE 8: History Banner + Notice + Progress + Lectures 1, 2, 3, 4 */}
        <div id="subject-history" className="w-full flex justify-center">
          <PageContainer
            pageNumber={8}
            totalPages={totalPages}
            subjectTitle="التاريخ (1)"
          >
            <SubjectHeader
              subject={historySubject}
              completedLectures={completedLectures}
              onToggleLectureProgress={handleToggleLectureProgress}
              showStats={false}
            />

            <div className="grid grid-cols-2 gap-3.5 my-auto">
              {historySubject.lectures.slice(0, 4).map((lec) => (
                <LectureCard
                  key={lec.id}
                  lecture={lec}
                  subjectId="history"
                  checkedState={checkedState}
                  onToggleCheckbox={handleToggleCheckbox}
                />
              ))}
            </div>
          </PageContainer>
        </div>

        {/* PAGE 9: History Lectures 5 to 9 + 5 Reviews Card + Notes Card */}
        <div className="w-full flex justify-center">
          <PageContainer
            pageNumber={9}
            totalPages={totalPages}
            subjectTitle="التاريخ (2)"
          >
            <div className="flex items-center justify-between border-2 border-black bg-white rounded-lg px-3 py-1.5 mb-2.5 shadow-neo-xs">
              <div className="flex items-center gap-2">
                <SubjectLogoBadge type="smart_academy" size="sm" />
                <span className="font-display font-black text-xs text-black">
                  التاريخ • المحاضرات (05 - 09) والمراجعات المكثفة
                </span>
              </div>
              <span className="font-mono text-[10px] font-bold text-zinc-600">
                SA Smart Academy
              </span>
            </div>

            {/* Lectures 5 to 9: 5 cards arranged comfortably */}
            <div className="grid grid-cols-2 gap-3 mb-2.5">
              {historySubject.lectures.slice(4, 9).map((lec) => (
                <LectureCard
                  key={lec.id}
                  lecture={lec}
                  subjectId="history"
                  checkedState={checkedState}
                  onToggleCheckbox={handleToggleCheckbox}
                  compact={true}
                />
              ))}
            </div>

            {/* History 5 Reviews Card */}
            <HistoryReviewCard
              checkedState={checkedState}
              onToggleCheckbox={handleToggleCheckbox}
            />

            {/* Notes Card */}
            <NotesCard
              title={historySubject.notesTitle}
              linesCount={3}
              className="mt-auto"
            />
          </PageContainer>
        </div>

        {/* ========================================================================= */}
        {/* PAGES 10 - 11: PROGRAMMING (البرمجة - بكالوريا) */}
        {/* Starts on a new page! */}
        {/* ========================================================================= */}
        {/* PAGE 10: Programming Header + Chapter 1 (5 lessons) + Notes */}
        <div id="subject-programming" className="w-full flex justify-center">
          <PageContainer
            pageNumber={10}
            totalPages={totalPages}
            subjectTitle="البرمجة (Chapter 1)"
          >
            <SubjectHeader
              subject={progSubject}
              completedLectures={completedLectures}
              onToggleLectureProgress={handleToggleLectureProgress}
              showStats={false}
              overrideLecturesCount={5}
            />

            {/* Chapter 1 Solid Black Separator Bar */}
            <div className="border-2 border-black bg-black text-white px-3 py-1.5 rounded-lg mb-3 shadow-neo-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-xs bg-zinc-800 px-2 py-0.5 rounded border border-zinc-600">
                  CH 01
                </span>
                <span className="font-display font-black text-xs sm:text-sm">
                  الفصل الأول: أساسيات البرمجة، المتغيرات، والتراكيب التكرارية
                </span>
              </div>
              <span className="font-mono text-[10px] text-zinc-300 font-bold">
                5 LESSONS
              </span>
            </div>

            {/* Chapter 1: 5 Lessons + Balanced Notes Card in 2x3 Grid */}
            <div className="grid grid-cols-2 gap-3 my-auto">
              {progChapter1Lectures.map((lec) => (
                <LectureCard
                  key={lec.id}
                  lecture={lec}
                  subjectId="programming"
                  checkedState={checkedState}
                  onToggleCheckbox={handleToggleCheckbox}
                  compact={true}
                />
              ))}
              <NotesCard
                title="ملاحظات وأكواد Chapter 1"
                linesCount={4}
                className="h-full flex flex-col justify-between"
              />
            </div>
          </PageContainer>
        </div>

        {/* PAGE 11: PROGRAMMING - CHAPTER 2 */}
        {/* Explicit instruction: "Chapter 2 يبدأ في صفحة جديدة" */}
        <div className="w-full flex justify-center">
          <PageContainer
            pageNumber={11}
            totalPages={totalPages}
            subjectTitle="البرمجة (Chapter 2)"
          >
            {/* Top Bar for Chapter 2 */}
            <div className="border-2 border-black bg-white rounded-xl p-3 shadow-neo mb-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 border-b border-black pattern-checker" />
              <div className="pt-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <SubjectLogoBadge type="code_window" size="md" />
                  <div>
                    <h2 className="font-display font-black text-lg text-black">
                      البرمجة (بكالوريا) • الفصل الثاني
                    </h2>
                    <span className="font-mono text-xs text-zinc-600 font-bold">
                      Chapter 2: المصفوفات، الدوال والبرمجة الكائنية
                    </span>
                  </div>
                </div>
                <span className="border-2 border-black bg-zinc-200 text-black px-2.5 py-0.5 rounded-full font-bold text-xs -rotate-1 shadow-neo-xs select-none">
                  ركز في التطبيق! ⚡
                </span>
              </div>
            </div>

            {/* Chapter 2 Solid Black Separator Bar */}
            <div className="border-2 border-black bg-black text-white px-3 py-1.5 rounded-lg mb-3 shadow-neo-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-xs bg-zinc-800 px-2 py-0.5 rounded border border-zinc-600">
                  CH 02
                </span>
                <span className="font-display font-black text-xs sm:text-sm">
                  الفصل الثاني: Chapter 2 (Lesson 1 إلى Lesson 3 فقط)
                </span>
              </div>
              <span className="font-mono text-[10px] text-zinc-300 font-bold">
                3 LESSONS
              </span>
            </div>

            {/* Chapter 2 Progress Tracker */}
            <div className="mb-3 border-2 border-black bg-white rounded-xl p-2.5 shadow-neo-xs flex items-center justify-between gap-2">
              <span className="bg-black text-white px-2 py-0.5 rounded font-bold text-xs shadow-neo-xs">
                تَقَدُّمِي فِي CHAPTER 2:
              </span>
              <div className="flex items-center gap-2">
                {['L1', 'L2', 'L3'].map((lLabel, i) => {
                  const lecKey = `ch2_${i + 1}`;
                  const isDone = completedLectures.has(lecKey);
                  return (
                    <button
                      type="button"
                      key={lLabel}
                      onClick={() => handleToggleLectureProgress(lecKey)}
                      className={`w-7 h-7 rounded-full border-2 border-black flex items-center justify-center font-mono text-[11px] font-black cursor-pointer transition-all ${
                        isDone
                          ? 'bg-black text-white shadow-neo-xs'
                          : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
                      }`}
                    >
                      {isDone ? '✓' : lLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chapter 2: 3 Lessons (Lesson 1 to 3) */}
            <div className="grid grid-cols-2 gap-3.5 mb-3.5">
              {progChapter2Lectures.map((lec) => (
                <LectureCard
                  key={lec.id}
                  lecture={lec}
                  subjectId="programming"
                  checkedState={checkedState}
                  onToggleCheckbox={handleToggleCheckbox}
                />
              ))}
            </div>

            {/* Wide Ruled Notes Card for Programming */}
            <NotesCard
              title={progSubject.notesTitle}
              linesCount={6}
              className="mt-auto"
            />
          </PageContainer>
        </div>
      </main>

      {/* Screen Footer (Hidden when printing) */}
      <footer className="no-print bg-zinc-900 text-zinc-400 py-6 px-4 text-center border-t-2 border-black mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-white text-sm">
              خطة المحاضرات والمذاكرة والواجبات
            </span>
            <span>• طبعة Neo-Brutalist عالية الدقة</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="text-white underline font-bold hover:text-zinc-200"
            >
              طباعة / حفظ كـ PDF الآن
            </button>
            <span>•</span>
            <button
              onClick={handleDownloadHtml}
              className="text-white underline font-bold hover:text-zinc-200"
            >
              تحميل كملف HTML مستقل
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

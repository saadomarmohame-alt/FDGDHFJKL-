import React, { useState } from 'react';
import {
  Printer,
  Download,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  HelpCircle,
  CheckSquare,
  FileText,
  ChevronDown,
  Info,
} from 'lucide-react';

interface PrintToolbarProps {
  onPrint: () => void;
  onDownloadHtml: () => void;
  onResetCheckboxes: () => void;
  onCheckAllCheckboxes: () => void;
  zoom: number;
  onZoomChange: (newZoom: number) => void;
  completedStats: { completed: number; total: number; percentage: number };
  onJumpToPage: (pageId: string) => void;
}

export const PrintToolbar: React.FC<PrintToolbarProps> = ({
  onPrint,
  onDownloadHtml,
  onResetCheckboxes,
  onCheckAllCheckboxes,
  zoom,
  onZoomChange,
  completedStats,
  onJumpToPage,
}) => {
  const [showTips, setShowTips] = useState(false);

  return (
    <header className="no-print sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-black shadow-neo-sm px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Title and Progress Summary */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <span className="bg-black text-white p-1.5 rounded-lg shadow-neo-xs">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h1 className="font-display font-black text-sm md:text-base text-black leading-none">
                خطة المحاضرات والمذاكرة والواجبات
              </h1>
              <span className="text-[10px] font-mono text-zinc-500 font-bold">
                نسخة A4 أبيض وأسود للطباعة • Gen Z Neo-Brutalist
              </span>
            </div>
          </div>

          {/* Quick Progress Badge */}
          <div className="flex items-center gap-2 bg-zinc-100 border border-black px-2.5 py-1 rounded-lg">
            <span className="text-[11px] font-bold text-zinc-700">الإنجاز:</span>
            <div className="w-20 bg-zinc-300 h-2.5 rounded-full overflow-hidden border border-zinc-600">
              <div
                className="bg-black h-full transition-all duration-300"
                style={{ width: `${completedStats.percentage}%` }}
              />
            </div>
            <span className="font-mono font-black text-xs text-black">
              {completedStats.percentage}%
            </span>
          </div>
        </div>

        {/* Jump Navigation Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => onJumpToPage('page-cover')}
            className="px-2.5 py-1 rounded-lg border border-black bg-white hover:bg-zinc-100 text-xs font-bold font-display shadow-neo-xs whitespace-nowrap"
          >
            الغلاف
          </button>
          <button
            onClick={() => onJumpToPage('subject-english')}
            className="px-2.5 py-1 rounded-lg border border-black bg-white hover:bg-zinc-100 text-xs font-bold font-display shadow-neo-xs whitespace-nowrap"
          >
            1. الإنجليزي
          </button>
          <button
            onClick={() => onJumpToPage('subject-arabic')}
            className="px-2.5 py-1 rounded-lg border border-black bg-white hover:bg-zinc-100 text-xs font-bold font-display shadow-neo-xs whitespace-nowrap"
          >
            2. العربي
          </button>
          <button
            onClick={() => onJumpToPage('subject-history')}
            className="px-2.5 py-1 rounded-lg border border-black bg-white hover:bg-zinc-100 text-xs font-bold font-display shadow-neo-xs whitespace-nowrap"
          >
            3. التاريخ
          </button>
          <button
            onClick={() => onJumpToPage('subject-programming')}
            className="px-2.5 py-1 rounded-lg border border-black bg-white hover:bg-zinc-100 text-xs font-bold font-display shadow-neo-xs whitespace-nowrap"
          >
            4. البرمجة
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap justify-end w-full md:w-auto">
          {/* Zoom controls */}
          <div className="flex items-center bg-zinc-100 border border-black rounded-lg p-0.5 shadow-neo-xs">
            <button
              onClick={() => onZoomChange(Math.max(0.6, zoom - 0.1))}
              className="p-1 hover:bg-zinc-200 rounded text-black transition-all"
              title="تصغير المعاينة"
              aria-label="تصغير المعاينة"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-xs font-black px-1.5 min-w-[42px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => onZoomChange(Math.min(1.4, zoom + 0.1))}
              className="p-1 hover:bg-zinc-200 rounded text-black transition-all"
              title="تكبير المعاينة"
              aria-label="تكبير المعاينة"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Reset / Check All controls */}
          <button
            onClick={onResetCheckboxes}
            className="px-2.5 py-1.5 rounded-lg border border-zinc-400 bg-white hover:bg-zinc-100 text-xs font-bold text-zinc-700 flex items-center gap-1 transition-all"
            title="تفريغ كل الخانات للطباعة يدوياً"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">تفريغ الخانات</span>
          </button>

          {/* Help Tips Toggle */}
          <button
            onClick={() => setShowTips(!showTips)}
            className="p-1.5 rounded-lg border border-black bg-zinc-100 hover:bg-zinc-200 text-black shadow-neo-xs transition-all"
            title="إرشادات الطباعة المثالية للـ PDF"
            aria-label="إرشادات الطباعة"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Download Standalone Single HTML File */}
          <button
            onClick={onDownloadHtml}
            className="px-3 py-1.5 rounded-lg border-2 border-black bg-zinc-100 hover:bg-zinc-200 text-black font-display font-black text-xs flex items-center gap-1.5 shadow-neo-xs transition-all"
            title="تنزيل صفحة الـ HTML المفردة بالكامل مع التصميم والخطوط"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ملف HTML مستقل</span>
          </button>

          {/* Main Print / PDF Button */}
          <button
            onClick={onPrint}
            className="px-4 py-1.5 rounded-lg border-2 border-black bg-black text-white hover:bg-zinc-800 font-display font-black text-xs md:text-sm flex items-center gap-2 shadow-neo transition-all transform active:translate-x-0.5 active:translate-y-0.5"
            title="فتح نافذة الطباعة / الحفظ كـ PDF"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة / حفظ كـ PDF</span>
          </button>
        </div>
      </div>

      {/* Helpful Print Tips Dropdown Bar */}
      {showTips && (
        <div className="mt-2.5 p-3 bg-zinc-100 border-2 border-dashed border-black rounded-xl text-xs text-zinc-800 flex items-start justify-between gap-3 shadow-neo-xs">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 mt-0.5 text-black shrink-0" />
            <div>
              <strong className="font-bold text-black font-display text-sm">
                نصائح لإخراج وطباعة أفضل ملف PDF:
              </strong>
              <ul className="list-disc list-inside mt-1 space-y-1 text-[11px] leading-relaxed">
                <li>
                  في نافذة الطباعة (Ctrl+P أو ⌘+P)، اختر الوجهة:{' '}
                  <strong>حفظ بتنسيق PDF (Save as PDF)</strong>.
                </li>
                <li>
                  تأكد من اختيار مقاس الورق: <strong>A4</strong> والاتجاه:{' '}
                  <strong>طولي (Portrait)</strong>.
                </li>
                <li>
                  <strong>هام جدًا:</strong> فعّل خيار{' '}
                  <strong className="underline">رسومات الخلفية (Background graphics)</strong>{' '}
                  لكي تظهر النقشات النيو-بروتالست المائلة والشبكية والظلال بدقة عالية!
                </li>
                <li>
                  اضبط الهوامش على: <strong>الافتراضي (Default)</strong> أو{' '}
                  <strong>الحد الأدنى (Minimum)</strong>.
                </li>
              </ul>
            </div>
          </div>
          <button
            onClick={() => setShowTips(false)}
            className="text-xs font-bold underline text-black shrink-0"
          >
            إغلاق
          </button>
        </div>
      )}
    </header>
  );
};

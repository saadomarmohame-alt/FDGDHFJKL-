export interface LectureCardData {
  id: string;
  lectureNumber: number | string;
  chapter?: string;
  title?: string;
  lines?: { label: string; placeholder?: string }[];
  contentItems?: { category: string; title: string }[];
  warning?: string;
  checkboxes: string[];
}

export interface SubjectData {
  id: 'english' | 'arabic' | 'history' | 'programming';
  name: string;
  englishName: string;
  logoType: 'englishawy' | 'basta' | 'smart_academy' | 'code_window';
  logoText: string;
  subLogoText?: string;
  sticker: string;
  patternClass: string;
  totalLectures: number;
  stats?: { label: string; value: number | string }[];
  subtitleNotice?: string;
  lectures: LectureCardData[];
  specialSection?: {
    title: string;
    description?: string;
    itemsCount: number;
  };
  notesTitle: string;
}

export const SUBJECTS_CONFIG: SubjectData[] = [
  {
    id: 'english',
    name: 'اللغة الإنجليزية',
    englishName: 'English',
    logoType: 'englishawy',
    logoText: 'ENGLISHAWY',
    subLogoText: 'Mahmoud Radwan',
    sticker: 'يلا بينا! ⚡',
    patternClass: 'pattern-stripes',
    totalLectures: 20,
    stats: [
      { label: 'المحاضرات', value: '20 محاضرة' },
      { label: 'الحصص', value: '55 حصة' },
      { label: 'الواجبات', value: '148 واجب' },
    ],
    notesTitle: 'ملاحظات وتكليفات الإنجليزي',
    lectures: Array.from({ length: 20 }, (_, i) => ({
      id: `en-lec-${i + 1}`,
      lectureNumber: i + 1,
      title: `Lecture ${i + 1}`,
      lines: [
        { label: 'Novel' },
        { label: 'Grammar' },
        { label: 'Writing Skills' },
        { label: 'Reading' },
        { label: 'Vocabulary' },
      ],
      checkboxes: ['مذاكرة', 'واجب', 'كلمات', 'امتحان'],
    })),
  },
  {
    id: 'arabic',
    name: 'اللغة العربية',
    englishName: 'Arabic',
    logoType: 'basta',
    logoText: 'بَسَّطْتَهَالَكْ',
    subLogoText: 'مع الأستاذ',
    sticker: 'ركّز وبسّطها! 🎯',
    patternClass: 'pattern-dots',
    totalLectures: 8,
    notesTitle: 'ملاحظات وتنبيهات اللغة العربية',
    lectures: [
      {
        id: 'ar-lec-1',
        lectureNumber: 1,
        title: 'المحاضرة الأولى',
        lines: [
          { label: 'النحو' },
          { label: 'النصوص والقراءة' },
          { label: 'البلاغة والأدب' },
          { label: 'التعبير والقصة' },
        ],
        checkboxes: ['مذاكرة', 'واجب', 'تطبيق مع المستر', 'امتحان'],
      },
      {
        id: 'ar-lec-2',
        lectureNumber: 2,
        title: 'المحاضرة الثانية',
        lines: [
          { label: 'النحو' },
          { label: 'النصوص والقراءة' },
          { label: 'البلاغة والأدب' },
          { label: 'التعبير والقصة' },
        ],
        checkboxes: ['مذاكرة', 'واجب', 'تطبيق مع المستر', 'امتحان'],
      },
      {
        id: 'ar-lec-3',
        lectureNumber: 3,
        title: 'المحاضرة الثالثة',
        lines: [
          { label: 'النحو' },
          { label: 'النصوص والقراءة' },
          { label: 'البلاغة والأدب' },
          { label: 'التعبير والقصة' },
        ],
        checkboxes: ['مذاكرة', 'واجب', 'تطبيق مع المستر', 'امتحان'],
      },
      {
        id: 'ar-lec-4',
        lectureNumber: 4,
        title: 'المحاضرة الرابعة',
        contentItems: [
          { category: 'بلاغة', title: 'التشبيه' },
          { category: 'نصوص', title: 'نص «الأخلاق»' },
          { category: 'تعبير', title: 'الفقرة النقدية' },
          { category: 'قصة', title: 'من روائع الأدب – قصة «حكايات الغريب»' },
          { category: 'نحو', title: 'كان وكاد' },
        ],
        warning: 'فيديوهات تكملة المحاضرة متاحة («القصة والنحو»). فيديوهات النصوص والبلاغة والتعبير مهمة جدًا. تحليل واجب التعبير نزل في المحاضرة 6.',
        checkboxes: ['مذاكرة', 'واجب', 'تطبيق مع المستر', 'امتحان'],
      },
      {
        id: 'ar-lec-5',
        lectureNumber: 5,
        title: 'المحاضرة الخامسة',
        contentItems: [
          { category: 'نحو', title: 'الممنوع من الصرف' },
          { category: 'نصوص', title: 'نص «العلم نور»' },
          { category: 'تعبير', title: 'حوار قصير أو مقابلة مع شخصية – موقف نقدي' },
        ],
        checkboxes: ['مذاكرة', 'واجب', 'تطبيق مع المستر', 'امتحان'],
      },
      {
        id: 'ar-lec-6',
        lectureNumber: 6,
        title: 'المحاضرة السادسة',
        contentItems: [
          { category: 'نطق وإملاء', title: 'همزة القطع وألف الوصل' },
          { category: 'بلاغة', title: 'تابع التشبيه المركب' },
          { category: 'تعبير', title: 'كتابة فقرة تعبّر عن رأي' },
          { category: 'نصوص', title: 'نص «التقنية وصناعة الرأي العام»' },
          { category: 'قصة', title: 'عودة الروح' },
        ],
        warning: 'محاضرة مهمة جدًا وفيها تفاصيل لازم تركز فيها. تحليل واجب التعبير للمحاضرة 4 نزل هنا.',
        checkboxes: ['مذاكرة', 'واجب', 'تطبيق مع المستر', 'امتحان'],
      },
      {
        id: 'ar-lec-7',
        lectureNumber: 7,
        title: 'المحاضرة السابعة',
        contentItems: [
          { category: 'نطق وإملاء', title: 'الهمزة المتوسطة' },
          { category: 'بلاغة', title: 'الإيجاز والإطناب' },
          { category: 'تعبير', title: 'الفقرة الموجَّهة' },
          { category: 'نحو', title: 'إنَّ وأخواتها' },
          { category: 'نصوص', title: 'نص «بين الذوق والعقل»' },
        ],
        warning: 'واجب النحو مش داخل التسليم، وتحليله متاح في ملف تحليل الواجب فقط.',
        checkboxes: ['مذاكرة', 'واجب', 'تطبيق مع المستر', 'امتحان'],
      },
      {
        id: 'ar-lec-8',
        lectureNumber: 8,
        title: 'المحاضرة الثامنة',
        contentItems: [
          { category: 'نحو', title: 'النعت' },
          { category: 'بلاغة', title: 'الاستعارة' },
          { category: 'قصة', title: 'كفاح طيبة' },
        ],
        checkboxes: ['مذاكرة', 'واجب', 'تطبيق مع المستر', 'امتحان'],
      },
    ],
  },
  {
    id: 'history',
    name: 'التاريخ',
    englishName: 'History',
    logoType: 'smart_academy',
    logoText: 'SA SMART ACADEMY',
    subLogoText: 'منصة التاريخ الأولى',
    sticker: 'استوعب الأحداث! 📜',
    patternClass: 'pattern-grid',
    totalLectures: 9,
    subtitleNotice: '📌 فيه 5 مراجعات من آخر درس في الوحدة الأولى لحد رابع درس في الوحدة الثانية',
    notesTitle: 'ملاحظات وتواريخ هامة في التاريخ',
    specialSection: {
      title: 'مراجعات التاريخ (5)',
      description: 'سجّل تفاصيل ونقاط الـ 5 مراجعات من آخر درس بالوحدة 1 حتى رابع درس بالوحدة 2',
      itemsCount: 5,
    },
    lectures: Array.from({ length: 9 }, (_, i) => ({
      id: `hist-lec-${i + 1}`,
      lectureNumber: i + 1,
      title: `المحاضرة ${i + 1}`,
      lines: [
        { label: 'عنوان الدرس' },
        { label: 'أهم النقط' },
      ],
      checkboxes: ['شرح', 'مذاكرة', 'واجب', 'فيديو حل الواجب', 'تريكات', 'مراجعة', 'امتحان'],
    })),
  },
  {
    id: 'programming',
    name: 'البرمجة (بكالوريا)',
    englishName: 'Programming (BAC)',
    logoType: 'code_window',
    logoText: 'BAC DEV',
    subLogoText: '</> CODE WINDOW',
    sticker: 'كود وخلّص! 💻',
    patternClass: 'pattern-checker',
    totalLectures: 8,
    notesTitle: 'ملاحظات الأكواد والخوارزميات',
    lectures: [
      // Chapter 1: 5 lessons
      ...Array.from({ length: 5 }, (_, i) => ({
        id: `prog-ch1-l${i + 1}`,
        chapter: 'Chapter 1',
        lectureNumber: `Lesson ${i + 1}`,
        title: `Chapter 1`,
        lines: [
          { label: 'عنوان الدرس' },
          { label: 'أهم الأكواد / الأفكار' },
        ],
        checkboxes: ['مذاكرة', 'واجب', 'تطبيق'],
      })),
      // Chapter 2: 3 lessons
      ...Array.from({ length: 3 }, (_, i) => ({
        id: `prog-ch2-l${i + 1}`,
        chapter: 'Chapter 2',
        lectureNumber: `Lesson ${i + 1}`,
        title: `Chapter 2`,
        lines: [
          { label: 'عنوان الدرس' },
          { label: 'أهم الأكواد / الأفكار' },
        ],
        checkboxes: ['مذاكرة', 'واجب', 'تطبيق'],
      })),

    ],
  },
];

/**
 * Calculates completion percentage for a given set of checked box IDs
 */
export function calculateProgress(
  checkedKeys: Set<string>,
  allCheckboxes: { id: string }[]
): { completed: number; total: number; percentage: number } {
  const total = allCheckboxes.length;
  if (total === 0) return { completed: 0, total: 0, percentage: 0 };
  let completed = 0;
  for (const item of allCheckboxes) {
    if (checkedKeys.has(item.id)) {
      completed++;
    }
  }
  const percentage = Math.round((completed / total) * 100);
  return { completed, total, percentage };
}

/**
 * Generates all checkbox keys for a subject
 */
export function getAllCheckboxesForSubject(subject: SubjectData): { id: string; label: string }[] {
  const result: { id: string; label: string }[] = [];
  subject.lectures.forEach((lecture) => {
    lecture.checkboxes.forEach((cb) => {
      result.push({
        id: `${lecture.id}_${cb}`,
        label: cb,
      });
    });
  });
  return result;
}

/**
 * Counts total checkboxes across all subjects
 */
export function getTotalCheckboxesCount(subjects: SubjectData[]): number {
  return subjects.reduce((acc, sub) => {
    return acc + sub.lectures.reduce((lAcc, lec) => lAcc + lec.checkboxes.length, 0);
  }, 0);
}

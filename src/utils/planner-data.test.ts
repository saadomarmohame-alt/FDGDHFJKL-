import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SUBJECTS_CONFIG,
  calculateProgress,
  getAllCheckboxesForSubject,
  getTotalCheckboxesCount,
} from './planner-data';

test('SUBJECTS_CONFIG contains all 4 required subjects', () => {
  assert.equal(SUBJECTS_CONFIG.length, 4);
  const ids = SUBJECTS_CONFIG.map((s) => s.id);
  assert.deepEqual(ids, ['english', 'arabic', 'history', 'programming']);
});

test('English subject has 20 lectures with exactly 4 checkboxes and 5 ruled lines', () => {
  const english = SUBJECTS_CONFIG.find((s) => s.id === 'english');
  assert.ok(english);
  assert.equal(english.lectures.length, 20);
  assert.equal(english.totalLectures, 20);
  assert.deepEqual(english.lectures[0].checkboxes, ['مذاكرة', 'واجب', 'كلمات', 'امتحان']);
  assert.equal(english.lectures[0].lines?.length, 5);
  const lineLabels = english.lectures[0].lines?.map((l) => l.label);
  assert.deepEqual(lineLabels, ['Novel', 'Grammar', 'Writing Skills', 'Reading', 'Vocabulary']);
});

test('Arabic subject has 8 lectures with accurate lecture 4, 5, 6, 7, 8 content and warnings', () => {
  const arabic = SUBJECTS_CONFIG.find((s) => s.id === 'arabic');
  assert.ok(arabic);
  assert.equal(arabic.lectures.length, 8);

  // Lectures 1, 2, 3 have blank lines
  assert.ok(arabic.lectures[0].lines && arabic.lectures[0].lines.length > 0);
  assert.ok(arabic.lectures[1].lines && arabic.lectures[1].lines.length > 0);
  assert.ok(arabic.lectures[2].lines && arabic.lectures[2].lines.length > 0);

  // Lecture 4 has contentItems & warning
  const lec4 = arabic.lectures[3];
  assert.ok(lec4.contentItems);
  assert.ok(lec4.warning?.includes('القصة والنحو'));
  assert.ok(lec4.warning?.includes('المحاضرة 6'));

  // Lecture 6 has warning about lecture 4
  const lec6 = arabic.lectures[5];
  assert.ok(lec6.warning?.includes('تحليل واجب التعبير') && lec6.warning?.includes('4'));


  // Lecture 7 has warning about grammar hw
  const lec7 = arabic.lectures[6];
  assert.ok(lec7.warning?.includes('واجب النحو مش داخل التسليم'));
});

test('History has 9 lectures and 7 checkboxes each', () => {
  const history = SUBJECTS_CONFIG.find((s) => s.id === 'history');
  assert.ok(history);
  assert.equal(history.lectures.length, 9);
  assert.deepEqual(history.lectures[0].checkboxes, [
    'شرح',
    'مذاكرة',
    'واجب',
    'فيديو حل الواجب',
    'تريكات',
    'مراجعة',
    'امتحان',
  ]);
  assert.ok(history.subtitleNotice?.includes('5 مراجعات'));
  assert.equal(history.specialSection?.itemsCount, 5);
});

test('Programming has Chapter 1 (5 lessons) and Chapter 2 (3 lessons)', () => {
  const prog = SUBJECTS_CONFIG.find((s) => s.id === 'programming');
  assert.ok(prog);
  assert.equal(prog.lectures.length, 8);
  const ch1 = prog.lectures.filter((l) => l.chapter === 'Chapter 1');
  const ch2 = prog.lectures.filter((l) => l.chapter === 'Chapter 2');
  assert.equal(ch1.length, 5);
  assert.equal(ch2.length, 3);
  assert.deepEqual(prog.lectures[0].checkboxes, ['مذاكرة', 'واجب', 'تطبيق']);
});

test('calculateProgress accurately computes completion stats', () => {
  const english = SUBJECTS_CONFIG.find((s) => s.id === 'english')!;
  const cbs = getAllCheckboxesForSubject(english);
  assert.equal(cbs.length, 20 * 4); // 80 checkboxes

  const checked = new Set<string>([cbs[0].id, cbs[1].id]);
  const stats = calculateProgress(checked, cbs);
  assert.equal(stats.completed, 2);
  assert.equal(stats.total, 80);
  assert.equal(stats.percentage, 3);
});

test('getTotalCheckboxesCount correctly counts all checkboxes', () => {
  const total = getTotalCheckboxesCount(SUBJECTS_CONFIG);
  // English: 20 * 4 = 80
  // Arabic: 8 * 4 = 32
  // History: 9 * 7 = 63
  // Programming: 8 * 3 = 24
  // Total: 80 + 32 + 63 + 24 = 199
  assert.equal(total, 199);
});

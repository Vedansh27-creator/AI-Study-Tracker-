export interface SubjectOption {
  label: string;
  value: string;
}

export interface SubjectCategory {
  name: string;
  subparts: SubjectOption[];
}

// Independent subjects: Standalone, NO optgroup, NO list wrapper!
export const INDEPENDENT_SUBJECTS: SubjectOption[] = [
  { label: 'Mathematics', value: 'Mathematics' },
  { label: 'Computer Science', value: 'Computer Science' },
];

// Grouped subjects: Has main heading and subparts in optgroups
export const GROUPED_SUBJECTS: SubjectCategory[] = [
  {
    name: 'Science',
    subparts: [
      { label: 'Science: Physics', value: 'Science - Physics' },
      { label: 'Science: Chemistry', value: 'Science - Chemistry' },
      { label: 'Science: Biology', value: 'Science - Biology' },
    ],
  },
  {
    name: 'English',
    subparts: [
      { label: 'English: Literature', value: 'English - Literature' },
      { label: 'English: Grammar', value: 'English - Grammar' },
    ],
  },
  {
    name: 'Hindi',
    subparts: [
      { label: 'Hindi: Literature', value: 'Hindi - Literature' },
      { label: 'Hindi: Grammar', value: 'Hindi - Grammar' },
    ],
  },
  {
    name: 'Social Science',
    subparts: [
      { label: 'Social Science: History', value: 'Social Science - History' },
      { label: 'Social Science: Political Science', value: 'Social Science - Political Science' },
      { label: 'Social Science: Economics', value: 'Social Science - Economics' },
      { label: 'Social Science: Geography', value: 'Social Science - Geography' },
    ],
  },
];

// Flat list helper for quick lookup
export const ALL_SUBJECT_OPTIONS: SubjectOption[] = [
  ...INDEPENDENT_SUBJECTS,
  ...GROUPED_SUBJECTS.flatMap((g) => g.subparts),
];


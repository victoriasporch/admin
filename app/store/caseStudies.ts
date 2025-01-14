import { create } from 'zustand';

export interface CaseStudyType {
  id: string;
  title: string;
  image: string;
  description: string;
  tag: string;
  content: string;
}

interface CaseStudyStore {
  caseStudies: CaseStudyType[];
  setCaseStudies: (list: CaseStudyType[]) => void;
  caseStudiesLoading: boolean;
  setCaseStudyLoading: (loading: boolean) => void;
}

export const useCaseStudy = create<CaseStudyStore>()((set) => ({
  caseStudies: [],
  setCaseStudies: (caseStudies: CaseStudyType[]) =>
    set({ caseStudies: caseStudies }),

  caseStudiesLoading: false,
  setCaseStudyLoading: (caseStudyLoading: boolean) =>
    set({ caseStudiesLoading: caseStudyLoading }),
}));

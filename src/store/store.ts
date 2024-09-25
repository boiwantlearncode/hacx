import { createStore } from 'zustand/vanilla'

export type pdfInfo = {
  title: string,
  owner: string,
  shared_with: Array<string>,
  content: string
}

export type PDFState = {
  // text: string,
  workingPDF: pdfInfo,
  loading: boolean,
  completed: boolean
  imageLoading: boolean,
  imagePrompt: string,
  savedPDFs: Array<pdfInfo>
}

export type PDFActions = {
  // setText: (newText: string) => void
  setWorkingPDF: (updates: Partial<pdfInfo>) => void;
  setLoading: (newLoading: boolean) => void
  setCompleted: (newCompleted: boolean) => void
  setImageLoading: (newLoading: boolean) => void
  setImagePrompt: (imagePrompt: string) => void
  setSavedPDFs: (savedPDFs: Array<pdfInfo>) => void
}

export type PDFStore = PDFState & PDFActions

export const defaultInitState: PDFState = {
  // text: '',
  workingPDF: { title: '', owner: '', shared_with: [], content: '' },
  loading: false,
  completed: false,
  imageLoading: false,
  imagePrompt: '',
  savedPDFs: [
    { title: "PDF 1", owner: "janedoe@gmail.com", shared_with: ["userB@example.com", "userC@example.com"], content: "Hello!" },
    { title: "PDF 2", owner: "janedoe@gmail.com", shared_with: ["userD@example.com"], content: "World!" },
    { title: "PDF 3", owner: "userB@example.com", shared_with: ["janedoe@gmail.com"], content: "Hello, World!" }
  ]
}

export const createPDFStore = (
  initState: PDFState = defaultInitState,
) => {
  return createStore<PDFStore>()((set) => ({
    ...initState,
    // setText: (newText) => set(() => ({ text: newText })),
    setWorkingPDF: (updates: Partial<pdfInfo>) => {
      set((state) => ({
        workingPDF: {
          ...state.workingPDF, // Keep previous state
          ...updates,          // Apply updates to any fields
        },
      }));
    },
    setLoading: (newLoading) => set(() => ({ loading: newLoading })),
    setCompleted: (newCompleted) => set(() => ({ completed: newCompleted })),
    setImageLoading: (newImageLoading) => set(() => ({ imageLoading: newImageLoading })),
    setImagePrompt: (newImagePrompt) => set(() => ({ imagePrompt: newImagePrompt })),
    setSavedPDFs: (newSavedPDFs) => set(() => ({ savedPDFs: newSavedPDFs })),
  }))
}

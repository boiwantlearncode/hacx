import { createStore } from 'zustand/vanilla'

export type PDFState = {
  text: string,
  loading: boolean,
  completed: boolean
  imageLoading: boolean,
  imagePrompt: string
}

export type PDFActions = {
  setText: (newText: string) => void
  setLoading: (newLoading: boolean) => void
  setCompleted: (newCompleted: boolean) => void
  setImageLoading: (newLoading: boolean) => void
  setImagePrompt: (imagePrompt: string) => void
}

export type PDFStore = PDFState & PDFActions

export const defaultInitState: PDFState = {
  text: '',
  loading: false,
  completed: false,
  imageLoading: false,
  imagePrompt: ''
}

export const createPDFStore = (
  initState: PDFState = defaultInitState,
) => {
  return createStore<PDFStore>()((set) => ({
    ...initState,
    setText: (newText) => set(() => ({ text: newText })),
    setLoading: (newLoading) => set(() => ({ loading: newLoading })),
    setCompleted: (newCompleted) => set(() => ({ completed: newCompleted })),
    setImageLoading: (newImageLoading) => set(() => ({ imageLoading: newImageLoading })),
    setImagePrompt: (newImagePrompt) => set(() => ({ imagePrompt: newImagePrompt })),
  }))
}

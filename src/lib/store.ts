import { create } from 'zustand'

// const usePDFStore = create<PDFState>()((set) => ({
//   text: '',
//   setText: (newText) => set(() => ({ text: newText })),
// }))

// src/stores/counter-store.ts
import { createStore } from 'zustand/vanilla'

export type PDFState = {
  text: string,
  loading: boolean,
  completed: boolean
}

export type PDFActions = {
  setText: (newText: string) => void
  setLoading: (newLoading: boolean) => void
  setCompleted: (newCompleted: boolean) => void
}

export type PDFStore = PDFState & PDFActions

export const defaultInitState: PDFState = {
  text: '',
  loading: false,
  completed: false
}

export const createPDFStore = (
  initState: PDFState = defaultInitState,
) => {
  return createStore<PDFStore>()((set) => ({
    ...initState,
    setText: (newText) => set(() => ({ text: newText })),
    setLoading: (newLoading) => set(() => ({ loading: newLoading })),
    setCompleted: (newCompleted) => set(() => ({ completed: newCompleted })),
  }))
}

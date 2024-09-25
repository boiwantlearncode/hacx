'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type PDFStore, createPDFStore } from '@/store/store'

export type PDFStoreApi = ReturnType<typeof createPDFStore>

export const PDFStoreContext = createContext<PDFStoreApi | undefined>(
  undefined,
)

export interface PDFStoreProviderProps {
  children: ReactNode
}

export const PDFStoreProvider = ({
  children,
}: PDFStoreProviderProps) => {
  const storeRef = useRef<PDFStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createPDFStore()
  }

  return (
    <PDFStoreContext.Provider value={storeRef.current}>
      {children}
    </PDFStoreContext.Provider>
  )
}

export const usePDFStore = <T,>(
  selector: (store: PDFStore) => T,
): T => {
  const pdfStoreContext = useContext(PDFStoreContext)

  if (!pdfStoreContext) {
    throw new Error(`usePDFStore must be used within PDFStoreProvider`)
  }

  return useStore(pdfStoreContext, selector)
}

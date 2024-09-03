import React, { useEffect, useRef } from 'react';

import type { Template } from '@pdfme/common';
import { BLANK_PDF } from '@pdfme/common';
import { Designer } from '@pdfme/ui';

// Max width: 210 mm
// Max height: 297 mm
const template: Template = {
  basePdf: BLANK_PDF,
  schemas: [
    {
      "title": {
          type: 'text',
          position: { x: 0, y: 50 },
          width: 210.7,
          height: 24,
          fontSize: 24,
          content: 'Preventive Drug Education Toolkit',
      },
      "subtitle": {
          type: 'text',
          position: { x: 0, y: 100 },
          width: 200,
          height: 20,
          fontSize: 16,
          content: 'The Essentials to Help You Champion A Drug-Free Singapore'
      },
      "sectionTitle": {
          type: 'text',
          position: { x: 0, y: 150 },
          width: 200,
          height: 20,
          fontSize: 18,
          content: 'Why Singapore is Tough on Drugs'
      },
      "content": {
          type: 'text',
          position: { x: 50, y: 180 },
          width: 500,
          height: 300,
          fontSize: 12,
      },
      "footer": {
          type: 'text',
          position: { x: 50, y: 750 },
          width: 500,
          height: 20,
          fontSize: 10,
      }
    }
  ]
};

export default function PDFEditor() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // const domContainer = document.getElementById("pdfme-container") as HTMLElement;

    if (mainRef.current) {
      const domContainer  = mainRef.current as HTMLElement;
      const designer = new Designer({
        template,
        domContainer
      });
    }
  }, []);

  return (
    <main ref={mainRef} id="pdfme-container" className="w-full space-y-8 bg-background rounded-lg"></main>
  )
}
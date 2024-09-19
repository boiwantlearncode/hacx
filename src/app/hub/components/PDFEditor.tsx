import React, { useEffect, useRef, useState } from 'react';

import type { Template } from '@pdfme/common';
import { BLANK_PDF } from '@pdfme/common';
import { Designer } from '@pdfme/ui';

import { usePDFStore } from '@/providers/pdf-store-provider';

// Max width: 210 mm
// Max height: 297 mm


export default function PDFEditor() {
  const pdfRef = useRef<HTMLDivElement>(null);
  const { text, setText, loading, setLoading, completed, setCompleted } = usePDFStore(
    (state) => state,
  )

  useEffect(() => {
    const objContent: { [key: string]: string } = JSON.parse(JSON.parse(text.replace(/```json|```/g, '').trim()));
    console.log("Keys: ", Object.keys(objContent));
    const template: Template = {
      basePdf: BLANK_PDF,
      schemas: [
        {
          "title": {
              type: 'text',
              position: { x: 0, y: 10 },
              width: 210,
              height: 24,
              fontSize: 24,
              content: objContent["Title"]
          },
          "introduction": {
              type: 'text',
              position: { x: 0, y: 30 },
              width: 210,
              height: 12,
              fontSize: 12,
              content: objContent["Introduction"]
          },
          "sectionTitle1": {
              type: 'text',
              position: { x: 0, y: 50 },
              width: 210,
              height: 18,
              fontSize: 18,
              content: objContent["SectionTitle1"]
          },
          "sectionContent1": {
              type: 'text',
              position: { x: 0, y: 60 },
              width: 210,
              height: 12,
              fontSize: 12,
              content: objContent["SectionContent1"]
          },
          "sectionTitle2": {
              type: 'text',
              position: { x: 0, y: 90 },
              width: 210,
              height: 18,
              fontSize: 18,
              content: objContent["SectionTitle2"]
          },
          "sectionContent2": {
              type: 'text',
              position: { x: 0, y: 100 },
              width: 210,
              height: 12,
              fontSize: 12,
              content: objContent["SectionContent2"]
          },
          "conclusion": {
              type: 'text',
              position: { x: 0, y: 240 },
              width: 210,
              height: 12,
              fontSize: 12,
              content: objContent["Conclusion"]
          },
          "footer": {
              type: 'text',
              position: { x: 0, y: 270 },
              width: 210,
              height: 20,
              fontSize: 10,
              content: 'Made with love by the HACX group.'
          }
        }
      ]
    };
    if (pdfRef.current) {
      const domContainer  = pdfRef.current as HTMLElement;
      console.log("Instantiate designer again");
      const designer = new Designer({
        template,
        domContainer
      });
    }
/*     setTemplate((prevTemplate) => ({
      ...prevTemplate,
      schemas: [
        {
          ...prevTemplate.schemas[0],
          content: {
            ...prevTemplate.schemas[0].content,
            content: text, // Update the content with the new text
          }
        }
      ]
    }));
    console.log(template.schemas[0].content);

    if (pdfRef.current) {
      const domContainer  = pdfRef.current as HTMLElement;
      console.log("Instantiate designer again");
      const designer = new Designer({
        template,
        domContainer
      });
    } */
  }, [text]);

  return (
    <main className="w-full space-y-8 bg-background rounded-lg">
      {loading && <h2 className='text-center'>Generating PDF, please wait...</h2>}
      {completed && <h2 className='text-green-500 text-center'>PDF Generated!</h2>}
      <div ref={pdfRef}></div>
    </main>
  )
}


/* 
Previous schema
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
        position: { x: 0, y: 200 },
        width: 200,
        height: 20,
        fontSize: 12,
        content: text
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
}); */
import type { pdfInfo } from '@/store/store';
import React from 'react';

// interface PDF {
//   title: string;
//   owner: string;
//   shared_with: string[];
// }

interface CanvaHomepageProps {
  userPdfs: pdfInfo[];
  sharedPdfs: pdfInfo[];
  onPdfClick: (pdf: pdfInfo) => void; // Add the click handler prop
}

const CanvaHomepage: React.FC<CanvaHomepageProps> = ({ userPdfs, sharedPdfs, onPdfClick }) => {
    const noPdfs = userPdfs.length === 0 && sharedPdfs.length === 0;
    if (noPdfs) {
      return (
        <div className="canva-homepage p-6 max-w-4xl mx-auto font-sans">
          <p className="text-2xl font-bold mb-4 text-gray-800">You have no saved PDFs.</p>
        </div>
      );
    }

  return (
    <div className="canva-homepage p-6 w-full font-sans flex flex-col items-start justify-start">
      {userPdfs.length > 0 && (
        <>
          <h1 className="text-xl font-bold mb-4 text-gray-800">Your saved PDFs</h1>
          <ul className="space-y-4">
            {userPdfs.map((pdf, index) => (
              <li 
                key={index} 
                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer transition duration-300"
                onClick={() => onPdfClick(pdf)}
              >
                <h2 className="text-l font-semibold text-blue-600">{pdf.title}</h2>
                <p className="text-gray-900 text-sm">Shared with: <em className='font-light text-gray-600'>{pdf.shared_with.join(", ") || "No one"}</em></p>
              </li>
            ))}
          </ul>
        </>
      )}
      {sharedPdfs.length > 0 && (
        <>
          <h1 className="text-xl font-bold mt-8 mb-4 text-gray-800">Shared with You</h1>
          <ul className="space-y-4">
            {sharedPdfs.map((pdf, index) => (
              <li 
                key={index} 
                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer transition duration-300"
                onClick={() => onPdfClick(pdf)}
              >
                <h2 className="text-l font-semibold text-blue-600">{pdf.title}</h2>
                <p className="text-gray-900 text-sm">Owner: <em className='font-light text-gray-600'>{pdf.owner}</em></p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default CanvaHomepage;
import React from 'react';

interface PDF {
  title: string;
  owner: string;
  shared_with: string[];
}

interface CanvaHomepageProps {
  userPdfs: PDF[];
  sharedPdfs: PDF[];
  onPdfClick: () => void; // Add the click handler prop
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
    <div className="canva-homepage p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Your saved PDFs</h1>
      <ul className="space-y-4">
        {userPdfs.map((pdf, index) => (
          <li 
            key={index} 
            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer transition duration-300"
            onClick={onPdfClick}
          >
            <h2 className="text-xl font-semibold text-blue-600">{pdf.title}</h2>
            <p className="text-gray-600">Owner: {pdf.owner}</p>
            <p className="text-gray-600">Shared with: {pdf.shared_with.join(", ") || "No one"}</p>
          </li>
        ))}
      </ul>
      <h1 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Shared with You</h1>
      <ul className="space-y-4">
        {sharedPdfs.map((pdf, index) => (
          <li 
            key={index} 
            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer transition duration-300"
            onClick={onPdfClick}
          >
            <h2 className="text-xl font-semibold text-blue-600">{pdf.title}</h2>
            <p className="text-gray-600">Owner: {pdf.owner}</p>
            <p className="text-gray-600">Shared with: {pdf.shared_with.join(", ") || "No one"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CanvaHomepage;
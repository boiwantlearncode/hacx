import { useState } from 'react';
import { useUser } from '../../context/userContext'; // Import the useUser hook
import CanvaHomepage from './components/CanvaHomepage';
import TinyEditor from './components/TinyEditor';
import { usePDFStore } from '@/providers/pdf-store-provider';
import type { pdfInfo } from '@/store/store';

export default function EditForm() {
  const { 
    workingPDF, setWorkingPDF,
    savedPDFs, setSavedPDFs
  } = usePDFStore(
    (state) => state,
  )

  const { username } = useUser(); // Get the current user's email
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const userPdfs = savedPDFs.filter(pdf => pdf.owner === username);
  const sharedPdfs = savedPDFs.filter(pdf => pdf.shared_with.includes(username));

  const handlePdfClick = (pdf: pdfInfo) => {
    setWorkingPDF(pdf);
    setIsEditing(true);
  };

  const handleBackClick = () => {
    setIsEditing(false);
  };

  return (
    <main className="flex flex-col w-full items-center">
      {!isEditing && (
        <CanvaHomepage 
          userPdfs={userPdfs} 
          sharedPdfs={sharedPdfs} 
          onPdfClick={handlePdfClick} 
        />
      )}
      {isEditing && (
        <>          
          <button 
          onClick={handleBackClick} 
          className="mb-8 mt-4 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
          >
          Back
          </button>
        </>
      )}
      <TinyEditor />
      
    </main>
  )
}
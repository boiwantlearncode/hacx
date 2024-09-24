import { useState } from 'react';
import { useUser } from '../../context/userContext'; // Import the useUser hook
import CanvaHomepage from './components/CanvaHomepage';
import TinyEditor from './components/TinyEditor';

export default function EditForm() {
  const { username } = useUser(); // Get the current user's email
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [pdfs, setPdfs] = useState([
    { title: "PDF 1", owner: "janedoe@gmail.com", shared_with: ["userB@example.com", "userC@example.com"] },
    { title: "PDF 2", owner: "janedoe@gmail.com", shared_with: ["userD@example.com"] },
    { title: "PDF 3", owner: "userB@example.com", shared_with: ["janedoe@gmail.com"] }
  ]);

  const userPdfs = pdfs.filter(pdf => pdf.owner === username);
  const sharedPdfs = pdfs.filter(pdf => pdf.shared_with.includes(username));

  const handlePdfClick = () => {
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
          <TinyEditor />
        </>
      )}
      
    </main>
  )
}
import React, { useCallback, useState, ChangeEvent, DragEvent } from 'react';

/**
 * Props for FileDrop component.
 * @property {Function} handleFileChange - Callback function to handle the file selected by the user.
 */
interface FileDropProps {
  handleFileChange: (file: File) => void; // Define the type for handleFileChange
}

/**
 * Component providing a drag-and-drop area for file uploads,
 * as well as the ability to click to open the file selector.
 * 
 * @param {FileDropProps} props - The props for the component.
 * @returns {React.ReactElement} - The React element for the file drop component.
 */
const FileDrop = ({ handleFileChange }: FileDropProps) => {
  const [dragActive, setDragActive] = useState(false);

  // Handles the drag events to set active state
  const handleDrag = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  // Handles the drop event and retrieves the file
  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, [handleFileChange]);

  // Handles changes in the hidden file input
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  }, [handleFileChange]);

  return (
    <div 
      onDragEnter={handleDrag} 
      onDragLeave={handleDrag} 
      onDragOver={handleDrag} 
      onDrop={handleDrop} 
      className={`p-6 border-2 border-dashed ${dragActive ? 'border-pink-500' : 'border-pink-400'}`}
    >
      <input type="file" onChange={handleChange} className="hidden" />
      <p className="text-center text-white">
        Drag and drop your resume here, or&nbsp;
        <span 
          className="text-pink-500 underline cursor-pointer"
          onClick={() => {
            const fileInput = document.querySelector<HTMLInputElement>('[type="file"]');
            if (fileInput) {
              fileInput.click();
            }
          }}
        >
          click to select
        </span>
      </p>
    </div>
  );
};

export default FileDrop;

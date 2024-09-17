import React, { useState } from 'react';
import { uploadFile } from '../services/fileService';

interface FileUploadProps {
  onFileUploaded: (fileUrl: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUploaded }) => {
  const [isUploading, setIsUploading] = useState(false);

  // HUMAN ASSISTANCE NEEDED
  // The following function has a confidence level of 0.7 and may need review
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadResult = await uploadFile(file);
      onFileUploaded(uploadResult.fileUrl);
    } catch (error) {
      console.error('File upload failed:', error);
      // TODO: Add error handling, possibly show an error message to the user
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      {isUploading && <p>Uploading...</p>}
    </div>
  );
};

export default FileUpload;
import { useCallback } from 'react';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  loading: boolean;
  hasData?: boolean;
  onClearData?: () => void;
}

export const FileUploader = ({ onFileUpload, loading, hasData, onClearData }: FileUploaderProps) => {
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  return (
    <div className="file-uploader">
      <label htmlFor="m3u-upload" className="upload-label">
        {loading ? 'Processing...' : hasData ? 'Upload New M3U File' : 'Upload M3U File'}
      </label>
      <input
        id="m3u-upload"
        type="file"
        accept=".m3u,.m3u8"
        onChange={handleFileChange}
        disabled={loading}
      />
      {hasData && onClearData && (
        <button 
          onClick={onClearData}
          className="clear-data-button"
          type="button"
        >
          Clear Saved Data
        </button>
      )}
      <p className="file-uploader-hint">Supported formats: .m3u, .m3u8</p>
    </div>
  );
};
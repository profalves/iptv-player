import { useCallback } from 'react';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  loading: boolean;
}

export const FileUploader = ({ onFileUpload, loading }: FileUploaderProps) => {
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
        {loading ? 'Processing...' : 'Upload M3U File'}
      </label>
      <input
        id="m3u-upload"
        type="file"
        accept=".m3u,.m3u8"
        onChange={handleFileChange}
        disabled={loading}
      />
      <p className="file-uploader-hint">Supported formats: .m3u, .m3u8</p>
    </div>
  );
};
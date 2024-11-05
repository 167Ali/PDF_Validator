import React, { useState } from 'react';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadFile, setDownloadFile] = useState(null);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDownload = async () => {
    if (!selectedFile) return;

    const fileReader = new FileReader();
    fileReader.onload = async (event) => {
      const pdfDoc = new Blob([event.target.result], { type: 'application/pdf' });
      const url = URL.createObjectURL(pdfDoc);
      setDownloadFile(url);
      const a = document.createElement('a');
      a.href = url;
      a.download = selectedFile.name.replace('.pdf', ' copy.pdf');
      a.click();
      setIsDownloaded(true);
    };
    fileReader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div className="container mx-auto p-4 pt-6 mt-10">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {selectedFile && (
        <button
          onClick={handleDownload}
          className="mt-4 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700"
        >
          Download Copy and Discard Original
        </button>
      )}
      {isDownloaded && (
        <p className="mt-4 text-lg font-bold text-green-500">
          Original file has been discarded and a copy has been downloaded successfully!
        </p>
      )}
    </div>
  );
};

export default App;

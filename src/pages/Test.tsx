import React, { useState, useRef } from 'react';
import readXlsxFile from 'read-excel-file';

interface JsonObject {
  [key: string]: any;
}

const App: React.FC = () => {
  const [jsonData, setJsonData] = useState<JsonObject[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      readXlsxFile(file).then((rows) => {
        if (rows.length > 0) {
          const headers = rows[0];
          const data = rows.slice(1).map((row) => {
            const obj: JsonObject = {};
            headers.forEach((header, index) => {
              console.log(header, index)
              //@ts-ignore
              obj[header] = row[index];
            });
            return obj;
          });
          setJsonData(data);
        }
      }).catch(error => {
        console.error('Error reading the file:', error);
        alert('Error reading the file');
      });
    } else {
      alert('Please upload a valid .xlsx file');
    }
  };

  
  return (
    <div className="App">
      <h1>Upload and Parse XLSX to JSON</h1>
      <input type="file" accept=".xlsx" ref={fileInputRef} onChange={handleFileChange} />
      {jsonData && (
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;

import { Button } from '@/components/ui/button';
import { firestore } from '@/firebase';
import { useAuth } from '@/lib/auth-provider';
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import React, { useState, useRef } from 'react';
import readXlsxFile from 'read-excel-file';

interface JsonObject {
  [key: string]: any;
}

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = () => {
    setLoading(true)
    const file = fileInputRef.current?.files?.[0];
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      readXlsxFile(file).then((rows) => {
        if (rows.length > 0) {
          const headers = rows[0];
          const data = rows.slice(1).map((row) => {
            const obj: JsonObject = {};
            headers.forEach((header, index) => {
              console.log(header, row[index])
              //@ts-ignore
              obj[header] = row[index];
            });
            return obj;
          });
          try {
            data.forEach(async (student) => {
              const docRef = doc(firestore, "TestCollection", student.RollNo)
              await setDoc(docRef, {
                Name:student.Name,
                Password:student.Password,
                emailId:student.EmailId,
                created_timestamp: Timestamp.now(),
                mobileNumber:student.PhoneNo.toString()
              }, { merge: true }); // Use merge: true to update existing fields
              console.log("Document written with ID: ", docRef.id);
              setLoading(false)
            });
          } catch (e) {
            console.error("Error adding document: ", e);
            setLoading(false)
          }
        }
      }).catch(error => {
        console.error('Error reading the file:', error);
        setLoading(false)
        alert('Error reading the file');
      });
    } else {
      alert('Please upload a valid .xlsx file');
      setLoading(false)
    }
  };
  
  return (
    <div className="App">
      <h1>Upload and Parse XLSX to JSON</h1>
      <input type="file" disabled={loading} accept=".xlsx" ref={fileInputRef} onChange={handleFileChange} />
    </div>
  );
}

export default App;

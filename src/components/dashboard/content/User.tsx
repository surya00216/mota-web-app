import { Button } from "@/components/ui/button"
import { storage } from '@/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { firestore } from '@/firebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { useState, useRef } from 'react';
import readXlsxFile from 'read-excel-file';
import toast from "react-hot-toast";

interface JsonObject {
  [key: string]: any;
}

const User = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFile = async () => {
    setLoading(true);
    setError(null);

    try {
      // Reference to the file in Firebase Storage
      const fileRef = ref(storage, 'gs://mota-318ad.appspot.com/Students.xlsx');
      // Get the download URL
      const url = await getDownloadURL(fileRef);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Students.xlsx'; // Set the file name for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("File Downloaded successfully", {position:"top-center"})
    } catch (err) {
      console.error("Error fetching file:", err);
      toast.error(`Error fetching file ${error}`, {position:"top-center"})
      setError("Failed to fetch file.");
      setLoading(false)
    } finally {
      setLoading(false);
    }
  };
  const handleStudentUpload = () => {
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
            });
            toast.success("File uploaded successfully", {position:"top-center"})
            fileInputRef.current?.files == null
            setLoading(false)
          } catch (e) {
            console.error("Error adding document: ", e);
            toast.error(`Error adding document ${error}`, {position:"top-center"})
            setLoading(false)
          }
        }
      }).catch(error => {
        console.error('Error reading the file:', error);
        toast.error(`Error reading the file ${error}`, {position:"top-center"})
        setLoading(false)
      });
    } else {
      toast.error(`Please provide a valid .xlsx file`, {position:"top-center"})
      setLoading(false)
    }
  };
  return (
    <div className=''>
        <h1 className='font-bold text-2xl'>Upload Excel File of Student List</h1>

        <div className="flex flex-col w-1/2">
            <h2 className="font-semibold my-4">Download a excel format for uploading student data</h2>
            <Button disabled={loading} onClick={fetchFile}>
              Download Template File
            </Button>
            {error && <p className="mt-2 text-red-500">{error}</p>}
            <input type="file" accept=".xlsx" ref={fileInputRef} className='my-4 border p-2 rounded'/>
            <Button disabled={loading} onClick={handleStudentUpload}>Upload Student List</Button>
        </div>
    </div>
  )
}

export default User
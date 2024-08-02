import { Button } from "@/components/ui/button"
import { storage } from '@/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { useEffect, useState } from "react"

const User = () => {
  const [downloadUrl, setDownloadUrl] = useState<string|null>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFile = async () => {
    setLoading(true);
    setError(null);

    try {
      // Reference to the file in Firebase Storage
      const fileRef = ref(storage, 'gs://mota-318ad.appspot.com/Students.xlsx');
      // Get the download URL
      const url = await getDownloadURL(fileRef);
      setDownloadUrl(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Students.xlsx'; // Set the file name for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error fetching file:", err);
      setError("Failed to fetch file.");
    } finally {
      setLoading(false);
    }
  };
  // useEffect(()=>{
  //   fetchFile()
  // },[])
  return (
    <div className=''>
        <h1 className='font-bold text-2xl'>Upload Excel File of Student List</h1>

        <div className="flex flex-col w-1/2">
            <h2 className="font-semibold my-4">Download a excel format for uploading student data</h2>
            <Button onClick={fetchFile}>
              Download Template File
            </Button>
            {error && <p className="mt-2 text-red-500">{error}</p>}
            <input type="file" className='my-4 border p-2 rounded'/>
            <Button>Upload File (Student List)</Button>
        </div>
    </div>
  )
}

export default User
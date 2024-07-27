import { Button } from "@/components/ui/button"

const User = () => {
  return (
    <div className=''>
        <h1 className='font-bold text-2xl'>Upload Excel File of Student List</h1>

        <div className="flex flex-col w-1/2">
            <h2 className="font-semibold my-4">Download a excel format for uploading student data</h2>
            <Button>Download (Template File)</Button>
            <input type="file" className='my-4 border p-2 rounded'/>
            <Button>Upload File (Student List)</Button>
        </div>
    </div>
  )
}

export default User
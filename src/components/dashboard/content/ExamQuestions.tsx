import { Button } from "@/components/ui/button"
import Dropdown from "../components/Dropdown"
import ExamInput from "../components/ExamInput"

const ExamQuestions = () => {
  const handleUpload = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    console.log("File uploaded")
  }
  return (
    <div className="flex flex-col w-1/2 ">
      <form action="">
        <Dropdown 
          question={"Which year of Degree or Masters?"} 
          options={["First Year","Second Year","Third Year","Fourth Year"]}
        />
        <Dropdown 
          question={"Which Course of Degree or Masters?"} 
          options={["Computer Science","Data Science","Information Technology","Business Management Studies"]}
        />
        <Dropdown 
          question={"Which Graduation ?"} 
          options={["Under Graduation","Post Graduation"]}
        />
        <Dropdown 
          question={"Which Semester of Degree or Masters?"} 
          options={["Semester I","Semester II","Semester III","Semester IV","Semester V","Semester VI","Semester VII","Semester VIII",]}
        />
        <ExamInput 
            question={"Which Academic Year of Degree or Master?(2023 to 2024-2324)"} 
            type={"number"} 
            placeholder={"Enter Academic Year"}/>
        <ExamInput 
            question={'Which Subject of Degree or Master?("Python")'} 
            type={"text"} 
            placeholder={"Enter Subject"}/>
        <ExamInput 
            question={"Write a instruction for exam."} 
            type={"text"} 
            placeholder={"Enter Instruction"}/>
        <ExamInput
            accept=".xlsx, .xls"
            question={"Upload excel file of Questions."} 
            type={"file"} 
            placeholder={""}/>
        <Button onClick={handleUpload} className="w-full">Upload File</Button>
      </form>
    </div>
  )
}

export default ExamQuestions
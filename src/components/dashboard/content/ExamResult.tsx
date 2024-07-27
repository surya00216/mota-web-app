import { Button } from "@/components/ui/button"
import Dropdown from "../components/Dropdown"
import ExamInput from "../components/ExamInput"

const ExamResult = () => {
  const handleDownload = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    console.log("File Downloaded")
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
            question={"Which Academic Year of Degree or Master?(2023 to 2024 will be '2324')"} 
            type={"number"} 
            placeholder={"Enter Academic Year"}/>
        <ExamInput 
            question={'Which Subject of Degree or Master?("Python")'} 
            type={"text"} 
            placeholder={"Enter Subject"}/>
        <Button onClick={handleDownload} className="w-full">Download File</Button>
      </form>
    </div>
  )
}

export default ExamResult
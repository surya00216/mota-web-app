import { Button } from "@/components/ui/button"
import Dropdown from "../components/Dropdown"
import ExamInput from "../components/ExamInput"
import { SetStateAction, useState } from "react"

const ExamQuestions = () => {
  const [yearValue, setYearValue] = useState('F')
  const [courseValue, setCourseValue] = useState('CS')
  const [gradValue, setGradValue] = useState('UG')
  const [semValue, setSemValue] = useState('S1')
  const [test, setTest] =useState("")
  const handleUpload = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    console.log("File uploaded")
  }

  const year =  [
    { label: "First Year", value: "F" },
    { label: "Second Year", value: "S" },
    { label: "Third Year", value: "T" },
    { label: "Fourth Year", value: "FT" }
  ]

  const course =  [
    { label: "Computer Science", value: "CS" },
    { label: "Data Science", value: "DS" },
    { label: "Information Technology", value: "IT" },
    { label: "Business Management Studies", value: "BMS" }
  ]

  const grad =  [
    { label: "UG", value: "UG" },
    { label: "PG", value: "PG" }
  ]

  const sem =  [
    { label: "Semester 1", value: "S1" },
    { label: "Semester 2", value: "S2" },
    { label: "Semester 3", value: "S3" },
    { label: "Semester 4", value: "S4" },
    { label: "Semester 5", value: "S5" },
    { label: "Semester 6", value: "S6" },
    { label: "Semester 7", value: "S7" },
    { label: "Semester 8", value: "S8" }
  ]

  const handleSelect = (value:string, func:any) => {
    func(value)
    console.log(test)
  }

  return (
    <div className="flex flex-col w-1/2 ">
      <form action="">
        <Dropdown 
          question = {"Which year of Degree or Masters?"} 
          options = {year}
        />
        <Dropdown 
          question={"Which Course of Degree or Masters?"} 
          options={course}
        />
        <Dropdown 
          question={"Which Graduation ?"} 
          options={grad}
        />
        <Dropdown 
          question={"Which Semester of Degree or Masters?"} 
          options={sem}
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
import { Input } from '@/components/ui/input'
import React from 'react'

interface ExamInputProp {
  question?:string
  type?:string
  placeholder?:string
  className?:string
  accept?:string
}

const ExamInput:React.FC<ExamInputProp> = ({className, question, type, placeholder, accept}) => {
  return (
    <div className={className}>
      <div className="font-bold text-lg mb-3">
            {question}
        </div>
        <div className="mb-3">
          <Input accept={accept} type={type} placeholder={placeholder}/>
        </div>
    </div>
  )
}

export default ExamInput
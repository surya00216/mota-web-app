import { ChangeEvent, useState } from "react"

interface Option {
  value: string
  label: string
}


interface DropdownProps {
  question?:string
  className?:string
  value?:string
  options: Option[]
  onSelect?: (value:string)=>void;
  defaultValue?: string
}

const Dropdown:React.FC<DropdownProps> = ({
  question,
  options,
  onSelect,
  defaultValue,
  className,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue || "");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value)
    if(onSelect){
      onSelect(value)
    }
  }
  
  return (
    <div className={className}>
      <div className='my-2 w-full'>
          <div className="font-bold text-lg mb-3">
              {question}
          </div>
          <select value={selectedValue} onChange={handleChange} className=' dark:bg-black w-full px-2 py-1.5 border rounded pr-4 mb-3'>
              {options?.map((option:any)=>(
                  <option key={option.value} value={option.value} className="">{option.label}</option>
              ))}
          </select> 
        </div>
    </div>

  )
}

export default Dropdown
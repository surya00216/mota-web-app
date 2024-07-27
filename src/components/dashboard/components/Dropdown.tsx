interface DropdownProps {
  question?:string
  options?:string[]
  className?:string
}

const Dropdown:React.FC<DropdownProps> = ({
  question,
  options,
  className
}) => {
  
  return (
    <div className={className}>
      <div className='my-2 w-full'>
          <div className="font-bold text-lg mb-3">
              {question}
          </div>
          <select name="" className=' dark:bg-black w-full px-2 py-1.5 border rounded pr-4 mb-3'>
              {options?.map((option, index)=>(
                  <option key={index} className="">{option}</option>
              ))}
          </select> 
        </div>
    </div>

  )
}

export default Dropdown
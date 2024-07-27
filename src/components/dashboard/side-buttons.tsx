interface SideButtonProps {
  children?:React.ReactNode,
  btnName: string
  icon: React.JSX.Element
  onClick?: () => void
}

const SideButton:React.FC<SideButtonProps> = ({
  icon,
  btnName,
  onClick
}) => {
  return (
    <div onClick={onClick} className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground">
      {icon}
      {btnName}
    </div>
  )
}

export default SideButton
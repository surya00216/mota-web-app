import { Button } from "@/components/ui/button"

import { useState } from "react"
import { LayoutGridIcon, MenuIcon, MountainIcon, SettingsIcon, UsersIcon } from "@/components/icons/icons"
import HeaderDropdown from "@/components/dashboard/header-dropdown"
import SideButton from "@/components/dashboard/side-buttons"
import { ModeToggle } from "@/components/mode-toggle"
import { DownloadIcon, UploadIcon } from "@radix-ui/react-icons"
import User from "@/components/dashboard/content/User"
import ExamQuestions from "@/components/dashboard/content/ExamQuestions"
import ExamResult from "@/components/dashboard/content/ExamResult"
import SettingsPage from "@/pages/Settings"
import { useNavigate } from "react-router-dom"
import App from "./Test"


enum ContentPages {
  "default",
  "dashboard",
  "users",
  "uploadExam",
  "downloadExam",
  "settings",
  "test"
}

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isSelected, setIsSelected] = useState<ContentPages>()
  const navigate = useNavigate();

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={`fixed inset-y-0 left-0 z-10 flex w-64 flex-col border-r bg-background p-4 transition-transform duration-300 ease-in-out md:static md:flex ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center cursor-pointer gap-2" onClick={handleReload}>
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">Admin Dashboard</span>
        </div>
        <nav className="flex flex-col gap-2">
          <SideButton onClick={()=>setIsSelected(ContentPages.test)} btnName="Test" icon={<SettingsIcon/>}/>
          <SideButton btnName="Dashboard" icon={<LayoutGridIcon className="h-5 w-5" />}/>
          <SideButton onClick={()=>setIsSelected(ContentPages.users)} btnName="Users" icon={<UsersIcon className="h-5 w-5" />}/>
          <SideButton onClick={()=>setIsSelected(ContentPages.uploadExam)} btnName="Upload Exam Questions" icon={<UploadIcon className="h-5 w-5" />}/>
          <SideButton onClick={()=>setIsSelected(ContentPages.downloadExam)} btnName="Download Exam Result" icon={<DownloadIcon className="h-5 w-5" />}/>
          <SideButton onClick={()=>setIsSelected(ContentPages.settings)} btnName="Settings" icon={<SettingsIcon className="h-5 w-5" />}/>  
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={()=>setIsSidebarOpen(!isSidebarOpen)} size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <ModeToggle />
            <HeaderDropdown />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          {isSelected === ContentPages.users ? <User/> :
           isSelected === ContentPages.uploadExam ? <ExamQuestions/> : 
           isSelected === ContentPages.downloadExam ? <ExamResult/> : 
           isSelected === ContentPages.settings ? <SettingsPage/> : 
           isSelected === ContentPages.test ? <App/> : null
        }
        </main>
      </div>
    </div>
  )
}




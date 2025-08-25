import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/ui/mode_toggle.jsx"
import { AppSidebar } from './page';

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <div className="flex justify-between items-center p-2">
          <SidebarTrigger />
          <div className="right-5  top-3 fixed">
            <ModeToggle  />

            </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}
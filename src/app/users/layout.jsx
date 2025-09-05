import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/ui/mode_toggle.jsx"
import { AppSidebar } from './../dashboard_home/page';
import ProtectedRoute from "@/components/ProtectedRoute";
import LogoutButton from "@/components/LogoutButton";

export default function Layout({ children }) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <div className="flex justify-between items-center p-2">
            <SidebarTrigger />
            <div className="right-5 top-3 fixed flex gap-2">
              <LogoutButton />
              <ModeToggle />
            </div>
          </div>
          {children}
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
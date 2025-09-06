
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Users, Package, Home, User } from "lucide-react"
import { Component as BarChart } from "@/components/section/chart.jsx";
import { LineChartComponent as LineChart } from "@/components/section/line-chart.jsx";
import { AreaChartComponent as AreaChart } from "@/components/section/area-chart.jsx";
import Link from "next/link.js";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-semibold px-2 py-1">Admin Dashboard</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Home className="h-4 w-4 cursor-pointer" />
                  <Link href={"/dashboard_home"}>
                  <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Users className="h-4 w-4" />
                  <Link href={"/users"}>
                  <span>Users</span>
                  
                   </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <User className="h-4 w-4" />
                  <Link href={"/user"}>
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Package className="h-4 w-4" />
                  <span>Products</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-2 py-1">
          <p className="text-xs text-gray-500">© 2024 Admin Panel</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your dashboard!</p>
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 shadow-sm">
          <BarChart />
        </div>
        
        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 shadow-sm">
          <LineChart />
        </div>
      </div>
      
      {/* Area Chart - Full Width */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 shadow-sm">
        <AreaChart />
      </div>
    </div>
  )
}

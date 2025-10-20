import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { Sidebar } from "~/components/ui/sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Sidebar section */}
        <Sidebar />

        {/* Main content section */}
        <div className="flex flex-col flex-1">
          {/* Optional header / topbar */}
          <header className="flex items-center justify-between border-b p-4 bg-background">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Welcome, Karryl</span>
            </div>
          </header>

          {/* Main content area */}
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

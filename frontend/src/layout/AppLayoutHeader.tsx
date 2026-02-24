import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../context/SidebarContext";
import AppHeader from "./AppHeader";

const LayoutHeader = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <AppHeader />

        {/* pt-[64px] mengimbangi tinggi sticky AppHeader (h-[64px] approx) */}
        <main className="pt-2">
          <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default LayoutHeader;
import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../context/SidebarContext";
import HeaderPetugas from "../components/header/HeaderPetugas";

const LayoutHeaderPetugas = () => {
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const handleRefresh = useCallback(() => {
    setLastUpdate(new Date());
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <HeaderPetugas lastUpdate={lastUpdate} onRefresh={handleRefresh} />

        <main className="pt-2">
          <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
            <Outlet context={{ lastUpdate, onRefresh: handleRefresh }} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default LayoutHeaderPetugas;
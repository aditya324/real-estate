"use client";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import Sidebar from "@/components/AppSidebar";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: authuser, isLoading:authLoading } = useGetAuthUserQuery();

  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    if (authuser) {
      const userRole = authuser.userRole?.toLowerCase();
      if (
        (userRole === "manager" && pathname.startsWith("/tenants")) ||
        (userRole === "tenants" && pathname.startsWith("/managers"))
      ) {
        router.push(
          userRole === "manager" ? "/manager/properties" : "/tenants/favorites",
          { scroll: false }
        );

      }
      else{
        setisLoading(false)
      }
    }
  }, [authuser, router, pathname]);


  if (authLoading || isLoading ) return <>Loading...</>

  if (!authuser?.userRole) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-primary-100 mt-12">
        <Navbar />
        <div style={{ paddingTop: `${NAVBAR_HEIGHT}` }}>
          <main className="flex ">
            <Sidebar userType={authuser?.userRole.toLowerCase()} />

            <div className="flex-grow transition-all duration-300">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;

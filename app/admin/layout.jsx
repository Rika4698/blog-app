import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Layout({children}){
    // const { data: session, status } = useSession();
        
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!session) {
        redirect("/login");
      }

    return(
        <>
       <div className="flex flex-col lg:flex-row min-h-screen">
      <ToastContainer theme="dark" />
      
      {/* Sidebar on left */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 w-full">
        {/* Topbar */}
        <div className="flex items-center justify-between py-3 px-4 sm:px-12 border-b border-black bg-white">
          <h3 className="font-medium text-lg sm:text-xl">Blog Panel</h3>
          <Image
            src={user?.image || assets.default_avatar}
            width={40}
            height={40}
            alt="User Avatar"
            className="rounded-full"
          />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
        
        </>
    )
}
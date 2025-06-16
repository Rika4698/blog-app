import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import ClientLayout from "./clientLayout";

export default async function Layout({children}){
    // const { data: session, status } = useSession();
        
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!session) {
        redirect("/login");
      }
    

    return(
        <>
       <ClientLayout session={session}>
      {children}
    </ClientLayout>
        
        </>
    )
}
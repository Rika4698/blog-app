'use client';
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../../Components/AdminComponents/Sidebar";
// import { assets } from "@/Assets/assets";

export default function ClientLayout({ children, session }) {
  const user = session?.user;
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleOutsideClick = (event) => {
    if (!event.target.closest("#dropdownMenu")) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isDropdownOpen]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
    // toast.success("Logout Successfully");
  };

  return (
      <div className="flex flex-col lg:flex-row min-h-screen w-full ">
      <ToastContainer theme="dark" />
    
      {/* Sidebar - visible on large screens */}
      <aside className="border-b border-gray-300 lg:block lg:overflow-y-auto lg:overflow-x-hidden lg:w-80  bg-slate-100 lg:border lg:border-black">
        <Sidebar />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-[15.5px] border-b border-gray-300  bg-white ">
          <h1 className="text-xl font-semibold">Blog Panel</h1>

          <div className="relative" >
            <button
              type="button"
              aria-label="User menu"
              className="flex items-center focus:outline-none focus:ring-4 rounded-full focus:ring-gray-300 dark:focus:ring-gray-600 transition-transform duration-300 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen((prev) => !prev);
              }}
            >
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full ring-2 ring-gray-300 dark:ring-gray-600"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-400" />
              )}
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div id='dropdownMenu' className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-700 rounded-lg shadow-xl  divide-y divide-gray-100 dark:divide-gray-600 z-50  border border-gray-200">
                <div className="px-4 py-3">
                  <p className="text-base font-bold text-gray-900 dark:text-white truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300 truncate">
                    {user?.email}
                  </p>
                </div>

                <ul className="py-1">
                  <li>
                    <Link
                      href="/"
                      className="block px-4 py-2 text-center text-black dark:text-white border border-black  mx-4 my-2 font-medium bg-white shadow-[-5px_5px_0px_#000000] hover:shadow-none hover:translate-x-[-5px] hover:translate-y-[5px] transition-all duration-300"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                </ul>

                <ul className="py-1">
                  <li className="px-4 py-3">
                    <button
                      onClick={handleLogout}
                      className="w-full text-white bg-red-500 rounded-lg py-2 hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-3 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  
  );
}  
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
    <div className="flex flex-col lg:flex-row min-h-screen">
      <ToastContainer theme="dark" />
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        {/* Topbar */}
        <div className="flex items-center justify-between py-[5.5px] px-4 sm:px-12 border-b border-black bg-white">
          <h3 className="font-medium text-lg sm:text-xl">Blog Panel</h3>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 transition-transform duration-300 hover:scale-110 focus:ring-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen((prev) => !prev);
              }}
            >
              <span className="sr-only">Open user menu</span>
              {user?.image && (
                <Image
                  className="btn-circle w-12 h-12 lg:w-14 lg:h-14 rounded-full ring-2 ring-gray-300"
                  src={user.image}
                  width={35}
                  height={35}
                  alt="User Avatar"
                />
              )}
            </button>

            {/* User Dropdown */}
            {isDropdownOpen && (
              <div
                id="dropdownMenu"
                className="z-50 absolute right-4 top-[125px] lg:top-[67px] bg-white divide-y divide-gray-100 rounded-lg shadow-lg shadow-slate-600 drop-shadow-lg dark:bg-gray-700 dark:divide-gray-200"
              >
                <div className="px-4 py-3">
                  <span className="block text-base xl:text-lg font-bold text-gray-900 dark:text-white">
                    {user.name}
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {user.email}
                  </span>
                </div>

                <ul>
                  <li className="group border-b border-gray-100 py-5 px-3 text-center relative">
                    <Link
                      href="/"
                      className="text-center border border-black font-medium px-7 py-2 bg-white shadow-[-5px_5px_0px_#000000] hover:shadow-none hover:translate-x-[-5px] hover:translate-y-[5px] transition-all"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="py-3 px-16">
                    <button
                      onClick={handleLogout}
                      className="rounded-lg text-white bg-red-500 lg:w-28 lg:h-10 w-24 h-10"
                    >
                      <span className="ml-2 text-base">Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

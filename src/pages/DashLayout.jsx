
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userSlice";
import { PiEyesFill } from "react-icons/pi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { HiCreditCard } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

function DashLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const userName = useSelector((state) => state.user.currentUser?.name || "")
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem("jt_user"); // removing stored user in localStorage
        navigate("/"); // redirect to landing
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={` fixed inset-y-0 left-0 transform bg-blue-700 text-white w-64 flex flex-col transition-transform duration-300 z-50
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}>
                {/* Logo */}
                <div className="flex items-center justify-start text-2xl font-bold pt-6 px-2">
                    <PiEyesFill />
                    <h1 className="ml-1" >JobTracker</h1>
                </div>
                <p className="px-3 pb-10 text-gray-200">Welcome back, {userName}! </p>
                {/* Navigations */}
                <nav className="flex-1">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `w-full px-6 py-3 flex items-center  ${isActive ? "bg-blue-600" : "hover:bg-blue-700"}`
                        }
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <MdOutlineDashboardCustomize className="mr-2 text-2xl" />
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/jobs"
                        className={({ isActive }) =>
                            `w-full flex items-center px-6 py-3 ${isActive ? "bg-blue-600" : "hover:bg-blue-700"}`
                        }
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <HiCreditCard className="mr-2 text-2xl" />
                        Applications
                    </NavLink>
                </nav>
                {/* Logout */}
                <button
                    className="m-6 px-3 py-2 flex items-center justify-center bg-white text-red-700 rounded hover:bg-gray-200"
                    onClick={handleLogout}
                >
                    Logout
                    <FiLogOut className="ml-2 " />
                </button>
            </div>

            {/* close when touch outside sidebar (mobile only) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-opacity-40 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content - navigating using outlet */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
                {/* Toggle bar for mobile */}
                <button className="text-gray-500 md:hidden" onClick={() => setIsSidebarOpen(true)}>
                    <GiHamburgerMenu size={24} />
                </button>

                <Outlet />
            </div>
        </div>
    );
};

export default DashLayout;

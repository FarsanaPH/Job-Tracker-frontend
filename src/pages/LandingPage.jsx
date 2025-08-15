import React from "react";
import { useNavigate } from "react-router-dom";
import Img from "../assets/landingpic.png"
import { motion } from "framer-motion"; 
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { PiEyesFill } from "react-icons/pi";

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
            {/* Navbar */}
            <header className="flex justify-between items-end px-8 py-4 h-15 border-b border-gray-800">
                <div className="flex items-center justify-center gap-1 ">  
                    <PiEyesFill className="text-3xl text-green-400 " />                  
                    <h1 className="text-2xl font-bold">JobTracker</h1>
                    
                </div>
                <button
                    onClick={() => navigate("/auth")}
                    className=" text-white flex gap-2 hover:text-gray-200 "
                >
                    Login <IoPersonCircleSharp className="text-2xl" />
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                {/* Hero Section */}
                <div className="flex flex-col items-center text-center px-6 py-16">
                    <motion.img
                        src={Img}
                        alt="Track your applications"
                        className="w-100 h-74 pt-6 mt-10 mb-3"
                        animate={{ y: [0, -10, 0] }}   // moves up 20px and back down
                        transition={{
                            duration: 2,       
                            repeat: Infinity,   
                            repeatType: "loop", 
                            ease: "easeInOut", 
                        }}
                    />
                    <h2 className="text-3xl md:text-2xl heading-style mb-4 uppercase">
                        Organize and Track All Your Job Applications in One Place
                    </h2>
                    <p className="text-gray-300 max-w-xl mb-6">
                        Stay ahead in your job search with JobTracker. Manage applications,
                        set reminders, and monitor your progress with ease.
                    </p>
                    <button
                        onClick={() => navigate("/auth")}
                        className="px-6 py-3 mb-1.5 bg-green-400 rounded-md hover:bg-green-600"
                    >
                        Start Tracking
                    </button>
                </div>

                {/* Features Section */}
                <section className=" py-12 px-6">
                    <h3 className="text-center text-2xl font-semibold mb-8">Why JobTracker?</h3>
                    <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-20">
                        <div className="bg-gray-800 p-6 text-center">
                            <h4 className="font-bold text-lg mb-2">Application Manager</h4>
                            <p className="text-gray-300 text-sm">
                                Keep track of every job you’ve applied for with neatly organized lists, so you can easily revisit details, follow up, and manage multiple opportunities without confusion.
                            </p>
                        </div>

                        <div className="bg-gray-800 p-6 text-center">
                            <h4 className="font-bold text-lg mb-2">Deadline Reminders</h4>
                            <p className="text-gray-300 text-sm">
                                Never miss an important interview or application deadline again — set automated alerts and stay on top of every step in your job search journey.
                            </p>
                        </div>

                        <div className="bg-gray-800 p-6 text-center">
                            <h4 className="font-bold text-lg mb-2">Progress Tracking</h4>
                            <p className="text-gray-300 text-sm">
                                Monitor your job search performance and success rate with clear visual indicators, helping you identify patterns, improve strategies, and land your dream role faster.
                            </p>
                        </div>

                    </div>
                </section>
            </main>

            <footer className="bg-gray-900 border-t border-gray-800  text-gray-400">
                {/* Main Footer Section */}
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700">

                    {/* About */}
                    <div>
                        <h3 className="text-white text-2xl font-bold mb-4">Job Tracker</h3>
                        <p className="text-sm leading-relaxed">
                            JobTracker helps you manage applications, track deadlines, and measure progress — all in one place. Designed for job seekers who want to stay organized and land their dream role faster.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-start md:items-center">
                        <h3 className="text-white text-lg font-semibold mb-4 ">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition">Home</a></li>
                            <li><a href="#" className="hover:text-white transition">Features</a></li>
                            <li><a href="/auth" className="hover:text-white transition">Login / Sign Up</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col items-start md:items-center">
                        <div className="text-left">
                            <h3 className="text-white text-lg font-semibold mb-4">Get in Touch</h3>
                            <p className="text-sm">
                                Email: <a href="mailto:support@jobtracker.com" className="hover:text-white transition">support@jobtracker.com</a>
                            </p>
                            <p className="text-sm mt-2">Phone: +91 12345 67890</p>
                            <div className="flex space-x-4 mt-4">
                                <a href="#" className="hover:text-white text-xl transition"><FaFacebookF /></a>
                                <a href="#" className="hover:text-white text-xl transition"><FaInstagram /></a>
                                <a href="#" className="hover:text-white text-xl transition"><FaTwitter /></a>
                                <a href="#" className="hover:text-white text-xl transition"><FaLinkedinIn /></a>
                            </div>
                        </div>
                    </div>


                </div>

                {/* Bottom Footer Bar */}
                <div className="text-center py-4 text-sm ">
                    © {new Date().getFullYear()} JobTracker. All rights reserved.
                </div>
            </footer>

        </div>
    );
}

export default LandingPage
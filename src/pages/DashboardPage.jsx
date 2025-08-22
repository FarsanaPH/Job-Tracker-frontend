// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { IoPersonCircleSharp } from "react-icons/io5";
import { getUserSpecificFormDataAPI } from "../service/allApi";
import { useSelector } from "react-redux";
import DashboardCards from "../components/DashboardCards";
import LineChart from "../components/LineChart";

// registering chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  // const data = {
  //   labels: ["Aug 1", "Aug 6", "Aug 11", "Aug 16", "Aug 21", "Aug 29"],
  //   datasets: [
  //     {
  //       label: "Applied",
  //       data: [0, 0, -1, 1, 2, 4],
  //       borderColor: "#3B82F6",
  //       backgroundColor: "rgba(59, 130, 246, 0.2)",
  //       tension: 0.4,
  //     },
  //   ],
  // };

  const recentApplications = [
    { company: "Google", position: "Frontend Developer", status: "interview", logo: "https://www.google.com/favicon.ico" },
    { company: "Microsoft", position: "Data Scientist", status: "applied", logo: "https://www.microsoft.com/favicon.ico" },
    { company: "Amazon", position: "Software Engineer", status: "offer", logo: "https://www.amazon.com/favicon.ico" },
    { company: "Facebook", position: "Backend Developer", status: "rejected", logo: "https://www.facebook.com/favicon.ico" },
  ];


  const statusColors = {
    applied: "bg-blue-400",
    interview: "bg-orange-400",
    offer: "bg-green-400",
    rejected: "bg-red-400",
    bookmarked: "bg-gray-400",
  };


  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Dashboard <span className="bg-green-200 text-green-500 px-2 rounded-full text-xs">Live</span></h2>
        <IoPersonCircleSharp className="text-4xl text-gray-400" />
      </div>

      {/* Status Cards */}
      < DashboardCards />

      {/* Chart & Recent Applications */}
      <div className="grid grid-cols-3 gap-8">
        <LineChart />
        {/* <div className="col-span-2 bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-4">Application Status</h3>
          <Line data={data} />
        </div> */}


        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-4">Recent Applications</h3>
          <ul className="space-y-4">
            {recentApplications.map((job, idx) => (
              <li key={idx} className="flex items-center justify-between border p-2 rounded">
                <div className="flex items-center space-x-3">
                  <img src={job.logo} alt={job.company} className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">{job.company}</p>
                    <p className="text-gray-500 text-sm">{job.position}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs text-white ${statusColors[job.status]}`}>
                  {job.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

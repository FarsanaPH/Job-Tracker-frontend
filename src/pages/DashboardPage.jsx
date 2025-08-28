// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { getUserSpecificFormDataAPI } from "../service/allApi";
import { useSelector } from "react-redux";
import DashTopper from "../components/DashTopper";
import DashboardCards from "../components/DashboardCards";
import LineChart from "../components/LineChart";
import { div } from "framer-motion/client";

function Dashboard() {
  const [recentApplications, setRecentApplications] = useState([]);

  const currentUser = useSelector((state) => state.user.currentUser)

  // get userspecific data
  const getUserSpecificFormData = async () => {
    try {
      if (!currentUser) return;

      const res = await getUserSpecificFormDataAPI(currentUser.id);  //filter currentuser in backend API
      console.log("User-specific applications fetched from backend:", res);

      setRecentApplications(res.data); //res.data is array
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserSpecificFormData();
  }, [currentUser]);

  const statusColors = {
    applied: "bg-blue-400",
    interview: "bg-orange-400",
    offer: "bg-green-400",
    rejected: "bg-red-400",
    bookmarked: "bg-gray-400",
  };

  const logoBgColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
];

function getRandomColor(company) {
  // Use company name to generate consistent color
  const index = company ? company.charCodeAt(0) % logoBgColors.length : 0;
  return logoBgColors[index];
}

  return (
    <>
      {/* Topper of both dashboard and joblist page */}
      <DashTopper isDashboard={true} />

      {/* Status Cards */}
      < DashboardCards />

      {/* Chart & Recent Applications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Line chart */}
        <LineChart />

        {/* Recent applications */}
        <div className="bg-white p-6 rounded shadow mb-4 md:mb-0">
          <h3 className="font-semibold mb-4">Recent Applications</h3>
          <ul className="space-y-4">
            {
              recentApplications?.length > 0 ? (
                [...recentApplications]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 5)
                  .map((applctn, idx) => (
                    <li key={idx} className="flex items-center justify-between border p-2 rounded">
                      <div className="flex items-center space-x-3">
                        {/* logo */}
                        {applctn?.companyLogo ? (
                            <img
                                src={applctn?.companyLogo}
                                alt="Logo Preview"
                                className="w-6 h-6 rounded-full object-cover"
                            />
                        ) : (
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${getRandomColor(applctn?.company)}`}>
                                {applctn.company?.[0]?.toUpperCase()}
                            </div>
                        )}
                        <div>
                          <p className="font-semibold">{applctn?.company}</p>
                          <p className="text-gray-500 text-sm">{applctn.jobTitle}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs text-white ${statusColors[applctn?.status]}`}>
                        {applctn.status}
                      </span>
                    </li>
                  ))
              ) : (
                <div className="text-blue-600">
                  NO APPLICATIONS YET
                </div>
              )
            }
          </ul>
        </div>
      </div>

    </>
  );
};

export default Dashboard;
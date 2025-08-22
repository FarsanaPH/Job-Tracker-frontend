import React, { useEffect, useState } from "react";
import { getUserSpecificFormDataAPI } from "../service/allApi";
import { useSelector } from "react-redux";

function DashboardCards() {
  const [counts, setCounts] = useState({
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
    bookmarked: 0,
  });

  const currentUser = useSelector((state) => state.user.currentUser)

  useEffect(() => {
    const getUserSpecificFormData = async () => {
      try {
        const res = await getUserSpecificFormDataAPI(currentUser.id);
        // console.log(res.data);
        
        const newCounts = {
          applied: 0,
          interview: 0,
          offer: 0,
          rejected: 0,
          bookmarked: 0,
        };

        res.data.forEach((app) => {
          if (newCounts[app?.status] !== undefined) {
            newCounts[app.status] += 1;
          }
        });

        setCounts(newCounts);

      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    getUserSpecificFormData();
  }, []);




  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-5  gap-4 mb-8">
        <div className="bg-blue-400 text-white p-6 rounded shadow">{counts?.applied}<br /><span>Applied</span></div>
        <div className="bg-gray-400 text-white p-6 rounded shadow">{counts?.bookmarked}<br /><span>Bookmarked</span></div>
        <div className="bg-orange-400 text-white p-6 rounded shadow">{counts?.interview}<br /><span>Interview</span></div>
        <div className="bg-green-400 text-white p-6 rounded shadow">{counts?.offer}<br /><span>Offer</span></div>
        <div className="bg-red-400 text-white p-6 rounded shadow">{counts?.rejected}<br /><span>Rejected</span></div>
      </div>
    </>
  )
}

export default DashboardCards
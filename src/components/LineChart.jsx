import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getUserSpecificFormDataAPI } from "../service/allApi";
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart() {
  const [chartData, setChartData] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getUserSpecificFormData = async () => {
      try {
        const res = await getUserSpecificFormDataAPI(currentUser.id);

        // Filter only applied applications
        const appliedApps = res.data.filter(app => app.status === "applied");

        // Group by date
        const countsByDate = {};
        appliedApps.forEach((app) => {
          const date = new Date(app.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          });
          countsByDate[date] = (countsByDate[date] || 0) + 1;
        });

        // Convert to labels & values
        const labels = Object.keys(countsByDate);
        const values = Object.values(countsByDate);

        // Set chart data - draw chart
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Applied",
              data: values,
              borderColor: "#3B82F6",
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              tension: 0.4,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching chart data", err);
      }
    };

    getUserSpecificFormData();
  }, [currentUser]);

  
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: { position: "top" },
  //     title: { display: true, text: "Applied Applications Progress" },
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: true, // Don't start from 0
  //       ticks: {
  //         stepSize: 0.5,      // Increment by 1
  //       },
  //     },
  //   },
  // };

  return (
    <div className="col-span-1 md:col-span-2 min-h-100 bg-white py-6 px-2 md:p-6 rounded shadow">
      <h3 className="font-semibold px-3 md:px-0 mb-4">Application Progress</h3>
      {chartData ? <Line data={chartData} className="min-h-75"/> : <p>Loading chart...</p>}
    </div>
  );
}

export default LineChart;

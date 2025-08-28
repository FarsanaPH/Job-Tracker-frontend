import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ManageModal from "../components/ManageModal";
import ApplyCard from "../components/ApplyCard";
import { getUserSpecificFormDataAPI } from "../service/allApi";
import { useSelector } from "react-redux";
import DashTopper from "../components/DashTopper";
import { motion, AnimatePresence } from "framer-motion";

function JobListPage() {
  const [formData, setFormData] = useState([]);
  const [isFormDataChanged, setIsFormDataChanged] = useState();
  const [searchTerm, setSearchTerm] = useState(""); // state for search input
  const [sortBy, setSortBy] = useState("All"); // state for sorting
  // const [showSortOptions, setShowSortOptions] = useState(false); // dropdown toggle

  const currentUser = useSelector((state) => state.user.currentUser);

  // get userspecific data
  const getUserSpecificFormData = async () => {
    try {
      if (!currentUser) return;

      const res = await getUserSpecificFormDataAPI(currentUser.id);  //filter in backend API
      console.log("User-specific applications fetched from backend:", res);

      setFormData(res.data); //res.data is array
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserSpecificFormData();
  }, [isFormDataChanged, currentUser]);

  // Filter data by search
  let filteredData = formData.filter((app) => {
    const search = searchTerm.toLowerCase();  // When searchTerm == "" ie,nothing searched then filteredData = formData itself as app.compny/jobtitle/location.includes("") satisfies all userspecific applications.
    return (
      app.company?.toLowerCase().includes(search) ||
      app.jobTitle?.toLowerCase().includes(search) ||
      app.location?.toLowerCase().includes(search)
    );
  });

  // Filter by SortBy (status)
  if (sortBy !== "All") {
    filteredData = filteredData.filter(
      (app) => app.status?.toLowerCase() === sortBy.toLowerCase()
    );
  }


  return (
    <div className="mb-5 md:mb-3">
      {/* Topper of both page */}
      <DashTopper />

      {/* Search + sort */}
      <div className="flex items-center gap-2 mb-4">
        {/* Search */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 flex-1 min-w-0">
          <FiSearch className="text-gray-500 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search by company, role, or location..."
            className="outline-none flex-1 text-sm sm:text-base "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Sort By */}
        <div className="w-32 sm:w-40 shrink-0">
          <select
            className="border border-gray-300 rounded-lg px-3 py-1.5 md:py-2 text-gray-500 w-full"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {["All", "Bookmarked", "Applied", "Interview", "Offer", "Rejected"].map(
              (option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      {/* OR sort by this*/}
      {/* <div className="relative">
          <button
            className="flex items-center border border-gray-300 rounded-lg px-3 py-2 whitespace-nowrap"
            onClick={() => setShowSortOptions(!showSortOptions)}
          >
            <FiChevronDown className="text-gray-500 mr-2" />
            <span className="text-gray-500">{Sort By}</span>
          </button>

          {showSortOptions && (
            <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-40 z-10">
              {["All", "Bookmarked", "Applied", "Interview", "Offer", "Rejected"].map(
                (option) => (
                  <div
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSortBy(option);
                      setShowSortOptions(false);
                    }}
                  >
                    {option}
                  </div>
                )
              )}
            </div>
          )}
        </div> */}


      {/* Add application Button */}
      <ManageModal setIsFormDataChanged={setIsFormDataChanged} />

      {/* APPLICATION CARDS */}
      <div className="grid grid-cols-1 md:mr-17 gap-4">
        <AnimatePresence>
          {filteredData?.length > 0 ? (
            [...filteredData]  // copy so original isn't mutated
              .sort((a, b) => new Date(b.date) - new Date(a.date)) // newest first
              .map((applctn) => (
                <motion.div key={applctn.id}
                  initial={{ opacity: 1, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 200 }} // Slide to right & fade out
                  transition={{ duration: 0.3 ,ease: "easeOut",}}
                >
                  <ApplyCard applctn={applctn} setIsFormDataChanged={setIsFormDataChanged} />
                </motion.div>
              ))
          ) : (
            "NO APPLICATIONS YET"
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default JobListPage;

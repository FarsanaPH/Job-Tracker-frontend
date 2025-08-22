import { useEffect, useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { IoPersonCircleSharp } from "react-icons/io5";
import ManageModal from "../components/ManageModal";
import ApplyCard from "../components/ApplyCard";
import { getUserSpecificFormDataAPI } from "../service/allApi";
import { useSelector } from "react-redux";

function JobListPage() {
  const [formData, setFormData] = useState([]);
  const [isFormDataChanged, setIsFormDataChanged] = useState();
  const [searchTerm, setSearchTerm] = useState(""); // state for search input
  const [sortBy, setSortBy] = useState("All"); // state for sorting
  // const [showSortOptions, setShowSortOptions] = useState(false); // dropdown toggle


  const currentUser = useSelector((state) => state.user.currentUser);

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
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Applications</h2>
        <IoPersonCircleSharp className="text-4xl text-gray-400" />
      </div>

      {/* Search + sort */}
      <div className="flex items-center gap-3 mb-4">
        {/* Search */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 flex-1">
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by company, role, or location..."
            className="outline-none flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} //  set search term
          />
        </div>

        {/* Sort By */}
        <div >
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 pr-8 text-gray-500"
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

      {/* OR */}
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


      {/* Add applctn Button */}
      <ManageModal setIsFormDataChanged={setIsFormDataChanged} />

      {/* applctn Cards */}
      <div className="space-y-4 me-20">
        {filteredData?.length > 0 ? (
          filteredData.map((applctn) => (
            <div
              key={applctn.id}
              className="bg-white p-4 rounded-lg shadow border border-gray-200"
            >
              <ApplyCard
                applctn={applctn}
                setIsFormDataChanged={setIsFormDataChanged}
              />
            </div>
          ))
        ) : (
          "NO APPLICATIONS"
        )}
      </div>
    </div>
  );
}

export default JobListPage;

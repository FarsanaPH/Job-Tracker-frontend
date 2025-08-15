import { useEffect, useState } from "react";
import { FiFilter, FiSearch, FiPlus, FiChevronDown } from "react-icons/fi";
import { IoPersonCircleSharp } from "react-icons/io5";
import ManageModal from "../components/ManageModal";
import ApplyCard from "../components/ApplyCard";
import { getAllFormDataAPI } from "../service/allApi";


function applctnListPage() {
  const [formData, setFormData] = useState([]);
  const [isFormDataChanged, setIsFormDataChanged] = useState()

  const getAllFormData = async () => {
    try {
      const res = await getAllFormDataAPI()
      console.log("All Data getted from db.json", res);
      setFormData(res.data) // to show getted data  on webpage - result.data in array

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllFormData()
  }, [isFormDataChanged])  //refresh page each time applctn add - ie,really applctn data changed like delte update,add


  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Applications</h2>
        <IoPersonCircleSharp className="text-4xl text-gray-400" />
      </div>

      {/* Search + Filter */}
      <div className="flex items-center gap-3 mb-4">
        {/* Search */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 flex-1">
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none flex-1"
          />
        </div>

        {/* Sort By */}
        <button className="flex items-center border border-gray-300 rounded-lg px-3 py-2 whitespace-nowrap">
          <FiChevronDown className="text-gray-500 mr-2" />
          <span className="text-gray-500">Sort By</span>
        </button>
      </div>


      {/* Add applctn Button */}
      <ManageModal setIsFormDataChanged={setIsFormDataChanged} />

      {/* applctn Cards */}
      <div className="space-y-4 me-20 ">
        {
          formData?.length > 0 ? (

            formData?.map((applctn) => (
              <div
                key={applctn.id}
                className="bg-white p-4 rounded-lg shadow border border-gray-200"
              >
                <ApplyCard  applctn={applctn} setIsFormDataChanged={setIsFormDataChanged}/>
              </div>
            ))


          ) : (
            "NO APPLICATIONS"
          )
        }
      </div>

    </div>
  );
}

export default applctnListPage

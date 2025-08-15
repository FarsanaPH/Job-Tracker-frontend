import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ManageModal from './ManageModal';
import { deleteFormDataAPI } from '../service/allApi';

function ApplyCard({ applctn, setIsFormDataChanged }) {

    
  const handleDelete = async (id) => {
    console.log("Job ID is",id);
    try{
      const result = await deleteFormDataAPI(id)
      console.log("Deleted data:",result);
      setIsFormDataChanged(result)  //useState from parent Dashboard.jsx to make webpage know somethng added otherwise not show until refresh
    }catch(err){
      console.log(err);     
    }
    
  }
    return (
        <>
            <div>
                {/* Top Row: Company+ Location + Action Buttons */}
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{applctn?.company}
                        <p className="text-gray-500 text-xs font-normal" > {applctn?.location}</p>
                    </h2>
                    <div className="flex gap-2">
                        <ManageModal isEdit={true} setIsFormDataChanged={setIsFormDataChanged} applyId={applctn?.id}/>
                        <button
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => handleDelete(applctn?.id)}
                        >
                            <MdDelete />
                        </button>
                    </div>
                </div>


                {/* applctn Title */}
                <p className="text-gray-500 small">{applctn?.jobTitle}</p>

                {/* Tags */}
                <div className="flex gap-2 mt-2">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                        {applctn?.status}
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        {applctn?.jobType}
                    </span>
                    <span className="text-gray-500 text-sm">
                        {applctn?.date}
                    </span>
                </div>

                {/* Notes */}
                {applctn?.notes && (
                    <p className="mt-2 text-gray-700 text-sm">
                        <strong>Notes:</strong> {applctn?.notes}
                    </p>
                )}

                {/* Resume */}
                {applctn?.resumeUsed && (
                    <p className="mt-1 text-gray-700 text-sm">
                        <strong>Resume Used:</strong> {applctn?.resumeUsed}
                    </p>
                )}

                {/* applctn Link */}
                {applctn?.jobLink && (
                    <p className="mt-2 text-blue-600 text-sm underline">
                        <a href={applctn?.jobLink} target="_blank" rel="noopener noreferrer">
                            Job Link
                        </a>
                    </p>
                )}
            </div>
        </>
    )
}

export default ApplyCard
import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ManageModal from './ManageModal';
import { deleteFormDataAPI } from '../service/allApi';
import { IoCalendarOutline, IoLocationSharp } from 'react-icons/io5';

function ApplyCard({ applctn, setIsFormDataChanged }) {


    const handleDelete = async (id) => {
        console.log("Job ID is", id);
        try {
            const result = await deleteFormDataAPI(id)
            console.log("Deleted data:", result);
            setIsFormDataChanged(result)  //useState from parent Dashboard.jsx to make webpage know somethng added otherwise not show until refresh
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <>
            <div>
                {/* Top Row: Company+ Action Buttons */}
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">{applctn?.company}</h2>

                    <div className="flex gap-2">
                        <ManageModal isEdit={true} setIsFormDataChanged={setIsFormDataChanged} applyId={applctn?.id} />
                        <button
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => handleDelete(applctn?.id)}
                        >
                            <MdDelete />
                        </button>
                    </div>
                </div>

                {/* applctn title */}
                <h2 className="font-semibold ">{applctn?.jobTitle}</h2>

                {/* applctn Location */}
                <p className="flex items-center text-gray-500  font-normal" > <IoLocationSharp /> {applctn?.location}</p>
                

                {/* Tags */}
                <div className="flex gap-2 mt-2">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                        {applctn?.status}
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        {applctn?.jobType} 
                    </span>
                    <span className="flex items-center text-gray-500 text-sm">
                        {applctn?.date}<IoCalendarOutline  /> 
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
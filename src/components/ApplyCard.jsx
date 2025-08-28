import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ManageModal from './ManageModal';
import { deleteFormDataAPI } from '../service/allApi';
import { IoCalendarOutline, IoLocationSharp } from 'react-icons/io5';
import { RiExternalLinkLine } from 'react-icons/ri';

function ApplyCard({ applctn, setIsFormDataChanged }) {
    const statusColors = {
        applied: "bg-blue-500",
        interview: "bg-amber-500",
        offer: "bg-green-600",
        rejected: "bg-red-400",
        bookmarked: "bg-gray-500",
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
            <div className="rounded-lg p-4 shadow-xl md:shadow bg-white w-full">
                {/* Top Row: Company+Link+ Action Buttons */}
                <div className="flex flex-wrap justify-between items-center">
                    <div className='flex items-center justify-center gap-1'>
                        {/* CompanyLogo */}
                        {applctn?.company &&
                            (applctn?.companyLogo ? (
                                <img
                                    src={applctn?.companyLogo}
                                    alt="Logo Preview"
                                    className="w-8 h-8 rounded-full"
                                />
                            ) : (
                                <div className={`w-8 h-8 ${getRandomColor(applctn?.company)} rounded-full  flex items-center justify-center text-white font-semibold`}>
                                    {applctn.company?.[0]?.toUpperCase()}
                                </div>
                            ))
                        }
                        {/* Company Name */}
                        <h2 className="text-2xl font-semibold">{applctn?.company}</h2>
                        {/* applctn Link */}
                        {applctn?.jobLink && (
                            <p className="mt-2 md:ms-1 text-blue-600 text-sm underline">
                                <a href={applctn?.jobLink} target="_blank" rel="noopener noreferrer">
                                    <RiExternalLinkLine className='text-lg' />
                                </a>
                            </p>
                        )}
                    </div>

                    <div className="flex gap-2">
                        {/* Action Buttons */}
                        <ManageModal isEdit={true} setIsFormDataChanged={setIsFormDataChanged} applyId={applctn?.id} />
                        <button
                            className=" px-1 md:px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => handleDelete(applctn?.id)}
                        >
                            <MdDelete className='text-lg md:text-xl' />
                        </button>
                    </div>
                </div>

                {/* applctn title */}
                <h2 className="font-semibold ">{applctn?.jobTitle}</h2>

                {/* applctn Location */}
                <p className="flex items-center text-gray-500  font-normal" > <IoLocationSharp /> {applctn?.location}</p>


                {/* Tags */}
                <div className="flex gap-2 mt-2">
                    <span className="bg-gray-200 text-purple-800 px-2 py-1 rounded-full text-xs">
                        {applctn?.jobType}
                    </span>
                    <span className={` text-white ${statusColors[applctn?.status]} px-2 py-1 rounded-full text-xs`}>
                        {applctn?.status}
                    </span>
                    <span className="flex items-center text-gray-500 text-sm">
                        <IoCalendarOutline className='mr-1' />
                        {/* {applctn?.date} */}
                        {new Date(applctn?.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>
                </div>

                {/* Resume */}
                {applctn?.resumeUsed && (
                    <p className="mt-2 text-gray-700 text-sm">
                        <span className='font-semibold'>Resume used:</span> {applctn?.resumeUsed}
                    </p>
                )}

                {/* Rejected Reason */}
                {applctn?.rejectedReason && (
                    <p className="mt-1 text-gray-700 text-sm">
                        <span className='font-semibold'>Reason for rejection:</span> {applctn?.rejectedReason}
                    </p>
                )}

                {/* Notes */}
                {applctn?.notes && (
                    <p className="mt-1 text-gray-700 text-sm">
                        <span className='font-semibold'>Additional Notes:</span> {applctn?.notes}
                    </p>
                )}

            </div>
        </>
    )
}

export default ApplyCard
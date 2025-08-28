
import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { FaRegEdit } from 'react-icons/fa';
import { addFormDataAPI, getEditFormDataAPI, updateEditFormDataAPI } from '../service/allApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RiEdit2Fill } from 'react-icons/ri';
import { TiDeleteOutline } from 'react-icons/ti';


function ManageModal({ isEdit, setIsFormDataChanged, applyId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState("applied");

    const currentUser = useSelector((state) => state.user.currentUser);

    // Form state
    const [formData, setFormData] = useState({
        jobTitle: "",
        company: "",
        location: "",
        jobType: "full-time",
        date: "",
        status: "applied",
        rejectedReason: "",
        jobLink: "",
        resumeUsed: "",
        notes: "",
        companyLogo: ""
    });

    // Handle change for all inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === "status") {
            setStatus(value);
        }
    };

    // application adding to backend with userid so we can fetch each users applctn seperately in each ones dashboard ie,A sees his applctns ,B sees his
    const newApplctn = {
        ...formData,
        userId: currentUser.id,
    };

    // Save data to backend
    const addFormData = async () => {
        try {
            const res = await addFormDataAPI(newApplctn);
            console.log(res);
            if (res.status >= 200 && res.status < 300) {
                toast.success("Application added successfully!");
                setIsFormDataChanged(res)
                setFormData({
                    jobTitle: "",
                    company: "",
                    location: "",
                    jobType: "full-time",
                    date: "",
                    status: "applied",
                    rejectedReason: "",
                    jobLink: "",
                    resumeUsed: "",
                    notes: ""
                });
                handleClose()
            } else {
                toast.error("Failed to add application");
            }
        } catch (err) {
            console.error(err);
            toast("Error while saving");
        }
    };

    const getEditFormData = async () => {
        try {
            const result = await getEditFormDataAPI(applyId)
            console.log("edit data getted from db json is:", result); //result.data in object
            setFormData(result.data)
        } catch (err) {
            console.log(err);
        }
    }

    const updateEditFormData = async () => {
        try {
            const result = await updateEditFormDataAPI(applyId, newApplctn)
            console.log("updated data to db json is:", result); //result.data in object
            setIsFormDataChanged(result) //useState from parent Dashboard.jsx to make webpage know somethng added otherwise not show until refresh
            handleClose()
        } catch (err) {
            console.log(err);
        }
    }

    const handleClose = () => {
        setFormData({
            jobTitle: "",
            company: "",
            location: "",
            jobType: "full-time",
            date: "",
            status: "applied",
            rejectedReason: "",
            jobLink: "",
            resumeUsed: "",
            notes: ""
        });
        setIsOpen(false);

    }
    const handleShow = () => {
        setIsOpen(true);
        if (isEdit && applyId) { //to only call when edit button is clicked
            getEditFormData();
        }
    }

    return (
        <>
            {/* Add New Application Button */}
            {
                isEdit ? (
                    <button
                        onClick={handleShow}
                        className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"

                    >
                        <RiEdit2Fill className='text-sm' />
                    </button>


                ) : (
                    <button
                        onClick={handleShow}
                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg mb-6 hover:bg-blue-600"
                    >
                        <FiPlus className="mr-2" /> Add New Application
                    </button>
                )
            }


            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-1000 px-2">
                    <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg w-[95%] sm:w-[90%] md:max-w-2xl p-6 z-50">
                        <div className='flex justify-between'>
                            {
                            isEdit ? (
                                <h2 className="text-lg font-semibold mb-4">Edit Application</h2>
                            ) : (
                                <h2 className="text-lg font-semibold mb-4">Add New Application</h2>
                            )
                        }
                        <TiDeleteOutline className='text-2xl text-gray-800' onClick={handleClose}/>
                        </div>



                        <div className="space-y-4">
                            {/* Row 1  */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="jobTitle"
                                    value={formData?.jobTitle}
                                    onChange={handleChange}
                                    placeholder="Job Title"
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                />
                                <input
                                    type="text"
                                    name="company"
                                    value={formData?.company}
                                    onChange={handleChange}
                                    placeholder="Company Name"
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                />
                            </div>

                            {/* Row 2 */}
                            <div className="grid grid-cols-1 gap-2">
                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    id="companyLogoInput" //reference from below label
                                    name="companyLogo"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setFormData(prev => ({ ...prev, companyLogo: reader.result }));
                                        };
                                        reader.readAsDataURL(file);
                                    }}
                                    className="hidden"
                                />
                                {/* If logo exists, show preview */}
                                {formData?.companyLogo ? (
                                    <div className="flex flex-col items-start gap-2">
                                        <label
                                            htmlFor="companyLogoInput"
                                            className="border border-gray-300 text-gray-500 rounded px-3 py-2 w-full cursor-pointer text-center"
                                        >
                                            <div className='flex items-center'>
                                                <img
                                                    src={formData.companyLogo}
                                                    alt="Company Logo"
                                                    className="w-8 h-8 object-cover border rounded me-3"
                                                /> File Chosen
                                                {/* Remove Button */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setFormData((prev) => ({ ...prev, companyLogo: "" }))
                                                    }
                                                    className="text-red-500 underline ms-1 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </label>
                                    </div>
                                ) : (
                                    // this shows on webpage with reference to id
                                    <label
                                        htmlFor="companyLogoInput"
                                        className="border border-gray-300 text-gray-500 rounded px-3 py-2 w-full "
                                    >
                                        Choose Company Logo
                                    </label>
                                )}
                            </div>


                            {/* Row 2 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="location"
                                    value={formData?.location}
                                    onChange={handleChange}
                                    placeholder="Location"
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                />
                                <select
                                    name="jobType"
                                    value={formData?.jobType}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                >
                                    <option value="full-time">Full Time</option>
                                    <option value="internship">Internship</option>
                                </select>
                            </div>

                            {/* Row 3 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="date"
                                    name="date"
                                    value={formData?.date}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                />
                                <select
                                    name="status"
                                    value={formData?.status}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                >
                                    <option value="bookmarked">Bookmarked</option>
                                    <option value="applied">Applied</option>
                                    <option value="interview">Interview</option>
                                    <option value="offer">Offer</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>

                            {/* Rejected reason */}
                            {status === "rejected" && (
                                <textarea
                                    name="rejectedReason"
                                    value={formData.rejectedReason}
                                    onChange={handleChange}
                                    placeholder="Reason for Rejection"
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                    rows="2"
                                ></textarea>
                            )}

                            {/* Row 4 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="url"
                                    name="jobLink"
                                    value={formData?.jobLink}
                                    onChange={handleChange}
                                    placeholder="Job Link"
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                />
                                <input
                                    type="text"
                                    name="resumeUsed"
                                    value={formData?.resumeUsed}
                                    onChange={handleChange}
                                    placeholder="Resume Used"
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                />
                            </div>

                            {/* Row 5 */}
                            <textarea
                                name="notes"
                                value={formData?.notes}
                                onChange={handleChange}
                                placeholder="Any additional notes about this application"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                rows="3"
                            ></textarea>
                        </div>

                        {/* Sticky Footer */}
                        <div className="flex justify-end gap-3 p-4 bg-white">
                            <button
                                onClick={handleClose}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                            >
                                Close
                            </button>
                            {isEdit ? (
                                <button
                                    onClick={updateEditFormData}
                                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Update
                                </button>
                            ) : (
                                <button
                                    onClick={addFormData}
                                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            )}
                        </div>
                    </div>
                </div >
            )

            }
        </>
    );
}

export default ManageModal;

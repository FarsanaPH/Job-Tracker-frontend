import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfilePicAPI } from '../service/allApi';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { setUser } from '../redux/userSlice';

function DashTopper({isDashboard}) {

    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    // Profile pic updation
    const handleProfileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result;
            // update backend with patch
            const res = await updateUserProfilePicAPI(currentUser.id, { profilePic: base64String });
            // console.log(res);

            if (res?.status === 200) {
                const updatedUser = res.data;
                dispatch(setUser(updatedUser));
                localStorage.setItem("jt_user", JSON.stringify(updatedUser));
                toast.success("Profile picture updated!");
            }
        };
        reader.readAsDataURL(file);
    };
  return (
    <>
    {/* TOPPER of dashboardpage and joblistpage*/}
                <div className="flex justify-between items-center mb-6">
                    {
                        isDashboard ?
                        <h2 className="text-3xl font-bold">Dashboard<span className="bg-green-200 text-green-500 px-2 ms-1 rounded-full text-xs">Live</span></h2>
                        :
                        <h2 className="text-3xl font-bold">Applications</h2>
                    }
                    <label htmlFor="profileUpload" className="cursor-pointer">
                        {currentUser?.profilePic ? (
                            <img
                                src={currentUser?.profilePic}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover"
                                onClick={async () => {
                                    // confirm before removing
                                    const confirmRemove = window.confirm("Remove profile picture?");
                                    if (confirmRemove) {
                                        const res = await updateUserProfilePicAPI(currentUser.id, { profilePic: "" });
                                        if (res?.status === 200) {
                                            const updatedUser = res.data;
                                            dispatch(setUser(updatedUser));
                                            localStorage.setItem("jt_user", JSON.stringify(updatedUser));
                                            toast.success("Profile picture removed!");
                                        }
                                    }
                                }}
                            />
                        ) : (
                            <IoPersonCircleSharp className="text-5xl text-gray-400" />
                        )}
                    </label>

                    {/* only show file input when no profile pic */}
                    {!currentUser?.profilePic && (
                        <input
                            id="profileUpload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfileUpload}
                        />
                    )}
                </div>
    </>
  )
}

export default DashTopper
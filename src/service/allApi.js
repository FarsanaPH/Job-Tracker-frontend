
import { serverURL } from "./serverURL";
import { commonApi } from "./commonApi";

// -------------------For User

// Sign Up -> POST /users
export const registerAPI = (userData) => {
  return commonApi("POST", `${serverURL}/users`, userData);
};

// Sign In -> GET /users?email=...&password=...
export const loginAPI = ({ email, password }) => {
  const url = `${serverURL}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
  return commonApi("GET", url);
};

// (Optional) Check if email already exists -> GET /users?email=...
export const findUserByEmailAPI = (email) => {
  const url = `${serverURL}/users?email=${encodeURIComponent(email)}`;
  return commonApi("GET", url);
};



// ---------------------------For Jobs
// add Apply Data
export const addFormDataAPI = async(reqBody) => {
    return await commonApi("POST",`${serverURL}/applications`,reqBody)
}

// get User Specific application Data
export const getUserSpecificFormDataAPI = async (userId) => {
    return await commonApi("GET",`${serverURL}/applications?userId=${userId}`)
}

// // Delete a job data
export const deleteFormDataAPI = async (id) => {
    return await commonApi("DELETE",`${serverURL}/applications/${id}`,"")
}

// Edit a job Data - get
export const getEditFormDataAPI = async (id) => {
    return await commonApi("GET",`${serverURL}/applications/${id}`)
}

// Update a job Data
export const updateEditFormDataAPI = async (id, reqBody) => {
    return await commonApi("PUT",`${serverURL}/applications/${id}`,reqBody)
}
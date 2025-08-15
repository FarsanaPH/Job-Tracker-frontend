import axios from "axios";

export const commonApi = (httpRequest, url, reqBody = null, reqHeaders = {}) => {
  const reqConfig = {
    method: httpRequest,
    url,
    data: reqBody,
    headers: reqHeaders
  };

  return axios(reqConfig)
    .then((res) => res)
    .catch((error) => error.response || error);
};

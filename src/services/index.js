import axios from "../setup/axios";

const loginReq = (userData) => {
    return axios.post("/login", {
        username: userData.username,
        password: userData.password,
    });
};

const changePasswordReq = (userData) => {
    return axios.put("/account/update-password", {
        ...userData,
    });
};

const createLinkReq = (data) => {
    return axios.post("/link/create", { ...data });
};

const getLinkReq = () => {
    return axios.get("/link/read");
};

const updateLinkReq = (data) => {
    return axios.put("/link/update", { ...data });
};

const deleteLinkReq = (id) => {
    return axios.delete("/link/delete", { data: { id: id } });
};

const sendJwtReq = () => {
    return axios.get("/account/user-infor");
};

export default {
    loginReq,
    changePasswordReq,
    getLinkReq,
    sendJwtReq,
    updateLinkReq,
    deleteLinkReq,
    createLinkReq,
};

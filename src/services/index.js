import axios from "../setup/axios"

const loginReq = (userData) => {
    return axios.post("/login", {
        username: userData.username,
        password: userData.password
    })
}

const sendSignUpReq = (data) => {
    return axios.post("/register", {
        username: data.username,
        password: data.password
    })
}

const changePasswordReq = (data) => {
    return axios.put("/account/update-pass", {
        ...data
    })
}

const createLinkReq = (data) => {
    return axios.post("/link/create", { ...data })
}

const getLinkReq = () => {
    return axios.get("/link/read")
}

const getAllLinkReq = () => {
    return axios.get("/link/readAll")
}

const updateLinkReq = (data) => {
    return axios.put("/link/update", { ...data })
}

const deleteLinkReq = (id) => {
    return axios.delete("/link/delete", { data: { id: id } })
}

const sendJwtReq = () => {
    return axios.get("/account/user-infor")
}

export default {
    loginReq,
    sendSignUpReq,
    changePasswordReq,
    getLinkReq,
    getAllLinkReq,
    sendJwtReq,
    updateLinkReq,
    deleteLinkReq,
    createLinkReq
}

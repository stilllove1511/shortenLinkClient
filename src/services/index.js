import axios from "../setup/axios"

const loginReq = (userData) => {
    return axios.post("/login/", {
        username: userData.username,
        password: userData.password
    })
}

const sendSignUpReq = (data) => {
    return axios.post("/register/", {
        username: data.username,
        password: data.password
    })
}

const changePasswordReq = (data) => {
    return axios.put("/account/update-pass/", {
        ...data
    })
}

const createLinkReq = (data) => {
    return axios.post("/link/custom-create/", { ...data })
}

const getLinkReq = () => {
    return axios.get("/link/")
}

const getAllLinkReq = () => {
    return axios.get("/link/readAll/")
}

const updateLinkReq = (data) => {
    console.log(data.alias)
    return axios.put("/link/update/"+data.oldAlias, { ...data })
}

const deleteLinkReq = (alias) => {
    return axios.delete("/link/delete/"+alias)
}

const sendJwtReq = () => {
    return axios.get("/account/user-infor/")
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

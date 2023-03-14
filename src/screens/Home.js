import { Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import ModalCreateLink from "../components/ModalCreateLink/ModalCreateLink"
import ModalUpdateLink from "../components/ModalUpdateLink/ModalUpdateLink"
import { redirectorURL } from "../constants"
import services from "../services"
import ModalSignUp from "../components/ModalSignUp/ModalSignUp"
import ModalDeleteLink from "../components/ModalDeleteLink/ModalDeleteLink"
import { Fab } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import RefreshIcon from "@mui/icons-material/Refresh"
import EditIcon from "@mui/icons-material/Edit"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import "./Home.scss"

export default (props) => {
    const account = useSelector((state) => state.account.account)
    const jwt = useSelector((state) => state.account.jwt)
    const [linksList, setLinksList] = useState([])
    const [isFetchingLink, setIsFetchingLink] = useState(true)
    const [isShowUpdateLinkModal, setIsShowUpdateLinkModal] = useState(false)
    const [isShowSignUpModal, setIsShowSignUpModal] = useState(false)
    const [isShowCreateLinkModal, setIsShowCreateLinkModal] = useState(false)
    const [isShowDeleteLinkModal, setIsShowDeleteLinkModal] = useState(false)
    const [linkData, setLinkData] = useState({
        id: 0,
        title: "",
        originalLink: "",
        alias: ""
    })

    const handleDeleteLink = async (link) => {
        setLinkData(link)
        setIsShowDeleteLinkModal(true)
    }
    const fetchLink = async () => {
        try {
            let res = await services.getLinkReq()
            if (res && res.EC === 0) {
                setLinksList(res.DT)
                setIsFetchingLink(false)
            } else {
                toast.error("some thonf wrong!!")
                setIsFetchingLink(false)
            }
        } catch (error) {
            setIsFetchingLink(false)
        }
    }

    const handleShowSignUpModal = () => {
        setIsShowSignUpModal(true)
    }

    useEffect(() => {
        if (account.isLogin) fetchLink()
    }, [account.isLogin])

    return jwt.isSending ? (
        <>Loading...</>
    ) : !account.isLogin ? (
        <>
            Welcome!!
            <br />
            Haven't already have an account?{" "}
            <u
                style={{ cursor: "pointer" }}
                onClick={() => {
                    handleShowSignUpModal()
                }}
            >
                Sign up
            </u>{" "}
            <ModalSignUp
                show={isShowSignUpModal}
                onHide={() => {
                    setIsShowSignUpModal(false)
                }}
            />
        </>
    ) : isFetchingLink ? (
        <>Loading your links ...</>
    ) : (
        <>
            <Fab
                sx={{ position: "fixed", bottom: 16, right: 16 }}
                color="primary"
                aria-label="add"
                onClick={() => {
                    setIsShowCreateLinkModal(true)
                }}
            >
                <AddIcon />
            </Fab>
            <Fab
                sx={{ position: "fixed", bottom: 80, right: 16 }}
                color="primary"
                aria-label="add"
                onClick={() => {
                    setIsFetchingLink(true)
                    fetchLink()
                }}
            >
                <RefreshIcon />
            </Fab>

            <div className="row g-2">
                {linksList.map((link, index) => (
                    <div className="col">
                        <div
                            key={"link" + index}
                            className="card hover max-width-90"
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    redirectorURL + link.alias
                                )
                            }}
                        >
                            <div className="card-body">
                                <span className="card-title">
                                    <b>{link.title} </b>({link.originalLink})
                                </span>
                                <br />

                                <span className="card-text">
                                    {redirectorURL + link.alias}
                                </span>
                                <div className="hover__hover">
                                    <EditIcon
                                        className="text-warning"
                                        onClick={() => {
                                            setLinkData(link)

                                            setIsShowUpdateLinkModal(true)
                                        }}
                                    />
                                    <DeleteOutlineIcon
                                        className="text-danger"
                                        onClick={() => {
                                            handleDeleteLink(link)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ModalCreateLink
                show={isShowCreateLinkModal}
                onHide={() => {
                    setIsShowCreateLinkModal(false)
                }}
                refresh={fetchLink}
            />
            <ModalDeleteLink
                link={linkData}
                show={isShowDeleteLinkModal}
                onHide={() => {
                    setIsShowDeleteLinkModal(false)
                }}
                refresh={fetchLink}
            />
            <ModalUpdateLink
                show={isShowUpdateLinkModal}
                onHide={() => {
                    setIsShowUpdateLinkModal(false)
                }}
                refresh={fetchLink}
                linkData={linkData}
            />
        </>
    )
}

import { Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import ModalCreateLink from "../components/ModalCreateLink/ModalCreateLink"
import ModalUpdateLink from "../components/ModalUpdateLink/ModalUpdateLink"
import { baseURL } from "../constants"
import services from "../services"
import ModalSignUp from "../components/ModalSignUp/ModalSignUp"
import ModalDeleteLink from "../components/ModalDeleteLink/ModalDeleteLink"

export default (props) => {
    const account = useSelector((state) => state.account.account)
    const [linksList, setLinksList] = useState([])
    const [isShowUpdateLinkModal, setIsShowUpdateLinkModal] = useState(false)
    const [isShowSignUpModal, setIsShowSignUpModal] = useState(false)
    const [isShowCreateLinkModal, setIsShowCreateLinkModal] = useState(false)
    const [isShowDeleteLinkModal, setIsShowDeleteLinkModal] = useState(false)
    const [linkId, setLinkId] = useState(0)
    const [linkData, setLinkData] = useState({
        id: 0,
        title: "",
        originLink: "",
        shortenLink: "",
    })

    const handleDeleteLink = async (link) => {
        setLinkData(link)
        setIsShowDeleteLinkModal(true)
    }
    const fetchLink = async () => {
        let res = await services.getLinkReq()
        if (res && res.EC === 0) {
            setLinksList(res.DT)
        } else {
            toast.error("some thonf wrong!!")
        }
    }

    const handleShowSignUpModal = () => {
        setIsShowSignUpModal(true)
    }

    useEffect(() => {
        if (account.isLogin) fetchLink()
    }, [account.isLogin])

    return account.isLoading ? (
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
    ) : (
        <>
            <button
                className="btn btn-success"
                onClick={() => {
                    setIsShowCreateLinkModal(true)
                }}
            >
                Create link
            </button>
            <div className="row g-2">
                {linksList.map((link, index) => (
                    <div key={"link" + index} className="card">
                        <div className="card-body">
                            <h5 className="card-title">{link.title}</h5>
                            <p className="card-text">
                                <b>Shorten link: </b>
                                {baseURL + link.shortenLink}
                            </p>
                            <button
                                className="btn btn-warning"
                                onClick={() => {
                                    setLinkId(link.id)

                                    setLinkData(link)

                                    setIsShowUpdateLinkModal(true)
                                }}
                            >
                                Update
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    handleDeleteLink(link)
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <ModalUpdateLink
                show={isShowUpdateLinkModal}
                onHide={async (isRefresh = false) => {
                    setIsShowUpdateLinkModal(false)
                    if (isRefresh) await fetchLink()
                }}
                linkId={linkId}
                linkData={linkData}
            />
            <ModalCreateLink
                show={isShowCreateLinkModal}
                onHide={async (isRefresh = false) => {
                    setIsShowCreateLinkModal(false)
                    if (isRefresh) await fetchLink()
                }}
            />
            <ModalDeleteLink
                link={linkData}
                show={isShowDeleteLinkModal}
                onHide={async (isRefresh = false) => {
                    setIsShowDeleteLinkModal(false)
                    if (isRefresh) await fetchLink()
                }}
            />
        </>
    )
}

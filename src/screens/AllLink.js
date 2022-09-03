import { Fragment, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { baseURL } from "../constants"
import services from "../services"
import { redirectorURL } from "../constants"

export default (props) => {
    const [linksList, setLinksList] = useState([])
    const [isFetchingLink, setIsFetchingLink] = useState(false)

    const fetchAllLink = async () => {
        setIsFetchingLink(true)
        try {
            let res = await services.getAllLinkReq()
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

    useEffect(() => {
        fetchAllLink()
    }, [])

    return isFetchingLink ? (
        <>Loading links ...</>
    ) : (
        <>
            <div className="row g-2">
                {linksList.map((link, index) => (
                    <div key={"link" + index} className="card">
                        <div
                            className="card-body"
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    redirectorURL + link.shortenLink
                                )
                                toast.success("copied to clipboad")
                            }}
                        >
                            <span className="card-text">
                                <b>Original link: </b>
                                <u
                                    onClick={() => {
                                        window.open(link.originLink)
                                    }}
                                >
                                    {link.originLink}
                                </u>
                                <br />
                                <b>Shorten link: </b>
                                {baseURL + link.shortenLink}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

import { Fragment, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { baseURL } from "../constants"
import services from "../services"

export default (props) => {
    const [linksList, setLinksList] = useState([])

    const fetchAllLink = async () => {
        let res = await services.getAllLinkReq()
        if (res && res.EC === 0) {
            setLinksList(res.DT)
        } else {
            toast.error("some thonf wrong!!")
        }
    }

    useEffect(() => {
        fetchAllLink()
    }, [])

    return (
        <>
            <div className="row g-2">
                {linksList.map((link, index) => (
                    <div
                        key={"link" + index}
                        className="card"
                        onClick={() => {
                            window.location.replace(link.originLink)
                        }}
                    >
                        <div className="card-body">
                            <h5 className="card-title">{link.title}</h5>
                            <p className="card-text">
                                <b>Original link: </b>
                                {link.originLink}
                            </p>
                            <p className="card-text">
                                <b>Shorten link: </b>
                                {baseURL + link.shortenLink}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

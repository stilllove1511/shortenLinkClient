import { Button, Modal } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { getLink } from "../../redux/features/link/linkSlice"
import services from "../../services"

export default (props) => {
    const [title, setTitle] = useState("")
    const [originLink, setOriginLink] = useState("")
    const [shortenLink, setShortenLink] = useState("")
    const [errorText, setErrorText] = useState("")
    const [inforText, setInforText] = useState("")
    const [successText, setSuccessText] = useState("")

    const [titleError, setTitleError] = useState(false)
    const [originLinkError, setOriginLinkError] = useState(false)
    const [shortenLinkError, setShortenLinkError] = useState(false)

    const sendRequest = async () => {
        setInforText("Loading ...")
        setSuccessText("")
        if (!title) {
            setTitleError(true)
        } else {
            setTitleError(false)
        }
        if (!originLink) {
            setOriginLinkError(true)
        } else {
            setOriginLinkError(false)
        }
        if (!shortenLink) {
            setShortenLinkError(true)
            return
        } else {
            setShortenLinkError(false)
        }
        if (title && originLink && shortenLink);
        else {
            return
        }
        let response = await services.updateLinkReq({
            id: props.linkData.id,
            title,
            originLink,
            shortenLink,
        })
        if (response.EC === 0) {
            // props.onHide(true)
            // setTitle("")
            // setOriginLink("")
            // setShortenLink("")
            props.onHide(true, () => {})
            setTitleError(false)
            setOriginLinkError(false)
            setShortenLinkError(false)
            setSuccessText(response.EM)
        } else {
            setErrorText(response.EM)
        }
        setInforText("")
    }

    useEffect(() => {
        setTitle(props.linkData.title)
        setOriginLink(props.linkData.originLink)
        setShortenLink(props.linkData.shortenLink)
    }, [props.linkData])

    return (
        <>
            <Modal
                show={props.show}
                onHide={() => {
                    props.onHide()
                    setTitle("")
                    setOriginLink("")
                    setShortenLink("")
                    setSuccessText("")
                    setErrorText("")
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Link</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            onChange={(event) => {
                                setTitle(event.target.value)
                            }}
                            type="text"
                            className={
                                titleError
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            id="username"
                            value={title}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="originLink" className="form-label">
                            Original link
                        </label>
                        <input
                            type="text"
                            className={
                                originLinkError
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            id="originLink"
                            onChange={(event) =>
                                setOriginLink(event.target.value)
                            }
                            value={originLink}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="shortenLink" className="form-label">
                            Shorten link
                        </label>
                        <input
                            type="text"
                            className={
                                shortenLinkError
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            id="shortenLink"
                            onChange={(event) =>
                                setShortenLink(event.target.value)
                            }
                            value={shortenLink}
                        />
                    </div>
                    <div className="mb-3 text-danger">{errorText}</div>
                    <div className="mb-3 text-primary">{inforText}</div>
                    <div className="mb-3 text-success">{successText}</div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => sendRequest()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

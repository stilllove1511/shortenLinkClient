import { Button, Modal } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { getLink } from "../../redux/features/link/linkSlice"
import services from "../../services"

export default (props) => {
    const [title, setTitle] = useState()
    const [originLink, setOriginLink] = useState()
    const [shortenLink, setShortenLink] = useState()
    const [errorText, setErrorText] = useState("")

    const [titleError, setTitleError] = useState(false)
    const [originLinkError, setOriginLinkError] = useState(false)
    const [shortenLinkError, setShortenLinkError] = useState(false)

    const sendRequest = async () => {
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
        let response = await services.createLinkReq({
            title,
            originLink,
            shortenLink,
        })
        if (response.EC === 0) {
            props.onHide(true)
            setTitle("")
            setOriginLink("")
            setShortenLink("")
            setTitleError(false)
            setOriginLinkError(false)
            setShortenLinkError(false)
        } else {
            setErrorText(response.EM)
        }
    }

    return (
        <>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Link</Modal.Title>
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
                    <div className="mb-3">{errorText}</div>
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

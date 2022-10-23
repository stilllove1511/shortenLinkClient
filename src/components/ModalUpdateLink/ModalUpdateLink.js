import { Button, Modal } from "react-bootstrap"
import { useEffect, useState } from "react"
import services from "../../services"
import { useForm, Controller } from "react-hook-form"

export default (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            firstName: "",
            select: {}
        }
    })
    const [title, setTitle] = useState("")
    const [originLink, setOriginLink] = useState("")
    const [shortenLink, setShortenLink] = useState("")
    const [Alert, setAlert] = useState("")

    const sendRequest = async () => {
        setAlert(<div className="text-primary">Loading ...</div>)
        let response = await services.updateLinkReq({
            id: props.linkData.id,
            title,
            originLink,
            shortenLink
        })
        if (response.EC === 0) {
            props.onHide()
            setAlert(<div className="text-success">{response.EM}</div>)
            props.refresh()
        } else {
            setAlert(<div className="text-danger">{response.EM}</div>)
        }
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
                            {...register("title", { required: true })}
                            onChange={(event) => {
                                setTitle(event.target.value)
                            }}
                            type="text"
                            className={
                                errors.title
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            id="title"
                            value={title}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="originLink" className="form-label">
                            Original link
                        </label>
                        <input
                            {...register("originLink", { required: true })}
                            type="text"
                            className={
                                errors.originLink
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
                            {...register("shortenLink", { required: true })}
                            type="text"
                            className={
                                errors.shortenLink
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
                    {Alert}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit(sendRequest)}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

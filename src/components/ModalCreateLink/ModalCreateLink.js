import { Button, Modal } from "react-bootstrap"
import { useEffect, useState } from "react"
import services from "../../services"
import { useForm } from "react-hook-form"

export default (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const [title, setTitle] = useState("")
    const [originalLink, setOriginLink] = useState("")
    const [alias, setShortenLink] = useState("")
    const [Alert, setAlert] = useState("")

    const sendRequest = async () => {
        setAlert(<div className="text-primary">Loading ...</div>)
        try {
            let response = await services.createLinkReq({
                title,
                originalLink,
                alias
            })
            if (response.EC === 0) {
                props.onHide()
                setTitle("")
                setOriginLink("")
                setShortenLink("")
                setAlert("")
                props.refresh()
            } else {
                setAlert(<div className="text-danger">{response.EM}</div>)
            }
        } catch (error) {
            setAlert(
                <div className="text-danger">Server have not responsed</div>
            )
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
                        <label htmlFor="originalLink" className="form-label">
                            Original link
                        </label>
                        <input
                            {...register("originalLink", { required: true })}
                            type="text"
                            className={
                                errors.originalLink
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            id="originalLink"
                            onChange={(event) =>
                                setOriginLink(event.target.value)
                            }
                            value={originalLink}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="alias" className="form-label">
                            Shorten link
                        </label>
                        <input
                            {...register("alias", { required: true })}
                            type="text"
                            className={
                                errors.alias
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            id="alias"
                            onChange={(event) =>
                                setShortenLink(event.target.value)
                            }
                            value={alias}
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

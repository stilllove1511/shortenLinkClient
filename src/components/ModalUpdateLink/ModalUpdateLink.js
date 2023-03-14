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
    const [originalLink, setOriginLink] = useState("")
    const [newAlias, setShortenLink] = useState("")
    const [Alert, setAlert] = useState("")

    const sendRequest = async () => {
        setAlert(<div className="text-primary">Loading ...</div>)
        console.log(newAlias)
        let response = await services.updateLinkReq({
            oldAlias: props.linkData.alias,
            title,
            originalLink,
            alias: newAlias
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
        setOriginLink(props.linkData.originalLink)
        setShortenLink(props.linkData.alias)
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
                            value={title || props.linkData.title}
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
                            value={originalLink || props.linkData.originalLink}
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
                            onChange={(event) =>{
                                setShortenLink(event.target.value)
                                console.log(newAlias)
                            }}
                            value={newAlias || props.linkData.alias}
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

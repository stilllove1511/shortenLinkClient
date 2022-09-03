import { Button, Modal } from "react-bootstrap"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import services from "../../services"

export default (props) => {
    const [linkId, setLinkId] = useState(0)
    const [errorText, setErrorText] = useState("")
    const [inforText, setInforText] = useState("")

    const sendRequest = async () => {
        setInforText("Loading ...")
        try {
            let response = await services.deleteLinkReq(props.link.id)
            if (response) {
                if (response.EC === 0) {
                    setInforText("")
                    props.onHide(true, () => {})
                } else {
                    setInforText("")
                    setErrorText(response.EM)
                }
            }
        } catch (error) {
            setInforText("")
            setErrorText("server have not responsed")
        }
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={(isRefresh) => {
                    props.onHide(isRefresh, () => {
                        setErrorText("")
                    })
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete {props.link.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="mb-3">Delete {props.link.title}</div>
                    <div className="mb-3 text-danger">{errorText}</div>
                    <div className="mb-3 text-primary">{inforText}</div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={() => sendRequest()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

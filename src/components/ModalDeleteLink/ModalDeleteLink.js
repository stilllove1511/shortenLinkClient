import { Button, Modal } from "react-bootstrap"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import services from "../../services"

export default (props) => {
    const [linkId, setLinkId] = useState(0)

    const sendRequest = async () => {
        let response = await services.deleteLinkReq(props.link.id)
        if (response.EC === 0) {
            props.onHide(true)
        } else {
            toast.error(response.EM)
        }
    }

    return (
        <>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {props.link.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="mb-3">Delete {props.link.title}</div>
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

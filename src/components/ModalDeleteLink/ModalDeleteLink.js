import { Button, Modal } from "react-bootstrap"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import services from "../../services"

export default (props) => {
    const [linkId, setLinkId] = useState(0)
    const [Alert, setAlert] = useState("")
    const sendRequest = async () => {
        setAlert(<div className="text-primary">Loading ...</div>)
        try {
            let response = await services.deleteLinkReq(props.link.id)
            if (response) {
                if (response.EC === 0) {
                    setAlert("")
                    props.onHide()
                    props.refresh()
                } else {
                    setAlert(<div className="text-danger">{response.EM}</div>)
                }
            }
        } catch (error) {
            setAlert(
                <div className="text-danger">server have not responsed</div>
            )
        }
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={() => {
                    props.onHide()
                    setAlert("")
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete {props.link.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="mb-3">Delete {props.link.title}</div>
                    {Alert}
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

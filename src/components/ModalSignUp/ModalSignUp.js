import { Modal, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import services from "../../services"

export default (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const sendRequest = async () => {
        if (!username) {
            toast.error("Please enter your username")
            return
        }
        if (!password) {
            toast.error("Please enter your password")
            return
        }
        let res = await services.sendSignUpReq({ username, password })
        if (res.EC === 0) {
            toast.success("sign up success")
            props.onHide()
            setUsername("")
            setPassword("")
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign up</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                            type="text"
                            className="form-control"
                            value={username}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            value={password}
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={sendRequest}>
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
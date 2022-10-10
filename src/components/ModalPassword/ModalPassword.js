import { Modal, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import services from "../../services"

export default (props) => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [Alert, setAlert] = useState("")

    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)

    const sendRequest = async () => {
        setAlert(<div className="text-primary">Loading ...</div>)
        try {
            if (!password) {
                setPasswordError(true)
                setConfirmPasswordError(false)
                setAlert(<div className="text-danger">Enter password</div>)
                return
            } else {
                setPasswordError(false)
            }
            if (!confirmPassword) {
                setPasswordError(false)

                setConfirmPasswordError(true)
                setAlert(<div className="text-danger">Confirm password</div>)
                return
            } else {
                setConfirmPasswordError(false)
            }
            if (password !== confirmPassword) {
                setConfirmPasswordError(true)
                setAlert(
                    <div className="text-danger">
                        your password is not confrim
                    </div>
                )
                return
            }
            let res = await services.changePasswordReq({ password })
            if (res.EC === 0) {
                setAlert(<div className="text-success">{res.EM}</div>)
                setPasswordError(false)
                setConfirmPasswordError(false)
                setPassword("")
                setConfirmPassword("")
            } else {
                setPasswordError(false)
                setConfirmPasswordError(false)
                setAlert(<div className="text-danger">{res.EM}</div>)
            }
            setAlert(<div className="text-danger">{res.EM}</div>)
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
                    <Modal.Title>Update Password</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className={
                                passwordError
                                    ? "form-control  is-invalid"
                                    : "form-control"
                            }
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            value={password}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Comfirm password</label>
                        <input
                            type="password"
                            className={
                                confirmPasswordError
                                    ? "form-control  is-invalid"
                                    : "form-control"
                            }
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            value={confirmPassword}
                        />
                    </div>
                    {Alert}
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

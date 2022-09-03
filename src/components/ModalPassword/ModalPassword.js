import { Modal, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import services from "../../services"

export default (props) => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [successText, setSuccessText] = useState("")
    const [errorText, setErrorText] = useState("")
    const [inforText, setInforText] = useState("")

    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)

    const sendRequest = async () => {
        setSuccessText("")
        setErrorText("")
        setInforText("Loading ...")
        try {
            if (!password) {
                setPasswordError(true)
                setConfirmPasswordError(false)
                setErrorText("Please enter your password")
                return
            }
            if (!confirmPassword) {
                setPasswordError(false)

                setConfirmPasswordError(true)
                setErrorText("Please comfirm your password")
                return
            }
            if (password !== confirmPassword) {
                setConfirmPasswordError(true)
                setErrorText("your password is not confrim")
                return
            }
            let res = await services.changePasswordReq({ password })
            if (res.EC === 0) {
                setSuccessText(res.EM)
                setPasswordError(false)
                setConfirmPasswordError(false)
                setPassword("")
                setConfirmPassword("")
                setErrorText("")
            } else {
                setPasswordError(false)
                setConfirmPasswordError(false)
                setErrorText(res.EM)
            }
        } catch (error) {
            setInforText("")
            setErrorText("Server have not responsed")
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
                    <div className="mb-3 text-danger">{errorText}</div>
                    <div className="mb-3 text-primary">{inforText}</div>
                    <div className="mb-3 text-success">{successText}</div>
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

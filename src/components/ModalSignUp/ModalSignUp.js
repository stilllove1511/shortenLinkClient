import { Modal, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import services from "../../services"

export default (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorText, setErrorText] = useState("")
    const [inforText, setInforText] = useState("")

    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)

    const sendRequest = async () => {
        setInforText("Loading ...")
        if (!username) {
            setUsernameError(true)
            setPasswordError(false)
            setConfirmPasswordError(false)
            setErrorText("Please enter your username")
            return
        }
        if (!password) {
            setUsernameError(false)
            setPasswordError(true)
            setConfirmPasswordError(false)
            setErrorText("Please enter your password")
            return
        }
        if (!confirmPassword) {
            setUsernameError(false)
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
        let res = await services.sendSignUpReq({ username, password })
        if (res.EC === 0) {
            toast.success("sign up success")
            props.onHide()
            setUsername("")
            setPassword("")
            setErrorText("")
        } else {
            setUsernameError(false)
            setPasswordError(false)
            setConfirmPasswordError(false)
            setErrorText(res.EM)
        }
        setInforText("")
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
                            className={
                                usernameError
                                    ? "form-control  is-invalid"
                                    : "form-control"
                            }
                            value={username}
                        />
                    </div>

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

import { Modal, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { login, clearEM } from "../../redux/features/account/accountSlice"
import { useSelector, useDispatch } from "react-redux"
import { baseURL } from "../../constants"

export default (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [Alert, setAlert] = useState("")
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const dispatch = useDispatch()
    const account = useSelector((state) => state.account.account)
    const isLoading = useSelector((state) => state.account.isLoading)
    const isError = useSelector((state) => state.account.isError)
    const isSuccess = useSelector((state) => state.account.isSuccess)
    const resEM = useSelector((state) => state.account.EM)

    const sendLoginRequest = async () => {
        try {
            setAlert("")
            if (!username) {
                setUsernameError(true)
                setAlert(
                    <div className="text-danger">
                        These fields cannot be empty
                    </div>
                )
            } else {
                setUsernameError(false)
            }
            if (!password) {
                setPasswordError(true)
                setAlert(
                    <div className="text-danger">
                        These fields cannot be empty
                    </div>
                )
                return
            } else {
                setPasswordError(false)
            }
            if (username && password);
            else return

            setAlert("")

            dispatch(login({ username, password }))
        } catch (error) {
            setAlert(<div className="text-dander">{error}</div>)
        }
    }

    useEffect(() => {
        if (isSuccess) {
            props.onHide()
            dispatch(clearEM())
        }
        if (isLoading) {
            setAlert(<div className="text-primary">{"Loading ..."}</div>)
        } else {
            setAlert("")
        }
    }, [isSuccess, isLoading])
    return (
        <>
            <Modal
                show={props.show}
                onHide={() => {
                    props.onHide()
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Log in</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                            type="text"
                            className={
                                usernameError
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            id="username"
                            value={username}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className={
                                passwordError
                                    ? "form-control  is-invalid"
                                    : "form-control"
                            }
                            id="password"
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            value={password}
                        />
                    </div>
                    <u
                        onClick={() => {
                            window.location.href =
                                baseURL + "login/federated/google"
                        }}
                    >
                        Or login with Google
                    </u>
                    {Alert || <div className="text-danger">{resEM}</div>}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={sendLoginRequest}>
                        Log in
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

import { Modal, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { login, clearEM } from "../../redux/features/account/accountSlice"
import { useSelector, useDispatch } from "react-redux"
import { baseURL } from "../../constants"
import { useForm } from "react-hook-form"

export default (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [Alert, setAlert] = useState("")
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.account.isLoading)
    const isSuccess = useSelector((state) => state.account.isSuccess)
    const resEM = useSelector((state) => state.account.EM)

    const sendLoginRequest = async () => {
        try {
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
                            {...register("username", { required: true })}
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                            type="text"
                            className={
                                errors.username
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
                            {...register("password", { required: true })}
                            type="password"
                            className={
                                errors.password
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
                    <Button
                        variant="primary"
                        onClick={handleSubmit(sendLoginRequest)}
                    >
                        Log in
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

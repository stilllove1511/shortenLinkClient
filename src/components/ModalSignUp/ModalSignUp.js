import { Modal, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import services from "../../services"
import { useForm } from "react-hook-form"

export default (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [Alert, setAlert] = useState("")

    const sendRequest = async () => {
        setAlert(<div className="text-primary">Loading ...</div>)
        let res = await services.sendSignUpReq({ username, password })
        if (res.EC === 0) {
            toast.success("sign up success")
            props.onHide()
            setUsername("")
            setPassword("")
            setAlert("")
        } else {
            setAlert(<div className="text-danger">{res.EM}</div>)
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
                            {...register("username", { required: true })}
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                            type="text"
                            className={
                                errors.username
                                    ? "form-control  is-invalid"
                                    : "form-control"
                            }
                            value={username}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            {...register("password", { required: true })}
                            type="password"
                            className={
                                errors.password
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
                            {...register("confirmPassword", {
                                required: true,
                                validate: (confirmPassword) => {
                                    if (confirmPassword === password)
                                        return true
                                    else return "not same"
                                }
                            })}
                            type="password"
                            className={
                                errors.confirmPassword
                                    ? "form-control  is-invalid"
                                    : "form-control"
                            }
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            value={confirmPassword}
                        />
                        {
                            <div className="text-danger">
                                {errors.confirmPassword?.message}
                            </div>
                        }
                    </div>
                    {Alert}
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={handleSubmit(sendRequest)}
                    >
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

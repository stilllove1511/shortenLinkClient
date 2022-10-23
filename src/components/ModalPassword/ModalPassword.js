import { Modal, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import services from "../../services"
import { useForm } from "react-hook-form"

export default (props) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [Alert, setAlert] = useState("")

    const sendRequest = async () => {
        setAlert(<div className="text-primary">Loading ...</div>)
        try {
            let res = await services.changePasswordReq({ password })
            if (res.EC === 0) {
                setAlert(<div className="text-success">{res.EM}</div>)
                setPassword("")
                setConfirmPassword("")
            } else {
                setAlert(<div className="text-danger">{res.EM}</div>)
            }
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
                                validate: (confirmPassword) =>
                                    confirmPassword === password
                                        ? true
                                        : "not same"
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

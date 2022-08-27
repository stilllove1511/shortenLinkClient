import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { login, clearState } from "../../redux/features/account/accountSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const account = useSelector((state) => state.account.account);
    const isLoading = useSelector((state) => state.account.isLoading);
    const isError = useSelector((state) => state.account.isError);
    const isSuccess = useSelector((state) => state.account.isSuccess);

    const sendLoginRequest = async () => {
        if (!username) {
            toast.error("Please enter your username");
            return;
        }
        if (!password) {
            toast.error("Please enter your password");
            return;
        }
        dispatch(login({ username, password }));
    };

    useEffect(() => {
        if (isSuccess) {
            props.onHide();
        }
    }, [isError, isSuccess]);
    return (
        <>
            <Modal show={props.show} onHide={props.onHide}>
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
                                setUsername(event.target.value);
                            }}
                            type="text"
                            className="form-control"
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
                            className="form-control"
                            id="password"
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            value={password}
                        />
                    </div>
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
    );
};

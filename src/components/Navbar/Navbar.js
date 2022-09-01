import "./Navbar.scss"
import ModalLogin from "../ModalLogin/ModalLogin"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../redux/features/account/accountSlice"
import services from "../../services"
import { Link } from "react-router-dom"

export default (props) => {
    const dispatch = useDispatch()
    const [isShowLoginModal, setIsShowLoginModal] = useState(false)
    const [isShowPasswordModal, setIsShowPasswordModal] = useState(false)
    const account = useSelector((state) => state.account.account)

    const handleCloseModal = () => {
        setIsShowLoginModal(false)
        setIsShowPasswordModal(false)
    }
    const handleShowLoginModal = () => setIsShowLoginModal(true)
    const handleShowPasswordModal = () => setIsShowPasswordModal(true)
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        Shorten Link
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon">
                            <i className="bi bi-text-center"></i>
                        </span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    to="/allLink"
                                >
                                    All Link
                                </Link>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link disabled">
                                    Somethings
                                </span>
                            </li>
                        </ul>

                        <ul className="navbar-nav">
                            {!account.isLogin && <></>}
                        </ul>
                        <ul className="navbar-nav">
                            {!account.isLogin && (
                                <li
                                    className="nav-item"
                                    onClick={handleShowLoginModal}
                                >
                                    <span
                                        className="nav-link active"
                                        aria-current="page"
                                        style={{ cursor: "pointer" }}
                                    >
                                        Log in
                                    </span>
                                </li>
                            )}
                            {account.isLogin && (
                                <li className="nav-item dropdown">
                                    <span
                                        className="nav-link dropdown-toggle"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {account.info.username}
                                    </span>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <span className="dropdown-item">
                                                Menu item
                                            </span>
                                        </li>
                                        <li>
                                            <span
                                                className="dropdown-item"
                                                onClick={() => {
                                                    handleShowPasswordModal()
                                                }}
                                            >
                                                Change password
                                            </span>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <span
                                                className="dropdown-item"
                                                onClick={() =>
                                                    dispatch(logout())
                                                }
                                            >
                                                Log out
                                            </span>
                                        </li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <ModalLogin show={isShowLoginModal} onHide={handleCloseModal} />
        </>
    )
}

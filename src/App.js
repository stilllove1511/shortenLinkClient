import { BrowserRouter, Link, Routes, Route } from "react-router-dom"
import "./App.css"
import Navbar from "./components/Navbar/Navbar"
import Home from "./screens/Home"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { sendJwt } from "./redux/features/account/accountSlice"
import AllLink from "./screens/AllLink"

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        // window.history.pushState("", "", "/")
        dispatch(sendJwt())
    }, [])
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container mt-2">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sl" element={<Home />} />
                    <Route path="/allLink" element={<AllLink />} />
                </Routes>
            </div>
            <ToastContainer position="bottom-right" />
        </BrowserRouter>
    )
}

export default App

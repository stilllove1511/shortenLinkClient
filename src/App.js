import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./screens/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { sendJwt } from "./redux/features/account/accountSlice";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(sendJwt());
    }, []);
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container mt-2">
                <Home />
            </div>
            <ToastContainer position="bottom-right" />
        </BrowserRouter>
    );
}

export default App;

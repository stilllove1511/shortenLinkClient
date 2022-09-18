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
            <ToastContainer position="top-center" />
        </BrowserRouter>
    )
}

export default App

// import React, { useState, useEffect } from "react"
// import { GoogleLogin, GoogleLogout } from "react-google-login"
// import { gapi } from "gapi-script"

// function App() {
//     const [profile, setProfile] = useState([])
//     const clientId =
//         "434535066606-gib6cr8c72avd4jt6s3h04ai21ra0leh.apps.googleusercontent.com"
//     useEffect(() => {
//         const initClient = () => {
//             gapi.client.init({
//                 clientId: clientId,
//                 scope: ""
//             })
//         }
//         gapi.load("client:auth2", initClient)
//     })

//     const onSuccess = (res) => {
//         console.log("sucess:", res)
//         setProfile(res.profileObj)
//         // fetch("http://localhost:8081/gglogin", {
//         //     method: "POST", // or 'PUT'
//         //     headers: {
//         //         "Content-Type": "application/json"
//         //     },
//         //     body: JSON.stringify({
//         //         token: res.tokenId
//         //     })
//         // })
//         //     .then((response) => response.json())
//         //     .then((data) => {
//         //         console.log("Success:", data)
//         //     })
//         //     .catch((error) => {
//         //         console.error("Error:", error)
//         //     })
//     }

//     const onFailure = (err) => {
//         console.log("failed", err)
//     }

//     const logOut = () => {
//         setProfile(null)
//     }

//     return (
//         <div>
//             <h2>React Google Login</h2>
//             <br />
//             <br />
//             {profile ? (
//                 <div>
//                     <img src={profile.imageUrl} alt="user image" />
//                     <h3>User Logged in</h3>
//                     <p>Name: {profile.name}</p>
//                     <p>Email Address: {profile.email}</p>
//                     <br />
//                     <br />
//                     <GoogleLogout
//                         clientId={clientId}
//                         buttonText="Log out"
//                         onLogoutSuccess={logOut}
//                     />
//                 </div>
//             ) : (
//                 <GoogleLogin
//                     clientId={clientId}
//                     buttonText="Sign in with Google"
//                     onSuccess={onSuccess}
//                     onFailure={onFailure}
//                     cookiePolicy={"single_host_origin"}
//                     isSignedIn={true}
//                 />
//             )}
//         </div>
//     )
// }
// export default App

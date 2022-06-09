import React, { useState, useEffect, useContext } from 'react'
import { Layout, DomHead } from "../components";
import SideBar from '../components/Navbar/SideBar';
import { Notification, validateEmail } from "../helpers"
import DataContext from "../context/DataContext"
import { Navigate } from 'react-router';

const notif = new Notification(4000)

const sleep = (sec = 1) => { return new Promise((res) => setTimeout(res, sec * 1000)) }

function Login() {

    const { isAuthenticated } = useContext(DataContext)
    const [active, setActive] = useState(false)

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }


    function toggleForm() {
        setActive(!active)
    }

    return (
        <div className="relative  flex flex-row items-center justify-center w-screen h-screen">
            <DomHead />
            <div className="w-[450px] h-auto mx-auto  flex flex-col items-center justify-center p-2 ">
                <h1 className="text-green-200 font-extrabold text-[55px] ">Tymonial</h1>
                <p className="text-white-200 font-extrabold text-[15px] ">
                    Collect users feedbacks with ease.
                </p>
                <br />
                <div className="w-[350px] h-auto rounded-md p-4 flex flex-col items-center justify-center ">
                    <button className="px-6 py-4 bg-green-200 text-dark-200 font-extrabold text-[20px] rounded-[30px] mt-3 w-[250px] transition-all scale-[.90] hover:scale-[.95] " onClick={toggleForm}>Sign In</button>
                </div>
                <br />
                <br />
            </div>
            {active && <AuthForm toggleForm={toggleForm} />}
        </div>
    )
}

export default Login

function AuthForm({ toggleForm }) {

    const [activeName, setActiveName] = useState("login")

    return (
        <div className="w-screen h-screen absolute top-0 left-0 flex flex-col items-center justify-center bg-dark-400 ">
            <div className="w-[350px] h-auto p-5 rounded-md bg-dark-200 ">
                <div id="head" className="w-full flex flex-col items-start justify-start">
                    <h1 className=" text-white-100  ">Trakka Authentication</h1>
                    <div className="w-full flex flex-row items-start justify-start py-3">
                        <span className={`px-4 py-2 ${activeName === "login" ? "bg-dark-100" : "bg-dark-200"} rounded-md transition-all scale-[.90] hover:scale-[.95] cursor-pointer `} onClick={() => setActiveName("login")}>
                            Login
                        </span>
                        <span className={`px-4 py-2 ${activeName === "signup" ? "bg-dark-100" : "bg-dark-200"} rounded-md transition-all scale-[.90] hover:scale-[.95] cursor-pointer `} onClick={() => setActiveName("signup")}>
                            Signup
                        </span>
                    </div>

                    <br />
                </div>
                {activeName === "login" ? <LoginForm toggleForm={toggleForm} setActiveName={setActiveName} /> : <SignupForm toggleForm={toggleForm} setActiveName={setActiveName} />}

            </div>
        </div>
    )
}

function LoginForm({ toggleForm, setActiveName }) {

    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    function handleInput(e) {
        let name = e.target.name
        let val = e.target.value;

        setInputs((prevVal) => ({ ...prevVal, [name]: val }))
    }

    async function loginUser() {

        const { email, password } = inputs

        if (email === "") {
            return notif.error("email cant be blank")
        }
        if (password === "") {
            return notif.error("password cant be blank")
        }
        if (validateEmail(email) === false) {
            return notif.error("email is invalid")
        }

        try {
            const data = { ...inputs }

            const url = "http://localhost:8080/api/v2/auth/login"
            setLoading(true)
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const result = await res.json()

            setLoading(false)

            if (result && result.error === true) {
                return notif.error(result.message)
            }

            notif.success(result.message)
            localStorage.setItem("trakka-auth", JSON.stringify(result.data))
            await sleep(2)
            window.location = "/dashboard"
            return
        } catch (err) {
            setLoading(false)
            return notif.error(err.message)
        }
    }

    return (
        <div className="w-full">
            <input type="text" placeholder='Email' className="w-full h-auto p-2 rounded-md bg-dark-100" name="email" onChange={handleInput} />
            <br />
            <br />
            <input type="password" placeholder='Password' className="w-full h-auto p-2 rounded-md bg-dark-100" name="password" onChange={handleInput} />
            <br />
            <br />
            <div className="w-full flex flex-row items-end align-start justify-end
                ">
                <button className="rounded-md ml-5 px-4 py-2 bg-dark-100 text-white-100 font-extrabold scale-[.90] hover:scale-[.95] transition-all" onClick={toggleForm}>
                    Cancel
                </button>
                <button className="rounded-md ml-5 px-4 py-2 bg-green-200 text-dark-100 font-extrabold scale-[.90] hover:scale-[.95] transition-all " onClick={loginUser}>
                    {loading ? "Signing ..." : "Sign In"}
                </button>
            </div>
        </div>
    )
}

function SignupForm({ toggleForm, setActiveName }) {

    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
    })

    function handleInput(e) {
        let name = e.target.name
        let val = e.target.value;

        setInputs((prevVal) => ({ ...prevVal, [name]: val }))
    }

    async function createAccount() {

        const { username, email, password } = inputs

        if (username === "") {
            return notif.error("username cant be blank")
        }
        if (email === "") {
            return notif.error("email cant be blank")
        }
        if (password === "") {
            return notif.error("password cant be blank")
        }
        if (validateEmail(email) === false) {
            return notif.error("email is invalid")
        }

        try {
            const data = { ...inputs }

            const url = "http://localhost:8080/api/v2/auth/register"
            setLoading(true)
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const result = await res.json()

            setLoading(false)

            if (result && result.error === true) {
                return notif.error(result.message)
            }

            notif.success(result.message)
            await sleep(2)
            setActiveName("login")
            return
        } catch (err) {
            setLoading(false)
            return notif.error(err.message)
        }
    }

    return (
        <div className="w-full">
            <input type="text" placeholder='username' className="w-full h-auto p-2 rounded-md bg-dark-100" name="username" onChange={handleInput} />
            <br />
            <br />
            <input type="text" placeholder='Email' className="w-full h-auto p-2 rounded-md bg-dark-100" name="email" onChange={handleInput} />
            <br />
            <br />
            <input type="password" placeholder='Password' className="w-full h-auto p-2 rounded-md bg-dark-100" name="password" onChange={handleInput} />
            <br />
            <br />
            <div className="w-full flex flex-row items-end align-start justify-end
                ">
                <button className="rounded-md ml-5 px-4 py-2 bg-dark-100 text-white-100 font-extrabold scale-[.90] hover:scale-[.95] transition-all" onClick={toggleForm}>
                    Cancel
                </button>
                <button className="rounded-md ml-5 px-4 py-2 bg-green-200 text-dark-100 font-extrabold scale-[.90] hover:scale-[.95] transition-all " onClick={createAccount}>
                    {loading ? "Creating Account.." : "Signup"}
                </button>
            </div>
            <br />
            <br />
        </div>
    )
}
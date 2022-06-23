import React, { useState } from 'react'
import { Layout } from '../components'
import SideBar from '../components/Navbar/SideBar'

function Settings() {


    const [isCopied, setIsCopied] = useState(false)

    const { origin } = window.location;
    let user = JSON.parse(localStorage.getItem("tymonial"))

    if (isCopied) {
        setTimeout(() => {
            setIsCopied(!isCopied)
        }, 1500)
    }

    const copyId = () => {
        navigator.clipboard.writeText(user?.id)
        setIsCopied(!isCopied)
    }

    return (
        <Layout>
            <div className="relative  flex flex-row items-start justify-start w-screen h-screen">
                <SideBar active="settings" />
                <div className="w-full px-5 py-4">
                    <div id="head" className="w-full">
                        <p className="text-white-200">
                            User Settings
                        </p>
                        <br />
                        <p className="text-white-200 text-[12px] ">Your <span className="bg-dark-200 text-white-200 px-2 py-1 ml-3 rounded-md">USER_ID</span> .</p>
                        <br />
                        <p className="text-green-200 underline text-[12px]">{user?.id}</p>
                        <br />
                        <br />
                        <div className="w-[350px] flex flex-row items-end justify-between overflow-x-hidden h-[45px] rounded-md mr-2 ">
                            <input type="text" value={user?.id} className="w-[350px]  px-3 py-3 bg-dark-200 text-white-200 outline-none border-none" />
                            <button className="btn w-[100px] h-[45px] bg-green-200 text-dark-100 font-extrabold " onClick={copyId}>
                                {isCopied ? "ID Copied" : "Copy ID"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Settings
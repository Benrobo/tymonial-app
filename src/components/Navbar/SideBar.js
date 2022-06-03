import React, { useEffect, useState } from "react"

import { Link } from "react-router-dom"
import { FaGithub, FaTwitter } from "react-icons/fa"
import { FiMail } from "react-icons/fi"

function SideBar({ active }) {


    return (
        <React.Fragment>
            <div className={`relative h-screen w-[250px] bg-dark-400 p-3`}>

                <ul className="w-full mt-5 flex flex-col items-center justify-start">
                    <Link to="/dashboard" className="w-full">
                        <li className={`w-full px-4 py-3 font-extrabold rounded-md cursor-pointer ${active === "tasks" ? "bg-green-200 text-dark-100" : "bg-dark-100 text-white-100"}`}>
                            Dashboard
                        </li>
                    </Link>
                    <Link to="/template" className="w-full">
                        <li className={`w-full mt-4 px-4 py-3 font-extrabold rounded-md cursor-pointer ${active === "template" ? "bg-green-200 text-dark-100" : "bg-dark-100 text-white-100"}`}>
                            Templates
                        </li>
                    </Link>
                    <Link to="/stats" className="w-full">
                        <li className={`w-full mt-4 px-4 py-3 font-extrabold rounded-md cursor-pointer ${active === "stats" ? "bg-green-200 text-dark-100" : "bg-dark-100 text-white-100"}`}>
                            Settings
                        </li>
                    </Link>
                </ul>
            </div>
        </React.Fragment>
    )
}

export default SideBar
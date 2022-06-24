import React, { useEffect, useState, useContext } from "react"

import { Link } from "react-router-dom"
import { FaGithub, FaTwitter } from "react-icons/fa"
import { FiMail } from "react-icons/fi"
import DataContext from "../../context/DataContext";


function NavBar() {
    const { logout, isAuthenticated, user } = useContext(DataContext);

    return (
        <React.Fragment>
            <div className={`relative h-[60px] w-screen bg-dark-200 flex items-center justify-between p-2 px-7 shadow-2xl`}>
                <h2 className="text-green-200 font-extrabold text-[20px] ">Tymonial</h2>

                <div id="right" className=" px-4 flex flex-row items-center justify-between">
                    <p className="mr-3 text-white-100 text-[15px] font-bold ">Welcome ✌</p>
                    <p className="mr-3 text-white-200 text-[15px] font-bold capitalize ">{user?.name}</p>
                    {isAuthenticated && <Link to="/login">
                        <button className="px-5 py-2 rounded-md bg-red-200 font-extrabold text-white-100 ml-4 scale-[.85] " onClick={logout}>Logout</button>
                    </Link>}
                </div>


            </div>
        </React.Fragment>
    )
}

export default NavBar
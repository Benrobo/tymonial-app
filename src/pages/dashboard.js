import React, { useState, useContext, useEffect } from 'react'
import { Layout, DomHead, NavBar } from "../components";
import SideBar from '../components/Navbar/SideBar';
import DataContext from '../context/DataContext';
import { Notification } from '../helpers';
import moment from "moment"

const notif = new Notification(4000)

function Dashboard() {
    const { isAuthenticated } = useContext(DataContext)
    const [active, setActive] = useState(false)


    let user = JSON.parse(localStorage.getItem("trakka-auth"))

    useEffect(() => {

    }, [])

    // if (!isAuthenticated) {
    //     return window.location = "/login"
    // }

    return (
        <Layout>
            <div className="relative  flex flex-row items-start justify-start w-screen h-screen">
                <SideBar active="tasks" />
                <div className="w-full h-screen overflow-y-auto p-2">
                    <div id="head" className="w-full h-auto p-3  flex flex-col items-start justify-start ">
                        <p className="text-white-100 font-extrabold">Dashboard</p>
                        <div className="w-full h-auto flex flex-wrap items-start justify-start mt-10 gap-5">
                            <div id="card" className="w-[250px] h-auto p-3 flex flex-col items-start justify-start rounded-md bg-dark-200 mr-4">
                                <h2 className="text-[12px] px-3 py-1 bg-green-600 text-green-200 mb-4 rounded-md ">Testimonials</h2>
                                <h2 className="text-[30px] text-white-300 ">Approved</h2>
                                <h2 className="text-[35px] font-extrabold ">12</h2>
                            </div>
                            <div id="card" className="w-[250px] h-auto p-3 flex flex-col items-start justify-start rounded-md bg-dark-200 mr-4">
                                <h2 className="text-[12px] px-3 py-1 bg-green-600 text-green-200 mb-4 rounded-md ">Testimonials</h2>
                                <h2 className="text-[30px] text-white-300 ">Pending</h2>
                                <h2 className="text-[35px] font-extrabold ">2</h2>
                            </div>
                            <div id="card" className="w-[250px] h-auto p-3 flex flex-col items-start justify-start rounded-md bg-dark-200 mr-4">
                                <select className="text-[12px] px-2 py-1 bg-dark-100 text-white-200 mb-4 rounded-md ">
                                    <option value="" className="">template_ID</option>
                                </select>
                                <h2 className="text-[30px] text-white-300 ">Response</h2>
                                <h2 className="text-[35px] font-extrabold ">132</h2>
                            </div>
                        </div>
                    </div>
                    <br />

                </div>
            </div>
        </Layout>
    )
}

export default Dashboard

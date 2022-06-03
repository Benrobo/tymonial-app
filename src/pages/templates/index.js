import React, { useState, useContext, useEffect } from 'react'
import { Layout, DomHead, NavBar } from "../../components";
import SideBar from '../../components/Navbar/SideBar';
import DataContext from '../../context/DataContext';
import { Notification } from '../../helpers';
import moment from "moment"
import { MdOutlineDescription } from 'react-icons/md'
import TestimonialForm from './form';

const notif = new Notification(4000)

function Templates() {
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
                <SideBar active="template" />
                <div className="w-full h-screen py-2 px-3 overflow-y-hidden" >
                    {false && <div id="head" className="w-full h-auto p-3  flex flex-row items-center justify-start ">
                        <p className="text-white-100 font-extrabold">Tymonial Templates.</p>
                        <button className="rounded-md ml-5 px-4 py-2 bg-green-200 text-dark-100 font-extrabold scale-[.90] hover:scale-[.95] transition-all " onClick={"toggleActive"}>
                            Create Template
                        </button>
                    </div>}

                    {false && <div className="w-full h-screen flex flex-col items-start justify-start bg-dark-600 rounded-md  p-2 gap-5 overflow-y-auto  ">
                        {
                            Array(3).fill().map((i) => {
                                return (
                                    <div id="card" key={i} className="w-full bg-dark-200 rounded-md cursor-pointer relative mt-2 flex flex-row items-center justify-between p-4 ">
                                        <div id="left" className="w-[50%] flex flex-row items-start justify-start ">
                                            <MdOutlineDescription className=' text-[70px] text-white-300 mr-10' />
                                            <div className="w-full flex flex-col items-start justify-start">
                                                <h2 className="text-white-100 text-[25px] ">Template Name</h2>
                                                <p className="text-white-200">template_ID</p>
                                            </div>
                                        </div>
                                        <div id="right" className="w-[50%] flex flex-row items-end justify-end">
                                            <button className="px-3 py-1 rounded-md bg-red-500 scale-[.75] ">Delete</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>}

                    <TemplateCont />
                </div>
            </div>
        </Layout>
    )
}

export default Templates


function TemplateCont() {

    return (
        <div className="w-full h-screen px-3 ">
            <div id="head" className="w-full h-auto p-3  flex flex-row items-center justify-start ">
                <button className="rounded-md ml-5 px-4 py-2 bg-dark-200 text-white-200 mr-5 font-extrabold scale-[.90] hover:scale-[.95] transition-all " onClick={"toggleActive"}>
                    Back
                </button>
                <p className="text-white-100 font-extrabold">Template Name</p>
            </div>

            <div className="w-full h-screen">
                <div id="head" className="w-full p-2 flex flex-row items-start justify-start">
                    <button className="rounded-md ml-5 px-4 py-2 bg-green-200 text-dark-200 mr-5 font-extrabold scale-[.90] hover:scale-[.95] transition-all " onClick={"toggleActive"}>
                        Form UI
                    </button>
                    <button className="rounded-md ml-5 px-4 py-2 bg-dark-200 text-white-200 mr-5 font-extrabold scale-[.90] hover:scale-[.95] transition-all " onClick={"toggleActive"}>
                        Testimonial UI
                    </button>
                    <button className="rounded-md ml-5 px-4 py-2 bg-dark-200 text-white-200 mr-5 font-extrabold scale-[.90] hover:scale-[.95] transition-all " onClick={"toggleActive"}>
                        Settings
                    </button>
                </div>
                <br />

                <TestimonialForm />
            </div>
        </div>
    )
}
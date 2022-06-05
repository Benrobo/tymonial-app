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
    const [activeTemplate, setActiveTemplate] = useState(false)


    let user = JSON.parse(localStorage.getItem("trakka-auth"))

    useEffect(() => {

    }, [])

    // toggleTestForm
    const toggleTemplate = () => setActiveTemplate(!activeTemplate)

    // if (!isAuthenticated) {
    //     return window.location = "/login"
    // }

    return (
        <Layout>
            <div className="relative  flex flex-row items-start justify-start w-screen h-screen overflow-hidden ">
                <SideBar active="template" />
                <div className="w-full h-screen py-2 px-3 overflow-y-hidden" >
                    {!activeTemplate && <div id="head" className="w-full h-auto p-3  flex flex-row items-center justify-start ">
                        <p className="text-white-100 font-extrabold">Tymonial Templates.</p>
                        <button className="rounded-md ml-5 px-4 py-2 bg-green-200 text-dark-100 font-extrabold scale-[.90] hover:scale-[.95] transition-all " onClick={toggleTemplate}>
                            Create Template
                        </button>
                    </div>}

                    {!activeTemplate && <div className="w-full h-screen flex flex-col items-start justify-start bg-dark-600 rounded-md  p-2 gap-5 overflow-y-auto  ">
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

                    {activeTemplate && <TemplateCont toggleTemplate={toggleTemplate} />}
                </div>
            </div>
        </Layout>
    )
}

export default Templates


function TemplateCont({ toggleTemplate }) {

    const [activeTestimonialForm, setActiveTestimonialForm] = useState(false);
    const [activeTestName, setActiveTestName] = useState("")

    // toggleTestForm
    const toggleTestForm = () => setActiveTestName("")

    const toggleTestName = (e) => {
        let name = e.target.name;
        console.log(e.target);
        if (name !== undefined) {
            setActiveTestName(name)
        }
    }

    return (
        <div className="w-full h-auto overflow-y-scroll px-3 ">
            <div id="head" className="w-full h-auto p-3  flex flex-row items-center justify-start ">
                <button className={`rounded-md ml-5 px-4 py-2 bg-dark-200 text-white-200 mr-5 font-extrabold scale-[.90] hover:scale-[.95] transition-all `} onClick={toggleTemplate}>
                    Back
                </button>
                <p className="text-white-100 font-extrabold">Template Name</p>
            </div>

            <div className="w-full h-screen">
                <div id="head" className="w-full p-2 flex flex-row items-start justify-start">
                    <button name="form-ui" className={`rounded-md ml-5 px-4 py-2 ${activeTestName === "form-ui" ? "bg-green-200 text-dark-200" : "bg-dark-200 text-white-200"} mr-5 font-extrabold scale-[.90] hover:scale-[.95] transition-all hover:bg-green-200 hover:text-dark-100 `} onClick={toggleTestName}>
                        Form UI
                    </button>
                    <button name="form-page" className={`rounded-md ml-5 px-4 py-2 ${activeTestName === "form-page" ? "bg-green-200 text-dark-200" : "bg-dark-200 text-white-200"} mr-5 font-extrabold scale-[.90] hover:scale-[.95] transition-all hover:bg-green-200 hover:text-dark-100 `} onClick={toggleTestName}>
                        Form Page
                    </button>
                    <button name="testimonial-ui" className={`rounded-md ml-5 px-4 py-2 ${activeTestName === "testimonial-ui" ? "bg-green-200 text-dark-200" : "bg-dark-200 text-white-200"} mr-5 font-extrabold scale-[.90] hover:scale-[.95] transition-all hover:bg-green-200 hover:text-dark-100 `} onClick={toggleTestName}>
                        Testimonial UI
                    </button>
                    <button name="settings" className={`rounded-md ml-5 px-4 py-2 ${activeTestName === "settings" ? "bg-green-200 text-dark-200" : "bg-dark-200 text-white-200"} mr-5 font-extrabold scale-[.90] hover:scale-[.95] transition-all hover:bg-green-200 hover:text-dark-100 `} onClick={toggleTestName}>
                        Settings
                    </button>
                </div>
                <br />

                {
                    activeTestName === "form-ui" ?
                        <TestimonialForm toggleTestName={toggleTestName} />
                        :
                        activeTestName === "form-page" ?
                            "Form Page"
                            :
                            ""
                }
                <div className="w-full h-[150px]"></div>
            </div>
        </div>
    )
}
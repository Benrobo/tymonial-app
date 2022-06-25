import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <div className="home-page w-screen h-screen bg-dark-1 ">
            <div id="top" className="w-full flex flex-row items-start justify-start p-4  ">
                <h1 className="text-green-200 font-sans text-[20px] font-extrabold">Tymonial</h1>
            </div>
            <div className="header w-full h-screen px-6 mt-0 flex flex-row items-center justify-between">
                <div id="left" className="w-[55%] h-[400px] ">
                    <h1 className="font-extrabold text-[40px] text-green-200 font-sans ">
                        Collect, Display & Embed Feedbacks.
                    </h1>
                    <br />
                    <p className="text-white-200">
                        Tymonial makes collection of feedbacks easily within a twinkle of an eye from
                        <span className="rounded-sm text-green-200 underline font-extrabold mr-1 ml-2">Friends, </span>
                        <span className="rounded-sm text-green-200 underline font-extrabold mr-1 ml-2">Family, </span>
                        <span className="rounded-sm text-green-200 underline font-extrabold mr-1 ml-2">Clients, </span>
                        & More
                    </p>
                    <br />
                    <Link to={"/login"}>
                        <button className="px-6 py-3 rounded-md text-white-100 font-extrabold bg-dark-200 transition-all scale-[.85] hover:scale-[.90] cursor-pointer">
                            Get Started
                        </button>
                    </Link>
                </div>
                <div id="right" className="w-[45%] mt-4 h-[400px]">
                    <div id="box" className="w-[400px] h-auto bg-dark-200 rounded-md p-5 relative ">
                        <div id="image" className="w-[60px] h-[60px] rounded-[50%] bg-dark-300 top-[-15px] "></div>
                        <br />
                        <br />
                        <br />
                        <div id="bottom" className="w-full mt-6 flex flex-row items-start justify-between">
                            <div id="left" className="w-auto h-auto flex flex-col items-start justify-start">
                                <div className="w-[200px] h-[15px] rounded-[30px] bg-dark-300 "></div>
                                <div className="w-[150px] h-[15px] rounded-[30px] bg-dark-300 mt-2 "></div>
                            </div>
                            <div id="right" className="w-auto flex flex-row items-end justify-between">
                                <span className="m-2 p-2 bg-dark-100 rounded-[50%] "></span>
                                <span className="m-2 p-2 bg-dark-100 rounded-[50%] "></span>
                                <span className="m-2 p-2 bg-dark-100 rounded-[50%] "></span>
                                <span className="m-2 p-2 bg-dark-100 rounded-[50%] "></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
import React from 'react'

function TestimonialForm() {
    return (
        <div className="w-full px-7 h-auto flex flex-row items-center justify-between ">
            <div id="left" className="w-[40%] mt-5 p-4 bg-dark-200 rounded-md">
                <div className="w-full flex flex-col items-start justify-start">
                    <h2 className="text-[20px] ">Form Settings</h2>
                    <p className="text-white-300 text-[15px] ">Edit the following tesimonial settings below</p>
                </div>
                <br />
                <div className="w-full h-auto">
                    <li className="w-full flex flex-row items-center justify-between">
                        <p className="text-white-100 text-[15px] font-extrabold ">Display Username</p>

                    </li>
                </div>
            </div>
            <div id="right" className="w-[60%] mt-5 p-4"></div>
        </div>
    )
}

export default TestimonialForm
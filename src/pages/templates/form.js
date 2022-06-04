import React, { useState, useEffect } from 'react'
import Switch from "react-switch";
import { AiFillStar } from 'react-icons/ai'

function TestimonialForm() {

    const [isUserName, setIsUserName] = useState(true)
    const [isUserCareer, setIsUserCareer] = useState(false)
    const [isRatings, setIsRatings] = useState(true)
    const [isProfilePic, setIsProfilePic] = useState(false)

    const handleSwitch1 = () => setIsUserName(!isUserName)
    const handleSwitch2 = () => setIsRatings(!isRatings)
    const handleSwitch3 = () => setIsUserCareer(!isUserCareer)
    const handleSwitch4 = () => setIsProfilePic(!isProfilePic)


    return (
        <div className="w-full h-screen absolute top-0 left-0 px-7 overflow-y-hidden flex flex-row items-start justify-between bg-dark-400">
            <div id="left" className="w-[40%] h-[520px] mt-5 p-9 bg-dark-200 rounded-md overflow-hidden hover:overflow-y-auto">
                <div className="w-full flex flex-col items-start justify-start">
                    <h2 className="text-[20px] ">Form Settings</h2>
                    <p className="text-white-300 text-[15px] ">Edit the following tesimonial settings below</p>
                </div>
                <br />
                <div className="w-full h-auto">
                    <li className="w-full flex flex-row items-center justify-between">
                        <p className="text-white-100 text-[15px] font-extrabold ">Display Username</p>
                        <Switch onChange={handleSwitch1} checked={isUserName} color="#64f4acea" />
                    </li>
                    <li className="w-full flex flex-row items-center justify-between mt-4">
                        <p className="text-white-100 text-[15px] font-extrabold ">Display Ratings</p>
                        <Switch onChange={handleSwitch2} checked={isRatings} color="#64f4acea" />
                    </li>
                    <li className="w-full flex flex-row items-center justify-between mt-4">
                        <p className="text-white-100 text-[15px] font-extrabold ">Display Career</p>
                        <Switch onChange={handleSwitch3} checked={isUserCareer} color="#64f4acea" />
                    </li>
                    <li className="w-full flex flex-row items-center justify-between mt-4">
                        <p className="text-white-100 text-[15px] font-extrabold ">Profile Pics</p>
                        <Switch onChange={handleSwitch4} checked={isProfilePic} color="#64f4acea" />
                    </li>
                    <br />
                    <br />
                    <div className="w-full flex flex-col items-start justify-start">
                        <h2 className="text-[20px] ">Form UI</h2>
                        <p className="text-white-300 text-[15px] ">Edit the following tesimonial settings below</p>
                    </div>
                    <br />
                    <br />
                    <button className="px-4 py-2 rounded-md bg-green-200 text-dark-100 font-extrabold ">Save Settings</button>
                    <br />
                </div>
            </div>
            <div id="right" className="w-[55%] h-screen p-4 flex flex-col items-center justify-center bg-white-100 overflow-y-scroll hover:overflow-y-scroll">
                <div id="form" className="w-[450px] bg-dark-100 rounded-md h-auto max-h-[750px] overflow-hidden relative">
                    <div className="w-full flex flex-col items-start justify-start bg-dark-200 p-4 ">
                        <h2 className="text-[20px] ">Feedback Form</h2>
                        <p className="text-white-300 text-[15px] "> Your feedback is highly appreciated. </p>
                    </div>
                    <br />
                    <img src={"https://avatars.dicebear.com/api/micah/dsfcsdfcdsddsyour-custom-seed.svg"} alt="" className="absolute right-5 top-8 shadow-lg bg-dark-100 w-[80px] h-[80px] rounded-[100%] outline-none " />

                    <div className="w-full flex-col items-start justify-start p-4">
                        <div className="w-full flex flex-row items-center justify-between">
                            <div className="w-[50%]">
                                <Input placeholder="Full Name" />
                            </div>
                            <button className="bg-dark-200 px-4 py-2 cursor-pointer rounded-md text-white-100">Upload Image</button>
                        </div>
                        <br />
                        <div className="w-full flex flex-row items-center justify-between">
                            <div className="w-[50%]">
                                <select className="w-full h-auto px-4 py-2 rounded-md bg-dark-200">
                                    <option value="">Ratings</option>
                                    {
                                        Array(5).fill().map((list, i) => {
                                            return (
                                                <option value={i + 1}>{i + 1}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="w-[50%] flex flex-row items-end justify-end ">
                                <StarRate count={5} />
                            </div>
                        </div>
                        <br />
                        <Input placeholder="Career: ( Software Engineer, Designer... )" />
                        <br />
                        <br />
                        <textarea cols="30" rows="3" className="w-full p-4 rounded-md bg-dark-200 text-white-100 resize-none" placeholder='Feedback Mesage' maxLength={100}></textarea>
                        <br />
                        <br />
                        <button className="px-4 py-3 w-full rounded-md bg-green-200 text-dark-100 font-extrabold ">Send Feedback</button>
                    </div>
                </div>
                <br />
                <div className="w-full h-[30px]"></div>
            </div>
        </div>
    )
}

export default TestimonialForm


function Input({ ...rest }) {

    return (
        <input {...rest} className={`w-full rounded-md ourtline-none bg-dark-200 px-3 py-3 text-white-200 `} />
    )
}

function StarRate({ count = 1 }) {

    return (
        <>
            {
                Array(count).fill().map((list, i) => {
                    return (
                        <AiFillStar key={i} className='text-[20px] text-green-200 ' />
                    )
                })
            }
        </>
    )
}
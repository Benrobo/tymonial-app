import React, { useState, useEffect, useContext } from 'react'
import Switch from "react-switch";
import { AiFillStar } from 'react-icons/ai'
import TemplateContext from '../../context/TemplateContext';
import { Input, StarRate } from '../../components/UI-COMP';
import Fetch from '../../helpers/fetch';
import API_ROUTES from "../../config/apiRoutes"
import { Notification } from '../../helpers';


const notif = new Notification(4000)

function TestimonialForm({ toggleTestName, formData, templateId, testT = { b: false } }) {

    // const { isUserName, isProfilePic, isRatings, isUserCareer, formInputs, handleFormHeadingInputs, handleSwitch3, handleSwitch4, ratingsVal, setRatingsVal } = useContext(TemplateContext);
    const [loading, setLoading] = useState(false)
    const [isUserName, setIsUserName] = useState(true)
    const [isRatings, setIsRatings] = useState(true)
    const [isUserCareer, setIsUserCareer] = useState(formData?.userCareer)
    const [isProfilePic, setIsProfilePic] = useState(formData?.profileImg)
    const [formInputs, setFormInputs] = useState({
        heading: formData?.heading,
        subHeading: formData?.subHeading
    })
    const [ratingsVal, setRatingsVal] = useState(1)


    let user = JSON.parse(localStorage.getItem("tymonial"))

    // form heading input
    const handleFormHeadingInputs = (e) => {
        const name = e.target.name;
        const val = e.target.value;
        console.log({ name, val });
        if (name !== undefined) {
            setFormInputs((prevVal) => ({ ...prevVal, [name]: val }))
        }
    }

    const handleSwitch3 = () => setIsUserCareer(!isUserCareer)
    const handleSwitch4 = () => setIsProfilePic(!isProfilePic)

    async function saveFormUiSettings() {

        const formSettingsUI = {
            ...formInputs,
            username: isUserName,
            userCareer: isUserCareer,
            ratings: isRatings,
            profileImg: isProfilePic,
            userId: user?.id,
            templateId,
            templateFormId: formData?.id
        }

        // return console.log(formSettingsUI);

        try {
            setLoading(true)
            const result = await Fetch(API_ROUTES.updateTemplateForm, {
                method: "PUT",
                body: JSON.stringify(formSettingsUI)
            })

            const { data } = result;

            setLoading(false);

            if (data.error) {
                return notif.error(data.message)
            }

            notif.success(data.message)
            window.location.reload(true)
            return
        } catch (e) {
            console.error(e.message)
            setLoading(false)
            throw new Error(e.message)

        }

    }


    return (
        <div className="w-full h-auto px-7 flex flex-row items-start justify-between">
            <div id="left" className="w-[40%] bg-dark-200 h-auto mt-5 flex flex-col items-start justify-start ">
                <div id='form1' className="w-full bg-dark-200 p-9 overflow-hidden rounded-md shadow-lg relative ">
                    <div className="w-full flex flex-col items-start justify-start">
                        <h2 className="text-[20px] ">Form Settings</h2>
                        <p className="text-white-300 text-[15px] ">Edit the following tesimonial settings below</p>
                    </div>
                    <br />
                    <div className="w-full h-auto">
                        <li className="w-full flex flex-row items-center justify-between">
                            <p className="text-white-100 text-[15px] font-extrabold ">Display Username</p>
                            <Switch checked={isUserName} color="#64f4acea" />
                        </li>
                        <li className="w-full flex flex-row items-center justify-between mt-4">
                            <p className="text-white-100 text-[15px] font-extrabold ">Display Ratings</p>
                            <Switch checked={isRatings} color="#64f4acea" />
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

                    </div>
                </div>
                <div id='form2' className="w-full bg-dark-200 p-9 rounded-md relative ">
                    <div className="w-full flex flex-col items-start justify-start">
                        <h2 className="text-[20px] ">Form UI</h2>
                        <p className="text-white-300 text-[15px] ">Edit the following tesimonial settings below</p>
                        <br />
                        <Input placeholder="Form Heading" value={formInputs?.heading} name="heading" onChange={handleFormHeadingInputs} style={{ background: "#0e0e0e" }} />
                        <br />
                        <Input placeholder="Form Sub-Heading" value={formInputs?.subHeading} name="subHeading" onChange={handleFormHeadingInputs} style={{ background: "#0e0e0e" }} />
                    </div>
                    <br />
                    <button className="px-4 py-2 rounded-md bg-green-200 text-dark-100 font-extrabold " onClick={saveFormUiSettings}>
                        {loading ? "Saving Settings..." : "Save Settings"}
                    </button>
                </div>
            </div>
            <div id="right" className="w-[55%] h-auto p-4 flex flex-col items-center justify-center">
                <div id="form" className="w-[450px] bg-dark-300 rounded-md h-auto max-h-[750px] overflow-hidden relative transition-all">
                    <div className="w-full flex flex-col items-start justify-start bg-dark-200 p-4 ">
                        <h2 className="text-[20px] ">{formInputs.heading}</h2>
                        <p className="text-white-300 text-[15px] ">{formInputs.subHeading}</p>
                    </div>
                    {isProfilePic && <img src={"https://avatars.dicebear.com/api/micah/dsfcsdfcdsddsyour-custom-seed.svg"} alt="" className="absolute right-5 top-8 shadow-lg bg-dark-100 w-[80px] h-[80px] rounded-[100%] outline-none " />}

                    <div className="w-full flex-col items-start justify-start p-4">
                        <div className="w-full flex flex-row items-center justify-between mt-5">
                            <div className={`${isProfilePic ? "w-[50%]" : "w-full"}`}>
                                <Input placeholder="Full Name" />
                            </div>
                            {isProfilePic && <button className="bg-dark-200 px-4 py-2 cursor-pointer rounded-md text-white-100">Upload Image</button>}
                        </div>
                        <div className="w-full flex flex-row items-center justify-between mt-5">
                            {isRatings && <div className="w-[50%]">
                                <select className="w-full h-auto px-4 py-2 rounded-md bg-dark-200" onChange={(e) => { setRatingsVal(e.target.value) }}>
                                    <option value="">Ratings</option>
                                    {
                                        Array(5).fill().map((list, i) => {
                                            return (
                                                <option value={i + 1}>{i + 1}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>}
                            {isRatings && <div className="w-[50%] flex flex-row items-end justify-end ">
                                <StarRate count={parseInt(ratingsVal)} />
                            </div>}
                        </div>
                        <br />
                        {isUserCareer && <Input placeholder="Career: ( Software Engineer, Designer... )" />}

                        <textarea cols="30" rows="3" className="w-full p-4 rounded-md bg-dark-200 text-white-100 resize-none mt-5" placeholder='Feedback Mesage' maxLength={100}></textarea>
                        <button className="px-4 py-3 w-full rounded-md bg-green-200 text-dark-100 font-extrabold mt-5">Send Feedback</button>
                    </div>
                </div>
                <br />
                <div className="w-full h-[30px]"></div>
            </div>

        </div>
    )
}

export default TestimonialForm

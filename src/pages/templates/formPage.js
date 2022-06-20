import React, { useState, useEffect, useContext } from 'react'
import { ColorPallete, Input, StarRate } from '../../components/UI-COMP';
import API_ROUTES from '../../config/apiRoutes';
import TemplateContext from '../../context/TemplateContext';
import Fetch from '../../helpers/fetch';

function FormPage({ templateId }) {

    const [activeFormName, setActiveFormName] = useState("ui")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({})

    let user = JSON.parse(localStorage.getItem("tymonial"))

    const toggleTestName = (e) => {
        const name = e.target.name;
        if (name !== undefined) {
            setActiveFormName(name)
        }
    }

    useEffect(() => {
        if (templateId === undefined) return
        fetchTemplateFormData()
    }, [])

    async function fetchTemplateFormData() {
        try {
            setLoading(true)
            const req = await Fetch(API_ROUTES.getTemplateForm, {
                method: "POST",
                body: JSON.stringify({
                    userId: user?.id,
                    templateId
                })
            })

            const { res, data } = req;

            setLoading(false)

            if (data.error) {
                return setError(data.message)
            }

            setFormData(data.data[0])
            // console.log(data.data);
        } catch (e) {
            setLoading(false)
            setError(e.message)
        }
    }

    return (
        <div className="w-full h-auto rounded-md flex items-start justify-start flex-col ">
            <div id="head" className="w-full flex flex-row items-start justify-start px-3 ">
                <button name="ui" className={`rounded-md ml-5 px-5 py-2 ${activeFormName === "ui" ? "bg-green-200 text-dark-200" : "bg-dark-200 text-white-200"} mr-5 font-extrabold scale-[.90] hover:scale-[.95] transition-all hover:bg-green-200 hover:text-dark-100 `} onClick={toggleTestName}>
                    UI
                </button>
                <button name="config" className={`rounded-md ml-5 px-5 py-2 ${activeFormName === "config" ? "bg-green-200 text-dark-200" : "bg-dark-200 text-white-200"} mr-5 font-extrabold scale-[.90] hover:scale-[.95] transition-all hover:bg-green-200 hover:text-dark-100 `} onClick={toggleTestName}>
                    Config
                </button>
            </div>
            <br />

            {activeFormName === "ui" && <FormUI />}
            {activeFormName === "config" && <FormConfig formData={formData} templateId={templateId} />}
        </div>
    )
}

export default FormPage

function FormUI({ formData, templateId }) {

    const { isProfilePic, isRatings, isUserCareer, formInputs, ratingsVal, setRatingsVal, formColors } = useContext(TemplateContext)

    console.log(formData);

    return (
        <div className="w-full h-screen bg-[#000] flex flex-col items-center justify-center ">
            {/* <div className="w-full p-5 mb-10 text-center flex items-center justify-center">
                <h2 className="text-white-200 text-[30px] font-extrabold ">Your FeedBack Is Highly Appreciated.</h2>
            </div> */}
            <div id="form" className="w-[450px] bg-dark-300 rounded-md h-auto max-h-[750px] overflow-hidden relative transition-all" style={{
                background: formColors.formBg
            }}>
                <div className="w-full flex flex-col items-start justify-start bg-dark-200 p-4 " style={{
                    background: formColors.bgHeader
                }}>
                    <h2 className="text-[20px] " style={{
                        color: formColors.headerPriColor
                    }}>{formData?.heading}</h2>
                    <p className="text-white-300 text-[15px] " style={{
                        color: formColors.headerSecColor
                    }}>{formData?.subHeading}</p>
                </div>
                {formData?.profileImg && <img src={"https://avatars.dicebear.com/api/micah/dsfcsdfcdsddsyour-custom-seed.svg"} alt="" className="absolute right-5 top-8 shadow-lg bg-dark-100 w-[80px] h-[80px] rounded-[100%] outline-none " />}

                <div className="w-full flex-col items-start justify-start p-4">
                    <div className="w-full flex flex-row items-center justify-between mt-5">
                        <div className={`${formData?.profileImg ? "w-[50%]" : "w-full"}`}>
                            <Input placeholder="Full Name" style={{
                                background: formColors.inputBg,
                                color: formColors.inputColor
                            }} />
                        </div>
                        {formData?.profileImg && <button className="bg-dark-200 px-4 py-2 cursor-pointer rounded-md text-white-100" style={{
                            background: formColors.inputBg,
                            color: formColors.inputColor
                        }}>Upload Image</button>}
                    </div>
                    <div className="w-full flex flex-row items-center justify-between mt-5">
                        {formData?.ratings && <div className="w-[50%]">
                            <select className="w-full h-auto px-4 py-2 rounded-md bg-dark-200" onChange={(e) => { setRatingsVal(e.target.value) }} style={{
                                background: formColors.inputBg,
                                color: formColors.inputColor
                            }}>
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
                        {formData?.ratings && <div className="w-[50%] flex flex-row items-end justify-end ">
                            <StarRate count={parseInt(ratingsVal)} color={formColors.ratingColor} />
                        </div>}
                    </div>
                    <br />
                    {formData?.userCareer && <Input placeholder="Career: ( Software Engineer, Designer... )" style={{
                        background: formColors.inputBg,
                        color: formColors.inputColor
                    }} />}

                    <textarea cols="30" rows="3" style={{
                        background: formColors.inputBg,
                        color: formColors.inputColor
                    }} className="w-full p-4 rounded-md bg-dark-200 text-white-100 resize-none mt-5" placeholder='Feedback Mesage' maxLength={100}></textarea>
                    <button className="px-4 py-3 w-full rounded-md bg-green-200 text-dark-100 font-extrabold mt-5" style={{
                        background: formColors.buttonBg,
                        color: formColors.buttonColor
                    }}>Send Feedback</button>
                </div>
            </div>
        </div>
    )
}

function FormConfig() {
    const { formColors, handleFormUI, resetFormUi } = useContext(TemplateContext)

    async function SaveFormUISettings() {

        const data = {
            ...formColors
        }

        console.log(data);
    }

    return (
        <div className="w-full h-screen px-8">
            <div className="w-[450px] h-auto flex flex-col items-start justify-start bg-dark-200 p-5 rounded-md ">
                <ColorPallete title='Form Background' name="formBg" value={formColors.formBg} handleColor={handleFormUI} />

                <ColorPallete title='Form Header' name="bgHeader" value={formColors.bgHeader} handleColor={handleFormUI} />

                <ColorPallete title='Header Primary (Text) Color' name="headerPriColor" value={formColors.headerPriColor} handleColor={handleFormUI} />

                <ColorPallete title='Header Secondary (Text) Color' name="headerSecColor" value={formColors.headerSecColor} handleColor={handleFormUI} />

                <ColorPallete title='Inputs Background' name="inputBg" value={formColors.inputBg} handleColor={handleFormUI} />

                <ColorPallete title='Inputs Text Color' name="inputColor" value={formColors.inputColor} handleColor={handleFormUI} />

                <ColorPallete title='Button Backrgound' name="buttonBg" value={formColors.buttonBg} handleColor={handleFormUI} />

                <ColorPallete title='Button Text Color' name="buttonColor" value={formColors.buttonColor} handleColor={handleFormUI} />

                <ColorPallete title='Rating Color' name="ratingColor" value={formColors.ratingColor} handleColor={handleFormUI} />

                <br />
                <br />
                <div className="w-full flex flex-row items-start justify-between">
                    <button className="btn px-5 py-2 bg-dark-100 text-white-100" onClick={resetFormUi}>
                        Reset UI
                    </button>

                    <button className="btn px-5 py-2 bg-green-200 text-dark-100 font-extrabold " onClick={SaveFormUISettings}>
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    )
}
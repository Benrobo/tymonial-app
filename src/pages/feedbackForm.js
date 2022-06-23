import React, { useContext, useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { Input, StarRate } from '../components/UI-COMP'
import API_ROUTES from '../config/apiRoutes'
import TemplateContext from '../context/TemplateContext'
import { Notification } from '../helpers'
import Fetch from '../helpers/fetch'

const notif = new Notification(4000)

const sleep = async sec => new Promise((res) => setTimeout(res, sec * 1000))

function FeedBackForm() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({})
    const [successMsg, setSuccessMsg] = useState(false)

    let { template_id } = useParams()

    useEffect(() => {
        if (template_id === undefined) return
        fetchTemplateFormData()
    }, [])

    async function fetchTemplateFormData() {
        try {
            setLoading(true)
            const req = await Fetch(API_ROUTES.getTemplateFeedbackForm, {
                method: "POST",
                body: JSON.stringify({
                    templateId: template_id
                })
            })

            const { res, data } = req;

            setLoading(false)

            console.log(data);
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
        <div className="w-screen h-screen flex flex-col items-center justify-center">

            {
                loading ?
                    <div className="w-full text-center">
                        <p className="text-white-200 text-[50px] ">Loading...</p>
                        <small>loading feedback form..</small>
                    </div>
                    :
                    error !== null ?
                        <div className="w-full h-auto text-center">
                            <p className="text-white-200 text-[30px] font-extrabold ">Something went wrong!</p>
                            <small className='text-white-300 text-[15px]'>Check the url parameters if
                                <span className="text-green-200 underline ml-3 mr-2">{template_id}</span>
                                are correct.
                            </small>
                        </div>
                        :
                        successMsg ?
                            <div className="w-full h-auto text-center">
                                <p className="text-green-200 text-[30px] font-extrabold ">Feedback Sent Successfull.</p>
                                <small className='text-white-300 text-[15px]'>
                                    Thanks for giving us your feedback with <span className="text-green-200 underline">Tymonial</span>
                                </small>
                            </div>
                            :
                            <FormUI formData={formData} templateId={template_id} setSuccessMsg={setSuccessMsg} />
            }
        </div>
    )
}

export default FeedBackForm


function FormUI({ formData, templateId, setSuccessMsg }) {

    const [loading, setLoading] = useState(false)
    const { setRatingsVal, formColors } = useContext(TemplateContext)
    const [inputs, setInputs] = useState({
        name: "",
        ratings: "5",
        userCareer: "",
        message: "",
        profileImg: ""
    })

    const MAX_WORD = 300

    const fileRef = useRef(null)

    const userId = formData?.userId;

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInputs((preval) => ({ ...preval, [name]: value }))
    }

    let fileUpload = document.querySelector(".fileUpload")
    const openFile = () => {
        fileUpload.click()
    }

    const handleImageUpload = (e) => {
        const validType = ["jpg", "png", "jpeg", "JPG", "JPEG", "PNG"]
        const file = fileUpload.files[0]
        let type = file?.type.split("/")[1]

        if (!validType.includes(type)) {
            return notif.error("Invalid file type uploaded")
        }
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            // convert image file to base64 string
            setInputs((preVal) => ({ ...preVal, ["profileImg"]: reader.result }))
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    async function submitFeedback() {

        const { name, ratings, userCareer, message, profileImg } = inputs;
        console.log(inputs);
        if (name === "") {
            return notif.error("feedback name cant be blank")
        }
        if (ratings === "") {
            return notif.error("feedback rating cant be blank")
        }
        if (formData?.userCareer && userCareer === "") {
            return notif.error("feedback career cant be blank")
        }
        if (message === "") {
            return notif.error("feedback message cant be blank")
        }
        if (formData?.profileImg && profileImg === "") {
            return notif.error("feedback image cant be blank")
        }

        setLoading(true)
        const req = await Fetch(API_ROUTES.addFeedback, {
            method: "POST",
            body: JSON.stringify({
                ...inputs,
                templateId,
                userId
            })
        })

        const { res, data } = req;

        setLoading(false)

        if (data && data.error) {
            return notif.error(data.message)
        }

        notif.success(data.message)

        setSuccessMsg(true)

        await sleep(5)

        setSuccessMsg(false)
    }



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
                {formData?.profileImg && <img src={inputs.profileImg === "" ? "https://avatars.dicebear.com/api/micah/dsfcsdfcdsddsyour-custom-seed.svg" : inputs.profileImg} alt="" className="absolute right-5 top-8 shadow-lg bg-dark-100 w-[80px] h-[80px] rounded-[100%] outline-none " />}

                <div className="w-full flex-col items-start justify-start p-4">
                    <div className="w-full flex flex-row items-center justify-between mt-5">
                        <div className={`${formData?.profileImg ? "w-[50%]" : "w-full"}`}>
                            <Input placeholder="Full Name" style={{
                                background: formColors.inputBg,
                                color: formColors.inputColor
                            }}
                                name="name"
                                onChange={handleInput}
                            />
                        </div>
                        {formData?.profileImg && <button onClick={openFile} className="bg-dark-200 px-4 py-2 cursor-pointer rounded-md text-white-100" style={{
                            background: formColors.inputBg,
                            color: formColors.inputColor
                        }}>Upload Image</button>}
                        <input type="file" onChange={handleImageUpload} className='fileUpload' hidden ref={fileRef} />
                    </div>
                    <div className="w-full flex flex-row items-center justify-between mt-5">
                        {formData?.ratings && <div className="w-[50%]">
                            <select className="w-full h-auto px-4 py-2 rounded-md bg-dark-200" name="ratings"
                                onChange={handleInput} style={{
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
                            <StarRate count={parseInt(inputs.ratings)} color={formColors.ratingColor} />
                        </div>}
                    </div>
                    <br />
                    {formData?.userCareer && <Input name="userCareer"
                        onChange={handleInput} placeholder="Career: ( Software Engineer, Designer... )" style={{
                            background: formColors.inputBg,
                            color: formColors.inputColor
                        }} />}
                    <br />
                    <span className="text-white-200 text-[12px] ">
                        Word remaining <span className="ml-2">{MAX_WORD - inputs.message.length} / {MAX_WORD}</span>
                    </span>
                    <textarea cols="30" rows="3" style={{
                        background: formColors.inputBg,
                        color: formColors.inputColor
                    }} name="message"
                        onChange={handleInput} className="w-full p-4 rounded-md bg-dark-200 text-white-100 resize-none mt-5" placeholder='Feedback Mesage' maxLength={MAX_WORD}></textarea>

                    <button onClick={submitFeedback} className="px-4 py-3 w-full rounded-md bg-green-200 text-dark-100 font-extrabold mt-5" style={{
                        background: formColors.buttonBg,
                        color: formColors.buttonColor
                    }}>
                        {loading ? "Sending Feedback...." : "Send Feedback"}
                    </button>
                </div>
            </div>
        </div>
    )
}

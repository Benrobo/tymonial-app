import React, { useState, useContext, useRef } from 'react'

function TemplateSettings({ templateId }) {

    const [isCopied, setIsCopied] = useState(false)

    const formUrl = `http://localhost:3000/feedback/${templateId}`

    if (isCopied) {
        setTimeout(() => {
            setIsCopied(!isCopied)
        }, 1500)
    }

    const copyUrl = () => {
        navigator.clipboard.writeText(formUrl)
        setIsCopied(!isCopied)
    }



    return (
        <div className="w-full h-screen px-8">
            <div className="w-full">
                <h1 className="text-white-100 font-extrabold text-[15px]  ">
                    Template Settings
                </h1>
            </div>
            <br />
            <div className="w-auto">
                <p className="text-white-200">
                    Feedback Form URL
                </p>
                <p className="text-white-300 text-[12px] ">Copy, Share and Get feedback from this url.</p>
                <br />
                <a href={formUrl} target="_blank" className="text-green-200 underline text-[12px]">{formUrl}</a>
                <br />
                <br />
                <div className="w-[350px] flex flex-row items-end justify-between overflow-x-hidden h-[45px] rounded-md mr-2 ">
                    <input type="text" value={formUrl} className="w-[350px]  px-3 py-3 bg-dark-200 text-white-200 outline-none border-none" />
                    <button className="btn w-[100px] h-[45px] bg-green-200 text-dark-100 font-extrabold " onClick={copyUrl}>
                        {isCopied ? "Url Copied" : "Copy URL"}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default TemplateSettings
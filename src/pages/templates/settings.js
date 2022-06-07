import React, { useState, useContext } from 'react'

function TemplateSettings() {
    return (
        <div className="w-full h-screen px-8">
            <div className="w-full">
                <h1 className="text-white-100 font-extrabold text-[15px]  ">
                    Template Settings
                </h1>
            </div>
            <br />
            <div className="w-auto">
                <div className="w-[300px] flex flex-row items-end justify-between overflow-x-hidden h-[45px] bg-dark-200 rounded-md mr-2 ">
                    <input type="text" className=" bg-none outline-none border-none" />
                    <button className="btn w-[100px] h-[45px] bg-green-200 text-dark-100 font-extrabold ">
                        Copy URL
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TemplateSettings
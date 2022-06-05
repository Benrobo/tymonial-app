import React, { useState, useEffect } from 'react'
import { Montage } from './testimonial-types/Montage'


function Testimonial() {



    return (
        <div className="w-full h-auto">
            <div className="w-full mt-5 p-7">
                <h2 className="text-[20px] font-extrabold ">Testimonial List.</h2>
                <p className="text-white-300 text-[15px] ">
                    All testimonial types which can be used within your app.
                </p>
            </div>
            <div className="w-full h-auto flex flex-col items-start justify-start">
                <Montage />
            </div>
        </div>
    )
}

export default Testimonial

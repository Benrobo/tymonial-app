import React, { useState, useEffect, useRef } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import light from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';
import { StarRate } from '../../../components';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa"

// SyntaxHighlighter.registerLanguage('javascript', js);

const code1 = `
    function test(){

    }
`


export function Montage() {

    const [activeTestName, setActiveTestName] = useState("ui")

    const montageCard = useRef()

    const SCROLL_VAL = 150;

    const toggleTestName = (e) => {
        let name = e.target.name;
        console.log(e.target);
        if (name !== undefined) {
            setActiveTestName(name)
        }
    }

    function scrollCardLeft() {
        const card = montageCard.current;
        card.scrollLeft -= SCROLL_VAL
    }

    function scrollCardRight() {
        const card = montageCard.current;
        card.scrollLeft += SCROLL_VAL
    }

    return (
        <div className="w-full h-auto rounded-md flex items-start justify-start flex-col ">
            <div id="head" className="w-full flex flex-row items-start justify-start ">
                <button name="ui" className={`rounded-md ml-5 px-5 py-2 ${activeTestName === "ui" ? "bg-green-200 text-dark-200" : "bg-dark-200 text-white-200"} mr-5 font-extrabold scale-[.90] hover:scale-[.95] transition-all hover:bg-green-200 hover:text-dark-100 `} onClick={toggleTestName}>
                    UI
                </button>
                <button name="code" className={`rounded-md ml-5 px-5 py-2 ${activeTestName === "code" ? "bg-green-200 text-dark-200" : "bg-dark-200 text-white-200"} mr-5 font-extrabold scale-[.90] hover:scale-[.95] transition-all hover:bg-green-200 hover:text-dark-100 `} onClick={toggleTestName}>
                    Config
                </button>
                <button name="code" className={`rounded-md ml-5 px-5 py-2 ${activeTestName === "code" ? "bg-green-200 text-dark-200" : "bg-dark-200 text-white-200"} mr-5 font-extrabold scale-[.90] hover:scale-[.95] transition-all hover:bg-green-200 hover:text-dark-100 `} onClick={toggleTestName}>
                    Code
                </button>
            </div>
            <br />
            <div id="title" className="w-full px-7 py-3">
                <p className="text-green-200 font-extrabold underline outline-1 outline-green-200 ">Montage Testimonial</p>
            </div>
            {
                activeTestName === "ui" &&
                <div className="w-[95%] mx-auto h-auto max-h-[500px] p-7 bg-dark-300 rounded-md overflow-y-auto relative ">
                    <div ref={montageCard} id="montage-testimonial-container" className="w-screen transition-all  gap-5">
                        <MontageCard />
                    </div>
                    <br />
                    <div className="w-full flex flex-row items-center justify-center gap-4">
                        <button className="bg-dark-200 px-3 py-2 rounded flex flex-col items-center justify-center" onClick={scrollCardLeft}>
                            <FaLongArrowAltLeft className='text-white-200' />
                        </button>
                        <button className="bg-dark-200 px-3 py-2 rounded flex flex-col items-center justify-center" onClick={scrollCardRight}>
                            <FaLongArrowAltRight className='text-white-200' />
                        </button>
                    </div>
                </div>
            }
            {activeTestName === "code" && <div className="w-[95%] mx-auto h-auto p-7 bg-dark-300 rounded-md overflow-hidden"></div>}
        </div>
    )
}


function MontageCard() {

    return (
        <>
            {
                Array(3).fill().map((list, i) => {
                    return (
                        <div id="testimonial-types-cards" key={i} className="w-[400px] max-w-[400px] px-7 py-10 rounded-md bg-dark-200 relative ">
                            <img src={"https://avatars.dicebear.com/api/micah/dsfcsdfcdsddsyour-custom-seed.svg"} alt="" className="absolute left-5 top-[-20px] shadow-lg bg-dark-100 w-[50px] h-[50px] rounded-[100%] outline-none " />
                            <br />
                            <div id="body" className="w-full flex flex-col items-start justify-start">
                                <p className="text-white-300 text-[15px] whitespace-pre-wrap ">Lorem ipsum dolor sit amet consectetur adipisicing elit. At, repellendus.</p>
                            </div>
                            {/* <div className="w-full border-[.9px] mt-5 mb-2 border-solid border-white-300  "></div> */}
                            <br />
                            <div id="bottom" className='w-full flex flex-row items-center justify-between '>
                                <div id="left" className="w-[50%] ">
                                    <p className="text-white-200 text-[15px] flex flex-col items-start justify-start ">Frank Brad</p>
                                    <small className='text-white-300'>Software Engineer</small>
                                </div>
                                <div id="right" className="w-[50%] flex flex-row items-end justify-end">
                                    <StarRate count={10} size={12} />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
import React, { useState, useEffect, useRef, useContext } from 'react'
import { StarRate, Input } from '../../../components/UI-COMP';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa"
import { CodeWrapper } from './codeWrapper';
import TemplateContext from '../../../context/TemplateContext';


export function Montage() {

    const { } = useContext(TemplateContext)
    const [activeTestName, setActiveTestName] = useState("ui")
    const [activeCodeType, setActiveCodeType] = useState("javascript")
    const [headings, setHeadings] = useState({
        heading: "",
        sub_heading: ""
    })

    // testimonial Color Settings
    // const [mainBgColor, setMainBgColor] = useState("")
    const [colors, setColors] = useState({
        cardBgColor: "",
        headingColor: "",
        subheadingColor: "",
        cardBodyTextColor: "",
        cardUsernameTextColor: "",
        cardRatingColor: "",
        controlsColor: "",
        controlsBgColor: "",
    })


    const montageCard = useRef()

    const SCROLL_VAL = 300;

    const handleHeadingsInput = (e) => {
        const { name } = e.target.dataset;
        if (name !== undefined) {
            const value = e.target.value;
            setHeadings((prevVal) => ({ ...prevVal, [name]: value }))
        }
    }

    const resetInputs = () => {
        setHeadings({
            heading: "",
            sub_heading: ""
        })
        setColors({
            cardBgColor: "",
            headingColor: "",
            subheadingColor: "",
            cardBodyTextColor: "",
            cardUsernameTextColor: "",
            cardRatingColor: "",
            controlsColor: "",
            controlsBgColor: "",
        })
    }

    const toggleTestName = (e) => {
        const name = e.target.name;
        if (name !== undefined) {
            setActiveTestName(name)
        }
    }

    const toggleCodeType = (e) => {
        const { name } = e.target.dataset;
        if (name !== undefined) {
            setActiveCodeType(name)
        }
    }

    function scrollCardLeft() {
        const card = montageCard.current;
        card.style.transition = ".2s all ease"
        card.scrollLeft -= SCROLL_VAL
    }

    function scrollCardRight() {
        const card = montageCard.current;
        card.style.transition = ".2s all ease"
        card.scrollLeft += SCROLL_VAL
    }

    const handleColors = (e) => {
        const { name } = e.target.dataset;
        if (name !== undefined) {
            let value = e.target.value
            setColors((prev) => ({ ...prev, [name]: value }))
        }
    }


    const JsCode = `
    // Tymonial CSS
    <link rel="stylesheet" href="https://unpkg.com/tymonial/lib/css/tymonial.css" />

    // Tymonial Javascript
    <script type="text/javascript" src="https://unpkg.com/tymonial@^1.8.0/lib/tymonial.js"></script>

    // initialize the tymonial object within a <script> tag
    new Tymonial({
        element: "#testimonial-container"
        user_id:"",
        template_id:"",
        testimonial_type:"Montage",
        heading: "${headings.heading}",
        sub_heading: "${headings.sub_heading}",
        cardBgColor: "${colors.cardBgColor}",
        headingColor: "${colors.headingColor}",
        subheadingColor: "${colors.subheadingColor}",
        cardBodyTextColor: "${colors.cardBodyTextColor}",
        cardUsernameTextColor: "${colors.cardUsernameTextColor}",
        cardRatingColor: "${colors.cardRatingColor}",
        controlsColor: "${colors.controlsColor}",
        controlsBgColor: "${colors.controlsBgColor}",
    })
    .init()
    `

    const ReactCode = `

    // REACT COMPONENT.

    COMING SOON!!!!!!!!

    // import tymonial
    import Tymonial from "tymonial"

    function App(){
        
        return (
            <Tymonial  
                user_id:"",
                template_id:"",
                testimonial_type:"Montage",
                heading: "${headings.heading}",
                sub_heading: "${headings.sub_heading}",
                cardBgColor: "${colors.cardBgColor}",
                headingColor: "${colors.headingColor}",
                subheadingColor: "${colors.subheadingColor}",
                cardBodyTextColor: "${colors.cardBodyTextColor}",
                cardUsernameTextColor: "${colors.cardUsernameTextColor}",
                cardRatingColor: "${colors.cardRatingColor}",
                controlsColor: "${colors.controlsColor}",
                controlsBgColor: "${colors.controlsBgColor}",
            />
        )
    }
    `


    return (
        <div className="w-full h-auto rounded-md flex items-start justify-start flex-col ">
            <div id="head" className="w-full flex flex-row items-start justify-start ">
                <button name="ui" className={`rounded-md ml-5 px-5 py-2 ${activeTestName === "ui" ? "bg-green-200 text-dark-200" : "bg-dark-200 text-white-200"} mr-5 font-extrabold scale-[.90] hover:scale-[.95] transition-all hover:bg-green-200 hover:text-dark-100 `} onClick={toggleTestName}>
                    UI
                </button>
                <button name="config" className={`rounded-md ml-5 px-5 py-2 ${activeTestName === "config" ? "bg-green-200 text-dark-200" : "bg-dark-200 text-white-200"} mr-5 font-extrabold scale-[.90] hover:scale-[.95] transition-all hover:bg-green-200 hover:text-dark-100 `} onClick={toggleTestName}>
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
                <div className="w-[95%] mx-auto h-auto max-h-[500px] bg-dark-300 rounded-md overflow-y-auto overflow-x-hidden py-6 relative ">
                    <div id="head" className="w-full p-5 flex flex-col items-center justify-center">
                        <p className="text-green-200 text-[12px] outline-2 outline-green-200 " style={{
                            color: `${colors.headingColor}`
                        }}>
                            {headings.heading ? headings.heading : "Testimonial"}
                        </p>
                        <br />
                        <h1 className="text-white-200 text-[20px] font-extrabold " style={{
                            color: `${colors.subheadingColor}`
                        }}>
                            {headings.sub_heading ? headings.sub_heading : "What People Think About Us."}
                        </h1>
                    </div>
                    <div ref={montageCard} id="montage-testimonial-container" className="w-full gap-5 p-5 overflow-x-scroll transition-all">
                        <MontageCard colors={colors} />
                    </div>
                    <br />
                    <div className="w-full mx-auto flex flex-row items-center justify-center gap-4">
                        <button className="bg-dark-200 px-3 py-2 rounded flex flex-col items-center justify-center" onClick={scrollCardLeft} style={{ background: colors.controlsBgColor }}>
                            <FaLongArrowAltLeft className='text-white-200' style={{ color: colors.controlsColor }} />
                        </button>
                        <button className="bg-dark-200 px-3 py-2 rounded flex flex-col items-center justify-center" onClick={scrollCardRight}>
                            <FaLongArrowAltRight className='text-white-200' style={{ color: colors.controlsColor }} />
                        </button>
                    </div>
                </div>
            }
            {activeTestName === "config" &&
                <div className="w-[95%] mx-auto h-auto p-7 bg-dark-300 flex flex-row items-start justify-between rounded-md overflow-hidden">
                    <div id="left" className="w-[50%]">
                        <p className="text-white-200 font-extrabold text-[20px] ">Color</p>
                        <br />
                        <div className="w-full flex flex-col items-start justify-start">
                            <ColorPallete title='Card Background' value={colors.cardBgColor} handleColor={handleColors} name="cardBgColor" />

                            <ColorPallete title='Heading Color' value={colors.headingColor} handleColor={handleColors} name="headingColor" />

                            <ColorPallete title='Sub-Heading Color' value={colors.subheadingColor} handleColor={handleColors} name="subheadingColor" />

                            <ColorPallete title='Card (Body) Text Color' value={colors.cardBodyTextColor} handleColor={handleColors} name="cardBodyTextColor" />

                            <ColorPallete title='Card (Username) Text Color' value={colors.cardUsernameTextColor} handleColor={handleColors} name="cardUsernameTextColor" />

                            <ColorPallete title='Card (Rating) Text Color' value={colors.cardRatingColor} handleColor={handleColors} name="cardRatingColor" />

                            <ColorPallete title='Controls Text Color' value={colors.controlsColor} handleColor={handleColors} name="controlsColor" />

                            <ColorPallete title='Controls Background Color' value={colors.controlsBgColor} handleColor={handleColors} name="controlsBgColor" />
                        </div>
                    </div>
                    <div id="right" className="w-[50%]">
                        <p className="text-white-200 font-extrabold text-[20px] ">Elements</p>
                        <br />
                        <Input placeholder="Heading" data-name="heading" onChange={handleHeadingsInput} value={headings.heading} />
                        <br />
                        <br />
                        <Input placeholder="Sub-Heading" data-name="sub_heading" onChange={handleHeadingsInput} value={headings.sub_heading} />
                        <br />
                        <br />
                        <button className="btn px-3 bg-dark-100" onClick={resetInputs}>Reset Inputs</button>
                    </div>
                </div>
            }

            {activeTestName === "code" &&
                <div className="w-[95%] mx-auto h-auto p-7 bg-dark-300 rounded-md overflow-hidden">
                    <div className="w-full h-auto mb-4 flex flex-row items-start justify-start ">
                        <span data-name="javascript" className={`px-3 py-2 scale-[.80] cursor-pointer rounded-md ${activeCodeType == "javascript" ? "bg-dark-100 text-white-200 font-extrabold" : "bg-dark-200 text-white-200"} mr-2 `} onClick={toggleCodeType}>Javascript</span>
                        <span data-name="react" className={`px-3 py-2 scale-[.80] cursor-pointer rounded-md ${activeCodeType == "react" ? "bg-dark-100 text-white-200 font-extrabold" : "bg-dark-200 text-white-200"} mr-2 `} onClick={toggleCodeType}>React</span>
                    </div>

                    {activeCodeType === "javascript" && <CodeWrapper language='javascript' code={JsCode} />}
                    {activeCodeType === "react" && <CodeWrapper code={ReactCode} />}
                </div>
            }
        </div>
    )
}

function ColorPallete({ title = "Color Pallete", name, value = "#000000", handleColor }) {

    return (
        <li className="w-[400px] flex flex-row items-start justify-between mb-3">
            <label className="text-white-200 mr-4">{title} : <span className="font-extrabold text-green-200" style={{ color: value }}>{value}</span> </label>
            <input data-name={name} type="color" className='rounded-md' onChange={handleColor} />
        </li>
    )
}


function MontageCard({ colors }) {

    const { isProfilePic, isUserCareer } = useContext(TemplateContext)

    return (
        <>
            {
                Array(3).fill().map((list, i) => {
                    return (
                        <div id="testimonial-types-cards" key={i} className="w-[400px] max-w-[400px] px-7 py-10 rounded-md bg-dark-200 mr-10 relative " style={{
                            background: `${colors.cardBgColor}`
                        }} >
                            {isProfilePic && <img src={"https://avatars.dicebear.com/api/micah/dsfcsdfcdsddsyour-custom-seed.svg"} alt="" className="absolute left-5 top-[-20px] shadow-lg bg-dark-100 w-[50px] h-[50px] rounded-[100%] outline-none " />}
                            {isProfilePic && <br />}
                            <div id="body" className="w-full flex flex-col items-start justify-start">
                                <p className="text-white-100 text-[15px] whitespace-pre-wrap " style={{
                                    color: `${colors.cardBodyTextColor}`
                                }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, repellendus.</p>
                            </div>
                            {/* <div className="w-full border-[.9px] mt-5 mb-2 border-solid border-white-300  "></div> */}
                            <br />
                            <div id="bottom" className='w-full flex flex-row items-center justify-between '>
                                <div id="left" className="w-[50%] ">
                                    <p className="text-white-200 text-[15px] flex flex-col items-start justify-start " style={{
                                        color: `${colors.cardUsernameTextColor}`
                                    }}>Frank Brad</p>
                                    {isUserCareer && <small className='text-white-300' style={{
                                        color: `${colors.cardUsernameTextColor}`
                                    }}>Software Engineer</small>}
                                </div>
                                <div id="right" className="w-[50%] flex flex-row items-end justify-end">
                                    <StarRate count={10} size={12} color={colors.cardRatingColor} />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className="w-[200px] h-full "></div>
        </>
    )
}
import { createContext, useEffect, useState } from "react";


const TemplateContext = createContext(null)

export default TemplateContext

export function TemplateContextProvider({ children }) {

    const [isUserName, setIsUserName] = useState(true)
    const [isUserCareer, setIsUserCareer] = useState(false)
    const [isRatings, setIsRatings] = useState(true)
    const [isProfilePic, setIsProfilePic] = useState(false)
    const [formInputs, setFormInputs] = useState({
        heading: "Feedback Form",
        subHeading: "Your feedback is highly appreciated"
    })
    const [ratingsVal, setRatingsVal] = useState(1)
    // form heading input
    const handleFormHeadingInputs = (e) => {
        const name = e.target.name;
        const val = e.target.value;

        if (name !== undefined) {
            setFormInputs((prevVal) => ({ ...prevVal, [name]: val }))
        }
    }

    const handleSwitch3 = () => setIsUserCareer(!isUserCareer)
    const handleSwitch4 = () => setIsProfilePic(!isProfilePic)

    return (
        <TemplateContext.Provider value={{ isUserName, isUserCareer, isRatings, isProfilePic, formInputs, ratingsVal, setRatingsVal, handleFormHeadingInputs, handleSwitch3, handleSwitch4 }}>
            {children}
        </TemplateContext.Provider>
    )
}

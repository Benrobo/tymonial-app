import { createContext, useEffect, useState } from "react";


const TemplateContext = createContext(null)

export default TemplateContext

export function TemplateContextProvider({ children }) {

    // testimonial form colors
    const [formColors, setFormColors] = useState({
        bgHeader: "",
        formBg: "",
        headerPriColor: "",
        headerSecColor: "",
        inputBg: "",
        inputColor: "",
        buttonBg: "",
        buttonColor: "",
        ratingColor: ""
    })

    // handle form ui
    const handleFormUI = (e) => {
        const { name } = e.target.dataset;
        if (name !== undefined) {
            const value = e.target.value;
            setFormColors((prev) => ({ ...prev, [name]: value }))
        }
    }

    const resetFormUi = () => {
        setFormColors({
            bgHeader: "",
            formBg: "",
            headerPriColor: "",
            headerSecColor: "",
            inputBg: "",
            inputColor: "",
            buttonBg: "",
            buttonColor: "",
            ratingColor: ""
        })
    }

    return (
        <TemplateContext.Provider value={{ formColors, handleFormUI, resetFormUi }}>
            {children}
        </TemplateContext.Provider>
    )
}

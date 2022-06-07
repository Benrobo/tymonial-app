
import { AiFillStar } from "react-icons/ai"


export function StarRate({ count, color = "", size = 15 }) {

    return (
        <>
            {
                Array(count).fill().map((list, i) => {
                    return (
                        <AiFillStar key={i} className={`text-[20px] `} style={{ color: color === "" ? "#64f4acea" : color, fontSize: `${size}px` }} />
                    )
                })
            }
        </>
    )
}


export function Input({ ...rest }) {

    return (
        <input {...rest} className={`w-full rounded-md ourtline-none bg-dark-200 px-3 py-3 text-white-200 `} />
    )
}

export function ColorPallete({ title = "Color Pallete", name, value = "#000000", handleColor }) {

    return (
        <li className="w-[400px] flex flex-row items-start justify-between mb-3">
            <label className="text-white-200 mr-4">{title} : <span className="font-extrabold text-green-200" style={{ color: value }}>{value}</span> </label>
            <input data-name={name} type="color" className='rounded-md' onChange={handleColor} />
        </li>
    )
}


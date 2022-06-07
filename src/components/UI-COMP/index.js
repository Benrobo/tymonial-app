
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
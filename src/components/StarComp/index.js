import { AiFillStar } from "react-icons/ai"




function StarRate({ count, color = "#64f4acea", size = 15 }) {

    return (
        <>
            {
                Array(count).fill().map((list, i) => {
                    return (
                        <AiFillStar key={i} className={`text-[20px] `} style={{ color, fontSize: `${size}px` }} />
                    )
                })
            }
        </>
    )
}

export default StarRate
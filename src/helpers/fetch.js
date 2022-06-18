

import jwtDecode from "jwt-decode";
import { BASE_URL } from "../config"



const refreshToken = async (token) => {
    if (token !== undefined || token !== "") {

        try {
            let url = `${BASE_URL}/auth/refresh`
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ token })
            })

            let data = await res.json()

            if (data && data.error === true) {
                throw new Error(data.message)
            }

            const { token } = data;


            return data;
        } catch (err) {
            throw new Error(err.message)
        }
    }
}

async function Fetch(url, config = {}) {
    const tokenData = localStorage.getItem("token")
    let token = cookie.split("=")[1];

    // exp gives us date in milliseconds
    let { exp } = jwtDecode(token)
    // convert milliseconds -> seconds
    let date = new Date().getTime() / 1000;
    // check if exp date is < the present date
    if (exp < date) {
        const reftoken = getLocalstorage()
        let authToken = await refreshToken(reftoken.refreshToken)
        token = authToken.accessTokens
    }
    // add headers begfore making requests
    config["headers"] = {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
    }

    let res = await fetch(url, config);
    let data = await res.json();

    return { res, data }
}

export default Fetch
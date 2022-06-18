import axios from "axios"
import jwtDecode from "jwt-decode"
import { BASE_URL } from "../config"
import { Notification } from ".";

const notyf = new Notification(4000)

const authToken = localStorage.getItem("authToken") !== null ? jwtDecode(JSON.parse(localStorage.getItem("authToken"))) : null;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Authorization": `Bearer ${authToken?.accessToken}`
    }
})

export default axiosInstance

axiosInstance.interceptors.request.use(async req => {
    if (!authToken) {
        authToken = localStorage.getItem("authToken") !== null ? jwtDecode(JSON.parse(localStorage.getItem("authToken"))) : null;

        req.headers.Authorization = `Bearer ${authToken}`
    }

    // check token expiration
    const token = JSON.parse(localStorage.getItem("authToken"))
    let { exp } = jwtDecode(token.accessToken)
    // convert milliseconds -> seconds
    let date = new Date().getTime() / 1000;
    const isExpired = exp < date;

    if (isExpired) {
        const localToken = JSON.parse(localStorage.getItem("authToken"))
        let newToken = await refreshToken(localToken.accessToken)
        req.headers.Authorization = `Bearer ${newToken}`
        return
    }

    return req;
})

async function refreshToken(accessToken = "") {
    const url = "/auth/refresh"
    const req = await axiosInstance.post(url, {
        token: accessToken
    })
    const res = await req.data;

    console.log(res);
    if (res.error) {
        notyf.error("Something went wrong, try logging In.")
        throw new Error(res.message)
    }

    const { data } = res;
    const token = data?.token;

    localStorage.setItem("authToken", JSON.stringify({ accessToken: token }))

}
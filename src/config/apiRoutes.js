import { BASE_URL } from "."


const API_ROUTES = {

    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
    getTemplate: `${BASE_URL}/templates/get`,
    createTemplate: `${BASE_URL}/templates/create`,
}

export default API_ROUTES
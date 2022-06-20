import { BASE_URL } from "."


const API_ROUTES = {

    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
    getTemplate: `${BASE_URL}/templates/get`,
    createTemplate: `${BASE_URL}/templates/create`,
    getTemplateForm: `${BASE_URL}/templates/form/get`,
    getTemplateFeedbackForm: `${BASE_URL}/templates/form/getFeedbackForm`,
    updateTemplateForm: `${BASE_URL}/templates/form/updateForm`,
    addFeedback: `${BASE_URL}/feedbacks/add`,
}

export default API_ROUTES
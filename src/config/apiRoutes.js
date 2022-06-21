import { BASE_URL } from "."


const API_ROUTES = {

    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
    getTemplate: `${BASE_URL}/templates/get`,
    createTemplate: `${BASE_URL}/templates/create`,
    deleteTemplate: `${BASE_URL}/templates/delete`,
    getTemplateForm: `${BASE_URL}/templates/form/get`,
    getTemplateFeedbackForm: `${BASE_URL}/templates/form/getFeedbackForm`,
    updateTemplateForm: `${BASE_URL}/templates/form/updateForm`,
    getFeedback: `${BASE_URL}/feedbacks/get`,
    addFeedback: `${BASE_URL}/feedbacks/add`,
    publishFeedback: `${BASE_URL}/feedbacks/publish`,
    deleteFeedback: `${BASE_URL}/feedbacks/delete`,
}

export default API_ROUTES
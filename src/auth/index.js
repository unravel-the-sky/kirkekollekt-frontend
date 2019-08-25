// this is where to fetch the data
import axios from 'axios'

// min egen backend, endelig
const apiUrl = 'https://kirkekollekt-backend.herokuapp.com/api/organisations'
// const apiUrl = 'https://localhost:5001/api/organisations'

const handleResponse = (res) => {
    const result = {
        error: false,
        status: res.status,
        statusText: res.statusText,
        data: res.data
    }
    return result
}

const handleError = (err, methodName) => {
    console.error(`error on ${methodName}: ${err.response}`)
    const error = {
        error: true,
        status: err.response.status,
        statusText: err.response.statusText,
        data: err.response.data
    }
    return error
}

const makeRequest = async (url, method, data) => {
    try {
        const res = await axios({
            method,
            url,
            data
        })
        return handleResponse(res);
    } catch (err) {
        return handleError(err, url)
    }
}

export default {
    async sendOrganisationData(formData) {
        const url = apiUrl
        const data = {
            Name: formData.name,
            Image: formData.image,
            Description: formData.description,
            Email: formData.email,
        }

        const res = await makeRequest(url, 'post', data)
        return res;
    },
    async getAllOrganisations() {
        const url = apiUrl;
        const res = await makeRequest(url, 'get')
        return res;
    },
    async getAllDonations(){
        const url = apiUrl + '/donations';
        const res = await makeRequest(url, 'get')
        return res;
    },
    async deleteOrganisation(id) {
        const url = apiUrl + '/' + id;
        const res = await makeRequest(url, 'delete');
        return res;
    },
    async getOrganisation(id) {
        const url = apiUrl + '/' + id;
        const res = await makeRequest(url, 'get');
        return res;
    },
    async updateOrganisation(id, formData) {
        const data = {
            Name: formData.name,
            Image: formData.image,
            Description: formData.description,
            Email: formData.email,
            Id: formData.id
        }
        const url = apiUrl + '/' + id;
        const res = await makeRequest(url, 'put', data);
        return res;
    },
    async sendDonations(formData) {
        const data = {
            Name: formData.name,
            Info: formData.contactInfo,
            Organisations: formData.organisations
        }
        const url = apiUrl + '/sendmail';
        const res = await makeRequest(url, 'post', data);
        return res;
    }
}
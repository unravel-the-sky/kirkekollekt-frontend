// this is where to fetch the data
import axios from 'axios'

// CosmisJS
const cosmicJsApiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNla2RlbWlyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTU1YmU0MWE3NzYyZGZhY2ExODc4ZTg5NzNiOWI3MWEiLCJpYXQiOjE1NDk1NTMyODh9.x_-kY2tSm8BQIFqrhFyep5vAFZVsq1DZRCd2h6NRZ-Q';
const bucketName = 'ingunn-test'
const cosmic = require('cosmicjs')({
    token: cosmicJsApiToken
})

// Wordpress
const wpiApi = require('wpapi/superagent')
const wp = new wpiApi({
    endpoint: 'https://kirkekollekt.no/wp-json'
})

// Hello ButterCMS
const butterCmsApiToken = '40c00288ea4f021316704632a965103990e294cb'
import Butter from 'buttercms'
const butter = Butter(butterCmsApiToken)

import logoData from './../temp.js'

// mailgun GREIE
const mailgun = require('mailgun.js')
const mg = mailgun.client({
    username: 'api',
    key: 'key-dd199113223399e4565548e74d19f1a5'
})

// min egen backend, endelig
const apiUrl = 'http://localhost:5000/api/organisations'

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
    sendEmail() {
        mg.messages.create('sandboxef7ef566179f424c941992c9111bf409.mailgun.org', {
                from: 'Sadan <sadan@wee.com>',
                to: ['sekdemir@gmail.com'],
                subject: 'WEEEEE!',
                text: 'whoa testing mailgun, my god, dwoooaaaaahhh',
                html: '<h1> i mean, whoaaa </h1>'
            })
            .then(res => console.log('response: ', res))
            .catch(err => console.error('oups, ', err))
    },
    getButterCmsContent() {
        return butter.page.retrieve('*', 'organisations')
            .then(res => {
                console.log('whoa, buttercms: ', res)
            }).catch(err => {
                console.error('poop, error: ', err)
            })
    },
    getWpContent() {
        return wp.posts().perPage(100).then(res => {
            console.log('whoaa, data ', res)

            const result = {
                data: res,
                error: null
            }

            return result;

        }).catch(err => {
            console.error('poop ', err)
        })
    },
    getBucketInfo() {
        const bucket = cosmic.bucket({
            slug: bucketName,
            read_key: '',
            write_key: ''
        })
        return bucket
            .getBucket()
            .then(res => {
                // console.log('here is the data: ', res.bucket)

                const result = {
                    data: res.bucket.objects,
                    error: null
                }

                return result;
            }).catch(err => {
                console.error('error! ', err)
                const result = {
                    data: null,
                    error: err
                }

                return result;
            })
    },

    /**
     * THIS IS ONLY FOR TESTING FRONTEND
     */
    getHardCodedData() {
        return logoData;
    }
}
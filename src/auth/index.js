// this is where to fetch the data

// CosmisJS
const cosmicJsApiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNla2RlbWlyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTU1YmU0MWE3NzYyZGZhY2ExODc4ZTg5NzNiOWI3MWEiLCJpYXQiOjE1NDk1NTMyODh9.x_-kY2tSm8BQIFqrhFyep5vAFZVsq1DZRCd2h6NRZ-Q';
const bucketName = 'ingunn-test'
const cosmic = require('cosmicjs')({
    token: cosmicJsApiToken
})

// Wordpress
const wpiApi = require('wpapi/superagent')
const wp = new wpiApi({endpoint: 'https://kirkekollekt.no/wp-json'})

// Hello ButterCMS
const butterCmsApiToken = '40c00288ea4f021316704632a965103990e294cb'
import Butter from 'buttercms'
const butter = Butter(butterCmsApiToken)

export default {
    getButterCmsContent(){
        return butter.page.retrieve('*', 'organisations')
        .then(res => {
            console.log('whoa, buttercms: ', res)
        }).catch(err => {
            console.error('poop, error: ', err)
        })
        // return butter.post.list({
        //     page: 1,
        //     page_size: 10
        // }).then(res => {
        //     console.log('whoa, buttercms: ', res)
        // }).catch(err => {
        //     console.error('poop, error: ', err)
        // })
    },
    getWpContent(){
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
                    data: res.bucket,
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
    }
}
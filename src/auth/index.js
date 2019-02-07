// this is where to fetch the data
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNla2RlbWlyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTU1YmU0MWE3NzYyZGZhY2ExODc4ZTg5NzNiOWI3MWEiLCJpYXQiOjE1NDk1NTMyODh9.x_-kY2tSm8BQIFqrhFyep5vAFZVsq1DZRCd2h6NRZ-Q';
const bucketName = 'ingunn-test'
const cosmic = require('cosmicjs')({
    token: apiToken
})

export default {
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
import $fetch from './request';
const baseUrl = 'http://127.0.0.1:9115';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    /* getGroupCity: () => $fetch.get(baseUrl + '/v1/cities', {type: 'group'}),
    getHotCity: () => $fetch.get(baseUrl + '/v1/cities', {type: 'hot'}),
    adminLogin: () =>$fetch.post(baseUrl + '/admin/login', {username: '张三', password: 123}),
    getTest: () => $fetch.get('/api/getReq'),
    postTest: () => $fetch.post('/api/postReq'), */

    getBanner: () => $fetch.get(baseUrl + '/banner'),
}



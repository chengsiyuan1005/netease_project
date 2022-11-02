/* 
    封装fetch网络请求
*/
import qs from 'qs';

function commonFetch(url, data = null, method = 'GET') {
    // 处理data数据
    let queryData = qs.stringify(data);
    // 声明一个用于配置网络请求的其他信息
    let options = {};
    if (method === 'GET') {
        url += '?' + queryData;
        options = {
            method,
        }
    } else {
        options = {
            method: method,
            body: data,
            headers: {
                'Content-Type': 'application/x-wwww-form-urlencoded'
                // 'Content-Type': 'application/JSON'
            }
        }
    }
    // new Promise是同步的
    // new Promise函数中是异步的
    return new Promise((resolve, reject) => {
        fetch(url, options)
        .then(response => response.json())
        // .then(data => {resolve(data)})
        // .catch(error => {reject(error)})
        .then(resolve)
        .catch(reject)
    });
}

const get = (url, data) => commonFetch(url, data, 'GET');
const post = (url, data) => commonFetch(url, data, 'POST');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get,
    post
}


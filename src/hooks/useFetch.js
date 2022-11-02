// 自定义hook封装网络请求
import $fetch from '../network/request';
import { useState, useEffect } from 'react';

export function useGetFetch(url, options) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        $fetch.get(url, options)
            .then(res => setData(res))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])
    return [loading, data, error];
};

export function usePostFetch(url, options) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        $fetch.post(url, options)
            .then(res => setData(res))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])
    return [loading, data, error];
};


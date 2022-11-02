import { useState, useEffect } from "react";

export const useRecommendSongsUrl = (initValue) => {
    const [recommendSongsUrl, setRecommendSongsUrl] = useState(initValue);

    useEffect(() => {
        // render 后 DidMount 
        setRecommendSongsUrl(initValue);
        console.log('获取到的url: ', initValue);
    })

    return [recommendSongsUrl];
}

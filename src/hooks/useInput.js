// 封装一个hook, 实现input受控组件

import { useState } from "react";

export const useInput = (initValue) => {
    const [value, setValue] = useState(initValue);



    return {
        value,
        onChange: e => setValue(e.target.value)
    };
}
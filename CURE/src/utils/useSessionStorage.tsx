import { useState } from 'react';

export const useSessionStorage = (key:any, defValue:any) => {

    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.sessionStorage.getItem(key);
            if (value) {
                return value;
            } else {
                window.sessionStorage.setItem(key, defValue);
                return defValue;
            }
        } catch (error) {
            console.log(error);
            return defValue;
        }
    });

    const setValue = (value:any) => {
        try {
            window.sessionStorage.setItem(key, value);
        } catch (error) {
            console.log(error);
        }
        setStoredValue(value);
    };
    return [storedValue, setValue];
};
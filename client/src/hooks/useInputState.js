import {useState} from 'react';

export default initialVal => {
    const [value, setValue] = useState(initialVal);
    const handleChange = (e) => {
        setValue(values => { 
            return {...values, [e.target.name]:e.target.value}});
    };
    const reset = () => {
        setValue("");
    };
 return[value, handleChange, reset];
};

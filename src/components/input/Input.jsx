import React from 'react';
import './Input.less';

const getErrorClass = (error) => {
    if (error) {
        return 'error';
    }
}

const Input = ({error, label, ...props}) => {
    return (
        
        <div className="input-wrapper">
            <label htmlFor={props.id}>{label}</label>
            <input 
                className={getErrorClass(error)}
                {...props}
            />
            { error && <div className='error'>{error}</div>}
            
        </div>
    )
}

/* Here goes your component */
export default Input;
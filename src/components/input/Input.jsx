import React from 'react';
import './Input.less';

const getErrorClass = (error) => {
    if (error) {
        return 'error';
    }
}

const Input = (props) => {
    const {onChangeValue, error, ...other} = props;
    return (
        
        <div className="input-wrapper">
            <label htmlFor={props.id}>{props.label}</label>
            <input 
                onChange={onChangeValue}
                className={getErrorClass(error)}
                {...other}
            />
            { error && <div className='error'>{error}</div>}
            
        </div>
    )
}

/* Here goes your component */
export default Input;
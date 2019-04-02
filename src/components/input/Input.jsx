import React from 'react';
import './Input.less';

const Input = (props) => {
    return (
        <div className="input-wrapper">
            <label htmlFor={props.id}>{props.label}</label>
            <input onChange={(event) => props.changeValue(event)} id={props.id} type="number" value={props.value} step="1" />
            { props.error && <div className="error">{props.error}</div>}
            
        </div>
    )
}

/* Here goes your component */
export default Input;
import React from 'react';
import './Result.less';

const Result = (props) => {

    return (
        <div className="result">
            Result: {props.value.res}
        </div>
    )
}

/* Here goes your component */
export default Result;
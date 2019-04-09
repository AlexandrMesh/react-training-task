import React from 'react';
import './Refresh.less';

const Refresh = ({refresh, ...props}) => {

    return (
        <button className="refresh-button" onClick={refresh} {...props}>
            Refresh
        </button>
    )
}

/* Here goes your component */
export default Refresh;
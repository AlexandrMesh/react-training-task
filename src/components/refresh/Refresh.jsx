import React from 'react';
import './Refresh.less';

const Refresh = (props) => {
    return (
        <button className="refresh-button" onClick={() => props.refresh()}>
            Refresh
        </button>
    )
}

/* Here goes your component */
export default Refresh;
import React from 'react';
import './Refresh.less';

const Refresh = (props) => {

    const {refresh, ...other} = props;

    return (
        <button className="refresh-button" onClick={refresh} {...other}>
            Refresh
        </button>
    )
}

/* Here goes your component */
export default Refresh;
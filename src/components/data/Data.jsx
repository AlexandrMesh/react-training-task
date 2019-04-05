import React from 'react';
import './Data.less';

const getMarkedClass = (x, y, indexes) => {
    if (indexes.some((data) => data.x === x && data.y === y)) {
        return 'marked';
    }
}

const getDisabledClass = (validation) => {
    if (!validation) {
        return 'disabled'
    }
}

const Data = (props) => {

    const {validation, data, find} = props;

    return (
        <table className={getDisabledClass(validation)}>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i}>
                        {row.map((col, j) => (
                            <td key={j} className={getMarkedClass(i, j, find.indexes)}>{col}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

/* Here goes your component */
export default Data;
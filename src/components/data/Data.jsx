import React from 'react';
import './Data.less';

const getMarkedClassName = (x, y, indexes) => {
    if (indexes.some((data) => data.x === x && data.y === y)) {
        return 'marked';
    }
}

const getDisabledClassName = (validation) => {
    console.log(validation, 'validation');
    if (!validation) {
        return 'disabled'
    }
}

const Data = ({validation, data, find}) => {
    return (
        <table className={getDisabledClassName(validation)}>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i}>
                        {row.map((col, j) => (
                            <td key={j} className={getMarkedClassName(i, j, find.indexes)}>{col}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

/* Here goes your component */
export default Data;
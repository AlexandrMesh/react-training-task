import React from 'react';
import './Data.less';

const findIndex = (x, y, indexes) => {
    const findIndexes = indexes.filter((data) => {
        if (data.x === x && data.y === y) {
            return data;
        }
    });

    if (findIndexes.length > 0) {
        return 'marked';
    }
}

const Disabled = (validation) => {
    if (!validation) {
        return 'disabled'
    }
}

const Data = (props) => {

    const data = props.data;
    const find = props.find.indexes;

    return (
        <table className={Disabled(props.validation)}>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i}>
                        {row.map((col, j) => (
                            <td key={j} className={findIndex(i, j, find)}>{col}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

/* Here goes your component */
export default Data;
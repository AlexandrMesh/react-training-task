import React from 'react';
import { findMaxAdjacent, getRandomValue, generateTableData } from './utilities';
import './YourComponent.less';

function data() {
    // return [[4,33,321,4,33,321,33,321],
    //     [4,33,321,4,33,321,33,321],
    //     [4,33,321,4,33,321,33,321],
    //     [4,33,321,4,33,321,33,321],
    //     [4,33,321,4,33,321,33,321],
    //     [4,33,321,4,33,321,33,321],
    //     [4,33,321,4,33,321,33,321],
    //     [4,33,321,4,33,321,33,321]];
    console.log(generateTableData(3));
    return generateTableData(3);
}

/* Here goes your component */
export default () => <h1>Hello World { data() }</h1>;
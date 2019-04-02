import React, { Component } from 'react';
import { findMaxAdjacent, generateTableData } from '../../helpers/utilities';
import Input from '../input/Input';
import Result from '../result/Result';
import Refresh from '../refresh/Refresh';
import Data from '../data/Data';
import './App.less';

class App extends Component {

    state = {
        size: 5,
        limit: 3,
        data: generateTableData(5),
        validation: {
            valid: true,
            size: {
                valid: true,
                minLength: 3,
                maxLength: 20,
                error: null
            },
            limit: {
                valid: true,
                minLength: 2,
                maxLength: 5,
                error: null
            }
        }
    }

    constructor(props) {
        super(props);

        this.changeSize = this.changeSize.bind(this);
        this.changeLimit = this.changeLimit.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }

    maxValidationSize(size) {
        if (size <= this.state.validation.size.maxLength) {
            return true;
        }
    }

    compareWithLimit(size) {
        if (this.state.limit <= size) {
            return true;
        }
    }

    minValidationSize(size) {
        if (size >= this.state.validation.size.minLength) {
            return true;
        }
    }

    maxValidationLimit(limit) {
        if (limit <= this.state.validation.limit.maxLength) {
            return true;
        }
    }

    compareWithSize(limit) {
        if (this.state.size >= limit) {
            return true;
        }
    }

    minValidationLimit(limit) {
        if (limit >= this.state.validation.limit.minLength) {
            return true;
        }
    }

    validationErrorMessageReducerSize(size) {
        if (!this.maxValidationSize(size)) {
            return `Максимальное значение ${this.state.validation.size.maxLength}`;
        } 
        if (!this.compareWithLimit(size)) {
            return `Не должно быть меньше чем Limit`;
        } 
        if (!this.minValidationSize(size)) {
            return `Минимальное значение ${this.state.validation.size.minLength}`;
        } 
        
    }

    validationErrorMessageReducerLimit(limit) {
        if (!this.maxValidationLimit(limit)) {
            return `Максимальное значение ${this.state.validation.limit.maxLength}`;
        }
        if (!this.compareWithSize(limit)) {
            return `Не должно быть больше чем Size`;
        }
        if (!this.minValidationLimit(limit)) {
            return `Минимальное значение ${this.state.validation.limit.minLength}`;
        }
    }

    validationSize(size) {

        let data;
        let validSize;
        let valid;
        let error;

        if (this.maxValidationSize(size) && this.compareWithLimit(size) && this.minValidationSize(size)) {
            data = generateTableData(size);
            validSize = true;
            error = null;
        } else {
            error = this.validationErrorMessageReducerSize(size);
            data = this.state.data;
            validSize = false;
        }

        if (this.state.validation.limit.valid && validSize) {
            valid = true;
        } else {
            valid = false;
            data = this.state.data;
        }

        this.setState({
            validation: {
                valid: valid,
                limit: {
                    ...this.state.validation.limit
                },
                size: {
                    ...this.state.validation.size,
                    valid: validSize,
                    error: error
                }
            },
            size: size,
            data: data
        })

    }

    validationLimit(limit) {
        let data = this.state.data;
        let validLimit;
        let valid;
        let error;

        if (this.maxValidationLimit(limit) && this.compareWithSize(limit) && this.minValidationLimit(limit)) {
            validLimit = true;
            error = null;
        } else {
            error = this.validationErrorMessageReducerLimit(limit);
            validLimit = false;
            
        }

        if (this.state.validation.size.valid && validLimit) {
            valid = true;
        } else {
            valid = false;
        }

        this.setState({
            validation: {
                valid: valid,
                size: {
                    ...this.state.validation.size
                },
                limit: {
                    ...this.state.validation.limit,
                    valid: validLimit,
                    error: error
                }
            },
            limit: limit,
            data: data
        })
    }

    changeSize(event) {
        const size = +event.target.value;

        this.validationSize(size);

    }

    changeLimit(event) {
        const limit = +event.target.value;
        this.validationLimit(limit);
    }

    findMaxNumber() {
        return findMaxAdjacent(this.state.data, this.state.limit);

    }

    refreshData() {
        if (this.state.validation.valid) {
            this.setState({
                size: this.state.size,
                limit: this.state.limit,
                data: generateTableData(this.state.size)
            });
        }
    }

    render() {
        return (
            <div className="app-wrapper">
                <div className="form">
                    <Input changeValue={this.changeSize} label="Size" id="size" value={this.state.size} error={this.state.validation.size.error} />
                    <Input changeValue={this.changeLimit} label="Limit" id="limit" value={this.state.limit} error={this.state.validation.limit.error} />
                    <Result value={this.findMaxNumber()} />
                    <Refresh refresh={this.refreshData} />
                </div>
                <Data data={this.state.data} find={this.findMaxNumber()} validation={this.state.validation.valid} />
            </div>
        );
    }
}

export default App;
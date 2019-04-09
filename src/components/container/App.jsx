import React, { Component } from 'react';
import { findMaxAdjacent, generateTableData } from '../../helpers/utilities';
import { connect } from 'react-redux';
import Input from '../input/Input';
import Result from '../result/Result';
import Refresh from '../refresh/Refresh';
import Data from '../data/Data';
import { updateSize, updateLimit, refresh } from '../../store/actions/dataActions'
import './App.less';

class App extends Component {

    constructor(props) {
        super(props);
        this.handleChangeSize = this.handleChangeSize.bind(this);
        this.handleChangeLimit = this.handleChangeLimit.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }

    getMaxValidationSize(size) {
        if (size <= this.props.validation.size.maxLength) {
            return true;
        }
    }

    getComparingWithLimit(size) {
        if (this.props.limit <= size) {
            return true;
        }
    }

    getMinValidationSize(size) {
        if (size >= this.props.validation.size.minLength) {
            return true;
        }
    }

    getMaxValidationLimit(limit) {
        if (limit <= this.props.validation.limit.maxLength) {
            return true;
        }
    }

    getComparingWithSize(limit) {
        if (this.props.size >= limit) {
            return true;
        }
    }

    getMinValidationLimit(limit) {
        if (limit >= this.props.validation.limit.minLength) {
            return true;
        }
    }

    getErrorMessageForSize(size) {
        if (!this.getMaxValidationSize(size)) {
            return `Максимальное значение ${this.props.validation.size.maxLength}`;
        }
        if (!this.getComparingWithLimit(size)) {
            return `Не должно быть меньше чем Limit`;
        }
        if (!this.getMinValidationSize(size)) {
            return `Минимальное значение ${this.props.validation.size.minLength}`;
        }

    }

    getErrorMessageForLimit(limit) {
        if (!this.getMaxValidationLimit(limit)) {
            return `Максимальное значение ${this.props.validation.limit.maxLength}`;
        }
        if (!this.getComparingWithSize(limit)) {
            return `Не должно быть больше чем Size`;
        }
        if (!this.getMinValidationLimit(limit)) {
            return `Минимальное значение ${this.props.validation.limit.minLength}`;
        }
    }

    validateSize(size) {
        let data;
        let validSize;
        let isValid;
        let error;

        if (this.getMaxValidationSize(size) && this.getComparingWithLimit(size) && this.getMinValidationSize(size)) {
            data = generateTableData(size);
            validSize = true;
            error = null;
        } else {
            error = this.getErrorMessageForSize(size);
            data = this.props.data;
            validSize = false;
        }

        if (this.props.validation.limit.isValid && validSize) {
            isValid = true;
        } else {
            isValid = false;
            data = this.props.data;
        }

        const value = {
            validation: {
                isValid,
                size: {
                    isValid: validSize,
                    error
                }
            },
            size,
            data
        };

        this.props.changeSize(value);

    }

    validateLimit(limit) {
        let validLimit;
        let isValid;
        let error;

        if (this.getMaxValidationLimit(limit) && this.getComparingWithSize(limit) && this.getMinValidationLimit(limit)) {
            validLimit = true;
            error = null;
        } else {
            error = this.getErrorMessageForLimit(limit);
            validLimit = false;
            limit = this.props.limit;
        }

        if (this.props.validation.size.isValid && validLimit) {
            isValid = true;
        } else {
            isValid = false;
        }

        const value = {
            validation: {
                isValid,
                limit: {
                    isValid: validLimit,
                    error
                }
            },
            limit
        };
        console.log(value, 'value');
        this.props.changeLimit(value);
    }

    handleChangeSize(event) {
        const size = +event.target.value;

        this.validateSize(size);
    }

    handleChangeLimit(event) {
        const limit = +event.target.value;
        this.validateLimit(limit);
        console.log(this.props);
    }

    findMaxNumber() {
        return findMaxAdjacent(this.props.data, this.props.limit);

    }

    refreshData() {

        const value = {
            size: this.props.size,
            limit: this.props.limit,
            data: generateTableData(this.props.size)
        }
        this.props.refreshData(value);
    }

    render() {
        return (
            <div className="app-wrapper">
                <div className="form">
                    <Input
                        onChange={this.handleChangeSize}
                        label="Size"
                        id="size"
                        value={this.props.size}
                        error={this.props.validation.size.error}
                        type="number"
                        step="1"
                    />
                    <Input
                        onChange={this.handleChangeLimit}
                        label="Limit"
                        id="limit"
                        value={this.props.limit}
                        error={this.props.validation.limit.error}
                        type="number"
                        step="1"
                    />
                    <Result value={this.findMaxNumber()} />
                    <Refresh refresh={this.refreshData} disabled={!this.props.validation.isValid} />
                </div>
                <Data
                    data={this.props.data}
                    find={this.findMaxNumber()}
                    validation={this.props.validation.isValid}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeSize: (value) => dispatch(updateSize(value)),
        changeLimit: (value) => dispatch(updateLimit(value)),
        refreshData: (value) => dispatch(refresh(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
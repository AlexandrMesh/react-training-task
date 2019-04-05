import React, { Component } from 'react';
import { findMaxAdjacent, generateTableData } from '../../helpers/utilities';
import { connect } from 'react-redux';
import Input from '../input/Input';
import Result from '../result/Result';
import Refresh from '../refresh/Refresh';
import Data from '../data/Data';
import { test, setStoreWithLimit, setStoreWithSize, refreshDataStore } from '../../store/actions/dataActions'
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
        let valid;
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

        if (this.props.validation.limit.valid && validSize) {
            valid = true;
        } else {
            valid = false;
            data = this.props.data;
        }

        const value = {
            validation: {
                valid: valid,
                size: {
                    valid: validSize,
                    error: error
                }
            },
            size: size,
            data: data
        };

        this.props.setDataSize(value);

    }

    validateLimit(limit) {
        let validLimit;
        let valid;
        let error;

        if (this.getMaxValidationLimit(limit) && this.getComparingWithSize(limit) && this.getMinValidationLimit(limit)) {
            validLimit = true;
            error = null;
        } else {
            error = this.getErrorMessageForLimit(limit);
            validLimit = false;
            limit = this.props.limit;
        }

        if (this.props.validation.size.valid && validLimit) {
            valid = true;
        } else {
            valid = false;
        }

        const value = {
            validation: {
                valid: valid,
                limit: {
                    valid: validLimit,
                    error: error
                }
            },
            limit: limit
        };
        this.props.setDataLimit(value);
    }

    handleChangeSize(event) {
        const size = +event.target.value;

        this.validateSize(size);

    }

    handleChangeLimit(event) {
        const limit = +event.target.value;
        this.validateLimit(limit);
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
        this.props.refreshDataStore(value);
    }

    render() {
        return (
            <div className="app-wrapper">
                <div className="form">
                    <Input
                        onChangeValue={this.handleChangeSize}
                        label="Size"
                        id="size"
                        value={this.props.size}
                        error={this.props.validation.size.error}
                        type="number"
                        step="1"
                    />
                    <Input
                        onChangeValue={this.handleChangeLimit}
                        label="Limit"
                        id="limit"
                        value={this.props.limit}
                        error={this.props.validation.limit.error}
                        type="number"
                        step="1"
                    />
                    <Result value={this.findMaxNumber()} />
                    <Refresh refresh={this.refreshData} disabled={!this.props.validation.valid} />
                </div>
                <Data
                    data={this.props.data}
                    find={this.findMaxNumber()}
                    validation={this.props.validation.valid}
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
        test: () => dispatch(test()),
        setDataSize: (value) => dispatch(setStoreWithSize(value)),
        setDataLimit: (value) => dispatch(setStoreWithLimit(value)),
        refreshDataStore: (value) => dispatch(refreshDataStore(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
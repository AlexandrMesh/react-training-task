import { generateTableData } from '../../helpers/utilities';
import { SET_DATA_LIMIT, SET_DATA_SIZE, REFRESH_DATA } from '../actionTypes/actionTypes'

const initialState = {
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

const dataReducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case SET_DATA_LIMIT:

            const { validation: limitValidation, limit } = payload;

            return {
                ...state,
                validation: {
                    ...state.validation,
                    valid: limitValidation.valid,
                    limit: {
                        ...state.validation.limit,
                        valid: limitValidation.limit.valid,
                        error: limitValidation.limit.error
                    },
                },
                limit
            };

        case SET_DATA_SIZE:

            const { validation: sizeValidation, size, data } = payload;

            return {
                ...state,
                validation: {
                    ...state.validation,
                    valid: sizeValidation.valid,
                    size: {
                        ...state.validation.size,
                        valid: sizeValidation.size.valid,
                        error: sizeValidation.size.error
                    },
                },
                size,
                data
            };
        case REFRESH_DATA:

            const { size: refreshSize, limit: refreshLimit, data: refreshData } = payload;

            return {
                ...state,
                data: refreshData,
                size: refreshSize,
                limit: refreshLimit
            };
        default:
            return state;
    }
}

export default dataReducer;
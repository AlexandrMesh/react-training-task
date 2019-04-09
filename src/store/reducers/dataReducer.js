import { generateTableData } from '../../helpers/utilities';
import { UPDATE_SIZE, UPDATE_LIMIT, REFRESH } from '../actionTypes/actionTypes'

const initialState = {
    size: 5,
    limit: 3,
    data: generateTableData(5),
    validation: {
        isValid: true,
        size: {
            isValid: true,
            minLength: 3,
            maxLength: 20,
            error: null
        },
        limit: {
            isValid: true,
            minLength: 2,
            maxLength: 5,
            error: null
        }
    }
}

const dataReducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case UPDATE_LIMIT:

            const { validation: limitValidation, limit } = payload;

            return {
                ...state,
                validation: {
                    ...state.validation,
                    isValid: limitValidation.isValid,
                    limit: {
                        ...state.validation.limit,
                        isValid: limitValidation.limit.isValid,
                        error: limitValidation.limit.error
                    },
                },
                limit
            };

        case UPDATE_SIZE:

            const { validation: sizeValidation, size, data } = payload;

            return {
                ...state,
                validation: {
                    ...state.validation,
                    isValid: sizeValidation.isValid,
                    size: {
                        ...state.validation.size,
                        isValid: sizeValidation.size.isValid,
                        error: sizeValidation.size.error
                    },
                },
                size,
                data
            };
        case REFRESH:

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
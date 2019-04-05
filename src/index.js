import ReactDOM from 'react-dom';
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import dataReducer from './store/reducers/dataReducer';
import App from './components/container/App';
import './styles/styles.less';

const store = createStore(dataReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('application-root'));

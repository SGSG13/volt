import React from 'react';
import {render} from 'react-dom';
import store from './store'
import {Provider} from 'react-redux'
import App from './components/app'
import 'react-select/dist/react-select.css';

render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('app-root'));

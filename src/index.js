// document.getElementById('app').innerHTML = "webpack works";

/* const func = (str) => {
    document.getElementById('app').innerHTML = str
}
func('我是经过babel编译过的!!!') */

import React from 'react'
import ReactDOM from 'react-dom'
import Hello from './component/Hello/Hello'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import store from './redux/store'

import getRouter from './router/router'

/* 初始化 */
renderWithHotReload(getRouter());

/* 热更新 */
if(module.hot) {
    module.hot.accept('./router/router', () => {
        const getRouter = require('./router/router').default;
        renderWithHotReload(getRouter());
    });
}

function renderWithHotReload(RootElement) {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                {RootElement}
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    )
}


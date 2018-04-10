import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as Rebass from 'rebass';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers/posts';
import theme from './themes/default';

const composeEnhancers = 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

const store = Redux.createStore(
    reducer,
    reducer,
    composeEnhancers(Redux.applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <Rebass.Provider theme={theme}>
            <App/>
        </Rebass.Provider>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();

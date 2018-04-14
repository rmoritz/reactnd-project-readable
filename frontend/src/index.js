import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import * as Rebass from 'rebass';
import App from './components/app';
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
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Rebass.Provider>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();

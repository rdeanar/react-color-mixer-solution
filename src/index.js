import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore, compose } from "redux";

import { reducer } from "./redux";
import { rootSaga } from "./sagas";

import App from "./App";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

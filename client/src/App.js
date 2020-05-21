import React, { Component } from "react";

import { queryReducer } from "./app/reducers/query";
import { TodosContainer } from "./app/components/Todos";
import "./App.css";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));
const store = createStore(queryReducer, enhancer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <TodosContainer />
        </div>
      </Provider>
    );
  }
}

export default App;

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './App.css';

import Game from "./components/Game";
import cannonReducer from "./reducers/ConnonReducer";

function App() {
  const store = createStore(cannonReducer);

  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}

export default App;

import React from 'react';
import ReactDom from 'react-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import RootRoutes from './root.routes.js';
import toggleReducer from './toggles/toggles.reducer.js';

const reducer = combineReducers({
	toggles: toggleReducer,
});
const store = createStore(reducer, applyMiddleware(thunk));

ReactDom.render(<RootRoutes store={store}/>, document.getElementById('main-content'));

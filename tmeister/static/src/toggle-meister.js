import React from 'react';
import ReactDom from 'react-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import RootRoutes from './root.routes.js';
import toggleReducer from './toggles/toggles.reducer.js';
import toggleSearchReducer from './toggles/search/search.reducer.js';
import createReducer from './toggles/create/create.reducer.js';
// import 'canopy-styleguide!sofe';

const reducer = combineReducers({
	toggles: toggleReducer,
	toggleSearch: toggleSearchReducer,
	create: createReducer,
});
const store = createStore(reducer, applyMiddleware(thunk));

ReactDom.render(<RootRoutes store={store}/>, document.getElementById('main-content'));

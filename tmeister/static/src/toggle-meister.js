import React from 'react';
import ReactDom from 'react-dom';
// config dayjs
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
dayjs.extend(calendar)

import RootRoutes from './root.routes.js';

ReactDom.render(<RootRoutes />, document.getElementById('main-content'));

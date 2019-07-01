import React from 'react';
import ReactDom from 'react-dom';
// config dayjs
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(calendar)
dayjs.extend(localizedFormat)

import RootRoutes from './root.routes.js';

ReactDom.render(<RootRoutes />, document.getElementById('main-content'));

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

import './index.css';
import 'sweetalert/dist/sweetalert.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

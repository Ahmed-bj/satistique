import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Satist from './Satist';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <div>
         <h1>Satistique des produits</h1>
         <App/>
    </div>
    , document.getElementById('root'));

setTimeout(() => {
    ReactDOM.render(<Satist/>, document.getElementById('js-app'));
}, 0);

registerServiceWorker();

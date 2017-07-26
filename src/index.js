import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

setTimeout(() => {
ReactDOM.render(
    <div>
         <h1>Satistique des produits</h1>
         <App/>
    </div>
    , document.getElementById('root'));
    //ReactDOM.render(<Satist/>, document.getElementById('js-app'));
}, 0);

registerServiceWorker();

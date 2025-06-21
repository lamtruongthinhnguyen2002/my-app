import * as React from 'react';
import ReactDOM  from 'react-dom/client';

import { createStore, applyMiddleware, Store } from "redux";
import { Provider } from "react-redux";
import {thunk} from "redux-thunk";
import './index.css';
import App from './App';
import reducer from "./Store/reducer"
import reportWebVitals from './reportWebVitals';

const store: Store<ArticleState, ArticleAction> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        
        <React.StrictMode>
          <Provider store = {store}>
          <App />
        </Provider>
        </React.StrictMode>

    );
} else {
    console.error('Không tìm thấy phần tử với ID "root" trong DOM.');
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

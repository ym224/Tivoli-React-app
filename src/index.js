import 'babel-polyfill';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import promise from "redux-promise";
import App from "./components/app";
import EventDetail from "./containers/event_detail";
import AgendaNew from './containers/agenda_new';
import Feedback from './containers/feedback';
import reducers from "./reducers";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <div>
          <Switch>
            {/* <Route path="/events/:id" component={EventDetail} /> */}
            <Route path="/feedback/:id" component={Feedback} />
            <Route path="/agendas/new/:id" component={AgendaNew} />
            <Route path="/notes" component={EventDetail} />
            <Route path="/" component={App} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.querySelector(".container-desktop")
);

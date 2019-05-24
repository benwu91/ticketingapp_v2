import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';
import Root from './components/Root';
import AccountTickets from './components/AccountTickets';
import CreateEventForm from './components/CreateEventForm';
import { fetchAuthenticated } from './actions/account';
import './index.css';

const history = createBrowserHistory();

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

const AuthRoute = props => {
    if (!store.getState().account.loggedIn) {
        return <Redirect to={{ pathname: '/' }} />
    }

    const { component, path } = props;

    return <Route path={path} component={component} />;
}

store.dispatch(fetchAuthenticated())
    .then(() => {
        ReactDOM.render(
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route exact path='/' component={Root} />
                        <AuthRoute path='/tickets' component={AccountTickets} />
                        <Route path='/create-event' component={CreateEventForm} />
                    </Switch>
                </Router>
            </Provider>, 
            document.getElementById('root')
        );
    })

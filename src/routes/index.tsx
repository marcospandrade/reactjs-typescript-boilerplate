import { Route, Router } from 'react-router-dom';
import { MenuDrawerLayout } from '../layouts/MenuDrawerLayout';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { BlockCustomers } from '../pages/BlockCustomers';
import { UnlockCustomers } from '../pages/UnlockCustomers';
import { RouteCustom } from './components/RouteCustom';
import { Solicitations } from '../pages/Solicitations';
import history from '../utils/history';

export function Routes() {
    return (
        <Router history={history}>
            <Route exact path="/" component={Login} />
            <RouteCustom exact path="/home" layout={MenuDrawerLayout} component={Home} />
            <RouteCustom exact path="/customers/block" layout={MenuDrawerLayout} component={BlockCustomers} />
            <RouteCustom exact path="/customers/unlock" layout={MenuDrawerLayout} component={UnlockCustomers} />
            <RouteCustom exact path="/customers/solicitations" layout={MenuDrawerLayout} component={Solicitations} />
        </Router>
    );
}
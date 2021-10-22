import React from 'react';

// third party packages
import { Route, Switch } from "react-router-dom";

import NavbarMenu from './components/NavbarMenu';
import Home from './pages/Home';
import CarerList from './pages/CarerList';
import Schedule from './pages/Schedule';

const App = () => {
	return (
		<React.Fragment>
			<NavbarMenu />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/carerlist" component={CarerList} />
				<Route exact path="/schedule" component={Schedule} />
			</Switch>
		</React.Fragment>
	)
}

export default App

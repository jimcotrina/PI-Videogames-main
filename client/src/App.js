import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import GameCreateForm from './components/GameCreateForm';

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route exact path='/' component={LandingPage} />
				<Route path='/home' component={Home} />
				<Route path='/videogame' component={GameCreateForm} />
				<Route path='/detail/:id' component={Detail} />
			</Switch>
		</div>
	);
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import WeatherSearch from './WeatherSearch';

const App = () => {
    const [token, setToken] = useState('');

    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login setToken={setToken} />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/weather">
                    {token ? <WeatherSearch token={token} /> : <Login setToken={setToken} />}
                </Route>
                <Route path="/">
                    <h1>Welcome to the Weather App</h1>
                    <p>Please log in to access the weather search feature.</p>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
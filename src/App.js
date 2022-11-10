import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';
import DetailsProduct from './pages/DetailsProduct';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/shopping" component={ ShoppingCart } />
        <Route
          exact
          path="/product/:id"
          render={ (props) => <DetailsProduct { ...props } /> }
        />
      </Switch>
    </div>
  );
}

export default App;

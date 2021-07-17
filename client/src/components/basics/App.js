import React, { Component } from "react";
import "./styles/App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Entry from "../pages/Entry";
import Home from "../pages/Home";
import Restaurants from "../pages/Restaurants";
import Products from "../pages/Products";
import Header from "../fixtures/Header";
import MessageBox from "../alerts/MessageBox";
import Product from "../pages/Product";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import Notifications from "../pages/Notifications";
import Help from "../pages/Help";
import About from "../pages/About";
import Services from "../pages/Services";

class App extends Component {
  constructor(props) {
    super(props);

    // State Object
    this.state = {};

    // Bindings Methods
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentDidCatch() {}
  componentWillUnmount() {}
  render() {
    return (
      <div id="app-container">
        <Router>
          <Switch>
            <Route exact component path="/">
              <Home />
            </Route>
            <Route exact component path="/entry">
              <Entry />
            </Route>
            <Route exact component path="/restaurants">
              <Restaurants />
            </Route>
            <Route exact component path="/notifications">
              <Notifications />
            </Route>
            <Route exact component path="/help">
              <Help />
            </Route>
            <Route exact component path="/about">
              <About />
            </Route>
            <Route exact component path="/services">
              <Services />
            </Route>
            <Route
              path="/restaurants/:name"
              render={(props) => <Products {...props} />}
            />
            <Route
              path="/restaurant/:restaurant/product/:id"
              render={(props) => <Product {...props} />}
            />
          </Switch>
          <Route exact component path="/profile">
            <Profile />
          </Route>
          <Route exact component path="/cart">
            <Cart />
          </Route>
        </Router>
      </div>
    );
  }
}
export default App;

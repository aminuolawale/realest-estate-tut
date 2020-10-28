import React from "react";
import Layout from "./hocs/Layout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  About,
  Contact,
  Home,
  Listings,
  ListingDetail,
  Signin,
  Signup,
} from "./containers";
import NotFound from "./components/NotFound";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/privateRoute";
import "./sass/main.scss";
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/about" component={About}></Route>
            <Route exact path="/contact" component={Contact}></Route>
            <Route exact path="/listings" component={Listings}></Route>
            <PrivateRoute
              exact
              path="/listings/:id"
              component={ListingDetail}
            ></PrivateRoute>
            <Route exact path="/login" component={Signin}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;

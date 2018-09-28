import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import NewBookPage from "./components/pages/NewBookPage";

const App = ({ location }) => (
  <div className="ui container">
    <Route location={location} path="/" exact component={NewBookPage} />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
};


export default connect()(App);

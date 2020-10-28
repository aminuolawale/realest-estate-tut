import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/auth";

const Signin = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  if (isAuthenticated) return <Redirect to="/"></Redirect>;
  return (
    <div className="auth">
      <Helmet>
        <title>Realest Estate - Login</title>
        <meta name="description" content="login page"></meta>
      </Helmet>
      <h1 className="auth__title">Sign In</h1>
      <p className="auth__lead">Sign In into your account</p>
      <form onSubmit={(e) => onSubmit(e)} className="auth__form">
        <div className="auth__form__group">
          <input
            className="auth__form__input"
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          ></input>
        </div>
        <div className="auth__form__group">
          <input
            className="auth__form__input"
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          ></input>
        </div>
        <button className="auth__form__button">Login</button>
      </form>
      <p className="auth__authtext">
        {" "}
        Don't have an account?{" "}
        <Link className="auth__authtext__link" to="/signup">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

Signin.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Signin);

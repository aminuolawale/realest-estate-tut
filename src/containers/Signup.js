import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { setAlert } from "../actions/alert";
import { signup } from "../actions/auth";
import PropTypes from "prop-types";

const Signup = ({ setAlert, signup, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "error");
    } else {
      signup({ name, email, password, password2 });
    }
  };
  if (isAuthenticated) return <Redirect to="/"></Redirect>;
  return (
    <div className="auth">
      <Helmet>
        <title>Realest Estate - Login</title>
        <meta name="description" content="login page"></meta>
      </Helmet>
      <h1 className="auth__title">Sign Up</h1>
      <p className="auth__lead">Create an Account</p>
      <form onSubmit={(e) => onSubmit(e)} className="auth__form">
        <div className="auth__form__group">
          <input
            className="auth__form__input"
            type="name"
            placeholder="name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          ></input>
        </div>
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
        <div className="auth__form__group">
          <input
            className="auth__form__input"
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          ></input>
        </div>
        <button className="auth__form__button">Sign Up</button>
      </form>
      <p className="auth__authtext">
        {" "}
        Already have an account?{" "}
        <Link className="auth__authtext__link" to="/login">
          Log In
        </Link>
      </p>
    </div>
  );
};

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, signup })(Signup);

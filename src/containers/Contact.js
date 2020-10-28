import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";

const Contact = ({ setAlert }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { name, email, subject, message } = formData;
  const [loading, setLoading] = useState(false);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    axios.defaults.headers = {
      "Content-Type": "application/json",
    };
    setLoading(true);
    const data = { name, email, subject, message };
    axios
      .post("http://206.81.13.94/api/contacts/", data)
      .then((res) => {
        setAlert("message Sent", "succes");
        setLoading(false);
      })
      .catch((err) => {
        setAlert("Error sending message", "error");
        setLoading(false);
        window.scrollTo(0, 0);
      });
  };
  return (
    <div className="contact">
      <Helmet>
        <title>Realest Estate - Contact</title>
        <meta name="description" content="Contact Us"></meta>
      </Helmet>
      <form className="contact__form" onSubmit={(e) => onSubmit(e)}>
        <label className="contact__form__label" htmlFor="name">
          Name
        </label>
        <input
          className="contact__form__input"
          name="name"
          type="text"
          placeholder="Full Name"
          onChange={(e) => onChange(e)}
          value={name}
          required
        ></input>
        <label className="contact__form__label" htmlFor="email">
          Email
        </label>
        <input
          className="contact__form__input"
          name="email"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => onChange(e)}
          value={email}
          required
        ></input>
        <label className="contact__form__label" htmlFor="subject">
          Subject
        </label>
        <input
          className="contact__form__input"
          name="subject"
          type="text"
          placeholder="Enter your subject"
          onChange={(e) => onChange(e)}
          value={subject}
          required
        ></input>
        <label className="contact__form__label" htmlFor="message">
          Message
        </label>
        <textarea
          className="contact__form__textarea"
          name="message"
          cols="30"
          rows="10"
          placeholder="Enter your message"
          onChange={(e) => onChange(e)}
          value={message}
        ></textarea>
        {loading ? (
          <div className="contact_form__loader">
            <Loader type="Oval" color="#424242" height={50} width={50}></Loader>
          </div>
        ) : (
          <button className="contact__form__button" htmltype="submit">
            Send
          </button>
        )}
      </form>
    </div>
  );
};

Contact.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(Contact);

import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { login } from "../../actions/auth";
// import signInImg from "../../../public/images/signup.svg";
import NotyfContext from "../layout/NotyfContext";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const notyf = useContext(NotyfContext);

  const onSubmit = (e) => {
    e.preventDefault();

    login(email, password).then((val) => {
      if (val.status === "error")
        val.data.map((err) => notyf.error(err.msg));
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const { email, password } = formData;

  return (
    <div className="flex w-full h-full justify-center flex-grow">
      <div className="h-full w-1/2 flex-grow self-stretch hidden lg:flex justify-center items-center">
        <img src="./images/login.svg" alt="login" className="w-5/6" />
      </div>
      <div className="w-1/2 flex-grow xl:p-10 p-10 flex flex-col xl:justify-center relative rounded-lg">
        {" "}
        <h1 className="my-6 text-2xl xl:text-3xl font-extrabold">
          <i className="fas fa-user mr-2"></i>
          Login
        </h1>
        <form className="text-center mt-6" onSubmit={(e) => onSubmit(e)}>
          <div className="text-left">
            <label for="email" className="font-semibold pb-2 inline-block">
              Email
            </label>
            <input
              className="rounded-3xl bg-green-50 px-4 py-2 w-full mb-2 "
              type="email"
              placeholder="Email Address"
              name="email"
              id="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="text-left">
            <label for="password" className="font-semibold pb-2 inline-block">
              Password
            </label>
            <input
              className="rounded-3xl bg-green-50 px-4 py-2 w-full outline focus-within:outline-blue-400"
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
          </div>

          <input
            type="submit"
            className="bg-green-400 hover:bg-green-500 px-4 py-2 rounded-3xl mt-6"
            value="Login"
          />
        </form>
        <p className="my-1 text-center mt-1">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-500 italic">
            Sign Up
          </Link>
        </p>
        <p className="absolute bottom-4 mx-auto text-gray-400 italic left-0 right-0 w-max">
          &copy; DevConnector {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

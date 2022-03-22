import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import signInImg from "../../images/register2.svg";
import NotyfContext from "../layout/NotyfContext";

const Register = ({ register, isAuthenticated }) => {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };

  const [formData, setFormData] = useState(defaultValues);

  const notyf = useContext(NotyfContext);

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    //to prevent reload on submit
    e.preventDefault();
    if (password !== password2) {
      notyf.error("Passwords do not match");
      setFormData(defaultValues);
    } else {
      register({ name, email, password }).then((res) => {
        if (res.status === "error") {
          res.data.map((err) => notyf.error(err.msg));
        } else if (res.status === "success") notyf.success(res.msg);
      });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <section className="flex w-full h-full justify-center flex-grow">
      <div className="h-full w-1/2 flex-grow self-stretch hidden lg:flex justify-center items-center">
        <img src={signInImg} alt="sign-in" className="w-5/6" />
      </div>
      <div className="w-1/2 flex-grow xl:p-10 p-10 flex flex-col xl:justify-center relative rounded-lg">
        {" "}
        <h1 className="my-6 text-2xl xl:text-3xl font-extrabold">
          <i className="fas fa-user mr-2"></i>
          Sign Up
        </h1>
        <form className="text-center mt-6" onSubmit={(e) => onSubmit(e)}>
          <div className="text-left mb-2">
            <label for="name" className="font-semibold pb-2 inline-block">
              Name
            </label>
            <input
              className="rounded-3xl bg-green-50 px-4 py-2 w-full"
              type="text"
              placeholder="Name"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="text-left mb-2">
            <label for="email" className="font-semibold pb-2 inline-block">
              E-mail
            </label>
            <input
              className="rounded-3xl bg-green-50 px-4 py-2 w-full"
              type="email"
              placeholder="Email Address"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
            />
            <small className="mt-0 text-gray-400 ">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="text-left mb-2">
            <label for="password" className="font-semibold pb-2 inline-block">
              Password
            </label>
            <input
              className="rounded-3xl bg-green-50 px-4 py-2 w-full"
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              minLength="6"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="text-left mb-2">
            <label for="password2" className="font-semibold pb-2 inline-block">
              Confirm Password
            </label>
            <input
              className="rounded-3xl bg-green-50 px-4 py-2 w-full"
              type="password"
              placeholder="Confirm Password"
              name="password2"
              id="password2"
              minLength="6"
              value={password2}
              onChange={onChange}
            />
          </div>

          <input
            className="bg-green-400 hover:bg-green-500 px-4 py-2 rounded-3xl mt-6"
            type="submit"
            value="Register"
          />
        </form>
        <p className="my-1 text-center mt-1">
          Already have an account?
          <Link to="/login" className="text-green-600 italic">
            {" "}
            Sign In
          </Link>
        </p>
        <p className="absolute bottom-4 mx-auto text-gray-400 italic left-0 right-0 w-max">
          &copy; DevConnector {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);

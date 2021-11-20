import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth, logout }) => {
  const authLinks = (
    <ul className="">
      <li className="mr-6 inline-block hover:text-indigo-400">
        <Link to="/profiles">Developers</Link>
      </li>
      <li className="mr-6 inline-block  hover:text-indigo-400 ">
        <Link to="/posts">
          <span className="hide-sm">Posts</span>
        </Link>
      </li>
      <li className="mr-6 inline-block  hover:text-indigo-400 ">
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li className="inline-block  hover:text-indigo-400 ">
        <Link to="#!" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li className="mr-6 inline-block  hover:text-indigo-400 ">
        <Link to="/profiles">Developers</Link>
      </li>
      <li className="mr-6 inline-block  hover:text-indigo-400 ">
        <Link to="/register">Register</Link>
      </li>
      <li className="inline-block  hover:text-indigo-400 ">
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="font-mono text-indigo-100	bg-indigo-700 flex justify-between items-center px-6 py-4 fixed w-full top-0">
      <h1 className="justify-self-start text-3xl font-semibold hover:text-indigo-400">
        <i className="fas fa-code"></i> DevConnector
      </h1>
      <div className="justify-self-end">
        {auth.isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
  );
};

Navbar.propsTypes = {
  auth: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

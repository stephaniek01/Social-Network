import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth, logout }) => {
  const authLinks = (
    <ul className="self-stretch flex justify-between font-semibold">
      <li className="mr-6 inline-block hover:text-gray-100">
        <NavLink activeClassName="text-white" to="/profiles">
          Developers
        </NavLink>
      </li>
      <li className="mr-6 inline-block  hover:text-gray-100 ">
        <NavLink activeClassName="text-white" to="/posts">
          Posts
        </NavLink>
      </li>
      <li className="mr-6 inline-block  hover:text-gray-100 ">
        <NavLink activeClassName="text-white" to="/dashboard">
          Dashboard
        </NavLink>
      </li>
      <li className="inline-block  hover:text-gray-100 ">
        <NavLink activeClassName="text-white" to="./login" onClick={logout}>
          Logout
        </NavLink>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="self-stretch flex justify-between font-semibold">
      <li className="mr-6 inline-block  hover:text-gray-100 ">
        <NavLink activeClassName="text-white" to="/profiles">
          Developers
        </NavLink>
      </li>
      <li className="mr-6 inline-block  hover:text-gray-100 ">
        <NavLink activeClassName="text-white" to="/register">
          Register
        </NavLink>
      </li>
      <li className="inline-block  hover:text-gray-100 ">
        <NavLink activeClassName="text-white" to="/login">
          Login
        </NavLink>
      </li>
    </ul>
  );

  return (
    <nav className="font-sans text-gray-900	bg-green-400 flex md:flex-row flex-col md:justify-between items-center px-2 md:px-6 py-4 w-full top-0">
      <Link
        to="/"
        className="justify-self-start text-3xl font-bold hover:text-gray-100 md:mb-0 mb-4"
      >
        <i className="fas fa-code text-gray-100"></i> DevConnector
      </Link>
      <div className="md:justify-self-end w-full md:w-auto px-2 md:px-0">
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

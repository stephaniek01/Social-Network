import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing bg-green-400 h-full flex flex-col justify-between">
        <p className="md:text-3xl text-2xl text-2md text-black font-extrabold tracking-wide text-center mt-8">
          Create a developer profile/portfolio, share posts and get help from
          other developers
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:mx-4 md:my-0 m-6">
            <img src="./images/img-1.svg" alt="img-1" className="md:h-80 h-70 " />
            <p className="text-center">
              Build a profile and showcase your projects
            </p>
          </div>
          <div className="md:mx-4 md:my-0 m-6">
            <img src="./images/experience.svg" alt="img-2" className="md:h-80 h-70" />
            <p className="text-center">
              Learn about new technologies
            </p>
          </div>
          <div className="md:mx-4 md:my-0 m-6">
            <img src="./images/img-3.svg" alt="img-3" className="md:h-80 h-70" />
            <p className="text-center">
              Share your thoughts with other developers
            </p>
          </div>
        </div>

        <div className="my-6 text-center">
          <p className="text-2xl text-gray-100 font-extrabold tracking-wide mb-4">
            Join us <span className="text-black uppercase italic">Now!!!</span>
          </p>
          <button className="bg-black hover:bg-gray-600 text-white px-2 py-1 rounded-md mr-6">
            <Link to="/register"> Sign Up</Link>
          </button>

          <button className="bg-black hover:bg-gray-600 text-white px-2 py-1 rounded-md">
            <Link to="/login"> Sign In</Link>
          </button>
        </div>

    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);

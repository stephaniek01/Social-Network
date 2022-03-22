import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardButtons from "./DashboardButtons";
import profileImg from "../../images/createProfile.svg";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <div className="h-screen flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <section className="xl:px-40 px-5 py-6 flex flex-col h-full">
      <h1 className="mt-6 text-2xl xl:text-3xl font-extrabold">
        Welcome, {user && user.name}
      </h1>
      {profile === null ? (
        <div className="text-center">
          <img src={profileImg} alt="missing" className="h-96 mx-auto" />
          <h1 className="text-2xl font-extrabold text-green-500 uppercase mt-6">
            Wait!!!
          </h1>
          <p className="mt-2">
            You have not yet set up a profile yet. This means that you won't be
            discoverable to other developers! Create your profile by clicking
            <Link
              to="/create-profile"
              className="text-green-500 hover:text-green-300 italic"
            >
              {" "}
              here,{" "}
            </Link>
            it will only take you two minutes.
          </p>
          <div className="flex justify-center mt-4 ">
          <Link
            to="/create-profile"
            className="bg-green-400 hover:bg-green-500 focus:bg-green-500 rounded-3xl px-4 py-2 inline-block mr-4"
          >
            Create profile
          </Link>

          <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-3xl ml-4"
              onClick={() => {
                deleteAccount();
              }}
            >
              Delete my account
            </button>
        </div>
        </div>
      ) : (
        <Fragment>
          <DashboardButtons />
          <div className="mt-12 text-center">
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-3xl mr-8"
              onClick={() => {
                deleteAccount();
              }}
            >
              Delete my account
            </button>

            <Link
              to="/edit-profile"
              className="bg-black hover:bg-gray-600 text-white px-4 py-2 rounded-3xl"
            >
              Edit Profile
            </Link>
          </div>
        </Fragment>
      )}
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);

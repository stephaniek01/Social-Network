import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileByUserId } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({
  auth,
  profile: { loading, profile },
  getProfileByUserId,
  match,
}) => {
  useEffect(() => {
    getProfileByUserId(match.params.id);
  }, [getProfileByUserId, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="text-right">
            <Link
              to="/profiles"
              className="font-mono bg-indigo-700  hover:bg-indigo-800 hover:translate-y-2 text-indigo-100 shadow-lg px-4 py-2 inline-block text-center rounded-md ml-4"
            >
              Back to profiles
            </Link>

            {!auth.loading &&
              auth.isAuthenticated &&
              auth.user._id === match.params.id && (
                <Link
                  to="/edit-profile"
                  className="font-mono bg-gray-800  hover:bg-gray-900 hover:translate-y-2 text-indigo-100 shadow-lg px-4 py-2 inline-block text-center rounded-md ml-4"
                >
                  Edit profile
                </Link>
              )}
          </div>
          <div className="profile-grid my-4">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileExperience profile={profile} />
            <ProfileEducation profile={profile} />
            {profile.githubusernamer && (
              <ProfileGithub githubUsername={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileByUserId: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileByUserId })(Profile);

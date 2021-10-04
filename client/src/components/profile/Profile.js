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
          <Link to="/profiles" className="btn btn-primary">
            Back to profiles
          </Link>
          {!auth.loading &&
            auth.isAuthenticated &&
            auth.user._id === match.params.id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit profile
              </Link>
            )}
          <div className="profile-grid my-1">
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

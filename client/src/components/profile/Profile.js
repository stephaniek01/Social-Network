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
        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <section className="xl:px-52 px-5 py-6">
          <div className="w-full">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileExperience profile={profile} />
            <ProfileEducation profile={profile} />
          </div>
          <div className="lg:w-1/3"></div>

          <div className="text-center xl:text-right mt-6">
            <Link
              to="/profiles"
              className="bg-black hover:bg-gray-600 focus:bg-gray-600 text-white my-1 rounded-3xl mr-2  px-4 py-2"
            >
              Back to profiles
            </Link>

            {!auth.loading &&
              auth.isAuthenticated &&
              auth.user._id === match.params.id && (
                <Link
                  to="/edit-profile"
                  className="bg-black hover:bg-gray-600 focus:bg-gray-600 text-white my-1 rounded-3xl  px-4 py-2"
                >
                  Edit profile
                </Link>
              )}
          </div>
        </section>
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

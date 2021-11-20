import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="font-mono text-5xl mb-4 font-bold text-indigo-700">
            Developers
          </h1>
          <h4 className="font-mono text-lg mb-4">
            Browse and connect with developers
          </h4>
          <div className="grid grid-cols-3 justify-between">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles to show</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  loading: state.profile.loading,
});

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getProfiles })(Profiles);

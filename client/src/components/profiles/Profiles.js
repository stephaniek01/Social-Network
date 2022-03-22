import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const [searchQuery, setSearchQuery] = new useState("");

  return (
    <section className="xl:px-40 px-5 py-6 flex flex-col h-full">
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <Fragment>
        <div className="flex mt-6 mb-3 flex-col md:flex-row">
          <div className="md:w-1/2">
          <h1 className=" text-2xl xl:text-3xl font-extrabold">
            Developers
          </h1>
          <h4 className="text-lg mb-10">Browse and connect with developers</h4>
          </div>
          <div className="md:w-1/2 flex items-center">
          <div className="flex items-center rounded-full mb-6 bg-green-100 md:w-max w-full p-2 ml-auto">
            <input
              type="text"
              placeholder="Enter a name"
              className="rounded-3xl mr-2 px-4 py-2 md:w-64 flex-grow bg-green-100 hidden transition-all duration-75 ease-in-out"
              onChange={(e) => setSearchQuery(e.target.value)}
            ></input>
            <button
              className="h-10 w-10 rounded-full bg-green-400 flex justify-center items-center"
              onClick={(e) =>
                [...e.currentTarget.parentNode.childNodes[0].classList].includes("hidden") || searchQuery !== ""
                  ? e.currentTarget.parentNode.childNodes[0].classList.remove(
                      "hidden"
                    )
                  : e.currentTarget.parentNode.childNodes[0].classList.add(
                      "hidden"
                    )
              }
            >
              <i className="fa fa-search text-black"></i>
            </button>
          </div>
          </div>
        </div>
          
          
          {profiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16">
              {profiles
                .filter(
                  (profile) =>
                    profile.user.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) || searchQuery === ""
                )
                .map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center items-center h-full">
              <h4>No profiles to show</h4>
            </div>
          )}
        </Fragment>
      )}
    </section>
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

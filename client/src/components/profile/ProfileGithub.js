import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";

const ProfileGithub = ({ githubUsername, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(githubUsername);
  });
  return <div></div>;
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

ProfileGithub.propTypes = {
  githubUsername: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);

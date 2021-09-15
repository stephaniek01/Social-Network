import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({ profile: { experience } }) => {
  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Experience</h2>
      {experience.length > 0 ? (
        experience.map((exp) => (
          <Fragment key={exp._id}>
            <h3 className="text-dark">{exp.company}</h3>
            <Moment format="YYYY-MM-DD">{exp.from}</Moment>
            {!exp.to ? (
              " - Present"
            ) : (
              <Moment format="YYYY-MM-DD">{` - ${exp.to}`}</Moment>
            )}
            <p>
              <strong>Position: </strong>
              {exp.title}
            </p>
            <p>
              <strong>Description: </strong>
              {exp.description}
            </p>
          </Fragment>
        ))
      ) : (
        <h4>No experience credentials</h4>
      )}
    </div>
  );
};

ProfileExperience.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileExperience;

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({ profile: { experience } }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Experience</h2>

      {experience.length > 0 ? (
        experience.map((exp) => (
          <Fragment key={exp._id}>
            <h3 className="font-medium text-xl mt-4">
              {exp.company} -{" "}
              <span className="text-lg italic text-gray-500">{exp.title}</span>
            </h3>

            <Moment format="YYYY-MM-DD">{exp.from}</Moment>
            {!exp.to ? (
              <span className="italic"> - PRESENT</span>
            ) : (
              <Moment format="YYYY-MM-DD">{` - ${exp.to}`}</Moment>
            )}
            <p>{exp.description}</p>
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

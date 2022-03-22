import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div className="mt-12 xl:mt-0">
      {skills && (
        <Fragment>

          <div className="flex flex-wrap mt-4">
            {skills.map((skill, index) => (
              <span key={index} className="px-4 py-2 rounded-xl bg-green-100 mr-2 mb-2">
                 {skill}
              </span>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;

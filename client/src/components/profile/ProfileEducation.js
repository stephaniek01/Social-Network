import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({ profile: { education } }) => {
  return (
    <div className="profile-edu bg-white p-2">
      <h2 className="text-primary">Education</h2>
      {education.length > 0 ? (
        education.map((edu) => (
          <div key={edu._id}>
            <h3>{edu.school}</h3>
            <Moment format="YYYY-MM-DD">{edu.from}</Moment>
            {!edu.to ? (
              " - Present"
            ) : (
              <Moment format="YYYY-MM-DD">{` - ${edu.to}`}</Moment>
            )}
            <p>
              <strong>Degree: </strong>
              {edu.degree}
            </p>
            <p>
              <strong>Field Of Study: </strong>
              {edu.fieldofstudy}
            </p>
            <p>
              <strong>Description: </strong>
              {edu.description}
            </p>
          </div>
        ))
      ) : (
        <h4> No education credentials</h4>
      )}
    </div>
  );
};

ProfileEducation.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileEducation;

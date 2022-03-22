import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({ profile: { education } }) => {
  return (
    <div className="mt-12">
      <h1 className="text-2xl font-semibold mb-4">
        Education
      </h1>
      {education.length > 0 ? (
        education.map((edu) => (
          <div key={edu._id}>
            <h3 className="font-medium text-xl mt-4">{edu.school} - <span className="text-lg italic text-gray-500">
              {edu.degree} - {edu.fieldofstudy}
            </span></h3>
            
           
            <Moment format="YYYY-MM-DD">{edu.from}</Moment>
            {!edu.to ? (
             <span className="italic"> - PRESENT</span> 
            ) : (
              <Moment format="YYYY-MM-DD">{` - ${edu.to}`}</Moment>
            )}
            <p className="text-gray-500">{edu.description}</p>
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

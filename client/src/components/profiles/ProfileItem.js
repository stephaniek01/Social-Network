import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, avatar, name },
    company,
    status,
    location,
    skills,
  },
}) => {
  return (
    <div className="bg-gray-200 bg-opacity-50 py-10 px-6 rounded-md flex flex-col items-center justify-between w-full">
      <img className="rounded-full h-40 w-40 mx-auto" src={avatar} alt={name} />
      <div className="my-4 text-center">
        <h4 className="text-2xl">{name}</h4>
        <p className="text-sm">
          {status} {company && <span>at {company} </span>}
        </p>
        <p className="text-sm">{location && <span>{location}</span>}</p>
       
      </div>
      <div className="flex flex-wrap">
            {skills.map((skill, index) => (
              <span key={index} className="px-4 py-2 rounded-xl bg-green-100 mr-2 mt-4">
                 {skill}
              </span>
            ))}
          </div>
          <Link
          to={`/profile/${_id}`}
          className="bg-green-400  hover:bg-green-200 hover:translate-y-2 px-4 py-2 inline-block text-center rounded-md mt-4"
        >
          View Profile
        </Link>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.func.isRequired,
};

export default ProfileItem;

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
    <div className="bg-white bg-opacity-60 my-4 py-10 px-6 mx-9 rounded-md">
      <img className="rounded-full h-40 w-40 mx-auto" src={avatar} alt={name} />
      <div className="my-4 text-center">
        <h4 className="font-mono text-2xl">{name}</h4>
        <p className="font-mono text-sm">
          {status} {company && <span>at {company} </span>}
        </p>
        <p className="font-mono text-sm mb-4">{location && <span>{location}</span>}</p>
        <Link
          to={`/profile/${_id}`}
          className="font-mono bg-indigo-700  hover:bg-indigo-800 hover:translate-y-2 text-indigo-100 shadow-lg px-4 py-2 inline-block text-center rounded-md"
        >
          View Profile
        </Link>
      </div>
      <div className="mx-6">
        <ul className="leading-10 font-mono text-left">
          {skills.slice(0, 4).map((skill) => (
            <li key={skill} className="">
              <i className="fas fa-check"></i> {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.func.isRequired,
};

export default ProfileItem;

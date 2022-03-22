import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    user: { name, avatar },
    bio,
    status,
    company,
    location,
    website,
    social,
  },
}) => {
  return (
    <div className="flex flex-col lg:flex-row text-center lg:text-left">
      <div>
        <img className="rounded-lg my-1 h-60 w-60 mx-auto" src={avatar} alt={name} />
      </div>
      <div className="flex-grow lg:ml-10 flex flex-col justify-around">
        <div className="">
          <h1 className="text-2xl xl:text-5xl font-extrabold my-4 lg:mt-0">{name}</h1>
          <p className="text-xl text-gray-500 mb-1">
            <i class="far fa-file-code mr-2"></i>
            {status} {company && <span>{`at ${company}`}</span>}
          </p>

          {location && (
            <p className="text-xl text-gray-500 mb-1">
              <i className="fas fa-map-marker-alt mr-2"></i>
              {location}
            </p>
          )}
        </div>

        {bio && <p className="text-gray-500 mb-2">{bio}</p>}

        <div>
          {website && (
            <a href={"https://" + website} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe text-2xl mr-6" />
            </a>
          )}

          {social && social.twitter && (
            <a href={"https://" + social.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter text-2xl mr-6" />
            </a>
          )}

          {social && social.facebook && (
            <a href={"https://" + social.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook text-2xl mr-6" />
            </a>
          )}

          {social && social.linkedin && (
            <a href={"https://" + social.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin text-2xl mr-6" />
            </a>
          )}

          {social && social.youtube && (
            <a href={"https://" + social.youtube} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube text-2xl mr-6" />
            </a>
          )}

          {social && social.instagram && (
            <a
              href={"https://" + social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram text-2xl mr-6" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;

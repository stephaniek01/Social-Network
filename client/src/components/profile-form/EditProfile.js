import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Fragment } from "react";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import NotyfContext from "../layout/NotyfContext";

const initialState = {
  company: "",
  website: "",
  location: "",
  bio: "",
  status: "",
  githubusername: "",
  skills: "",
  youtube: "",
  facebook: "",
  twitter: "",
  instagram: "",
  linkedin: "",
};

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const notyf = useContext(NotyfContext);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(", ");
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const [formData, setFormData] = useState(initialState);

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // here edit = true
    createProfile(formData, history, true).then((val) => {
      if (val.status === "error") val.data.map((err) => notyf.error(err.msg));
      else if (val.status === "success") notyf.success(val.msg);
    });
    history.push("/dashboard");
  };

  return (
    <section className="xl:px-40 px-5 py-6">
      <div className="my-6">
        <h1 className="mb-1 text-xl xl:text-3xl font-extrabold">
          <i className="fas fa-user mr-2"></i>
          Edit Your Profile
        </h1>
        <p className="text-sm xl:text-lg">
          Let's get some information to make your profile stand out
        </p>
      </div>
      <form className="text-center mt-6" onSubmit={onSubmit}>
        <div className="text-left mb-6">
          <label for="status" className="font-semibold pb-2 inline-block">
            Status
          </label>
          <select
            name="status"
            id="status"
            value={status}
            onChange={(e) => onChange(e)}
            className="rounded-3xl bg-green-100 px-4 py-2 w-full"
          >
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="text-xs text-gray-600">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="text-left mb-6">
          <label for="company" className="font-semibold pb-2 inline-block">
            Company
          </label>
          <input
            className="rounded-3xl bg-green-100 px-4 py-2 w-full"
            type="text"
            placeholder="Company"
            name="company"
            id="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className="text-xs text-gray-600">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="text-left mb-6">
          <label for="name" className="font-semibold pb-2 inline-block">
            Name
          </label>
          <input
            className="rounded-3xl bg-green-100 px-4 py-2 w-full"
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="text-xs text-gray-600">
            Could be your own or a company website
          </small>
        </div>
        <div className="text-left mb-6">
          <label for="location" className="font-semibold pb-2 inline-block">
            Location
          </label>
          <input
            className="rounded-3xl bg-green-100 px-4 py-2 w-full"
            type="text"
            placeholder="Location"
            name="location"
            id="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="text-xs text-gray-600">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="text-left mb-6">
          <label for="skills" className="font-semibold pb-2 inline-block">
            Skills
          </label>
          <input
            className="rounded-3xl bg-green-100 px-4 py-2 w-full"
            type="text"
            placeholder="* Skills"
            name="skills"
            id="skills"
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className="text-xs text-gray-600">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="text-left mb-6">
          <label
            for="githubusername"
            className="font-semibold pb-2 inline-block"
          >
            Github Username
          </label>
          <input
            className="rounded-3xl bg-green-100 px-4 py-2 w-full"
            type="text"
            placeholder="Github Username"
            name="githubusername"
            id="githubusername"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className="text-xs text-gray-600">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="text-left mb-6">
          <label for="bio" className="font-semibold pb-2 inline-block">
            Bio
          </label>
          <textarea
            placeholder="A short bio of yourself"
            className="rounded-3xl bg-green-100 px-4 py-2 w-full"
            name="bio"
            id="bio"
            value={bio}
            rows="3"
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="text-xs text-gray-600">
            Tell us a little about yourself
          </small>
        </div>

        <div className="mb-2 text-left">
          <button
            type="button"
            className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white font-semibold my-1 rounded-3xl px-4 py-2"
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            Add Social Network Links (Optional)
          </button>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="text-left my-6 social-input">
              <label className="font-semibold pb-2">
                <i className="fab fa-twitter fa-2x mr-2 h-10"></i>
                <input
                  className="rounded-3xl bg-gray-200 px-4 py-2"
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={(e) => onChange(e)}
                />
              </label>
            </div>

            <div className="text-left mb-6 social-input">
              <label className="font-semibold pb-2">
                <i className="fab fa-facebook fa-2x mr-2 h-10"></i>
                <input
                  className="rounded-3xl bg-gray-200 px-4 py-2"
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={(e) => onChange(e)}
                />
              </label>
            </div>

            <div className="text-left mb-6 social-input">
              <label className="font-semibold pb-2">
                <i className="fab fa-youtube fa-2x mr-2 h-10"></i>
                <input
                  className="rounded-3xl bg-gray-200 px-4 py-2"
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={youtube}
                  onChange={(e) => onChange(e)}
                />
              </label>
            </div>

            <div className="text-left mb-6 social-input">
              <label className="font-semibold pb-2">
                <i className="fab fa-linkedin fa-2x mr-2 h-10"></i>
                <input
                  className="rounded-3xl bg-gray-200 px-4 py-2"
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={(e) => onChange(e)}
                />
              </label>
            </div>

            <div className="text-left mb-6 social-input">
              <label className="font-semibold pb-2">
                <i className="fab fa-instagram fa-2x mr-2 h-10"></i>
                <input
                  className="rounded-3xl bg-gray-200 px-4 py-2"
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={(e) => onChange(e)}
                />
              </label>
            </div>
          </Fragment>
        )}

        <input
          className="bg-green-400 hover:bg-green-500 focus:bg-green-500 rounded-3xl mt-12 px-4 py-2 mr-2"
          type="submit"
        />
        <Link
          className="bg-black hover:bg-gray-600 focus:bg-gray-600 text-white my-1 rounded-3xl mt-12 px-4 py-2"
          to="/dashboard"
        >
          Go Back
        </Link>
      </form>
    </section>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);

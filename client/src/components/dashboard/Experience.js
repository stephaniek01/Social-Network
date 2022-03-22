import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";
import workImg from "../../images/work2.svg";
import NotyfContext from "../layout/NotyfContext";

const Experience = ({ experience, deleteExperience }) => {
  const notyf = useContext(NotyfContext);

  const experiences = experience.map((exp) => (
    <tr
      key={exp._id}
      className="border-b-2 border-green-900 border-opacity-10 bg-green-50 hover:bg-green-100 hover:bg-opacity-80"
    >
      <td className="w-1/3 pl-4 py-4">{exp.company}</td>
      <td className="hide-sm w-1/3 p-0">{exp.title}</td>
      <td className="hide-sm w-1/3 p-0">
        <Moment format="YYYY/MM/DD">{exp.from}</Moment>
        {" - "}
        {exp.to === null ? (
          "Now"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td className="pr-4 text-right">
        <button
          className="bg-red-600 hover:bg-red-700 text-white p-auto rounded-md text-xs h-8 w-8"
          onClick={() => {
            deleteExperience(exp._id).then((val) => {
              if (val.status === "error")
                val.data.map((err) => notyf.error(err.msg));
              else if (val.status === "success") notyf.success(val.msg);
            });
          }}
        >
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      {experience && !experience.length > 0 ? (
        <div className="mb-6 text-center">
          <img src={workImg} alt="missing" className="h-96 mx-auto" />
          <p className="mt-6">
            You have not added any experience credentials yet.
            <br />
            Click
            <Link
              to="/add-experience"
              className="text-green-500 hover:text-green-300 italic"
            >
              {" "}
              here{" "}
            </Link>
            to add your credentials
          </p>
          <Link to="/add-experience">
              <button className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white font-semibold rounded-lg px-2 py-1 mt-6">
                Add Experience
              </button>
            </Link>
        </div>
      ) : (
        <Fragment>
          <div className="text-right">
            <Link to="/add-experience">
              <button className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white font-semibold rounded-lg px-2 py-1 mt-6">
                Add Experience
              </button>
            </Link>
          </div>
          <table className="table mt-6 table-auto w-full text-left">
            <thead className="bg-green-200 uppercase">
              <tr>
                <th className="pl-4 py-4">Company</th>
                <th className="py-4 hide-sm">Title</th>
                <th className="py-4 hide-sm">Years</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{experiences}</tbody>
          </table>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  experience: state.profile.profile.experience,
});

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { deleteExperience })(Experience);

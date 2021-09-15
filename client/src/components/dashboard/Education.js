import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
  const education_list =
    education &&
    education.length > 0 &&
    education.map((edu) => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td className="hide-sm">{edu.degree}</td>
        <td className="hide-sm">
          <Moment format="YYYY/MM/DD">{edu.from}</Moment>
          {" - "}
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteEducation(edu._id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  useEffect(() => {}, [deleteEducation]);

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>University</th>
            <th className="hide-sm">Course</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{education_list}</tbody>
      </table>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  education: state.profile.profile.education,
  // profile: state.profile
});

Education.propTypes = {
  education: PropTypes.array.isRequired,
  // profile: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { deleteEducation })(Education);

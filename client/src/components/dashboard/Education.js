import React, { Fragment, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";
import educationImg from "../../images/education.svg";
import NotyfContext from "../layout/NotyfContext";

const Education = ({ education, deleteEducation }) => {
  const notyf = useContext(NotyfContext);

  const education_list = education.map((edu) => (
    <tr
      key={edu._id}
      className="border-b-2 border-green-900 border-opacity-10 bg-green-50 hover:bg-green-100 hover:bg-opacity-80"
    >
      <td className="md:w-1/3 w-1/2 pl-4 py-4">{edu.school}</td>
      <td className="hide-sm w-1/3 p-0">{edu.degree}</td>
      <td className="hide-sm w-1/3 p-0">
        <Moment format="YYYY/MM/DD">{edu.from}</Moment>
        {" - "}
        {edu.to === null ? (
          "Now"
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td className="pr-4 text-right">
        <button
          className="bg-red-600 hover:bg-red-700 text-white p-auto rounded-md text-xs h-8 w-8"
          onClick={() => {
            deleteEducation(edu._id).then((val) => {
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

  useEffect(() => {}, [deleteEducation]);

  return (
    <div>
      {education && !education.length > 0 ? (
        <div className="mb-6 text-center">
          <img src={educationImg} alt="missing" className="h-96 mx-auto" />
          <p>
            You have not added any education credentials yet.
            <br />
            Click
            <Link
              to="/add-education"
              className="text-green-500 hover:text-green-300 italic"
            >
              {" "}
              here{" "}
            </Link>
            to add your credentials
          </p>

          <Link to="/add-education">
              <button className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white font-semibold rounded-lg px-2 py-1 mt-6">
                Add Education
              </button>
            </Link>
         
        </div>
      ) : (
        <Fragment>
          <div className="text-right">
            <Link to="/add-education">
              <button className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white font-semibold rounded-lg px-2 py-1 mt-6">
                Add Education
              </button>
            </Link>
          </div>
          <table className="table mt-6 table-auto w-full text-left">
            <thead className="bg-green-200 uppercase">
              <tr>
                <th className="pl-4 py-4">University</th>
                <th className="py-4 hide-sm">Course</th>
                <th className="py-4 hide-sm">Years</th>
                <th className=""></th>
              </tr>
            </thead>
            <tbody>{education_list}</tbody>
          </table>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  education: state.profile.profile.education,
});

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { deleteEducation })(Education);

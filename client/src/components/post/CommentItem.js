import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post";
import NotyfContext from "../layout/NotyfContext";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => {
  const notyf = useContext(NotyfContext);
  return (
    <div className="flex bg-white p-4 mt-10 rounded-md border-2">
      <div className="flex justify-center items-center w-1/5">
        <Link to={`/profile/${user}`}>
          <img
            className="rounded-full h-16 w-16 md:h-28 md:w-28"
            src={avatar}
            alt={name}
          />
          <h4 className="text-center">{name}</h4>
        </Link>
      </div>
      <div className="ml-4">
        <p className="my-4">{text}</p>
        <p className="mt-2 text-sm text-gray-400">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            type="button"
            className="rounded-md bg-gray-100 hover:bg-gray-200 px-3 py-2 inline-block mr-2 text-red-500"
            onClick={() => {
              const response = deleteComment(postId, _id);

              response.then((res) => {
                if (res.status === "success") {
                  console.log(res.msg);
                  notyf.success(res.msg);
                }
              });
            }}
          >
            <i className="fas fa-trash"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);

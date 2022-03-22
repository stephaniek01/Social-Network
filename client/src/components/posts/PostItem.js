import React, { useContext } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
import NotyfContext from "../layout/NotyfContext";

const PostItem = ({
  showActions,
  post: { _id, name, avatar, text, date, likes, comments, user },
  auth,
  addLike,
  removeLike,
  deletePost,
}) => {
  const notyf = useContext(NotyfContext);

  const onDelete = (_id) => {
    const response = deletePost(_id);
    response.then((res) => {
      if (res.status === "success") {
        console.log(res.msg);
        notyf.success(res.msg);
      }
    });
  };
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

        {showActions && (
          <div className="flex items-baseline justify-start text-xs md:text-base">
            <Link
              to={`posts/${_id}`}
              className="bg-green-100 text-black hover:bg-green-200 py-1 px-2 rounded-xl mt-2 mr-4 justify-self-end  md:text-base text-sm"
            >
              Discussion{" "}
              {comments.length > 0 && (
                <span className="bg-green-300 rounded-full h-6 w-6 text-sm md:inline-block md:visible text-center hidden invisible">
                  {comments.length}
                </span>
              )}
            </Link>

            {/* number of likes  */}
            <button
              type="button"
              className="rounded-md bg-gray-100 hover:bg-gray-200 px-3 py-2 inline-block mr-2 hover:text-red-600"
              onClick={() => addLike(_id)}
            >
              <i class="fas fa-heart "></i>{" "}
              {likes.length > 0 && (
                <span className="md:inline-block md:visible text-center hidden invisible">
                  {likes.length}
                </span>
              )}
            </button>

            {/* number of dislikes */}
            <button
              type="button"
              className="rounded-md bg-gray-100 hover:bg-gray-200 px-3 py-2 inline-block mr-2 hover:text-blue-900"
              onClick={() => removeLike(_id)}
            >
              <i className="fas fa-thumbs-down"></i>{" "}
            </button>

            {!auth.loading && auth.user._id === user && (
              <button
                type="button"
                className="rounded-md bg-gray-100 hover:bg-gray-200 px-3 py-2 inline-block mr-2 text-red-500"
                onClick={() => onDelete(_id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);

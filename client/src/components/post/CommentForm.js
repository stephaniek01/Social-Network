import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";
import NotyfContext from "../layout/NotyfContext";

const CommentForm = ({ post, addComment }) => {
  const [commentText, setCommentText] = useState("");
  const notyf = useContext(NotyfContext);

  return (
    <div className="mt-11">
      <div className="bg-green-400 p-3 md:p-4 rounded-t-md">
        <h3>Leave A Comment</h3>
      </div>
      <form
        className="form text-center"
        onSubmit={(e) => {
          e.preventDefault();

          const response = addComment(post._id, commentText);

          response.then((res) => {
            if (res.status === "success") {
              console.log(res.msg);
              notyf.success(res.msg);
            }
          });

          setCommentText("");
        }}
      >
        <textarea
          className="bg-green-100 p-3 md:p-4 w-full rounded-b-md resize-none"
          name="text"
          cols="30"
          rows="5"
          value={commentText}
          placeholder="Comment on this post"
          onChange={(e) => setCommentText(e.target.value)}
          required
        ></textarea>

        <input
          type="submit"
          className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-3xl mt-2"
          value="Submit Comment"
        />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);

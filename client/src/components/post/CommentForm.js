import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ post, addComment }) => {
  const [commentText, setCommentText] = useState("");
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addComment(post._id, commentText);
          setCommentText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          value={commentText}
          placeholder="Comment on this post"
          onChange={(e) => setCommentText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);

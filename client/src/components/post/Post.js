import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPostById } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({ getPostById, match, posts: { post } }) => {
  useEffect(() => {
    getPostById(match.params.id);
  }, [getPostById, match.params.id]);
  return (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      {!post ? (
        <Spinner />
      ) : (
        <Fragment>
          <PostItem showActions={false} post={post} />
          <CommentForm post={post} />

          {post.comments.length > 0 &&
            post.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={match.params.id}
              />
            ))}
        </Fragment>
      )}
    </Fragment>
  );
};

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { getPostById })(Post);

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
    <section className="xl:px-40 px-5 py-6 flex flex-col h-full">
      <Link
        to="/posts"
        className="bg-black hover:bg-gray-600 text-white px-4 py-2 rounded-3xl self-end"
      >
        Back To Posts
      </Link>
      {!post ? (
        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
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
    </section>
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

import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostForm from "./PostForm";
import PostItem from "./PostItem";

const Posts = ({ getPosts, posts: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>
      <div className="post-form">
        <PostForm />
        {posts.length > 0 &&
          posts.map((post) => <PostItem key={post._id} post={post} />)}
      </div>
    </Fragment>
  );
};

PropTypes.Posts = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});
export default connect(mapStateToProps, { getPosts })(Posts);

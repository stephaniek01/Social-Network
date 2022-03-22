import React, { useEffect } from "react";
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
    <div className="h-screen flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <section className="xl:px-40 px-5 py-6 flex flex-col h-full">
      <h1 className="mt-6 mb-3 text-2xl xl:text-3xl font-extrabold">Posts</h1>
      <h4 className="text-lg mb-6">Welcome to the community!</h4>

      <div className="post-form">
        <PostForm />
        <div className="mt-11">
          {posts.length > 0 &&
            posts.map((post) => <PostItem key={post._id} post={post} />)}
        </div>
      </div>
    </section>
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

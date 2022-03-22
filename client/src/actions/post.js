import axios from "axios";
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "./types";

export const getPosts = () => async (dispatch) => {
  try {
    axios.defaults.baseURL = "http://localhost:5000";

    const res = await axios.get("api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    console.log("get posts", err.response);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get single post by postId
export const getPostById = (postId) => async (dispatch) => {
  try {
    axios.defaults.baseURL = "http://localhost:5000";

    const res = await axios.get(`api/posts/${postId}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add like to postId
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove like to postId
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/unlike/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete post by postId
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`api/posts/${postId}`);

    dispatch({
      type: DELETE_POST,
      payload: postId,
    });

    return { status: "success", msg: "Post removed" };
  } catch (err) {
    console.log(err.response);

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const body = JSON.stringify({ text: formData });

    const res = await axios.post("api/posts", body, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    return { status: "success", msg: "Post created" };
  } catch (err) {
    console.log(err.response);

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const body = JSON.stringify({ text: formData });

    const res = await axios.post(`api/posts/comment/${postId}`, body, config);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    return { status: "success", msg: "Comment added" };
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: DELETE_COMMENT,
      payload: commentId,
    });

    return { status: "success", msg: "Comment deleted" };
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

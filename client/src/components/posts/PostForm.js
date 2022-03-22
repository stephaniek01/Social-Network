import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import NotyfContext from "../layout/NotyfContext";


const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");
  const notyf = useContext(NotyfContext);

  return (
    <div className="">
      <div className="bg-green-400 p-3 md:p-4 rounded-t-md">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form text-center"
        onSubmit={(e) => {
          e.preventDefault();
          const response = addPost(text);
          response.then((res) => {
            if (res.status === "success") {
              console.log(res.msg);
              notyf.success(res.msg);
            }
          });
          setText("");
        }}
      >
        <textarea
          className="bg-green-100 p-2 md:p-4 w-full rounded-b-md resize-none"
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input
          type="submit"
          className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-3xl mt-2"
          value="Submit Post"
        />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);

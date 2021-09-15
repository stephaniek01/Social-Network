import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_REPOS,
} from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });

  try {
    const res = await axios.get("api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Profile by User id
export const getProfileByUserId = userId => async dispatch => {
  try {
    axios.defaults.baseURL = "http://localhost:5000";

    const res = await axios.get(`api/profile/user/${userId}`);
    
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
    
  }catch (err) {
    const errors = err.response.data.errors;

    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

// Get Github repos
export const getGithubRepos = username => async dispatch => {
  try {

    const res = await axios.get(`api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
    
  }catch (err) {
    const errors = err.response.data.errors;

    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

// Create or update profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      axios.defaults.baseURL = "http://localhost:5000";

      const res = await axios.post("/api/profile", formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Profile Edited" : "Profile Created", "success")
      );

      if (!edit) history.push("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors)
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    axios.defaults.baseURL = "http://localhost:5000";

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    history.push("/dashboard");
    dispatch(setAlert("Experience added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    axios.defaults.baseURL = "http://localhost:5000";

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    history.push("/dashboard");
    dispatch(setAlert("Education added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete experience
export const deleteExperience = (exp_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    axios.defaults.baseURL = "http://localhost:5000";

    const res = await axios.delete(`api/profile/experience/${exp_id}`, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience deleted", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Education
export const deleteEducation = (edu_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    axios.defaults.baseURL = "http://localhost:5000";

    const res = await axios.delete(`api/profile/education/${edu_id}`, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education deleted", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This cannot be undone! ")) {
    try {
      await axios.delete("/api/profile");

      dispatch({
        type: ACCOUNT_DELETED,
      });

      dispatch({
        type: CLEAR_PROFILE,
      });

      dispatch(setAlert("Your account has been deleted"));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors)
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

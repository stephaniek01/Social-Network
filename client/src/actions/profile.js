import axios from "axios";
import api from "../"
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR, SET_ALERT } from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusTest, status: err.response.status },
    });
  }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {

      const config = {
        headers : {
          'Content-type' : 'application/json'
        },
      }

      axios.defaults.baseURL = "http://localhost:5000";
      
      const res = await axios.post("/api/profile", formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert(edit? "Profile Edited" : "Profile Created"))

      if(!edit)
        history.push('/dashboard');

      
    } catch (err) {

      const errors = err.response.data.errors;

      if(errors)
        errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

      dispatch({
        type:PROFILE_ERROR,
        payload: { msg: err.response.statusTest, status: err.response.status }
      })
      
    }
}
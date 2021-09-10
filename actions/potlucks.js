import * as api from "../api";
import { FETCH_ALL, CREATE, UPDATE, DELETE_POTLUCK } from '../constants/ActionTypes'

// Action Creators]
export const getPotlucks = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPotlucks();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPotluck = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPotluck(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const updatePotluck = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePotluck(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const deletePotluck = (id) => async (dispatch) => {
  try {
    console.log("deleting potluck...")

    await api.deletePotluck(id);


    dispatch({type: DELETE_POTLUCK, payload: id})
  } catch (error) {
    console.log(error);
  }
};
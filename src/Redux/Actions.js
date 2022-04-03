import axios from "axios";
import {
  DELETE_SELECTED,
  END_EDITABLE,
  GET_DATA_FAILURE,
  GET_DATA_REQ,
  GET_DATA_SUCCESS,
  ITEM_CHECKED,
  ITEM_UNCHECKED,
  MAKE_EDITABLE,
  PAGE_CHANGED,
  SEARCH_TERM,
  SET_ALL_SELECT_PAGE_NO,
  START_EDITABLE,
  TOGGLE_EDITABLE,
} from "./ActionTypes";

export const getDataReq = () => ({
  type: GET_DATA_REQ,
});
export const getdataSuccess = (payload) => ({
  type: GET_DATA_SUCCESS,
  payload,
});
export const getdataFailure = () => ({
  type: GET_DATA_FAILURE,
});

export const searching = (payload) => ({
  type: SEARCH_TERM,
  payload,
});
export const pageChanged = (payload) => ({
  type: PAGE_CHANGED,
  payload,
});
export const itemChecked = (payload) => ({
  type: ITEM_CHECKED,
  payload,
});
export const itemUnchecked = (payload) => ({
  type: ITEM_UNCHECKED,
  payload,
});
export const deleteSelected = () => ({
  type: DELETE_SELECTED,
});
export const setAllSelectPageNo = (payload) => ({
  type: SET_ALL_SELECT_PAGE_NO,
  payload,
});
export const startEdit = (payload) => ({
  type: START_EDITABLE,payload
});
export const endEdit = (payload) => ({
  type: END_EDITABLE,payload
});
export function getAPIData(url) {
  return (dispatch) => {
    dispatch(getDataReq());
    axios
      .get(url)
      .then((res) => {
        dispatch(getdataSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getdataFailure());
      });
  };
}
